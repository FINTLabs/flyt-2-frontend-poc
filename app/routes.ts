import { type RouteConfig, index, prefix, route, layout } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    ...prefix('flow', [
        index('routes/flow/index.tsx'),
        layout('routes/flow/layout.tsx', [
            route('test', 'routes/flow/flowtest.tsx'),
        ])
    ])
] satisfies RouteConfig;
