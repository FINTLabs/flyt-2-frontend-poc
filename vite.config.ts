import { reactRouter } from "@react-router/dev/vite";
import tailwindcssVite from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
    return {
        plugins: [tailwindcssVite(), reactRouter(), tsconfigPaths()],
        base: './',
        experimental: {
            renderBuiltUrl(filename: string, { type }: { type: "public" | "asset" }) {
                if (type === "asset") {
                    return `{{ .Base }}/${filename}`;
                }
                return filename;
            },
        }
    }
});


