import type { DataTypeDefinition } from '~/types/data/datatypes';

export type HandleData = {
    id: string;
    label?: string;
    type: DataTypeDefinition;
    typeName?: string;
    required: boolean;
    categoryName?: string;
};
