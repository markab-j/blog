# 블로그 운영 안내

운영 주소는 **https://blog.markab-j.com**, GitHub 소유자는 **markab-j**다. Astro 7·Svelte·TypeScript 기반 Firefly의 기존 콘텐츠·설정·디자인을 사용한다. 기본 언어는 `ko`, 지역 표기는 `ko-KR`, 시간대는 `Asia/Seoul`이다.

## 1. 전체 구조

| 위치 | 역할 |
| --- | --- |
| `src/config/` | 사이트·프로필·내비게이션·기능 설정. `index.ts`가 공통 진입점 |
| `src/types/` | 설정 타입 |
| `src/content/posts/` | Markdown/MDX 게시글과 글에 딸린 이미지 |
| `src/content/spec/` | 소개·방명록·이웃 페이지 본문 |
| `src/content/projects/`, `src/content/dynamic/` | 선택 기능의 프로젝트·짧은 기록 |
| `src/content.config.ts` | 콘텐츠 수집 경로와 Frontmatter 스키마 |
| `src/assets/` | Astro가 처리할 이미지. `/` 없이 `assets/...`로 참조 |
| `public/` | 원본 그대로 배포. `/favicon/markab-j.svg`처럼 `/`로 시작해 참조 |
| `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/` | 라우트·레이아웃·UI·스타일 |
| `src/i18n/` | 번역 키·언어별 번역·선택 로직 |
| `scripts/` | 초안 생성·미디어 처리·검색 인덱스·산출물 검증 |
| `.github/workflows/` | PR 검사와 수동 GitHub Pages 배포 |
| `archive/firefly-demo/` | 이전 샘플 콘텐츠·설정·제삼자 미디어 원본. 사이트로 배포하지 않음 |
| `dist/` | 빌드 산출물. 직접 수정하거나 커밋하지 않음 |

초기 조사 시 사용자 작성 게시글은 확인되지 않았으며 기존 글·프로젝트·일상·갤러리·모델·음악·샘플 이미지는 데모로 분류해 보관했다. 보관본은 삭제하지 않아 문법 참고와 복구가 가능하다. 기존 LICENSE·원본 문서와 Footer의 Astro/Firefly 표기를 유지한다.

설정 파일은 기본 사이트·프로필·배경·내비게이션 외에 사이드바, 공지, 폰트, 댓글, 통계, 음악, 후원, 갤러리, 이웃, 북마크, 일상, 이미지, 표시 설정, 효과, 라이선스, 코드 하이라이트, Mermaid, PlantUML, 캐릭터 모델을 나눠 관리한다. 기능을 추가하기 전에 해당 설정의 기존 기능부터 확인한다.

## 2. 개인 정보와 이미지 변경

현재 적용한 정보는 `markab-j`, GitHub `https://github.com/markab-j`, 제공받은 SVG 아이콘과 배경·푸터 이미지다. 사이트명은 계정에서 유도한 임시 이름 `markab-j 블로그`, 부제는 `개인 블로그`다. 공개 이메일은 `contact@markab-j.com`, 개설일은 `2026-10-22`다. 자기소개와 프로필 사진은 미제공 상태다.

| 항목 | 수정 위치와 방법 |
| --- | --- |
| 제목·설명·키워드·주소·시간대·개설일 | `src/config/siteConfig.ts`. `siteStartDate`가 비어 있으면 운영 일수를 표시하지 않음 |
| 닉네임·소개·아바타·소셜 링크 | `src/config/profileConfig.ts`. `bio`는 현재 빈 값 |
| 소개 본문 | `src/content/spec/about.md` |
| 메뉴 | `src/config/navBarConfig.ts`. 기본 메뉴 이름은 기존 i18n 매핑으로 번역됨 |
| 로고·favicon | `siteConfig.navbar.logo`, `siteConfig.favicon`. 현재 `public/favicon/markab-j.svg`와 512px PNG 사용 |
| Footer 추가 문구·장식 | 문구는 `src/config/FooterConfig.html`, 하단 그림은 `src/assets/images/under.png`와 `src/components/layout/Footer.astro`. 원본 저작권 표시는 보존 |
| 배경·배너·영상 | `src/config/backgroundWallpaper.ts` |
| 본문·코드 폰트 | `src/config/fontConfig.ts`, 한국어 시스템 폰트 대체 목록은 `src/styles/main.css`, `FontSetup.astro` |

제공받은 원본 아이콘은 `/Users/jeong-yehwan/Pictures/icons/markab-j-Icon/favicon.svg`에서 복사했다. 사이트는 그 외부 경로에 의존하지 않는다. SVG를 바꾸면 PNG도 다시 생성한다. 현재 sharp를 이용해 원본 비율을 유지한 512×512 PNG를 만들었다. 프로필과 내비게이션 로고는 가벼운 SVG를 사용하며 로고 너비는 원본 비율을 유지한다. 기본 OG 이미지는 호환성을 고려해 PNG를 사용한다. 로고·아바타의 대체 텍스트는 한국어로 표시한다.

