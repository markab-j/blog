import type { SponsorConfig } from "../types/sponsorConfig";

export const sponsorConfig: SponsorConfig = {
	title: "블로그 후원",
	description: "글이 도움이 되셨다면 후원으로 응원해 주세요.",
	usage: "보내주신 응원에 감사드립니다.",
	showSponsorsList: false,
	showComment: false,
	showButtonInPost: true,
	methods: [
		{
			name: "Ko-fi",
			icon: "simple-icons:kofi",
			link: "https://ko-fi.com/markabj",
			description: "Ko-fi에서 후원하기",
			enabled: true,
		},
		{
			name: "Buy Me a Coffee",
			icon: "simple-icons:buymeacoffee",
			// 실제 후원 링크를 입력한 뒤 enabled를 true로 변경하세요.
			link: "",
			description: "Buy Me a Coffee에서 후원하기",
			enabled: false,
		},
	],
	sponsors: [],
};
