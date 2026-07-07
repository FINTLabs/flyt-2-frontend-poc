import { reactRouter } from "@react-router/dev/vite";
import tailwindcssVite from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(({mode}) => {
    const basePath = process.env.BASE_PATH ? `${process.env.BASE_PATH ?? ''}/` : ''

    return {
        plugins: [tailwindcssVite(), reactRouter()],
        resolve: {
            tsconfigPaths: true,
        },
        base: basePath,
        server: {
            port: mode === 'production' ? 8000 : 3000,
            proxy: {
                '/api/intern/konfigurasjoner': {
                    target: 'http://localhost:8082/beta/fintlabs-no',
                    changeOrigin: true,
                },
                '/api/intern/authorization': {
                    target: 'http://localhost:8086/beta/fintlabs-no',
                    changeOrigin: true,
                },
                '/api/intern/integrasjoner': {
                    target: 'http://localhost:8090/beta/fintlabs-no',
                    changeOrigin: true,
                },
                '/api/intern/metadata': {
                    target: 'http://localhost:8084/beta/fintlabs-no',
                    changeOrigin: true,
                },
            }
        }
    }
});


