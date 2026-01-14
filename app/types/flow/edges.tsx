import { MetadataType } from '~/types/flow/metadataTypes';
import { ValueType } from '~/types/data/integration';

export type HandleData = {
    id: string;
    label?: string;
    type: ValueType;
    typeName?: string;
    required: boolean;
};

export type HandleCategory = {
    displayName: string;
    handles: HandleData[];
};

export type HandlesWithCategories = (HandleData | HandleCategory)[];
