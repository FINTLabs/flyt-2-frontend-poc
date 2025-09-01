import type { Node } from '@xyflow/react';
import React, { type ChangeEvent } from 'react';
import NodeOperationObjectIcon from '~/components/icons/NodeOperationObjectIcon';
import NodeOperationConversionIcon from '~/components/icons/NodeOperationConversionIcon';
import DataTypeText from '~/components/icons/DataTypeText';
import { LinkIcon } from '@navikt/aksel-icons';
import type { DataTypeValue } from '~/types/datatypes';

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

export const getTypeSymbol = (
    type?: DataTypeValue,
    typeText?: string
): React.JSX.Element | string | undefined => {
    if (!type) return typeText ?? undefined;
    if (type === 'object' || type === 'collectionObject') {
        return <p style={{ textWrap: 'nowrap', lineHeight: '0.9rem', margin: '0 2px', fontSize: '0.7rem' }}>{`{${typeText}}`}</p>;
    }
    if (type === 'text' || type === 'input') return <DataTypeText />;
    if (type === 'reference') return <LinkIcon fontSize="0.95rem" />
    return typeText;
};

// TODO: find width of text with brackets
export const getTypeSymbolWidth = (
    type?: DataTypeValue,
    typeText?: string
): number => {
    if (!type) {
        return typeText ? measureTextWidth(typeText) : 0
    }
    
    if (type === 'object' || type === 'collectionObject') {
        const text = `{${typeText}}`;
        return measureTextWidth(text, '0.7rem')
    }
    
    if (type === 'text' || type === 'input' || type === 'reference') {
        return 15 // Fixed width for icon
    }
    
    return  typeText ? measureTextWidth(typeText) : 0
};

// Utility function to measure text width accurately
export const measureTextWidth = (text: string, fontSize: string = '0.875rem', fontFamily: string = '"Source Sans 3", "Source Sans Pro", Arial, sans-serif'): number => {
    // Create a temporary canvas element for measurement
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (context) {
        // Set the font to match your actual CSS
        context.font = `${fontSize} ${fontFamily}`;
        const metrics = context.measureText(text);
        return Math.ceil(metrics.width);
    }
    
    // Fallback to approximate calculation if canvas is not available
    return text.length * 8 + 8;
};

export const getOperationIcon = (iconType: string) => {
    switch (iconType) {
        case 'handleObject':
            return <NodeOperationObjectIcon height={55} width={55} />;
        case 'conversion':
            return <NodeOperationConversionIcon height={45} width={45} />;
        default:
            return 'Find icon for ' + iconType;
    }
};

export const calculateHandlePosition = (
    index: number,
    totalHandles: number,
    interval: number = 30
): string => {
    if (totalHandles === 1) {
        return '50%'; // Center single handle
    }

    const totalHeight = (totalHandles - 1) * interval;

    const nodeHeight = 60 + totalHeight;
    const centerPosition = nodeHeight / 2;

    const startPosition = centerPosition - totalHeight / 2;
    return `${startPosition + index * interval}px`;
};

export const getMaxHandles = ({
    targets,
    sources,
}: {
    targets?: number | undefined;
    sources?: number | undefined;
}) => {
    const leftHandles = targets || 0;
    const rightHandles = sources || 0;
    return Math.max(leftHandles, rightHandles);
};

export const calculateNodeMinHeight = (
    maxHandles: number,
    handleInterval: number = 27,
    baseHeight: number = 60
): string => {
    return maxHandles > 1 ? `${(maxHandles - 1) * handleInterval + baseHeight}px` : 'auto';
};

export const getNodeMinHeight = ({
    targets,
    sources,
    handleInterval = 27,
    baseHeight = 60,
}: {
    targets?: number | undefined;
    sources?: number | undefined;
    handleInterval?: number;
    baseHeight?: number;
}): string => {
    const maxHandles = getMaxHandles({ targets, sources });
    return calculateNodeMinHeight(maxHandles, handleInterval, baseHeight);
};
