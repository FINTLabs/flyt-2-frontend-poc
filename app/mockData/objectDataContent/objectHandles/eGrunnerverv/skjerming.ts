import { DataTypeDefinition } from '~/types/data/datatypes';
import type { HandleData, HandleType } from '~/types/handleTypes';

export const skjermingHandles = (nodeID: string, handleType: HandleType): HandleData[] => [
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
