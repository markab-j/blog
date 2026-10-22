import type { APIRoute } from "astro";
import { siteConfig } from "@/config";
import giscusStyles from "@/styles/giscus.css?raw";

export function getStaticPaths(): { params: { theme: string } }[] {
	return ["light", "dark"].map((theme) => ({ params: { theme } }));
}

export const GET: APIRoute = ({ params }) => {
	const dark = params.theme === "dark";
	const hue = siteConfig.themeColor.hue;
	const css = `@import url("https://giscus.app/themes/noborder_${params.theme}.css");
:root {
  --firefly-scheme: ${params.theme};
  --firefly-accent: oklch(${dark ? "0.75 0.14" : "0.70 0.14"} ${hue});
  --firefly-text-accent: oklch(${dark ? "0.75 0.1" : "0.55 0.12"} ${hue});
  --firefly-surface: ${dark ? `oklch(0.23 0.015 ${hue})` : "white"};
  --firefly-inset: oklch(${dark ? "0.33 0.035" : "0.95 0.025"} ${hue});
  --firefly-border: ${dark ? "rgb(255 255 255 / 0.08)" : "rgb(0 0 0 / 0.08)"};
  --firefly-button-text: ${dark ? "#171717" : "white"};
}
${giscusStyles}`;
	return new Response(css, {
		headers: {
			"Content-Type": "text/css; charset=utf-8",
			"Access-Control-Allow-Origin": "*",
		},
	});
};
