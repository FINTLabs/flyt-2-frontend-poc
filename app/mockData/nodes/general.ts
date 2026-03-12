import { DataTypeDefinition } from '~/types/data/datatypes';
import type { BaseNodeData, InputNodeData } from '~/types/nodeTypes';
import { type Node } from '@xyflow/react';
import {
    acosInstance,
    arkivInstanceOutput,
    egrunnervervSakInstance,
} from '~/mockData/nodes/instances';
import { defaultPosition } from '~/utils/constants';
import { allDataSources } from '~/mockData/nodes/datasources';
import { allCreateOpjectNodes } from '~/mockData/nodes/createSpesificObjects';

export const innerFlowInput: Node<BaseNodeData> = {
    id: 'innerFlowInput',
    type: 'innerFlowInput',
    data: {
        label: 'Input',
        typeName: '?',
        type: DataTypeDefinition.Object,
    },
    position: defaultPosition,
};

export const innerFlowOutput: Node<BaseNodeData> = {
    id: 'innerFlowOutput',
    type: 'innerFlowOutput',
    data: {
        label: 'Output',
        typeName: '?',
        type: DataTypeDefinition.Undefined,
        targetHandles: [
            {
                id: 'innerFlowOutput:t:a',
                type: DataTypeDefinition.Undefined,
                required: true,
                typeName: '?',
            },
        ],
    },
    position: defaultPosition,
};

// GENERIC NODES
export const InputTextNode: Node<InputNodeData> = {
    id: 'inputTextNode',
    type: 'inputText',
    data: {
        label: 'Fritekst',
        text: '',
        type: DataTypeDefinition.Text,
        sourceHandles: [{ id: 'inputTextNode:s:a', type: DataTypeDefinition.Text, required: true }],
    },
    position: defaultPosition,
};

export const operationOpenObject: Node<BaseNodeData> = {
    id: 'operationOpenObject',
    type: 'openObject',
    data: {
        label: 'Åpne objekt',
        iconType: 'openData2',
        targetHandles: [
            {
                id: 'operationOpenObject:t:a',
                type: DataTypeDefinition.Object,
                required: true,
                typeName: '?',
            },
        ],
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
        sourceHandles: [
            {
                id: 'operationCreateObject:s:a',
                type: DataTypeDefinition.Object,
                required: true,
                typeName: '?',
            },
        ],
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
            { id: 'operationJoinText:t:a', type: DataTypeDefinition.Text, required: true },
            { id: 'operationJoinText:t:b', type: DataTypeDefinition.Text, required: true },
            { id: 'operationJoinText:t:c', type: DataTypeDefinition.Text, required: false },
        ],
        sourceHandles: [
            { id: 'operationJoinText:s:a', type: DataTypeDefinition.Text, required: true },
        ],
    },
    position: defaultPosition,
};

