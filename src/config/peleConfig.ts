import type { PeleConfig } from "../types/peleConfig";

/** Pele의 빌드 시 SVG 렌더링 설정. 색상은 .pele CSS 변수로 관리한다. */
export const peleConfig: PeleConfig = {
	fontFamily: "system-ui, sans-serif",
	autoDirection: false,
};
