import { DataTypeDefinition } from '~/types/data/datatypes';
import type { HandleData } from '~/types/handleTypes';

export const skjermingHandles = (nodeID: string, handleType: 's' | 't'): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:tilgangsrestriksjon`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tilgangsrestriksjon',
        typeName: 'tilgangsrestriksjon',
    },
    {
        id: `${nodeID}:${handleType}:skjermingshjemmel`,
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Skjermingshjemmel',
        typeName: 'skjermingshjemmel',
    },
];
