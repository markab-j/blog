/* Create a timestamped dynamic markdown file from command-line text. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { siteConfig } from "../src/config/siteConfig.ts";

const { values, positionals } = parseArgs({
	options: {
		help: { type: "boolean", short: "h" },
		"dry-run": { type: "boolean" },
		location: { type: "string" },
		pinned: { type: "boolean" },
	},
	allowPositionals: true,
});
if (values.help) {
	console.log(
		'사용법: pnpm new-dynamic "한마디 내용" [--location "장소"] [--pinned] [--dry-run]\n한국어 초안으로 생성합니다. 공개하려면 검토 후 draft: false로 변경하세요.',
	);
	process.exit(0);
}
const content = positionals.join(" ").trim();
if (!content) {
	console.error('내용을 입력하세요. 사용법: pnpm new-dynamic "한마디 내용"');
	process.exit(1);
}

const now = new Date();
const timezone = siteConfig.timezone || "Asia/Shanghai";
const dateParts = new Intl.DateTimeFormat("en-CA", {
	timeZone: timezone,
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hourCycle: "h23",
})
	.formatToParts(now)
	.reduce((parts, part) => {
		if (part.type !== "literal") parts[part.type] = part.value;
		return parts;
	}, {});
const year = dateParts.year;
const month = dateParts.month;
const day = dateParts.day;
const hours = dateParts.hour;
const minutes = dateParts.minute;
const seconds = dateParts.second;
const timestamp = now.toISOString();
const fileName = `${year}-${month}-${day}-${hours}${minutes}${seconds}.md`;
const targetDir = fileURLToPath(
	new URL("../src/content/dynamic", import.meta.url),
);
const fullPath = path.join(targetDir, fileName);

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists`);
	process.exit(1);
}

const markdown = `---\npublished: ${timestamp}\ndraft: true\nlang: ko\npinned: ${Boolean(values.pinned)}\nlocation: ${JSON.stringify(values.location || "")}\n---\n\n${content}\n`;
if (values["dry-run"]) {
	console.log(`미리보기 — 파일을 변경하지 않습니다: ${fullPath}\n${markdown}`);
} else {
	fs.mkdirSync(targetDir, { recursive: true });
	fs.writeFileSync(fullPath, markdown, { flag: "wx" });
	console.log(`한마디 초안 생성: ${fullPath}`);
}
