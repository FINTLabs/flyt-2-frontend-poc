import { reactRouter } from "@react-router/dev/vite";
import tailwindcssVite from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
    console.log("=== BASE_PATH", process.env.BASE_PATH);

    return {
        plugins: [tailwindcssVite(), reactRouter(), tsconfigPaths()],
        base: '',
    }
});


