export type RunlogType = {
    id: string;
    flowId: string;
    status: RunStatusType;
    timestamp: string; // ISO 8601 format
};

export type RunStatusType = 'unknown' | 'pending' | 'running' | 'completed' | 'failed';
