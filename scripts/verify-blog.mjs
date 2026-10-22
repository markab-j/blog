import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// 배포 산출물의 실제 링크·브랜딩·초안 유출을 검사한다. 외부 URL은 요청하지 않는다.
const root = path.resolve("dist");
const origin = "https://blog.markab-j.com";
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
function files(dir) {
	return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const name = path.join(dir, entry.name);
		return entry.isDirectory() ? files(name) : [name];
	});
}
const htmlFiles = files(root).filter((file) => file.endsWith(".html"));
const home = read("index.html");
assert.match(home, /<html[^>]+lang="ko"/);
assert.match(home, /property="og:locale" content="ko_KR"/);
assert.match(home, /markab-j/);
assert.match(home, /rel="canonical" href="https:\/\/blog\.markab-j\.com\/"/);
assert.match(read("rss.xml"), /<language>ko-KR<\/language>/);
assert.equal(read("CNAME").trim(), "blog.markab-j.com");
assert.match(
	read("robots.txt"),
	/https:\/\/blog\.markab-j\.com\/sitemap-index\.xml/,
);
assert.ok(fs.existsSync(path.join(root, "pagefind/pagefind.js")));
for (const file of [
	"rss.xml",
	"atom.xml",
	"sitemap-index.xml",
	"sitemap-0.xml",
]) {
	assert.ok(
		!read(file).includes("https://firefly.cuteleaf.cn"),
		`${file}: demo URL`,
	);
}
for (const file of files("src/content/posts")) {
	if (!/\.mdx?$/.test(file)) continue;
	const { data } = matter.read(file);
	if (data.draft === false) continue;
	const relative = path
		.relative("src/content/posts", file)
		.replace(/\.mdx?$/, "")
		.replace(/\/index$/, "");
	const slug = data.slug || relative;
	assert.ok(
		!fs.existsSync(path.join(root, "posts", slug, "index.html")),
		`Draft published: ${file}`,
	);
}
const errors = [];
for (const file of htmlFiles) {
	const html = fs.readFileSync(file, "utf8");
	const pageUrl = new URL(
		path.relative(root, file).replace(/index\.html$/, ""),
		`${origin}/`,
	);
	assert.ok(
		!/XiaYe|xiaye@msn\.com|blog\.cuteleaf\.cn|Lovely firefly!/.test(html),
		`${file}: demo identity`,
	);
	// 정적 HTML의 실제 사용자 텍스트에서 번역 누락을 확인한다.
	const visible = html
		.replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/<[^>]*>/g, "");
	if (/[\u3400-\u9fff]/u.test(visible))
		errors.push(`${pageUrl.pathname}: untranslated Chinese text`);
	const markup = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
	for (const match of markup.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
		const value = match[1].replaceAll("&amp;", "&");
		if (/^(#|data:|mailto:|javascript:|tel:)/i.test(value)) continue;
		const target = new URL(value, pageUrl);
		if (target.origin !== origin) continue;
		const local = path.join(root, decodeURIComponent(target.pathname));
		if (
			!(fs.existsSync(local) && fs.statSync(local).isFile()) &&
			!fs.existsSync(path.join(local, "index.html"))
		) {
			errors.push(`${pageUrl.pathname}: missing ${target.pathname}`);
		}
	}
}
assert.deepEqual(errors, [], errors.join("\n"));
assert.ok(!fs.existsSync(path.join(root, "gallery/firefly-2026/1.avif")));
assert.ok(
	!fs.existsSync(path.join(root, "assets/music/使一颗心免于哀伤-哼唱.mp3")),
);
console.log(
	`블로그 검증 통과: HTML ${htmlFiles.length}개, 내부 리소스·한국어·메타데이터·피드·초안·데모 제외`,
);
