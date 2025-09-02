import { type RouteConfig, index, prefix, route, layout } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('dictionary', 'routes/dictionary.tsx'),
    ...prefix('flow', [
        index('routes/flow/index.tsx'),
        layout('routes/flow/layout.tsx', [
            route(':flowId', 'routes/flow/flowPage.tsx'),
        ])
    ])
] satisfies RouteConfig;
