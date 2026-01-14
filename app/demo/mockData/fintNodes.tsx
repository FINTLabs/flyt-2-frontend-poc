import type { Node } from '@xyflow/react';
import type { BaseNodeData } from '~/types/nodeTypes';
import { DataTypeOld } from '~/demo/types/datatypes';
export const defaultPosition = { x: 0, y: 0 };

export const elev: Node<BaseNodeData> = {
    id: 'operationCreateElev',
    type: 'operation',
    data: {
        label: 'Opprett elev',
        iconType: 'packData',
        targetHandles: [
            { id: 'a', type: DataTypeOld.Reference, label: 'Brukernavn', required: true },
            { id: 'b', type: DataTypeOld.Reference, label: 'Elevnummer', required: true },
            { id: 'c', type: DataTypeOld.Reference, label: 'feidenavn', required: true },
            {
                id: 'd',
                type: DataTypeOld.Object,
                typeName: 'kontaktinformasjons',
                label: 'Kontaktinformasjons',
                required: true,
            },
            { id: 'e', type: DataTypeOld.Reference, label: 'Person', required: false },
            { id: 'f', type: DataTypeOld.Reference, label: 'Elevforhold', required: false },
        ],
        sourceHandles: [{ id: 'a', type: DataTypeOld.Object, typeName: 'Elev', required: true }],
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
            { id: 'a', type: DataTypeOld.Reference, label: 'bilde', required: true },
            {
                id: 'b',
                type: DataTypeOld.Object,
                typeName: 'Adresse',
                label: 'Bostedsadresse',
                required: true,
            },
            { id: 'c', type: DataTypeOld.Text, label: 'fødselsdato', required: true },
            {
                id: 'd',
                type: DataTypeOld.Object,
                typeName: 'Personnavn',
                label: 'navn',
                required: true,
            },
            {
                id: 'e',
                type: DataTypeOld.Object,
                typeName: 'kontaktinformasjons',
                label: 'Kontaktinformasjons',
                required: false,
            },
        ],
        sourceHandles: [{ id: 'a', type: DataTypeOld.Object, typeName: 'Person', required: true }],
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
            { id: 'a', type: DataTypeOld.Boolean, label: 'dokumentert', required: true },
            {
                id: 'b',
                type: DataTypeOld.Boolean,
                label: 'føresPåVitnemål',
                required: true,
            },
            {
                id: 'c',
                type: DataTypeOld.Object,
                typeName: 'Periode',
                label: 'gjelderPeriode',
                required: true,
            },
            {
                id: 'd',
                type: DataTypeOld.Text,
                label: 'kommentar',
                required: true,
            },
            {
                id: 'e',
                type: DataTypeOld.Reference,
                label: 'systemId',
                required: false,
            },
        ],
        sourceHandles: [{ id: 'a', type: DataTypeOld.Object, typeName: 'Fravær', required: true }],
    },
    position: defaultPosition,
};

export const allFintNodes = [elev, person, fravaer];
