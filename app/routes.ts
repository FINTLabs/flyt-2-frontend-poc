import { type RouteConfig, index, prefix, route, layout } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('dictionary', 'routes/dictionary.tsx'),
    ...prefix('flow', [
        layout('routes/flow/layout.tsx', [
            index('routes/flow/index.tsx'),
            route('new', 'routes/flow/new.tsx'),
            route(':mode/:flowId', 'routes/flow/flowPage.tsx'),
            route('run/:flowId', 'routes/flow/run.tsx'),
            route('log/:flowId', 'routes/flow/runlog.tsx'),
        ]),
    ]),
] satisfies RouteConfig;
