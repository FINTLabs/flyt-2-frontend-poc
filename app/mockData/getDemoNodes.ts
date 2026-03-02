import type { ChangeEvent } from 'react';
import { arkivInstanceOutput, egrunnervervSakInstance } from '~/mockData/nodes/instances';
import { DataTypeDefinition } from '~/types/data/datatypes';
import {
    operationCreateObjectAkrivsak,
    operationExternalGetSaksansvarlig,
    operationJoinText,
    operationOpenEGrvSak,
    variableInputNode,
} from '~/mockData/nodes/general';

export const getDemoNodes = (
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
                    { id: 'a', type: DataTypeDefinition.Text, required: true },
                    { id: 'b', type: DataTypeDefinition.Text, required: true },
                    { id: 'c', type: DataTypeDefinition.Text, required: true },
                    { id: 'd', type: DataTypeDefinition.Text, required: true },
                    { id: 'e', type: DataTypeDefinition.Text, required: true },
                    { id: 'f', type: DataTypeDefinition.Text, required: true },
                    { id: 'g', type: DataTypeDefinition.Text, required: true },
                    { id: 'h', type: DataTypeDefinition.Text, required: true },
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
