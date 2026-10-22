import { visit } from "unist-util-visit";

/** Mermaid 문법의 코드 블록을 Pele 렌더링용 노드로 변환한다. */
export function remarkPele() {
	return (tree) => {
		visit(tree, "code", (node) => {
			if (node.lang === "mermaid") {
				const code = node.value;
				node.type = "pele";
				node.data = {
					hName: "div",
					hProperties: {
						className: ["pele-source"],
						"data-pele-code": code,
					},
					// MDX가 hProperties를 생략해도 원본을 보존한다.
					hChildren: [{ type: "text", value: code }],
				};
				// remark-rehype가 원본을 일반 텍스트로 중복 처리하지 않도록 한다.
				node.value = undefined;
			}
		});
	};
}
