import type { Config } from "@react-router/dev/config";

export default {
    basename: process.env.BASE_PATH
        ? `${process.env.BASE_PATH.replace(/\/$/, "")}/`
        : "/",
    ssr: true,
    future: {
        v8_middleware: true,
        v8_splitRouteModules: true,
        v8_viteEnvironmentApi: false,
        v8_passThroughRequests: true,
        v8_trailingSlashAwareDataRequests: true,
    },

} satisfies Config;
