import { Position } from '@xyflow/react';
import type { ChangeEvent } from 'react';
import { DataType } from '~/types/datatypes';

export const getInitialDemoNodes = (
    onChangeNodeColor?: (event: ChangeEvent<HTMLInputElement>) => void
) => {
    return [
        {
            id: 'n1-startNode',
            type: 'flowInput',
            data: {
                label: 'eGrunnerverv sak',
                typeName: 'eGrv Sak',
                type: DataType.Object,
            },
            position: { x: 0, y: 0 },
            sourcePosition: Position.Right,

        },
        {
            id: 'n2-openOperation',
            type: 'operation',
            data: {
                label: 'Hent ut data',
                iconType: 'handleObject',
                targetHandles: [
                    { id: "a", label: 'eGrunnerverv sak', type: DataType.Object, typeName: 'eGrv Sak', required: true },
                ],
                sourceHandles: [
                    { id: "a", label: 'Kommunenavn', type: DataType.Text, required: true },
                    { id: "b", label: 'Prosjektnavn', type: DataType.Text, required: true },
                    { id: "c", label: 'Gårdsnummer', type: DataType.Text, required: true },
                    { id: "d", label: 'Bruksnummer', type: DataType.Text, required: true },
                    { id: "e", label: 'Seksjonsnummer', type: DataType.Text, required: true },
                    { id: "f", label: 'Tittel', type: DataType.Text, required: true },
                    { id: "g", label: 'Adresse', type: DataType.Text, required: true },
                    { id: "h", label: 'Saksansvarlig e-post', type: DataType.Text, required: true },
                    { id: "i", label: 'Sakspartner', type: DataType.CollectionObject, typeName: 'eGrv Sakspart', required: true },
                ],
            },
            position: { x: 520, y: -145 },
        },
        {
            id: 'n3-mergeTextOperation',
            type: 'operation',
            data: {
                label: 'Slå sammen tekst',
                iconType: 'conversion',
                targetHandles: [
                    { id: "a", type: DataType.Text, required: true },
                    { id: "b", type: DataType.Text, required: true },
                    { id: "c", type: DataType.Text, required: true },
                    { id: "d", type: DataType.Text, required: true },
                    { id: "e", type: DataType.Text, required: true },
                    { id: "f", type: DataType.Text, required: true },
                    { id: "g", type: DataType.Text, required: true },
                    { id: "h", type: DataType.Text, required: true }
                ],
                sourceHandles: [
                    { id: "a", type: DataType.Text, required: true },
                ],
            },
            position: { x: 1110, y: -510 },
        },
        {
            id: 'n4-saksansvarligOperation',
            type: 'externalFunction',
            data: {
                label: 'Finn saksansvalig ref. med e-post',
                iconType: 'conversion',
                targetHandles: [
                    { id: "a", type: DataType.Text, label: 'E-post', required: true },
                ],
                sourceHandles: [
                    { id: "a", label: 'Saksannsvarlig ref.', type: DataType.Reference, required: true },
                ],
            },
            position: { x: 1110, y: 210 },
            targetPosition: Position.Left,
        },
        {
            id: 'n5-kommuneInput',
            type: 'variableInput',
            data: {
                label: 'kommune -',
                type: DataType.Text,
                sourceHandles: [
                    { id: "a", type: DataType.Text, required: true },
                ],
            },
            position: { x: 825, y: -450 },
        },
        {
            id: 'n6-createObjectOperation',
            type: 'operation',
            data: {
                label: 'Opprett object',
                iconType: 'handleObject',
                targetHandles: [
                    { id: "a", type: DataType.Text, label: 'Tittel', required: true },
                    { id: "b", type: DataType.Text, label: 'Offentlig tittel', required: false },
                    { id: "c", type: DataType.Reference, label: 'Saksmappetype', required: false },
                    { id: "d", type: DataType.Reference, label: 'Administrativ enhet' ,required: false},
                    { id: "e", type: DataType.Reference, label: 'Saksansvarlig',required: false  },
                    { id: "f", type: DataType.Object, typeName: 'Arkiv Skjerming', label: 'Skjerming', required: true },
                    { id: "g", type: DataType.Reference, label: 'Arkivdel', required: false },
                    { id: "h", type: DataType.Reference, label: 'Saksstatus', required: false },
                    { id: "i", type: DataType.CollectionObject, typeName: 'Arkiv Part', label: 'Parter', required: false },
                ],
                sourceHandles: [
                    { id: "a", type: DataType.Object, typeName: 'Akriv Sak', required: true },
                ],
            },
            position: { x: 1560, y: -165 },
        },
        {
            id: 'n7-gbnrInput',
            type: 'variableInput',
            data: {
                label: '- gbnr',
                type: DataType.Text,
                sourceHandles: [
                    { id: "a", type: DataType.Text, required: true },
                ],
            },
            position: { x: 825, y: -390 },
        },
        {
            id: 'n8-skraastrekInput',
            type: 'variableInput',
            data: {
                label: '/',
                type: DataType.Text,
                sourceHandles: [
                    { id: "a", type: DataType.Text, required: true },
                ],
            },
            position: { x: 825, y: -330 },
        },
        {
            id: 'n9-grunnervervInput',
            type: 'variableInput',
            data: {
                label: '- Grunnerverv',
                type: DataType.Text,
                sourceHandles: [
                    { id: "a", type: DataType.Text, required: true },
                ],
            },
            position: { x: 825, y: -270 },
        },
        {
            id: 'n10-arkivOutput',
            type: 'flowOutput',
            data: {
                label: 'Arkivsak',
                type: DataType.Text,
            },
            position: { x: 1900, y: -30 },
        },
    ];
};
