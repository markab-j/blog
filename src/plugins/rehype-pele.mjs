import { fromHtml } from "hast-util-from-html";
import { h } from "hastscript";
import { render } from "pele";
import { visit } from "unist-util-visit";
import {
	DIAGRAM_CONTAINER,
	DIAGRAM_WRAPPER,
	PELE_CONTAINER,
	PELE_ERROR,
	PELE_FALLBACK_CODE,
	PELE_WRAPPER,
} from "./utils/diagramConstants.js";
import { extractText } from "./utils/extractText.js";

/**
 * Mermaid 코드 블록을 Pele의 정적 SVG로 변환한다.
 * @param {import("../types/peleConfig").PeleConfig} options
 */
export function rehypePele(options = {}) {
	return (tree) => {
		let diagramIndex = 0;

		visit(tree, "element", (node) => {
			if (
				node.tagName !== "div" ||
				!node.properties?.className?.includes("pele-source")
			) {
				return;
			}

			// MDX에서는 hProperties 대신 텍스트 자식에 원본이 보존될 수 있다.
			const source =
				node.properties["data-pele-code"] || extractText(node).trim();
			node.properties = {
				class: `${DIAGRAM_CONTAINER} ${PELE_CONTAINER}`,
			};

			try {
				const { svg } = render(source, {
					idPrefix: `pele-${diagramIndex++}`,
					...options,
				});
				// raw 노드 대신 SVG 요소로 삽입해 Markdown과 MDX를 함께 지원한다.
				node.children = [
					h(
						"div",
						{ class: `${DIAGRAM_WRAPPER} ${PELE_WRAPPER}` },
						fromHtml(svg, { fragment: true }).children,
					),
				];
			} catch (error) {
				console.error(
					"[rehype-pele] Render failed:",
					error instanceof Error ? error.message : String(error),
				);
				node.children = [
					h("div", { class: PELE_ERROR }, [
						h(
							"p",
							{},
							"다이어그램을 표시하지 못했습니다. Mermaid 문법을 확인해 주세요.",
						),
						h("pre", { class: PELE_FALLBACK_CODE }, source),
					]),
				];
			}
		});
	};
}
