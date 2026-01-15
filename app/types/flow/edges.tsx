import { ValueType } from '~/types/data/integration';

export type HandleData = {
    id: string;
    label?: string;
    type: ValueType;
    typeName?: string;
    required: boolean;
    categoryName?: string;
};