배경 원본은 제공받은 `desktop.png`를 `src/assets/images/desktop.png`에 복사해 사용한다. PC·모바일 모두 `backgroundWallpaper.src.desktop/mobile`에서 `assets/images/desktop.png`를 참조하며 PC는 Astro가 기기별 너비로 최적화하며 모바일 배경은 세로 화면에서 확대될 때 뭉개지지 않도록 원본 해상도와 공통 품질값(현재 85)을 사용한다. 기본은 `mode: "fullscreen"`, `fullscreen.layout: "hero"`다. 모바일 히어로의 사진 기준 위치는 `src/styles/layout-styles.css`의 `object-position: 34% center`로 얼굴에 맞춘다. `displaySettingsConfig.wallpaperModeSwitchable: true`로 배경 모드 설정을 표시한다. 히어로 제목은 `YesYes`, 기존 타이핑 컴포넌트의 순환 문구는 `I Like Develop`, `I Like Music`, `I Like Wrting`이며 글래스 버튼은 원래 순서인 GitHub → 이메일 → 후원 → RSS로 표시한다. 제목·타이핑·파도·전환 설정은 기존 `common`, `banner`, `fullscreen`, `overlay`에서 조절한다. 푸터는 `src/assets/images/under.png`를 아래쪽에 얼굴이 빼꼼 보이도록 배치하며 모바일에서도 이미지 너비에 비례해 표시 영역 높이를 확보한다. 배경과 푸터 사진만 기본 이미지 드래그를 막고 다른 사진·텍스트 선택은 유지한다. 투명도와 원본은 보존한다. 두 이미지의 iCloud 원본 경로는 빌드에 필요하지 않다. 직접 촬영한 프로필 사진을 받으면 `src/assets/images/profile.webp`에 두고 `profileConfig.avatar`를 변경한다. 배경 영상 재생 버튼은 `playerEnable: true`로 복원했으며 영상 주소는 아직 비어 있다. 영상은 권리가 확인된 파일을 `public/assets/videos/`에 두고 `src.playerUrl`에 연결한다.

외부 게임·애니메이션 이미지나 무작위 이미지 API를 사용자 사진 대신 쓰지 않는다. 새 이미지는 WebP/AVIF 등으로 크기를 줄이고, 본문에는 내용을 설명하는 대체 텍스트를 쓴다. 저작권이나 위치 정보 등 공개 범위를 확인한다.

### 공유 이미지

현재 `siteConfig.post.generateOgImages: false`다. 대표 이미지가 있는 글은 해당 이미지를, 나머지 페이지는 개인 아이콘 PNG를 OG 이미지로 사용한다. 자동 OG 생성기는 Noto Sans KR 패키지와 연결되어 있다. 패키지 재설치 요청이 승인되어 한국어 폰트를 설치했으며, 자동 생성 활성화는 별도 설정으로 유지한다. 활성화하려면 `src/pages/og/[...slug].ts`의 출력물을 한글 제목으로 확인한 뒤 `generateOgImages`를 켠다.

## 3. 새 게시글 작성

저장소 루트에서 실행한다. 파일명은 명확한 영문 slug를 권장하며 한국어 제목은 Frontmatter에 쓴다.

```sh
pnpm new-post my-post/index.md
```

기존 `scripts/new-post.js`를 사용한다. 생성 날짜는 서울 시간이며 새 글은 항상 초안·한국어로 시작한다. 다음 항목을 채운다.

```yaml
---
title: "명확한 한국어 제목"
published: 2026-10-22
description: "글의 내용을 정확히 요약하는 설명"
image: ""
tags: []
category: ""
draft: true
lang: ko
slug: my-post
---
```

실제 게시일은 발행 요청에 맞게 설정한다. 날짜만 있으면 수집 시 UTC 날짜로 해석되며, 시각이 중요한 경우 `2026-10-22T09:00:00+09:00`처럼 시간대를 명시한다. `updated`는 내용을 실제로 수정한 날짜에 추가한다. `published`를 미래로 지정해도 자동 예약되지 않으므로 공개 전까지 반드시 `draft: true`를 유지한다.

스키마의 추가 필드는 `pinned`, `author`, `sourceLink`, `licenseName`, `licenseUrl`, `comment`, `password`, `passwordHint`, `series`, `seriesOrder`다. `prevTitle`, `prevSlug`, `nextTitle`, `nextSlug`는 내부 계산값이므로 직접 관리하지 않는다. 제목·게시일은 필수이며 `draft`를 생략해도 안전하게 초안으로 처리한다. MDX는 기존 Firefly 컴포넌트를 재사용한다. JSON/YAML에서 제목과 경로에 `:` 등 특수문자가 있다면 따옴표를 쓴다.