export const operationEditText: Node<BaseNodeData> = {
    id: 'operationEditText',
    type: 'operationEditText',
    data: {
        label: 'Endre tekst',
        iconType: 'textEdit',
        targetHandles: [
            { id: 'operationEditText:t:a', type: DataTypeDefinition.Text, required: true },
        ],
        sourceHandles: [
            { id: 'operationEditText:s:a', type: DataTypeDefinition.Text, required: true },
        ],
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
            {
                id: 'operationListInnerFlow:t:a',
                type: DataTypeDefinition.CollectionObject,
                required: true,
                typeName: '?',
            },
        ],
        sourceHandles: [
            {
                id: 'operationListInnerFlow:s:a',
                type: DataTypeDefinition.CollectionUndefined,
                required: true,
                typeName: '?',
            },
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
                id: 'operationOpenEGrvSak:t:a',
                label: 'eGrunnerverv sak',
                type: DataTypeDefinition.Object,
                typeName: 'eGrv Sak',
                required: true,
            },
        ],
        sourceHandles: [
            {
                id: 'operationOpenEGrvSak:s:a',
                label: 'Kommunenavn',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'operationOpenEGrvSak:s:b',
                label: 'Prosjektnavn',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'operationOpenEGrvSak:s:c',
                label: 'Gårdsnummer',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'operationOpenEGrvSak:s:d',
                label: 'Bruksnummer',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'operationOpenEGrvSak:s:e',
                label: 'Seksjonsnummer',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'operationOpenEGrvSak:s:f',
                label: 'Tittel',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'operationOpenEGrvSak:s:g',
                label: 'Adresse',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'operationOpenEGrvSak:s:h',
                label: 'Saksansvarlig e-post',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'operationOpenEGrvSak:s:i',
                label: 'Sakspartner',
                type: DataTypeDefinition.CollectionObject,
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
        targetHandles: [
            {
                id: 'operationExternalGetSaksansvarlig:t:a',
                type: DataTypeDefinition.Text,
                label: 'E-post',
                required: true,
            },
        ],
        sourceHandles: [
            {
                id: 'operationExternalGetSaksansvarlig:s:a',
                label: 'Saksannsvarlig ref.',
                type: DataTypeDefinition.Reference,
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
            {
                id: 'operationCreateObjectAkrivsak:t:a',
                type: DataTypeDefinition.Text,
                label: 'Tittel',
                required: true,
            },
            {
                id: 'operationCreateObjectAkrivsak:t:b',
                type: DataTypeDefinition.Text,
                label: 'Offentlig tittel',
                required: false,
            },
            {
                id: 'operationCreateObjectAkrivsak:t:c',
                type: DataTypeDefinition.Reference,
                label: 'Saksmappetype',
                required: false,
            },
            {
                id: 'operationCreateObjectAkrivsak:t:d',
                type: DataTypeDefinition.Reference,
                label: 'Administrativ enhet',
                required: false,
            },
            {
                id: 'operationCreateObjectAkrivsak:t:e',
                type: DataTypeDefinition.Reference,
                label: 'Saksansvarlig',
                required: false,
            },
            {
                id: 'operationCreateObjectAkrivsak:t:f',
                type: DataTypeDefinition.Object,
                typeName: 'Arkiv Skjerming',
                label: 'Skjerming',
                required: true,
            },
            {
                id: 'operationCreateObjectAkrivsak:t:g',
                type: DataTypeDefinition.Reference,
                label: 'Arkivdel',
                required: false,
            },
            {
                id: 'operationCreateObjectAkrivsak:t:h',
                type: DataTypeDefinition.Reference,
                label: 'Saksstatus',
                required: false,
            },
            {
                id: 'operationCreateObjectAkrivsak:t:i',
                type: DataTypeDefinition.CollectionObject,
                typeName: 'Arkiv Part',
                label: 'Parter',
                required: false,
            },
        ],
        sourceHandles: [
            {
                id: 'operationCreateObjectAkrivsak:s:a',
                type: DataTypeDefinition.Object,
                typeName: 'Arkiv Sak',
                required: true,
            },
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
            {
                id: 'acosDocToDocDesc:t:a',
                type: DataTypeDefinition.Text,
                label: 'Tittel',
                required: false,
            },
            {
                id: 'acosDocToDocDesc:t:b',
                type: DataTypeDefinition.CollectionObject,
                typeName: 'AcosDocument',
                label: 'ACOS Dokumenter',
                required: false,
            },
        ],
        sourceHandles: [
            {
                id: 'acosDocToDocDesc:s:a',
                label: 'Dokumentbeskrivelse',
                typeName: 'Document',
                type: DataTypeDefinition.CollectionObject,
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
        targetHandles: [
            {
                id: 'acosUploadFile:t:a',
                type: DataTypeDefinition.File,
                label: 'Filinnhold',
                required: true,
            },
        ],
        sourceHandles: [
            {
                id: 'acosUploadFile:s:a',
                label: 'Dokumentfil',
                type: DataTypeDefinition.Reference,
                required: true,
            },
        ],
    },
    position: defaultPosition,
};

export const allFunctionalNodes = [
    egrunnervervSakInstance,
    acosInstance,
    operationOpenEGrvSak,
    operationJoinText,
    operationExternalGetSaksansvarlig,
    operationCreateObjectAkrivsak,
    arkivInstanceOutput,
    InputTextNode,
    operationCreateObject,
    acosDocToDocDesc,
    operationOpenObject,
    innerFlowListOperation,
    operationEditText,
    innerFlowInput,
    innerFlowOutput,
    acosUploadFile,
    ...allDataSources,
    ...allCreateOpjectNodes,
];
