import type { DataTypeValue } from "./datatypes";

export type HandleData = {
    id: string;
    label: string;
    type: DataTypeValue;
    typeName?: string;
    required: boolean;
}

// TODO: only require the required field in the handle is a targetHandle