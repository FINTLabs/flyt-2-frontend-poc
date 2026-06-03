import type { Config } from "@react-router/dev/config";
const BASE_PATH = process.env.BASE_PATH

export default {
    basename: BASE_PATH,
    ssr: false,
    future: {
        v8_middleware: false,
        v8_splitRouteModules: false,
        v8_viteEnvironmentApi: false,
        v8_passThroughRequests: false,
        v8_trailingSlashAwareDataRequests: false,
    },
} satisfies Config;
