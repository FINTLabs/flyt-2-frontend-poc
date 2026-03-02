import type { Node } from '@xyflow/react';
import type { BaseNodeData } from '~/types/nodeTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';
export const defaultPosition = { x: 0, y: 0 };

export const elev: Node<BaseNodeData> = {
    id: 'operationCreateElev',
    type: 'operation',
    data: {
        label: 'Opprett elev',
        iconType: 'packData',
        targetHandles: [
            { id: 'a', type: DataTypeDefinition.Reference, label: 'Brukernavn', required: true },
            { id: 'b', type: DataTypeDefinition.Reference, label: 'Elevnummer', required: true },
            { id: 'c', type: DataTypeDefinition.Reference, label: 'feidenavn', required: true },
            {
                id: 'd',
                type: DataTypeDefinition.Object,
                typeName: 'kontaktinformasjons',
                label: 'Kontaktinformasjons',
                required: true,
            },
            { id: 'e', type: DataTypeDefinition.Reference, label: 'Person', required: false },
            { id: 'f', type: DataTypeDefinition.Reference, label: 'Elevforhold', required: false },
        ],
        sourceHandles: [
            { id: 'a', type: DataTypeDefinition.Object, typeName: 'Elev', required: true },
        ],
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
            { id: 'a', type: DataTypeDefinition.Reference, label: 'bilde', required: true },
            {
                id: 'b',
                type: DataTypeDefinition.Object,
                typeName: 'Adresse',
                label: 'Bostedsadresse',
                required: true,
            },
            { id: 'c', type: DataTypeDefinition.Text, label: 'fødselsdato', required: true },
            {
                id: 'd',
                type: DataTypeDefinition.Object,
                typeName: 'Personnavn',
                label: 'navn',
                required: true,
            },
            {
                id: 'e',
                type: DataTypeDefinition.Object,
                typeName: 'kontaktinformasjons',
                label: 'Kontaktinformasjons',
                required: false,
            },
        ],
        sourceHandles: [
            { id: 'a', type: DataTypeDefinition.Object, typeName: 'Person', required: true },
        ],
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
            { id: 'a', type: DataTypeDefinition.Boolean, label: 'dokumentert', required: true },
            {
                id: 'b',
                type: DataTypeDefinition.Boolean,
                label: 'føresPåVitnemål',
                required: true,
            },
            {
                id: 'c',
                type: DataTypeDefinition.Object,
                typeName: 'Periode',
                label: 'gjelderPeriode',
                required: true,
            },
            {
                id: 'd',
                type: DataTypeDefinition.Text,
                label: 'kommentar',
                required: true,
            },
            {
                id: 'e',
                type: DataTypeDefinition.Reference,
                label: 'systemId',
                required: false,
            },
        ],
        sourceHandles: [
            { id: 'a', type: DataTypeDefinition.Object, typeName: 'Fravær', required: true },
        ],
    },
    position: defaultPosition,
};

export const allFintNodes = [elev, person, fravaer];
