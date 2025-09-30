import type { Node } from '@xyflow/react';
import type { BaseNodeData } from '~/types/nodeTypes';
import { DataType } from '~/types/datatypes';
export const defaultPosition = { x: 0, y: 0 };

export const elev: Node<BaseNodeData> = {
    id: 'operationCreateElev',
    type: 'operation',
    data: {
        label: 'Opprett elev',
        iconType: 'packData',
        targetHandles: [
            { id: 'a', type: DataType.Reference, label: 'Brukernavn', required: true },
            { id: 'b', type: DataType.Reference, label: 'Elevnummer', required: true },
            { id: 'c', type: DataType.Reference, label: 'feidenavn', required: true },
            {
                id: 'd',
                type: DataType.Object,
                typeName: 'kontaktinformasjons',
                label: 'Kontaktinformasjons',
                required: true,
            },
            { id: 'e', type: DataType.Reference, label: 'Person', required: false },
            { id: 'f', type: DataType.Reference, label: 'Elevforhold', required: false },
        ],
        sourceHandles: [{ id: 'a', type: DataType.Object, typeName: 'Elev', required: true }],
    },
    position: defaultPosition,
};



export const person: Node<BaseNodeData> = {
    id: 'operationCreatePerson',
    type: 'operation',
    data: {
        label: 'Opprett person',
        iconType: 'packData',
        targetHandles: [
            { id: 'a', type: DataType.Reference, label: 'bilde', required: true },
            {
                id: 'b',
                type: DataType.Object,
                typeName: 'Adresse',
                label: 'Bostedsadresse',
                required: true,
            },
            { id: 'c', type: DataType.Text, label: 'fødselsdato', required: true },
            {
                id: 'd',
                type: DataType.Object,
                typeName: 'Personnavn',
                label: 'navn',
                required: true,
            },
            {
                id: 'e',
                type: DataType.Object,
                typeName: 'kontaktinformasjons',
                label: 'Kontaktinformasjons',
                required: false,
            },
        ],
        sourceHandles: [{ id: 'a', type: DataType.Object, typeName: 'Person', required: true }],
    },
    position: defaultPosition,
};

export const fravaer: Node<BaseNodeData> = {
    id: 'operationCreateFravaer',
    type: 'operation',
    data: {
        label: 'Opprett fravær',
        iconType: 'packData',
        targetHandles: [
            { id: 'a', type: DataType.Boolean, label: 'dokumentert', required: true },
            {
                id: 'b',
                type: DataType.Boolean,
                label: 'føresPåVitnemål',
                required: true,
            },
            { id: 'c', type: DataType.Object, typeName: 'Periode', label: 'gjelderPeriode', required: true },
            {
                id: 'd',
                type: DataType.Text,
                label: 'kommentar',
                required: true,
            },
            {
                id: 'e',
                type: DataType.Reference,
                label: 'systemId',
                required: false,
            },
        ],
        sourceHandles: [{ id: 'a', type: DataType.Object, typeName: 'Fravær', required: true }],
    },
    position: defaultPosition,
};

export const allFintNodes = [
    elev,
    person,
    fravaer
];