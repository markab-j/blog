import type { RenderOptions } from "pele";

/** Pele 렌더링에 사용할 글꼴과 자동 방향 전환 설정. */
export type PeleConfig = Pick<RenderOptions, "fontFamily" | "autoDirection">;
