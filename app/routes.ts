import { type RouteConfig, index, prefix, route, layout } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('dictionary', 'routes/dictionary.tsx'),
    ...prefix('flow', [
        layout('routes/flow/layout.tsx', [
            index('routes/flow/index.tsx'),
            route(':mode/:flowId', 'routes/flow/flowPage.tsx'),
        ]),
    ]),
] satisfies RouteConfig;
