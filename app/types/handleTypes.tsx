import type { DataTypeValue } from '../demo/types/datatypes';

export type HandleDataOld = {
    id: string;
    label?: string;
    type: DataTypeValue;
    typeName?: string;
    required: boolean;
};

// TODO: only require the required field in the handle is a targetHandle
