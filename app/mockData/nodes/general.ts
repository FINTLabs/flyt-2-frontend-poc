import { DataTypeDefinition } from '~/types/data/datatypes';
import type { BaseNodeData, InputNodeData, SelectNodeData } from '~/types/nodeTypes';
import { type Node } from '@xyflow/react';
import { allFintNodes } from '~/demo/mockData/fintNodes';
import {
    acosInstance,
    arkivInstanceOutput,
    egrunnervervSakInstance,
} from '~/mockData/nodes/instances';
import { defaultPosition } from '~/utils/constants';

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
            { id: 'a', type: DataTypeDefinition.Undefined, required: true, typeName: '?' },
        ],
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
        type: DataTypeDefinition.Text,
        sourceHandles: [{ id: 'a', type: DataTypeDefinition.Text, required: true }],
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
        type: DataTypeDefinition.Reference,
        sourceHandles: [{ id: 'a', type: DataTypeDefinition.Reference, required: true }],
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
            { id: 'a', type: DataTypeDefinition.Object, required: true, typeName: '?' },
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
            { id: 'a', type: DataTypeDefinition.Object, required: true, typeName: '?' },
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
            { id: 'a', type: DataTypeDefinition.Text, required: true },
            { id: 'b', type: DataTypeDefinition.Text, required: true },
            { id: 'c', type: DataTypeDefinition.Text, required: false },
        ],
        sourceHandles: [{ id: 'a', type: DataTypeDefinition.Text, required: true }],
    },
    position: defaultPosition,
};

export const operationEditText: Node<BaseNodeData> = {
    id: 'operationEditText',
    type: 'operationEditText',
    data: {
        label: 'Endre tekst',
        iconType: 'textEdit',
        targetHandles: [{ id: 'a', type: DataTypeDefinition.Text, required: true }],
        sourceHandles: [{ id: 'a', type: DataTypeDefinition.Text, required: true }],
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
            { id: 'a', type: DataTypeDefinition.CollectionObject, required: true, typeName: '?' },
        ],
        sourceHandles: [
            {
                id: 'a',
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
                id: 'a',
                label: 'eGrunnerverv sak',
                type: DataTypeDefinition.Object,
                typeName: 'eGrv Sak',
                required: true,
            },
        ],
        sourceHandles: [
            { id: 'a', label: 'Kommunenavn', type: DataTypeDefinition.Text, required: true },
            { id: 'b', label: 'Prosjektnavn', type: DataTypeDefinition.Text, required: true },
            { id: 'c', label: 'Gårdsnummer', type: DataTypeDefinition.Text, required: true },
            { id: 'd', label: 'Bruksnummer', type: DataTypeDefinition.Text, required: true },
            { id: 'e', label: 'Seksjonsnummer', type: DataTypeDefinition.Text, required: true },
            { id: 'f', label: 'Tittel', type: DataTypeDefinition.Text, required: true },
            { id: 'g', label: 'Adresse', type: DataTypeDefinition.Text, required: true },
            {
                id: 'h',
                label: 'Saksansvarlig e-post',
                type: DataTypeDefinition.Text,
                required: true,
            },
            {
                id: 'i',
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
            { id: 'a', type: DataTypeDefinition.Text, label: 'E-post', required: true },
        ],
        sourceHandles: [
            {
                id: 'a',
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
            { id: 'a', type: DataTypeDefinition.Text, label: 'Tittel', required: true },
            { id: 'b', type: DataTypeDefinition.Text, label: 'Offentlig tittel', required: false },
            {
                id: 'c',
                type: DataTypeDefinition.Reference,
                label: 'Saksmappetype',
                required: false,
            },
            {
                id: 'd',
                type: DataTypeDefinition.Reference,
                label: 'Administrativ enhet',
                required: false,
            },
            {
                id: 'e',
                type: DataTypeDefinition.Reference,
                label: 'Saksansvarlig',
                required: false,
            },
            {
                id: 'f',
                type: DataTypeDefinition.Object,
                typeName: 'Arkiv Skjerming',
                label: 'Skjerming',
                required: true,
            },
            { id: 'g', type: DataTypeDefinition.Reference, label: 'Arkivdel', required: false },
            { id: 'h', type: DataTypeDefinition.Reference, label: 'Saksstatus', required: false },
            {
                id: 'i',
                type: DataTypeDefinition.CollectionObject,
                typeName: 'Arkiv Part',
                label: 'Parter',
                required: false,
            },
        ],
        sourceHandles: [
            { id: 'a', type: DataTypeDefinition.Object, typeName: 'Arkiv Sak', required: true },
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
            { id: 'a', type: DataTypeDefinition.Text, label: 'Tittel', required: false },
            {
                id: 'b',
                type: DataTypeDefinition.CollectionObject,
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
            { id: 'a', type: DataTypeDefinition.File, label: 'Filinnhold', required: true },
        ],
        sourceHandles: [
            {
                id: 'a',
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
