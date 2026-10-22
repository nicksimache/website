import type { Config } from "tailwindcss";

import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        techcard: "#1c1c1c",
      },
    },
  },
  plugins: [plugin(({ addBase, theme }) => {
    const variables: Record<string, string> = {};
    function addColors(colors: Record<string, unknown>, prefix = "") {
      for (const [key, value] of Object.entries(colors)) {
        const name = key === "DEFAULT" ? prefix : [prefix, key].filter(Boolean).join("-");
        if (typeof value === "string") {
          variables[`--${name}`] = value;
        } else if (value && typeof value === "object") {
          addColors(value as Record<string, unknown>, name);
        }
      }
    }
    addColors(theme("colors"));
    addBase({ ":root": variables });
  })],
} satisfies Config;
