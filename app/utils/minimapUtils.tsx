import type { Node } from '@xyflow/react';

export const getMinimapNodeStrokeColor = (node: Node): string => {
    if (node && node.type) {
        if (node.type === 'flowInput' || node.type === 'flowOutput') return '#718f9f';
        if (node.type === 'inputText') return '#006373';
        if (node.type === 'externalFunction') return '#816f55';
    }
    return '#000';
};
export const getMinimapNodeColor = (node: Node): string => {
    if (node.type === 'flowInput' || node.type === 'flowOutput') return 'var(--theme-node-blue)';
    if (node.type === 'inputText') return 'var(--theme-node-green)';
    if (node.type === 'externalFunction') return 'var(--theme-node-beige)';
    return 'var(--theme-node-gray)';
};
