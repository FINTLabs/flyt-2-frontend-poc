import { DataTypeDefinition } from '~/types/data/datatypes';

const skjerming = [
    {
        id: '01-tilgangsrestriksjon',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Tilgangsrestriksjon',
        typeName: 'tilgangsrestriksjon',
    },
    {
        id: '02-skjermingshjemmel',
        type: DataTypeDefinition.Text,
        required: true,
        label: 'Skjermingshjemmel',
        typeName: 'skjermingshjemmel',
    },
];

export default skjerming;