### 프로젝트 등록

프로젝트도 `src/content/projects/<slug>/index.md`에 Markdown으로 관리한다. 기존 프로젝트 목록·상세 컴포넌트를 재사용한다. `siteConfig.pages.projects`는 현재 켜져 있다.

Idlerama 소개 초안은 `src/content/projects/idlerama/index.md`에 있다. `draft: true`라 `pnpm dev`에서만 확인할 수 있으며 운영 빌드에는 목록 항목과 상세 페이지가 생성되지 않는다. 개발 미리보기 경로는 `/projects/idlerama/`다. 공개 요청을 받은 뒤 설명·개발 상태·홈페이지 연결를 확인하고 실제 공개일과 `draft: false`를 설정한다. 스크린샷은 제공받은 자료를 같은 폴더에 저장하고 `image`에 상대 경로로 지정한다.

Idlerama의 외부 연결은 홈페이지 `https://idlerama.markab-j.com`을 사용한다. Steam은 아직 주소가 없으므로 `label: "Steam (출시 예정)"`, `icon: "fa7-brands:steam"`, `value: ""`로 둔다. 기존 프로젝트 카드와 상세 페이지는 `value`가 빈 항목을 클릭할 수 없는 비활성 버튼으로 표시한다. 실제 Steam 스토어 주소를 제공받으면 해당 `value`만 변경한다. 임의의 앱 ID나 임시 링크를 넣지 않는다.

## 4. 초안과 발행

- `pnpm dev`는 초안도 표시한다. 개발 서버를 공개하지 않는다.
- `pnpm build`와 `pnpm preview`는 `draft: true` 글을 공개 목록·글 경로·피드·검색에서 제외한다.
- 사용자가 명시적으로 발행을 요청했을 때만 `draft: false`로 변경한다. 내용의 의미와 사용자 문체는 임의로 바꾸지 않는다.
- 발행 전 제목·설명·날짜·코드 실행·인용 출처·링크·이미지와 빌드 결과를 확인한다. 새 글을 임의로 작성해 게시하지 않는다.
- 발행과 배포는 별도다. 로컬에서 발행 상태를 바꿔도 승인된 배포 전까지 실서비스는 바뀌지 않는다.
- 비밀번호 보호는 Frontmatter에서 지원하지만 저장소 자체의 원문은 보호하지 않는다. 비공개 자료나 비밀키를 콘텐츠에 넣지 않는다.

## 5. 카테고리·태그·시리즈·링크

`category`는 한 개의 문자열, `tags`는 문자열 배열이다. 한국어 명칭과 대소문자를 일관되게 사용한다. 이 값으로 목록·검색·사이드바가 자동 구성되므로 별도 페이지를 만들지 않는다. 연재는 `series`와 `seriesOrder`로 관리한다.

글 이미지 파일은 글 폴더 가까이 두고 `image: "./cover.webp"`, 본문 `![이미지 설명](./screenshot.webp)`처럼 상대 경로로 연결한다. 내부 글은 실제 `/posts/<slug>/` 경로를 확인한다. slug 변경은 기존 링크를 깨뜨릴 수 있으므로 사전 확인 없이 바꾸지 않는다. 외부 링크는 발행·정기 점검 때 실제 응답과 내용을 확인하고 오래된 링크를 대체할 때 사용자 의도를 보존한다. `pnpm verify:blog`는 외부 사이트나 본문 의미를 검사하지 않는다.

## 6. 댓글과 선택 기능

`siteConfig.pages`로 이웃·방명록·일상·프로젝트·갤러리·북마크·후원·애니메이션 목록을 제어한다. 후원·프로젝트·사진 앨범·즐겨찾기·한마디(Dynamic)·방명록 페이지는 활성화되어 있다. 이웃과 애니메이션 목록 등 나머지 선택 기능은 꺼져 있다. 끈 메뉴는 자동으로 숨겨지고 직접 방문하면 GitHub Pages의 `/404.html`로 이동한다. 자동 생성된 이동 안내 문구는 Astro 기본 출력이며 정상 페이지의 한국어 번역과 별개다.

댓글은 `commentConfig.type: "giscus"`로 연결되어 있다. 사용자가 제공한 `markab-j/blog` 저장소와 `Announcements` 카테고리를 사용한다. 페이지 경로(`pathname`)와 엄격한 일치로 연결하며, 반응 표시·상단 입력창·한국어·지연 로딩을 사용하고 메타데이터 전송은 끈다. 방명록과 댓글을 허용한 게시글·한마디에 적용되며 후원 페이지의 댓글은 꺼져 있다.

