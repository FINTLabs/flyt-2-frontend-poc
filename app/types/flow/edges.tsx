import { DataValueType } from '~/types/data/integration';

export type HandleData = {
    id: string;
    label?: string;
    type: DataValueType;
    typeName?: string;
    required: boolean;
    categoryName?: string;
};
