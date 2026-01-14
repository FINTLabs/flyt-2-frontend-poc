import type { ChangeEvent } from 'react';
import { DataTypeOld } from '~/demo/types/datatypes';
import type { BaseNodeData, InputNodeData, SelectNodeData } from '~/types/nodeTypes';
import { type Node } from '@xyflow/react';
import { allFintNodes } from '~/demo/mockData/fintNodes';

export const defaultPosition = { x: 0, y: 0 };
export const defaultOutputPosition = { x: 800, y: 0 };

// INSTANCE NODES
export const egrunnervervSakInstance: Node<BaseNodeData> = {
    id: 'instanceEGrunnervervSak',
    type: 'flowInput',
    data: {
        label: 'eGrunnerverv sak',
        typeName: 'eGrv Sak',
        type: DataTypeOld.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: [
            {
                id: 'a',
                label: 'eGrunnerverv sak',
                type: DataTypeOld.Object,
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
        type: DataTypeOld.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: [
            {
                id: 'a',
                label: 'ACOS instans',
                type: DataTypeOld.Object,
                typeName: 'ACOS',
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const acosInstanceVIK304: Node<BaseNodeData> = {
    id: 'acosInstanceVIK304',
    type: 'flowInput',
    data: {
        label: 'ACOS VIK304',
        typeName: 'ACOS VIK304',
        type: DataTypeOld.Object,
        iconType: 'dataInstanceIn',
        sourceHandles: [
            {
                id: 'a',
                label: 'ACOS VIK304',
                type: DataTypeOld.Object,
                typeName: 'ACOS VIK304',
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
        type: DataTypeOld.Object,
        typeName: 'Arkiv Sak',
        iconType: 'dataInstanceOut',
        targetHandles: [
            { id: 'a', type: DataTypeOld.Object, typeName: 'Arkiv Sak', required: true },
        ],
    },
    position: defaultOutputPosition,
};

export const innerFlowInput: Node<BaseNodeData> = {
    id: 'innerFlowInput',
    type: 'innerFlowInput',
    data: {
        label: 'Input',
        typeName: '?',
        type: DataTypeOld.Object,
    },
    position: defaultPosition,
};

export const innerFlowOutput: Node<BaseNodeData> = {
    id: 'innerFlowOutput',
    type: 'innerFlowOutput',
    data: {
        label: 'Output',
        typeName: '?',
        type: DataTypeOld.Undefined,
        targetHandles: [{ id: 'a', type: DataTypeOld.Undefined, required: true, typeName: '?' }],
    },
    position: defaultPosition,
};

// GENERIC NODES
export const variableInputNode: Node<InputNodeData> = {
    id: 'variableInputNode',
    type: 'variableInput',
    data: {
        label: 'Variabel input',
        text: '',
        type: DataTypeOld.Text,
        sourceHandles: [{ id: 'a', type: DataTypeOld.Text, required: true }],
    },
    position: defaultPosition,
};

export const dataSourceNode: Node<SelectNodeData> = {
    id: 'dataSource',
    type: 'dataSource',
    data: {
        label: 'Fylkesråd: Dokumentstatus',
        value: '',
        options: [],
        type: DataTypeOld.Reference,
        sourceHandles: [{ id: 'a', type: DataTypeOld.Reference, required: true }],
    },
    position: defaultPosition,
};

export const operationOpenObject: Node<BaseNodeData> = {
    id: 'operationOpenObject',
    type: 'openObject',
    data: {
        label: 'Åpne objekt',
        iconType: 'openData2',
        targetHandles: [{ id: 'a', type: DataTypeOld.Object, required: true, typeName: '?' }],
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
        sourceHandles: [{ id: 'a', type: DataTypeOld.Object, required: true, typeName: '?' }],
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
            { id: 'a', type: DataTypeOld.Text, required: true },
            { id: 'b', type: DataTypeOld.Text, required: true },
            { id: 'c', type: DataTypeOld.Text, required: false },
        ],
        sourceHandles: [{ id: 'a', type: DataTypeOld.Text, required: true }],
    },
    position: defaultPosition,
};

export const operationEditText: Node<BaseNodeData> = {
    id: 'operationEditText',
    type: 'operationEditText',
    data: {
        label: 'Endre tekst',
        iconType: 'textEdit',
        targetHandles: [{ id: 'a', type: DataTypeOld.Text, required: true }],
        sourceHandles: [{ id: 'a', type: DataTypeOld.Text, required: true }],
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
            { id: 'a', type: DataTypeOld.CollectionObject, required: true, typeName: '?' },
        ],
        sourceHandles: [
            { id: 'a', type: DataTypeOld.CollectionUndefined, required: true, typeName: '?' },
        ],
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
                type: DataTypeOld.Object,
                typeName: 'eGrv Sak',
                required: true,
            },
        ],
        sourceHandles: [
            { id: 'a', label: 'Kommunenavn', type: DataTypeOld.Text, required: true },
            { id: 'b', label: 'Prosjektnavn', type: DataTypeOld.Text, required: true },
            { id: 'c', label: 'Gårdsnummer', type: DataTypeOld.Text, required: true },
            { id: 'd', label: 'Bruksnummer', type: DataTypeOld.Text, required: true },
            { id: 'e', label: 'Seksjonsnummer', type: DataTypeOld.Text, required: true },
            { id: 'f', label: 'Tittel', type: DataTypeOld.Text, required: true },
            { id: 'g', label: 'Adresse', type: DataTypeOld.Text, required: true },
            { id: 'h', label: 'Saksansvarlig e-post', type: DataTypeOld.Text, required: true },
            {
                id: 'i',
                label: 'Sakspartner',
                type: DataTypeOld.CollectionObject,
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
        targetHandles: [{ id: 'a', type: DataTypeOld.Text, label: 'E-post', required: true }],
        sourceHandles: [
            {
                id: 'a',
                label: 'Saksannsvarlig ref.',
                type: DataTypeOld.Reference,
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
            { id: 'a', type: DataTypeOld.Text, label: 'Tittel', required: true },
            { id: 'b', type: DataTypeOld.Text, label: 'Offentlig tittel', required: false },
            { id: 'c', type: DataTypeOld.Reference, label: 'Saksmappetype', required: false },
            {
                id: 'd',
                type: DataTypeOld.Reference,
                label: 'Administrativ enhet',
                required: false,
            },
            { id: 'e', type: DataTypeOld.Reference, label: 'Saksansvarlig', required: false },
            {
                id: 'f',
                type: DataTypeOld.Object,
                typeName: 'Arkiv Skjerming',
                label: 'Skjerming',
                required: true,
            },
            { id: 'g', type: DataTypeOld.Reference, label: 'Arkivdel', required: false },
            { id: 'h', type: DataTypeOld.Reference, label: 'Saksstatus', required: false },
            {
                id: 'i',
                type: DataTypeOld.CollectionObject,
                typeName: 'Arkiv Part',
                label: 'Parter',
                required: false,
            },
        ],
        sourceHandles: [
            { id: 'a', type: DataTypeOld.Object, typeName: 'Arkiv Sak', required: true },
        ],
    },
    position: defaultPosition,
};

export const acosDocToDocDesc: Node<BaseNodeData> = {
    id: 'operationACOSDocToDocDesc',
    type: 'operation',
    data: {
        label: 'ACOS dokument til dokumentbeskrivelser',
        iconType: 'conversion',
        targetHandles: [
            { id: 'a', type: DataTypeOld.Text, label: 'Tittel', required: false },
            {
                id: 'b',
                type: DataTypeOld.CollectionObject,
                typeName: 'AcosDocument',
                label: 'ACOS Dokumenter',
                required: false,
            },
        ],
        sourceHandles: [
            {
                id: 'a',
                label: 'Dokumentbeskrivelse',
                typeName: 'Document',
                type: DataTypeOld.CollectionObject,
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const acosUploadFile: Node<BaseNodeData> = {
    id: 'operationExternalUpdloadFile',
    type: 'externalFunction',
    data: {
        label: 'Fylkesård: Last opp fil',
        iconType: 'lookup',
        targetHandles: [{ id: 'a', type: DataTypeOld.File, label: 'Filinnhold', required: true }],
        sourceHandles: [
            {
                id: 'a',
                label: 'Dokumentfil',
                type: DataTypeOld.Reference,
                required: true,
            },
        ],
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
                    { id: 'a', type: DataTypeOld.Text, required: true },
                    { id: 'b', type: DataTypeOld.Text, required: true },
                    { id: 'c', type: DataTypeOld.Text, required: true },
                    { id: 'd', type: DataTypeOld.Text, required: true },
                    { id: 'e', type: DataTypeOld.Text, required: true },
                    { id: 'f', type: DataTypeOld.Text, required: true },
                    { id: 'g', type: DataTypeOld.Text, required: true },
                    { id: 'h', type: DataTypeOld.Text, required: true },
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

export const allIntegrationsInputNodes = [
    egrunnervervSakInstance,
    acosInstance,
    acosInstanceVIK304,
];

export const allIntegrationsNodes = [...allIntegrationsInputNodes, arkivInstanceOutput];

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
    acosDocToDocDesc,
    operationOpenObject,
    innerFlowListOperation,
    operationEditText,
    innerFlowInput,
    innerFlowOutput,
    dataSourceNode,
    acosUploadFile,
    ...allFintNodes,
];