- 테마 CSS는 `public/giscus/firefly.css` 한 파일에서 관리하며 Astro가 빌드 시 `dist/giscus/firefly.css`로 복사한다. Giscus 기본 테마의 색상·문법 강조와 MIT 라이선스도 파일 안에 포함하므로 외부 테마 CSS를 추가로 불러오지 않는다.
- 최초 `data-theme`부터 현재 호스트의 `/giscus/firefly.css` 절대 URL을 사용한다. Base64 CSS, 준비 메시지, `setConfig`를 통한 로딩 후 테마 교체는 사용하지 않는다.
- `Giscus.astro`가 iframe 요소의 `color-scheme`을 Firefly의 `html.dark` 클래스에 맞춘다. iframe 안의 CSS는 `prefers-color-scheme`으로 이를 따라가므로 OS 모드와 다른 수동 설정 및 페이지 로딩 중 모드 변경도 반영된다.
- 색상은 `src/styles/variables.styl`의 Firefly 색상식을 따른다. 정적 CSS는 부모 페이지의 CSS 변수를 읽을 수 없으므로 `--firefly-hue`는 현재 설정값 165로 유지한다. `siteConfig.themeColor.hue`를 바꾸면 이 값도 함께 수정한다. 표시 설정의 실시간 강조색 변경은 댓글 iframe에 전달되지 않는다.
- 작성칸 → 댓글 수·목록 → 반응 영역 순서와 둥근 입력창, 기존 Firefly 댓글 카드 및 전체 폭을 유지한다. iframe 내부 UI는 Giscus가 제공한다.
- Giscus의 교차 출처 CSS 요청에는 CORS가 필요하다. 개발 서버는 `https://giscus.app` 출처를 허용한다. 공개 호스팅에서도 CSS URL의 200 응답·`text/css`·CORS 헤더를 확인한다. Chromium은 Giscus에서 `127.0.0.1`로 CSS를 요청할 때 `Permission was denied for this request to access the loopback address space` 오류로 차단할 수 있다. 이는 CSS 문법이나 일반 CORS 헤더 문제가 아니라 로컬 네트워크 접근 권한 제한이며 Base64 방식에는 없던 별도 HTTP 요청 때문에 발생한다. 공개 HTTPS 주소에는 loopback 차단 사유가 적용되지 않지만 배포된 CSS 응답과 CORS는 별도로 검증한다. 로컬 검증을 위해 보안 설정을 해제하거나 운영 주소로 임의 우회하지 않는다.

API 비밀키는 환경 변수로만 관리한다.

공지 위젯, 내비게이션·사이드바 음악, 최근 한마디 위젯이 켜져 있으며 재생 목록은 비어 있다. 모바일 하단에서도 공지와 최근 한마디를 표시한다. 후원은 Ko-fi만 활성화되어 있으며, 후원자·이웃·갤러리·북마크 목록은 비어 있다. 실제 자료를 등록한 뒤 관련 스위치를 켠다. 캐릭터 모델은 비활성화했고 예시 미디어는 보관 폴더로 이동했다. 통계 서비스는 ID가 없어 동작하지 않는다. 표시 설정·다크 모드·테마 색상·목록 전환 등 기존 기능은 유지한다.

### 사진 앨범·즐겨찾기·한마디·방명록·음악

- **사진 앨범** `/gallery/`: `src/config/galleryConfig.ts`의 `albums`에 앨범을 등록하고 `public/gallery/<앨범 ID>/`에 제공받은 사진을 넣는다. 현재는 빈 목록이며 데모 이미지를 되살리지 않는다.
- **즐겨찾기** `/booknav/`: `src/config/booknavConfig.ts`의 그룹과 `items`에 실제 제목·URL을 등록한다. 아직 사용자 지정 링크는 없다.
- **한마디** `/dynamic/`: 기존 Dynamic을 한국어에서 ‘한마디’로 표시한다. 짧은 기록은 `src/content/dynamic/`의 Markdown으로 관리하고 외부 Memos 연결은 끈 상태다. `pnpm new-dynamic "내용"`은 `draft: true`, `lang: ko`인 초안을 만든다. 개발 서버에서만 표시하고 운영 빌드의 API·한마디 페이지·최근 위젯에서는 제외한다. `published`는 시간대가 명확한 ISO 시각이며 화면에서는 서울 시간으로 표시한다. 공개 요청을 받은 뒤 검토하고 `draft: false`로 변경한다.
- **방명록** `/guestbook/`: Giscus가 연결되어 있으며 댓글은 `markab-j/blog`의 `Announcements` Discussions에 저장된다. `src/content/spec/guestbook.md`가 소개 본문이다. Giscus를 쓸 경우 서비스에서 받은 `repo`, `repoId`, `category`, `categoryId`를 `commentConfig.giscus`에 넣고 `type: "giscus"`를 선택한다. 다른 서비스를 쓰면 해당 설정을 사용한다. 값이나 계정을 추측하거나 외부 저장소 설정을 임의로 바꾸지 않는다.
- **음악 버튼**: `src/config/musicConfig.ts`의 `showInNavbar: true`, `showInSidebar: true`와 사이드바의 `type: "music", enable: true`로 기존 버튼과 위젯을 표시한다. `mode: "local"`, `local.playlist: []`이므로 아직 재생할 곡은 없다. 사용 권한이 있는 음원 파일이나 직접 재생 가능한 URL, 곡명, 아티스트를 받으면 기존 `playlist`에 `name`, `artist`, `url`, 선택적인 `cover`, `lrc`를 등록한다. 파일은 `public/assets/music/`에 두며 자동 재생이나 샘플 음악은 추가하지 않는다. 단순 서비스 공유 링크는 직접 재생 URL과 다를 수 있다.

