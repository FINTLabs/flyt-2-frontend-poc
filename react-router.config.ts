import type { Config } from "@react-router/dev/config";
const BASE_PATH = process.env.BASE_PATH

export default {
  basename: BASE_PATH,
  ssr: false,
} satisfies Config;
