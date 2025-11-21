import { reactRouter } from "@react-router/dev/vite";
import tailwindcssVite from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {

    const basePath = process.env.BASE_PATH ? `${process.env.BASE_PATH ?? ''}/` : ''
    console.log("=== basePath", basePath);

    return {
        plugins: [tailwindcssVite(), reactRouter(), tsconfigPaths()],
        base: basePath
    }
});


