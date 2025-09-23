import type { Node } from '@xyflow/react';
import React, { type ChangeEvent } from 'react';
import NodeOperationConversionIcon from '~/components/icons/NodeOperationConversionIcon';
import {
    FolderFileFillIcon,
    FileExportFillIcon,
    FileImportFillIcon,
    CogIcon,
    PencilWritingFillIcon,
    SquareFillIcon,
    EnvelopeOpenIcon,
    EnvelopeClosedIcon,
    InboxUpFillIcon,
    InboxDownFillIcon,
    ArrowsSquarepathIcon,
} from '@navikt/aksel-icons';
import { DataType, type DataTypeValue } from '~/types/datatypes';
import { HANDLE_HEIGHT, HANDLE_INTERVAL, NODE_BASE_HEIGHT } from '~/mockData/constants';

export const onChangeNodeColor = (
    event: ChangeEvent<HTMLInputElement>,
    allNodes: Node[]
): { newColor: string; newNodes: Node[] } => {
    const newNodes = allNodes.map((node: Node) => {
        if (node.id === '2') {
            return { ...node, data: { ...node.data, color: event.target.value } };
        }
        return node;
    });

    return { newColor: event.target.value, newNodes };
};

export const getMinimapNodeStrokeColor = (node: Node): string => {
    if (node && node.type) {
        if (node.type === 'flowInput' || node.type === 'flowOutput') return '#718f9f';
        if (node.type === 'variableInput') return '#006373';
        if (node.type === 'externalFunction') return '#816f55';
    }
    return '#000';
};

export const getMinimapNodeColor = (node: Node): string => {
    if (node.type === 'flowInput' || node.type === 'flowOutput') return 'var(--theme-node-blue)';
    if (node.type === 'variableInput') return 'var(--theme-node-green)';
    if (node.type === 'externalFunction') return 'var(--theme-node-beige)';
    return 'var(--theme-node-gray)';
};

export const getTypeSymbolWidth = (type?: DataTypeValue, typeText?: string): number => {
    if (!type) {
        return typeText ? measureTextWidth(typeText) : 0;
    }

    if (type === 'object') {
        const text = `{${typeText}}`;
        return measureTextWidth(text, '0.7rem');
    }

    if (isCollectionType(type)) {
        if (type === DataType.CollectionObject) {
            const text = `{${typeText}}`;
            const textWidth = measureTextWidth(text, '0.7rem');
            return textWidth + 15;
        } else {
            return 30;
        }
    }

    if (
        type === 'text' ||
        type === 'input' ||
        type === 'reference' ||
        type === 'undefined' ||
        type === 'file'
    ) {
        return 15;
    }

    return typeText ? measureTextWidth(typeText) : 0;
};

export const measureTextWidth = (
    text: string,
    fontSize: string = '0.875rem',
    fontFamily: string = '"Source Sans 3", "Source Sans Pro", Arial, sans-serif'
): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        context.font = `${fontSize} ${fontFamily}`;
        const metrics = context.measureText(text);
        return metrics.width + 4;
    }
    return text.length * 8 + 8;
};

export const getNodeIcon = (iconType: string | undefined, isSmall?: true) => {
    switch (iconType) {
        case 'handleObject':
            return <CogIcon height={isSmall ? 15 : 55} width={isSmall ? 15 : 55} />;
        case 'conversion':
            return (
                <NodeOperationConversionIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />
            );
        case 'lookup':
            return <FolderFileFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'openData':
            return <FileExportFillIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'openData2':
            return <EnvelopeOpenIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'packData':
            return <FileImportFillIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'packData2':
            return <EnvelopeClosedIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'textEdit':
            return <PencilWritingFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'dataInstanceIn':
            return <InboxDownFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'dataInstanceOut':
            return <InboxUpFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'listOperation':
            return <ArrowsSquarepathIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 45} />;
        default:
            return <SquareFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
    }
};

export const calculateHandlePosition = (
    index: number,
    totalHandles: number,
    interval: number = HANDLE_INTERVAL
): string => {
    if (totalHandles === 1) {
        return '50%';
    }
    const isEven = totalHandles % 2 === 0;
    const middleIndex = isEven ? totalHandles / 2 - 1 : Math.floor(totalHandles / 2);
    const offsetFromMiddle = index - middleIndex;
    return `calc(50% + ${(offsetFromMiddle - (isEven ? 0.5 : 0)) * interval - HANDLE_HEIGHT / 2}px)`;
};

export const getNodeMinHeight = ({
    targets,
    sources,
    handleInterval = HANDLE_INTERVAL,
    baseHeight = NODE_BASE_HEIGHT,
}: {
    targets?: number | undefined;
    sources?: number | undefined;
    handleInterval?: number;
    baseHeight?: number;
}): { number: number; cssString: string } => {
    const leftHandles = targets || 0;
    const rightHandles = sources || 0;
    const maxHandles = Math.max(leftHandles, rightHandles);

    const height = (maxHandles - 1) * handleInterval + baseHeight;

    return {
        number: height,
        cssString: height > 1 ? `${height}px` : 'auto',
    };
};

/**
 * @deprecated Use getNodeMinHeight instead
 */
export const getNodeMinHeightCss = ({
    targets,
    sources,
    handleInterval = HANDLE_INTERVAL,
    baseHeight = NODE_BASE_HEIGHT,
}: {
    targets?: number | undefined;
    sources?: number | undefined;
    handleInterval?: number;
    baseHeight?: number;
}): string => {
    const leftHandles = targets || 0;
    const rightHandles = sources || 0;
    const maxHandles = Math.max(leftHandles, rightHandles);
    return maxHandles > 1 ? `${(maxHandles - 1) * handleInterval + baseHeight}px` : 'auto';
};

export const getCollectionTypeFromType = (
    type: DataTypeValue | string | undefined
): DataTypeValue => {
    if (!type) return DataType.Undefined;
    if (type === DataType.Object) return DataType.CollectionObject;
    if (type === DataType.Undefined) return DataType.CollectionUndefined;
    if (type === DataType.Text) return DataType.CollectionText;
    if (type === DataType.Number) return DataType.CollectionNumber;
    if (type === DataType.Boolean) return DataType.CollectionBoolean;
    if (type === DataType.File) return DataType.CollectionFile;
    if (type === DataType.Reference) return DataType.CollectionReference;

    return DataType.Undefined;
};

export const getTypeFromCollection = (type: DataTypeValue | string | undefined): DataTypeValue => {
    if (!type) return DataType.CollectionUndefined;
    if (type === DataType.CollectionObject) return DataType.Object;
    if (type === DataType.CollectionUndefined) return DataType.Undefined;
    if (type === DataType.CollectionText) return DataType.Text;
    if (type === DataType.CollectionNumber) return DataType.Number;
    if (type === DataType.CollectionBoolean) return DataType.Boolean;
    if (type === DataType.CollectionFile) return DataType.File;
    if (type === DataType.CollectionReference) return DataType.Reference;

    return DataType.CollectionUndefined;
};

export const isCollectionType = (type: DataTypeValue | string | undefined): boolean => {
    if (!type) return false;
    return type.startsWith('collection');
};
