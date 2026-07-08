import type { HandleData, HandleType } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const HMSRegHoveddokumentHandles = (
    nodeID: string,
    handleType: HandleType
): HandleData[] => [
    {
        id: `${nodeID}:${handleType}:hovedDokumentTittel`,
        typeName: 'hovedDokumentTittel',
        label: 'Tittel',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:hovedDokumentFilnavn`,
        typeName: 'hovedDokumentFilnavn',
        label: 'Filnavn',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:hovedDokumentdato`,
        typeName: 'hovedDokumentdato',
        label: 'Fildato',
        type: DataTypeDefinition.Text,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:hovedDokumentFil`,
        typeName: 'hovedDokumentFil',
        label: 'Fil',
        type: DataTypeDefinition.File,
        required: true,
    },
    {
        id: `${nodeID}:${handleType}:hovedDokumentMediatype`,
        typeName: 'hovedDokumentMediatype',
        label: 'Mediatype',
        type: DataTypeDefinition.Text,
        required: true,
    },
];
