import type { RunlogType } from '~/types/generalTypes';

export const runlogsForDemo: RunlogType[] = [
    { id: 'run_7f8a2b1c-4d5e-6f7g-8h9i-0j1k2l3m4n5o', flowId: 'demo', status: 'completed', timestamp: '2025-09-15T14:23:45.123Z' },
    { id: 'run_a1b2c3d4-e5f6-7890-abcd-ef1234567890', flowId: 'demo', status: 'failed', timestamp: '2025-09-16T08:47:12.456Z' },
    { id: 'run_9z8y7x6w-5v4u-3t2s-1r0q-p9o8n7m6l5k', flowId: 'demo', status: 'running', timestamp: '2025-09-17T11:15:33.789Z' },
    { id: 'run_f1e2d3c4-b5a6-9788-1234-567890abcdef', flowId: 'demo', status: 'completed', timestamp: '2025-09-17T16:08:21.234Z' },
    { id: 'run_12345678-9abc-def0-1234-56789abcdef0', flowId: 'demo', status: 'failed', timestamp: '2025-09-17T22:42:58.567Z' },
];
