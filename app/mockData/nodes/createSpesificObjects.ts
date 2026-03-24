import type { Node } from '@xyflow/react';
import type { BaseNodeData } from '~/types/nodeTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { defaultPosition } from '~/utils/constants';

export const createSkjerming: Node<BaseNodeData> = {
    id: 'createSkjerming',
    type: 'operation',
    data: {
        label: 'Opprett skjerming',
        iconType: 'createOperation',
        targetHandles: [
            {
                id: 'createSkjerming:t:a',
                type: DataTypeDefinition.Text,
                label: 'Tilgangsrestriksjon',
                required: true,
            },
            {
                id: 'createSkjerming:t:b',
                type: DataTypeDefinition.Text,
                label: 'Skjermingshjemmel',
                required: true,
            },
        ],
        sourceHandles: [
            {
                id: 'createSkjerming:s:a',
                label: 'Skjerming',
                type: DataTypeDefinition.Object,
                typeName: 'skjerming',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const createPart: Node<BaseNodeData> = {
    id: 'createPart',
    type: 'operation',
    data: {
        label: 'Opprett part',
        iconType: 'createOperation',
        targetHandles: [
            {
                id: 'createPart:t:a',
                type: DataTypeDefinition.Text,
                label: 'Navn',
                required: true,
            },
            {
                id: 'createPart:t:b',
                type: DataTypeDefinition.Text,
                label: 'Rolle',
                required: true,
            },
            {
                id: 'createPart:t:c',
                type: DataTypeDefinition.Text,
                label: 'Kontaktperson',
                required: true,
            },
            {
                id: 'createPart:t:d',
                type: DataTypeDefinition.Text,
                label: 'Organisasjonsnummer',
                required: true,
            },
            {
                id: 'createPart:t:e',
                type: DataTypeDefinition.Text,
                label: 'Fødselsnummer',
                required: true,
            },
            {
                id: 'createPart:t:f',
                type: DataTypeDefinition.Object,
                typeName: 'adresse',
                label: 'Adresse',
                required: true,
            },
            {
                id: 'createPart:t:g',
                type: DataTypeDefinition.Object,
                typeName: 'kontaktinformasjon',
                label: 'Kontaktinformasjon',
                required: true,
            },
        ],
        sourceHandles: [
            {
                id: 'createPart:s:a',
                label: 'Part',
                type: DataTypeDefinition.Object,
                typeName: 'part',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const allCreatePredefinedObjectNodes = [createSkjerming, createPart];