### CLI로 콘텐츠 추가

저장소 루트에서 실행한다. 경로·내용에 공백이 있으면 따옴표로 감싼다. 세 명령 모두 `--help`, `--dry-run`을 지원한다. 미리보기는 파일을 변경하지 않는다.

```sh
# 사진 원본을 public/gallery/trip-2026/에 복사하고 앨범 설정을 추가
pnpm new-gallery --id trip-2026 --title "여행 사진" --date 2026-10-22 "/사진/첫 사진.jpg" "/사진/두 번째.png"

# 새 즐겨찾기 그룹 생성과 링크 등록
pnpm new-bookmark --group dev --group-name "개발" --title "Astro" --url https://astro.build --description "Astro 공식 사이트"
# 기존 그룹에 링크 추가: --group-name 생략
pnpm new-bookmark --group dev --title "TypeScript" --url https://www.typescriptlang.org

# 한국어 한마디 초안 생성 (선택: --location "장소", --pinned)
pnpm new-dynamic "오늘의 짧은 기록"
```

앨범 ID·그룹 ID는 영문 소문자·숫자·단어 사이 하이픈을 사용한다. 앨범은 JPG/JPEG·PNG·WebP·AVIF·GIF 파일 경로를 한 개 이상 받으며 선택적으로 `--description`, `--location`을 지정한다. 날짜 생략 시 서울 기준 오늘 날짜다. 원본을 이동·압축하지 않고 `001`, `002` 순번으로 복사하며 첫 사진이 표지가 된다. 기존 앨범 ID·폴더나 같은 그룹의 중복 URL은 덮어쓰지 않는다. 사진의 공개 범위와 용량은 등록 전에 확인한다.

앨범·즐겨찾기는 명령을 실행하면 기존 설정 배열에 직접 추가되고 다음 빌드에 포함된다. 별도 초안 기능은 없다. 한마디는 기본 초안이며 개발 서버에서 확인한 뒤 명시적 발행 의도에 따라 `draft: false`로 바꾼다. 이 명령은 Git 커밋·푸시·배포를 하지 않는다.

### 배경 영상 연결

