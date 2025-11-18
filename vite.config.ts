import { reactRouter } from "@react-router/dev/vite";
import tailwindcssVite from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')

    console.log("=== defineConfig env ====", env.BASE_PATH);

    return {
        plugins: [tailwindcssVite(), reactRouter(), tsconfigPaths()],
        base: `${env.BASE_PATH}/`,
    }
});


