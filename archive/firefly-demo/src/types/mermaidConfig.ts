/** 보관된 데모에서 사용하던 Merman 테마 이름. */
export type MermaidThemeName =
	| "editor-light"
	| "editor-dark"
	| "one-dark"
	| "gruvbox-light"
	| "gruvbox-dark"
	| "ayu-light"
	| "ayu-dark";

export type MermaidConfig = {
	lightTheme: MermaidThemeName;
	darkTheme: MermaidThemeName;
};
