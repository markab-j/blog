# Repository Guidelines

## Project Structure & Module Organization

Firefly is an Astro 7 site with Svelte islands and TypeScript configuration. Main source code lives in `src/`: routes in `src/pages`, layouts in `src/layouts`, reusable UI in `src/components`, styles in `src/styles`, content in `src/content`, helpers in `src/utils`, and Markdown/HTML plugins in `src/plugins`. Site configuration is split across `src/config` with matching type definitions in `src/types`; prefer imports from `@/config` when available. Static files served directly belong in `public`, source-managed images in `src/assets`, docs in `docs` and `Firefly-Docs`, and automation in `scripts`.

## Build, Test, and Development Commands

Use `pnpm`; the `preinstall` script enforces it.

- `pnpm dev` or `pnpm start`: run the local Astro dev server.
- `pnpm check`: run Astro diagnostics.
- `pnpm type-check`: run TypeScript with `--noEmit`.
- `pnpm format`: format `src` with Biome.
- `pnpm lint`: run Biome checks and safe fixes on `src`.
- `pnpm build`: generate icons, LQIPs, the Astro build, font subsets, and Pagefind search output in `dist`.
- `pnpm preview`: preview the production build locally.
- `pnpm new-post`: scaffold a new content post.

## Coding Style & Naming Conventions

Biome is the formatter and linter. It uses tabs for indentation and double quotes for JavaScript/TypeScript strings. Keep Astro and Svelte components in `PascalCase` (`PostCard.astro`, `Search.svelte`), config modules in `camelCase` ending with `Config.ts`, and utilities in descriptive kebab case such as `date-utils.ts`. Keep `src/types` aligned with `src/config`. Avoid unrelated formatting churn.

## Testing Guidelines

There is no dedicated unit-test framework configured. Before submitting changes, run `pnpm check`, `pnpm type-check`, and `pnpm build` for rendering, content, or generated asset work. For visual or interactive changes, verify with `pnpm dev` or `pnpm preview` and include screenshots in the PR. Name future tests near the feature they cover, using the local file name as the stem.

## Commit & Pull Request Guidelines

Use Conventional Commits, matching the current history: `feat: ...`, `fix: ...`, and `chore: ...`. Keep commits and PRs focused on one concern. PRs should include a concise summary, linked issues when relevant, validation commands run, and screenshots for UI changes. Discuss major features or design changes in an issue or discussion before implementation.

## Security & Configuration Tips

Do not commit secrets, tokens, or service keys in config files. Keep deployment-specific settings in the target platform environment, and review generated files such as `dist`, `src/constants/lqips.json`, and `src/constants/icons.ts` before committing them.

## 개인 블로그 운영 규칙

- 운영 주소는 `https://blog.markab-j.com`, 소유자는 `markab-j`다. 기본 언어는 `ko`, 지역 표기는 `ko-KR`, 시간대는 `Asia/Seoul`이다. 모든 사용자 노출 UI는 자연스러운 한국어를 기본으로 하고 기존 i18n과 다국어 지원을 보존한다.
- Firefly의 구조·레이아웃·코딩 스타일을 유지한다. 작은 단위로 수정하고 기존 설정과 기능을 재사용한다. 중복 구현이나 불필요한 추상화·의존성·재구성을 피하고 upstream 충돌 가능성을 고려한다.
- 개인정보·경험·성과·소셜 계정·이미지를 추측하지 않는다. 제공된 자료만 사용하고, 비밀키와 공개하지 않은 개인정보는 커밋하지 않는다. 원본 MIT 라이선스와 Astro/Firefly 표기는 보존한다.
- 기존 사용자 게시글을 허락 없이 삭제·재작성하거나 의미를 바꾸지 않는다. 새 글은 항상 `draft: true`, `lang: ko`로 생성한다. 발행(`draft: false`)은 사용자의 명시적 요청이 있을 때만 한다. 미리보기 서버는 초안을 표시하므로 공개하지 않는다.
- `src/content.config.ts` 스키마를 따른다. 글마다 명확한 제목과 설명, 정확한 게시일·수정일을 작성하고 카테고리·태그 명칭을 일관되게 유지한다. 이미지 경로·대체 텍스트·내부 링크를 확인하고 기술 예제는 실제로 검증한다.
- 작업 시작 시 블로그 개발·미리보기 서버 상태를 확인한다. 실행 중이라면 작업 디렉터리와 PID로 이 저장소의 서버인지 확인한 뒤 종료하고, 작업 완료 후 `pnpm dev --host 127.0.0.1 --port 4321`로 다시 실행한다. 다른 프로젝트의 서버는 종료하지 않는다. 초안을 확인할 때는 production preview 대신 개발 서버를 사용하고 실제 페이지 응답을 검증해 접속 URL을 안내한다.
- 수정 후 관련 검증을 수행한다. 발행 전에는 `pnpm check`, `pnpm type-check`, `pnpm build`, `pnpm verify:blog`와 글의 링크 검사를 수행한다. UI 변경은 모바일·라이트/다크·검색도 확인한다. 실행하지 않은 검사를 성공했다고 보고하지 않는다.
- pnpm 버전은 `package.json`의 `packageManager`, Node 요구사항은 `engines`를 따른다. `pnpm lint`는 파일을 수정하므로 무관한 파일에 일괄 실행하지 않는다.
- 현재 브랜치를 기본으로 사용하고 작업 시작 시 저장소·브랜치·변경 상태를 확인한다. 현재 승인 범위는 단계별 로컬 커밋까지이며 푸시·운영 사이트 배포는 별도 명시적 요청이 필요하다. 관련 변경만 Conventional Commits로 커밋하고 커밋 전 변경 사항과 검사 결과를 알린다.
- `origin`은 개인 저장소, `upstream`은 `https://github.com/CuteLeaf/Firefly.git`이다. 원본 업데이트 작업은 별도 브랜치에서 병합·검증한다. 사용자 설정·콘텐츠를 우선 보존하고 충돌을 한쪽으로 일괄 덮어쓰지 않는다. 강제 푸시·이력 재작성·원격 변경·저장소 관리자 작업을 하지 않는다.
- 대량·재귀·와일드카드 삭제를 하지 않는다. 필요한 삭제는 정확한 경로 한 개씩 수행하고, 여러 항목을 삭제해야 한다면 먼저 확인한다. 데모는 `archive/firefly-demo`에 보관하며 사이트로 다시 노출하지 않는다.
- DNS·GitHub Pages 설정·실서비스 최초 전환은 별도 승인을 받는다. 운영 절차와 이미지 교체 위치는 `docs/BLOG_OPERATIONS.md`를 따른다. 이 파일은 영구 규칙만 유지하고 작업 일지로 사용하지 않는다.
