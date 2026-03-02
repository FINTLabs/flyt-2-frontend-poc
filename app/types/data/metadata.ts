import { DataTypeDefinition } from '~/types/data/datatypes';

export type Metadata = {
    id: string;
    displayName: string;
    key: string;
    description?: string;
    type: DataTypeDefinition;
};
