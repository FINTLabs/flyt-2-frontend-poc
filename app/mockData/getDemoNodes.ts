import type { ChangeEvent } from 'react';
import { arkivInstanceOutput, egrunnervervSakInstance } from '~/mockData/nodes/instances';
import { DataTypeDefinition } from '~/types/data/datatypes';
import {
    operationCreateObjectAkrivsak,
    operationJoinText,
    operationOpenEGrvSak,
    InputTextNode,
    operationExternalGetSaksansvarlig,
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
                    {
                        id: 'n3-mergeTextOperation:t:a',
                        type: DataTypeDefinition.Text,
                        required: true,
                    },
                    {
                        id: 'n3-mergeTextOperation:t:b',
                        type: DataTypeDefinition.Text,
                        required: true,
                    },
                    {
                        id: 'n3-mergeTextOperation:t:c',
                        type: DataTypeDefinition.Text,
                        required: true,
                    },
                    {
                        id: 'n3-mergeTextOperation:t:d',
                        type: DataTypeDefinition.Text,
                        required: true,
                    },
                    {
                        id: 'n3-mergeTextOperation:t:e',
                        type: DataTypeDefinition.Text,
                        required: true,
                    },
                    {
                        id: 'n3-mergeTextOperation:t:f',
                        type: DataTypeDefinition.Text,
                        required: true,
                    },
                    {
                        id: 'n3-mergeTextOperation:t:g',
                        type: DataTypeDefinition.Text,
                        required: true,
                    },
                    {
                        id: 'n3-mergeTextOperation:t:h',
                        type: DataTypeDefinition.Text,
                        required: true,
                    },
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
            ...InputTextNode,
            id: 'n5-kommuneInput',
            data: {
                ...InputTextNode.data,
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
            ...InputTextNode,
            id: 'n7-gbnrInput',
            data: {
                ...InputTextNode.data,
                text: ' - gbnr ',
            },
            position: { x: 808, y: -398 },
        },
        {
            ...InputTextNode,
            id: 'n8-skraastrekInput',
            data: {
                ...InputTextNode.data,
                text: '/',
            },
            position: { x: 808, y: -338 },
        },
        {
            ...InputTextNode,
            id: 'n9-grunnervervInput',
            data: {
                ...InputTextNode.data,
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
