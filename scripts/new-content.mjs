import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import sharp from "sharp";
import ts from "typescript";
import { booknavConfig } from "../src/config/booknavConfig.ts";
import { galleryConfig } from "../src/config/galleryConfig.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const [command, ...args] = process.argv.slice(2);
const help = `사진 앨범:
  pnpm new-gallery --id trip-2026 --title "여행" [--date 2026-10-22] [--description "설명"] [--location "장소"] "/사진/한 장.png" "/사진/두 장.jpg"
즐겨찾기:
  pnpm new-bookmark --group dev --group-name "개발" --title "Astro" --url https://astro.build [--description "설명"]
  기존 그룹에는 --group-name을 생략합니다. 그룹 ID가 없으면 새 그룹을 만듭니다.
공통: --dry-run은 변경 없이 결과를 확인합니다. --help는 이 도움말을 표시합니다.
앨범·즐겨찾기는 다음 빌드에 포함됩니다. 사진 원본은 변환 없이 복사하며 첫 사진이 표지입니다.`;

// Preserve the existing config and comments; insert only into the chosen array.
function appendToArray(file, findArray, value) {
	const source = fs.readFileSync(file, "utf8");
	const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
	const array = findArray(tree);
	if (!array || !ts.isArrayLiteralExpression(array)) {
		throw new Error(`설정 배열을 찾지 못했습니다: ${file}`);
	}
	const close = array.end - 1;
	const lineStart = source.lastIndexOf("\n", array.getStart(tree)) + 1;
	const indent = source.slice(lineStart).match(/^[\t ]*/)[0];
	const entry = JSON.stringify(value, null, "\t")
		.split("\n")
		.map((line) => `${indent}\t${line}`)
		.join("\n");
	const last = array.elements.at(-1);
	const comma = last && !array.elements.hasTrailingComma ? "," : "";
	const insertAt = last?.end ?? array.getStart(tree) + 1;
	return (
		source.slice(0, insertAt) +
		comma +
		source.slice(insertAt, close).trimEnd() +
		`\n${entry},\n${indent}` +
		source.slice(close)
	);
}

function variable(tree, name) {
	for (const statement of tree.statements) {
		if (!ts.isVariableStatement(statement)) continue;
		for (const declaration of statement.declarationList.declarations) {
			if (declaration.name.getText(tree) === name)
				return declaration.initializer;
		}
	}
}

function property(object, name) {
	return object?.properties?.find(
		(item) =>
			ts.isPropertyAssignment(item) &&
			item.name.getText().replaceAll('"', "") === name,
	)?.initializer;
}

try {
	if (!["gallery", "bookmark"].includes(command))
		throw new Error("알 수 없는 명령입니다.");
	const names =
		command === "gallery"
			? ["id", "title", "date", "description", "location"]
			: ["group", "group-name", "title", "url", "description"];
	const { values, positionals } = parseArgs({
		args,
		options: Object.fromEntries([
			...names.map((name) => [name, { type: "string" }]),
			["help", { type: "boolean", short: "h" }],
			["dry-run", { type: "boolean" }],
		]),
		allowPositionals: true,
	});
	if (values.help) {
		console.log(help);
		process.exit(0);
	}
	const required = (name) => {
		const value = values[name]?.trim();
		if (!value) throw new Error(`--${name} 값을 입력하세요.`);
		return value;
	};
	const id = required(command === "gallery" ? "id" : "group");
	if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
		throw new Error(
			"ID는 영문 소문자·숫자와 단어 사이의 하이픈만 사용할 수 있습니다.",
		);
	}
	const title = required("title");
	let file;
	let updated;
	let photos = [];
	let albumDir;
	if (command === "gallery") {
		if (galleryConfig.albums.some((album) => album.id === id))
			throw new Error("이미 등록된 앨범 ID입니다.");
		if (!positionals.length)
			throw new Error("사진 파일 경로를 한 개 이상 입력하세요.");
		albumDir = path.join(root, "public/gallery", id);
		if (fs.existsSync(albumDir))
			throw new Error("같은 이름의 사진 폴더가 이미 있습니다.");
		// Validate every file before writing anything. Paths are copied, never moved.
		photos = await Promise.all(
			positionals.map(async (input, index) => {
				const source = path.resolve(input);
				const extension = path.extname(source).toLowerCase();
				if (!/\.(png|jpe?g|webp|avif|gif)$/.test(extension))
					throw new Error(`지원하지 않는 사진 형식: ${input}`);
				if (!fs.statSync(source).isFile())
					throw new Error(`사진 파일이 아닙니다: ${input}`);
				await sharp(source).metadata();
				return {
					source,
					destination: path.join(
						albumDir,
						`${String(index + 1).padStart(3, "0")}${extension}`,
					),
				};
			}),
		);
		const date =
			values.date ??
			new Intl.DateTimeFormat("en-CA", {
				timeZone: "Asia/Seoul",
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
			}).format(new Date());
		if (
			!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
			new Date(date).toISOString().slice(0, 10) !== date
		)
			throw new Error("날짜는 실제 날짜 YYYY-MM-DD로 입력하세요.");
		file = path.join(root, "src/config/galleryConfig.ts");
		updated = appendToArray(
			file,
			(tree) => property(variable(tree, "galleryConfig"), "albums"),
			{
				id,
				name: title,
				date,
				...(values.description ? { description: values.description } : {}),
				...(values.location ? { location: values.location } : {}),
			},
		);
	} else {
		if (positionals.length) throw new Error("즐겨찾기는 옵션으로 입력하세요.");
		const url = required("url");
		if (!["http:", "https:"].includes(new URL(url).protocol))
			throw new Error("http 또는 https 주소만 사용할 수 있습니다.");
		const group = booknavConfig.find((item) => item.id === id);
		if (group?.items.some((item) => item.url === url))
			throw new Error("그룹에 같은 주소가 이미 있습니다.");
		const item = {
			title,
			url,
			...(values.description ? { desc: values.description } : {}),
		};
		file = path.join(root, "src/config/booknavConfig.ts");
		updated = appendToArray(
			file,
			(tree) => {
				const groups = variable(tree, "booknavConfig");
				if (!group) return groups;
				const existing = groups.elements.find(
					(element) => property(element, "id")?.text === id,
				);
				return property(existing, "items");
			},
			group ? item : { id, name: required("group-name"), items: [item] },
		);
	}
	if (values["dry-run"]) {
		console.log(`미리보기 — 파일을 변경하지 않습니다.\n${updated}`);
		for (const photo of photos)
			console.log(`${photo.source} → ${photo.destination}`);
	} else {
		if (albumDir) fs.mkdirSync(albumDir, { recursive: true });
		for (const photo of photos)
			fs.copyFileSync(
				photo.source,
				photo.destination,
				fs.constants.COPYFILE_EXCL,
			);
		fs.writeFileSync(file, updated);
		console.log(
			`등록 완료: ${file}${photos.length ? ` (사진 ${photos.length}장)` : ""}`,
		);
	}
} catch (error) {
	console.error(`오류: ${error.message}\n--help로 사용법을 확인하세요.`);
	process.exitCode = 1;
}