현재 배경 플레이어는 HTML `<video>`이므로 YouTube의 `watch?v=...`, `youtu.be/...`, `/embed/...` 페이지 주소를 `playerUrl`에 넣을 수 없다. YouTube는 [공식 IFrame Player API](https://developers.google.com/youtube/iframe_api_reference) 기반 별도 플레이어 구현이 필요하다. 현재 그 연결은 구현하지 않았다.

현재 구조에서 쓰는 방법은 다음과 같다.

1. 직접 재생할 수 있는 MP4(일반적으로 H.264/AAC) 파일을 `public/assets/videos/intro.mp4`에 넣는다. 외부 HTTPS 동영상 파일 주소도 가능하나 페이지 주소가 아닌 실제 영상 응답이어야 한다.
2. `src/config/backgroundWallpaper.ts`에서 `playerEnable: true`, `src.playerUrl: "/assets/videos/intro.mp4"`로 설정한다.
3. 개발 서버에서 우측 상단 재생 버튼을 눌러 재생·일시정지·모바일 동작을 확인한다. 현재는 URL이 비어 있어 버튼만 복원된 상태다.
4. 여러 영상은 `playerUrl: ["/assets/videos/intro.mp4", "/assets/videos/another.mp4"]`, `common.playerMode: "order"` 또는 `"random"`으로 지정한다. 브라우저 정책에 따라 소리 재생이 제한될 수 있다.

### 방문 분석 등록

개설일과 방문 분석은 별개다. `siteConfig.siteStartDate: "2026-10-22"`는 운영 일수 계산이며 방문자를 수집하지 않는다. 분석 서비스는 계정 등록 후 발급받은 ID가 필요하다. 현재 ID가 없어 수집하지 않는다. 아래 중 한 서비스를 골라 연결한다.

- **Google Analytics 4**: [공식 설정 안내](https://support.google.com/analytics/answer/9304153?hl=ko)에 따라 계정·속성을 만들고 보고 시간대를 대한민국으로 설정한다. 데이터 스트림 → 웹에서 `https://blog.markab-j.com`을 등록하고 측정 ID(`G-...`)를 복사한다. `src/config/analyticsConfig.ts`의 `googleAnalyticsId`에 넣는다. 기존 컴포넌트가 태그를 삽입하므로 HTML에 태그를 중복 추가하지 않는다. 빌드·배포 후 운영 사이트를 열고 실시간 보고서로 수신을 확인한다.
- **Umami**: Umami Cloud 계정에서 Websites → Add website, 이름과 도메인 `blog.markab-j.com`을 등록한다. [웹사이트 추가](https://docs.umami.is/docs/add-a-website), [추적 코드 확인](https://docs.umami.is/docs/collect-data) 안내에 따라 추적 코드의 `data-website-id`를 `umamiAnalytics.websiteId`에 넣는다. 코드의 `src`도 현재 `scriptUrl`과 같은지 확인하고 다르면 발급된 주소로 바꾼다. 세션 녹화는 기본 비활성 상태다. 빌드·배포 후 Umami 대시보드에서 방문을 확인한다.

### 글 라이선스

사용자가 선택한 기본 글 라이선스는 [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ko)이다. 저작자 표시와 라이선스 링크를 유지한 비영리 공유를 허용하고 수정본 배포는 허용하지 않는다. `src/config/licenseConfig.ts`의 이름·링크가 글에 표시된다. 개별 글의 `licenseName`, `licenseUrl`이 있으면 그 값을 우선한다. 권리자가 허락한 CC 이용은 조건을 준수하는 동안 철회할 수 없으며, 별도 허락이나 법률상 예외까지 금지하는 의미는 아니다. Firefly 코드의 MIT와 제삼자 자산의 원래 라이선스는 유지한다.

### 후원 링크 관리

`src/config/sponsorConfig.ts`의 `methods`만 수정한다. 기존 후원 카드·페이지와 게시글 하단 컴포넌트를 그대로 사용하며 중국 결제 수단·기존 제작자의 후원 링크·샘플 후원자는 운영 설정에 포함하지 않는다.

| 수단 | `link` | `enabled` |
| --- | --- | --- |
| Ko-fi | `https://ko-fi.com/markabj` | `true` |
| Buy Me a Coffee | 미제공, 빈 문자열 | `false` |

링크를 변경할 때는 사용자가 제공한 실제 HTTPS 주소를 해당 항목의 `link`에 넣고 `enabled: true`로 설정한다. 계정명이나 후원 주소를 추측하지 않는다. 링크를 지우면 반드시 `enabled: false`로 함께 변경한다. 두 서비스의 이름과 기존 Iconify 아이콘은 그대로 사용한다.

후원 페이지 공개 여부는 `siteConfig.pages.sponsor`, 게시글 하단 버튼은 `sponsorConfig.showButtonInPost`로 제어하며 현재 둘 다 켜져 있다. 모든 수단을 끌 때는 이 두 값도 `false`로 변경해 빈 후원 페이지와 버튼이 노출되지 않도록 한다. 미제공 링크에 임시 결제 주소나 QR 이미지를 넣지 않는다.

페이지 제목·설명·안내는 `sponsorConfig.title/description/usage`, 공통 후원·공유 버튼과 안내 문구는 `src/i18n/languages/ko.ts`의 `sponsor*` 키에서 수정한다. 후원자 목록은 `sponsors: []`, `showSponsorsList: false`를 유지하며 실명·금액 등을 공개하려면 당사자의 공개 허락을 먼저 확인한다. 후원자 날짜는 기존 한국어·서울 시간 포맷 함수를 사용한다.

변경 후 `pnpm check`, `pnpm type-check`, `pnpm build`, `pnpm verify:blog`를 실행하고 `/sponsor/`에 활성화한 수단만 표시되는지와 게시글 하단의 후원 링크(`/sponsor/`)를 확인한다. 링크를 클릭해 결제를 진행할 필요는 없다.

## 7. 로컬 환경과 개발

`package.json` 기준 **Node >=22.23.0**, **pnpm 11.22.0**을 사용한다. CI는 Node 22의 최신 패치를 설치하고 pnpm/action-setup은 `packageManager`에서 버전을 읽는다. 원본 요구 버전을 우선하며 독단적으로 최신 메이저로 올리지 않는다.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

작업 시작 시 실행 중인 블로그 서버를 확인하고, 이 저장소의 서버만 `pnpm exec astro dev stop` 또는 관리 중인 실행 세션의 Ctrl+C로 정상 종료한 뒤 작업 완료 후 다시 실행한다. `kill`은 정상 종료가 실패했을 때만 사용한다. 다른 프로젝트의 서버는 유지한다. 개발 서버는 `pnpm dev --host 127.0.0.1 --port 4321`로 실행하며 기본 확인 주소는 `http://127.0.0.1:4321`이다. Idlerama 초안은 `http://127.0.0.1:4321/projects/idlerama/`에서 확인한다. 최종 검색은 개발용 가상 결과 대신 전체 빌드 후 확인한다.

```sh
pnpm build
pnpm preview
```

빌드 환경은 `TZ=Asia/Seoul`, `PUBLIC_SITE_LANG=ko`를 사용한다. 설정 기본값도 동일하다. `PUBLIC_SITE_LANG`, `PUBLIC_DISPLAY_SETTINGS`, 페이지 스위치 관련 환경 변수는 설정 파일보다 우선할 수 있으므로 언어·기능이 예상과 다르면 배포 환경을 확인한다. `.env`나 키를 커밋하지 않는다.

## 8. 빌드와 검증

```sh
pnpm check
pnpm type-check
pnpm build
pnpm verify:blog
```

`pnpm build`는 GitHub 카드 데이터·LQIP·선택적 VNDB 이미지 처리, Astro 정적 빌드, 비사용 모델 산출물 정리, 폰트 부분 집합화, 인라인 스크립트 최소화, Pagefind 인덱스를 포함한다. `pnpm astro build`만 실행하면 후처리와 검색 인덱스가 빠지므로 배포용으로 사용하지 않는다.

`verify:blog`는 결과물의 한국어 lang/OG locale, 도메인·CNAME·RSS 언어·robots/sitemap, 로컬 리소스·페이지 링크, 사용자 노출 중국어 누락, 데모 작성자·미디어·초안 유출을 검사한다. 외부 URL과 JavaScript 실행·접근성 전체·모바일 렌더링은 검증하지 않는다. 공개 글이 한국어 이외의 한자 원문을 포함한다면 중국어 탐지 결과는 실제 번역 누락인지 검토 후 검사 규칙을 조정한다.

브라우저 확인 항목: 홈의 빈 글 안내, 소개, 메뉴, 검색과 결과 없음, 카테고리·태그·아카이브, 404, 화면 설정, 375px/768px/데스크톱 폭의 잘림, 라이트/다크 전환과 유지, 키보드 조작, 이미지 로드와 대체 텍스트. UI 변경 PR에는 가능하면 스크린샷을 첨부한다. Pagefind는 한국어 검색을 지원하지만 어간 확장 검색은 지원하지 않는다.

`pnpm lint`는 Biome의 수정 옵션을 포함하므로 전체 실행보다 변경 파일 대상으로 검사한다. `src/constants/github-card-data.json`, `src/constants/lqips.json` 등 생성 파일의 diff도 커밋 전에 검토한다.

## 9. GitHub Pages 배포

`public/CNAME`과 `siteConfig.site_url`은 `blog.markab-j.com`을 가리킨다. 루트 경로 배포이므로 Astro `base: "/"`를 유지한다. RSS `/rss.xml`, Atom `/atom.xml`, 사이트맵 `/sitemap-index.xml`, 검색 `/pagefind/`도 같은 도메인을 사용한다. RSS `lastBuildDate`는 표준 HTTP/RSS UTC 형식이며 페이지 표시 날짜는 서울 시간이다.

기존 워크플로를 재사용해 PR·master 푸시에 검사와 전체 빌드를 실행한다. 배포는 의도치 않은 최초 전환을 막기 위해 **수동 실행 전용**이다. `confirm_deployment`가 체크되지 않으면 배포하지 않는다.

실제 전환 전 소유자가 확인할 외부 설정:

1. GitHub `markab-j/blog`의 Settings → Pages 게시 소스가 **GitHub Actions**인지 확인한다.
2. 기존 서비스와 DNS를 먼저 점검하고 변경 승인을 받는다. Custom domain이 `blog.markab-j.com`인지, 해당 DNS가 개인 GitHub Pages를 가리키는지, HTTPS가 정상인지 확인한다. 기존 값을 무작정 덮어쓰지 않는다.
3. 필요한 경우 `github-pages` environment의 master 배포 허용·검토 규칙을 소유자가 구성한다.
4. 승인된 변경을 푸시한 뒤 Build and Check가 통과하는지 확인한다. 로컬 커밋만으로는 Actions가 실행되지 않는다.
5. Actions → Deploy to GitHub Pages → Run workflow에서 **master**를 선택하고 운영 배포 승인 입력을 체크한다.
6. 배포 성공 후 실제 도메인에서 홈·글·404·한국어 검색·RSS·사이트맵·이미지·HTTPS를 확인한다.

현재 외부 Pages/DNS 설정이나 최초 운영 배포는 실행하지 않았다. 워크플로의 실제 GitHub 실행도 로컬 검증과 별개다. 자동 푸시 배포로 바꾸려면 최초 전환 확인 후 별도로 요청한다.

공식 참고: [GitHub Pages 사용자 워크플로](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## 10. 원본 Firefly 업데이트

`origin`은 `git@markab.github.com:markab-j/blog.git`, 로컬 `upstream`은 `https://github.com/CuteLeaf/Firefly.git`이다. Git 원격 설정은 clone마다 다르며 커밋으로 전달되지 않는다. GitHub의 플랫폼상 Fork 관계는 로컬 remote만으로 확정할 수 없다. 공통 이력과 upstream을 이용해 업데이트하고, Fork 메타데이터 변경은 하지 않는다.

새 clone에서 `git remote -v`로 확인하고 upstream이 없다면 소유자가 원격 추가를 명시적으로 승인한 뒤 설정한다. 업데이트 요청이 있을 때 작업 트리가 깨끗한지 확인하고 별도 브랜치에서 진행한다.

```sh
git fetch upstream
git switch -c chore/firefly-update
git merge upstream/master
```

프로필·도메인·콘텐츠·한국어·운영 규칙을 우선 보존한다. 특히 상위 변경으로 `src/content/posts`, `public`에 데모가 다시 추가되지 않는지 확인한다. 충돌에 `ours`/`theirs`를 일괄 적용하지 않고 파일별 의도를 검토한다. 필요할 때만 개인 설정을 작은 모듈로 분리한다. 위 네 가지 검증과 브라우저 확인 후 리뷰하며, master 병합·푸시·배포는 승인 범위를 따른다. force-push, 이력 재작성, 저장소 관리자 작업은 하지 않는다.

원본: [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly).

## 11. 한국어 번역

키는 `src/i18n/i18nKey.ts`, 한국어는 `src/i18n/languages/ko.ts`, 선택과 fallback은 `src/i18n/translation.ts`다. 새 UI는 `i18n(I18nKey.xxx)`를 쓴다. 새 키는 다른 언어 사전에도 넣어 타입을 유지한다. 다른 언어 신규 항목은 우선 영어 fallback을 제공하고 정확한 번역을 나중에 보완한다. 기존 타 언어 지원은 지우지 않는다.

날짜는 `src/utils/date-utils.ts`의 지역·시간대 함수를 우선 쓴다. `html lang="ko"`, `og:locale="ko_KR"`, RSS 언어 `ko-KR`를 확인한다. 중국어 주석·코드 식별자·경로·외부 라이선스 원문은 번역 대상이 아니다. 비활성화한 외부 서비스의 UI는 서비스 활성화 시 추가 점검한다.

## 12. 복구와 문제 해결

- **작업 전** `git status --short`, `git branch --show-current`, `git remote -v`를 확인한다. 사용자의 미커밋 변경을 덮어쓰지 않는다.
- **수정 오류**는 해당 커밋의 `git show <commit> -- <path>`로 변경을 확인하고 필요한 파일만 복구한다. 커밋된 오류는 범위를 확인한 `git revert <commit>`로 되돌린다. reset --hard, force-push, 대량 삭제는 하지 않는다.
- **운영 장애**는 소유자 승인 후 정상 커밋을 복구하는 새 커밋을 만들고 다시 검증·배포한다. 기존 배포나 DNS를 무작정 변경하지 않는다.
- **데모 참고**는 `archive/firefly-demo`에서 원본 경로를 찾는다. 전체 폴더를 src/public으로 복사하지 않는다. 필요한 문법만 복사하고 실제 콘텐츠와 사용자 소유 이미지로 교체한다.
- **글 미노출**은 `draft`, slug, 스키마·날짜 형식, 페이지 스위치를 확인한다. **이미지 오류**는 `/` 유무와 `public`/`src` 기준 경로·대소문자를 확인한다.
- **검색 오류**는 전체 `pnpm build` 후 `dist/pagefind/pagefind.js`와 한국어 인덱스를 확인한다. 개발용 검색 결과는 실제 검색 검증이 아니다.
- **환경 오류**는 Node·pnpm 버전과 lockfile을 먼저 확인한다. lockfile을 임의로 재생성하지 않는다. 패키지 설치나 IPC가 샌드박스로 차단되면 승인된 실행 경로를 이용하고 우회하지 않는다.
- **미제공 자료**는 원하는 정식 사이트명·부제·자기소개·사진·배너·추가 소셜 링크·추가 영상과 음원이다. 받은 뒤 해당 설정만 변경하고 필요한 검사와 로컬 커밋을 수행한다.
