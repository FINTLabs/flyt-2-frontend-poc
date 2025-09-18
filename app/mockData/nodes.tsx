import { Position } from '@xyflow/react';
import type { ChangeEvent } from 'react';
import { DataType } from '~/types/datatypes';
import type { BaseNodeData } from '~/types/nodeTypes';
import { type Node } from '@xyflow/react';

export const defaultPosition = { x: 0, y: 0 };

// INSTANCE NODES
export const egrunnervervSakInstance: Node<BaseNodeData> = {
    id: 'instanceEGrunnervervSak',
    type: 'flowInput',
    data: {
        label: 'eGrunnerverv sak',
        typeName: 'eGrv Sak',
        type: DataType.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: [
            {
                id: 'a',
                label: 'eGrunnerverv sak',
                type: DataType.Object,
                typeName: 'eGrv Sak',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const acosInstance: Node<BaseNodeData> = {
    id: 'acosInstance',
    type: 'flowInput',
    data: {
        label: 'ACOS dokument',
        typeName: 'ACOS',
        type: DataType.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: [
            {
                id: 'a',
                label: 'ACOS instans',
                type: DataType.Object,
                typeName: 'ACOS',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const arkivInstanceOutput: Node<BaseNodeData> = {
    id: 'instanceOutputArkivsak',
    type: 'flowOutput',
    data: {
        label: 'Arkivsak',
        type: DataType.Object,
        typeName: 'Arkiv Sak',
        iconType: 'dataInstanceOut',
        targetHandles: [{ id: 'a', type: DataType.Object, typeName: 'Arkiv Sak', required: true }],
    },
    position: defaultPosition,
};

export const innerFlowInput: Node<BaseNodeData> = {
    id: 'innerFlowInput',
    type: 'innerFlowInput',
    data: {
        label: 'Input',
        typeName: '?',
        type: DataType.Object,
    },
    position: defaultPosition,
};

export const innerFlowOutput: Node<BaseNodeData> = {
    id: 'innerFlowOutput',
    type: 'innerFlowOutput',
    data: {
        label: 'Output',
        typeName: '?',
        type: DataType.Undefined,
        targetHandles: [{ id: 'a', type: DataType.Undefined, required: true, typeName: '?' }],
    },
    position: defaultPosition,
};

// GENERIC NODES
export const variableInputNode: Node<BaseNodeData> = {
    id: 'variableInputNode',
    type: 'variableInput',
    data: {
        label: 'Variabel input',
        text: '',
        type: DataType.Text,
        sourceHandles: [{ id: 'a', type: DataType.Text, required: true }],
    },
    position: defaultPosition,
};

export const operationOpenObject: Node<BaseNodeData> = {
    id: 'operationOpenObject',
    type: 'openObject',
    data: {
        label: 'Åpne objekt',
        iconType: 'openData2',
        targetHandles: [{ id: 'a', type: DataType.Object, required: true, typeName: '?' }],
        sourceHandles: [],
    },
    position: defaultPosition,
};

export const operationCreateObject: Node<BaseNodeData> = {
    id: 'operationCreateObject',
    type: 'createObject',
    data: {
        label: 'Opprett objekt',
        iconType: 'packData2',
        targetHandles: [],
        sourceHandles: [{ id: 'a', type: DataType.Object, required: true, typeName: '?' }],
    },
    position: defaultPosition,
};

export const operationJoinText: Node<BaseNodeData> = {
    id: 'operationJoinText',
    type: 'operationJoinText',
    data: {
        label: 'Slå sammen tekst',
        iconType: 'textEdit',
        targetHandles: [
            { id: 'a', type: DataType.Text, required: true },
            { id: 'b', type: DataType.Text, required: true },
            { id: 'c', type: DataType.Text, required: false },
        ],
        sourceHandles: [{ id: 'a', type: DataType.Text, required: true }],
    },
    position: defaultPosition,
};

export const innerFlowListOperation: Node<BaseNodeData> = {
    id: 'operationListInnerFlow',
    type: 'listOperation',
    data: {
        label: 'For hvert element i listen',
        iconType: 'listOperation',
        targetHandles: [
            { id: 'a', type: DataType.CollectionObject, required: true, typeName: '?' },
        ],
        sourceHandles: [{ id: 'a', type: DataType.Undefined, required: true, typeName: '?' }],
    },
    position: defaultPosition,
};

// DEMO NODES

export const operationOpenEGrvSak: Node<BaseNodeData> = {
    id: 'operationOpenEGrvSak',
    type: 'operation',
    data: {
        label: 'Hent ut data',
        iconType: 'openData',
        targetHandles: [
            {
                id: 'a',
                label: 'eGrunnerverv sak',
                type: DataType.Object,
                typeName: 'eGrv Sak',
                required: true,
            },
        ],
        sourceHandles: [
            { id: 'a', label: 'Kommunenavn', type: DataType.Text, required: true },
            { id: 'b', label: 'Prosjektnavn', type: DataType.Text, required: true },
            { id: 'c', label: 'Gårdsnummer', type: DataType.Text, required: true },
            { id: 'd', label: 'Bruksnummer', type: DataType.Text, required: true },
            { id: 'e', label: 'Seksjonsnummer', type: DataType.Text, required: true },
            { id: 'f', label: 'Tittel', type: DataType.Text, required: true },
            { id: 'g', label: 'Adresse', type: DataType.Text, required: true },
            { id: 'h', label: 'Saksansvarlig e-post', type: DataType.Text, required: true },
            {
                id: 'i',
                label: 'Sakspartner',
                type: DataType.CollectionObject,
                typeName: 'eGrv Sakspart',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const operationExternalGetSaksansvarlig: Node<BaseNodeData> = {
    id: 'operationExternalGetSaksansvarlig',
    type: 'externalFunction',
    data: {
        label: 'Finn saksansvalig ref. med e-post',
        iconType: 'lookup',
        targetHandles: [{ id: 'a', type: DataType.Text, label: 'E-post', required: true }],
        sourceHandles: [
            {
                id: 'a',
                label: 'Saksannsvarlig ref.',
                type: DataType.Reference,
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const operationCreateObjectAkrivsak: Node<BaseNodeData> = {
    id: 'operationCreateObjectAkrivsak',
    type: 'operation',
    data: {
        label: 'Opprett arkivsak',
        iconType: 'packData',
        targetHandles: [
            { id: 'a', type: DataType.Text, label: 'Tittel', required: true },
            { id: 'b', type: DataType.Text, label: 'Offentlig tittel', required: false },
            { id: 'c', type: DataType.Reference, label: 'Saksmappetype', required: false },
            {
                id: 'd',
                type: DataType.Reference,
                label: 'Administrativ enhet',
                required: false,
            },
            { id: 'e', type: DataType.Reference, label: 'Saksansvarlig', required: false },
            {
                id: 'f',
                type: DataType.Object,
                typeName: 'Arkiv Skjerming',
                label: 'Skjerming',
                required: true,
            },
            { id: 'g', type: DataType.Reference, label: 'Arkivdel', required: false },
            { id: 'h', type: DataType.Reference, label: 'Saksstatus', required: false },
            {
                id: 'i',
                type: DataType.CollectionObject,
                typeName: 'Arkiv Part',
                label: 'Parter',
                required: false,
            },
        ],
        sourceHandles: [{ id: 'a', type: DataType.Object, typeName: 'Akriv Sak', required: true }],
    },
    position: defaultPosition,
};

export const getInitialDemoNodes = (
    onChangeNodeColor?: (event: ChangeEvent<HTMLInputElement>) => void
) => {
    return [
        { ...egrunnervervSakInstance, id: 'n1-startNode', position: { x: 0, y: 0 } },
        {
            ...operationOpenEGrvSak,
            id: 'n2-openOperation',
            position: { x: 520, y: -145 },
        },
        {
            ...operationJoinText,
            id: 'n3-mergeTextOperation',
            data: {
                ...operationJoinText.data,
                targetHandles: [
                    { id: 'a', type: DataType.Text, required: true },
                    { id: 'b', type: DataType.Text, required: true },
                    { id: 'c', type: DataType.Text, required: true },
                    { id: 'd', type: DataType.Text, required: true },
                    { id: 'e', type: DataType.Text, required: true },
                    { id: 'f', type: DataType.Text, required: true },
                    { id: 'g', type: DataType.Text, required: true },
                    { id: 'h', type: DataType.Text, required: true },
                ],
            },
            position: { x: 1110, y: -510 },
        },
        {
            ...operationExternalGetSaksansvarlig,
            id: 'n4-saksansvarligOperation',
            position: { x: 1110, y: 210 },
        },
        {
            ...variableInputNode,
            id: 'n5-kommuneInput',
            data: {
                ...variableInputNode.data,
                text: ' kommune - ',
            },
            position: { x: 808, y: -457.8 },
        },
        {
            ...operationCreateObjectAkrivsak,
            id: 'n6-createObjectOperation',
            position: { x: 1560, y: -165 },
        },
        {
            ...variableInputNode,
            id: 'n7-gbnrInput',
            data: {
                ...variableInputNode.data,
                text: ' - gbnr ',
            },
            position: { x: 808, y: -398 },
        },
        {
            ...variableInputNode,
            id: 'n8-skraastrekInput',
            data: {
                ...variableInputNode.data,
                text: '/',
            },
            position: { x: 808, y: -338 },
        },
        {
            ...variableInputNode,
            id: 'n9-grunnervervInput',
            data: {
                ...variableInputNode.data,
                text: '- Grunnerverv',
            },
            position: { x: 808, y: -277.8 },
        },
        {
            ...arkivInstanceOutput,
            id: 'n10-arkivOutput',
            position: { x: 1900, y: -30 },
        },
    ];
};

export const allFunctionalNodes = [
    egrunnervervSakInstance,
    acosInstance,
    operationOpenEGrvSak,
    operationJoinText,
    operationExternalGetSaksansvarlig,
    operationCreateObjectAkrivsak,
    arkivInstanceOutput,
    variableInputNode,
    operationCreateObject,
    operationOpenObject,
    innerFlowListOperation,
    innerFlowInput,
    innerFlowOutput
];
