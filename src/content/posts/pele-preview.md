---
title: Pele 다이어그램 미리보기
published: 2026-10-23
description: Mermaid 코드 블록을 Pele로 렌더링한 흐름도와 시퀀스 다이어그램을 확인합니다.
tags: [Mermaid, Pele]
category: 개발
draft: true
lang: ko
comment: false
---

Mermaid 코드 블록을 Pele로 렌더링한 미리보기입니다. 라이트·다크 모드와 확대·축소, 초기화, 전체 화면을 확인할 수 있습니다.

## 흐름도

```mermaid
flowchart LR
    A[글 작성] --> B{문법 확인}
    B -->|정상| C[정적 SVG 생성]
    B -->|오류| D[원본 코드 확인]
    D --> A
    C --> E[블로그에 표시]
```

## 시퀀스 다이어그램

```mermaid
sequenceDiagram
    participant W as 작성자
    participant A as Astro
    participant P as Pele
    W->>A: Mermaid 코드 블록 작성
    A->>P: 다이어그램 렌더링 요청
    P-->>A: SVG 반환
    A-->>W: 미리보기 표시
```
