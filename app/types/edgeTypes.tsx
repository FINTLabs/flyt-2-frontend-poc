
type EdgeData = {
    label: string;
    type: string;
    typeName?: string;
}

export type EdgeType = { startLabel?: EdgeData; endLabel?: EdgeData }