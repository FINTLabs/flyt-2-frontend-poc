import React, { memo, useCallback, useEffect, useState } from 'react';
import {
    type NodeProps,
    type Node,
    useNodeConnections,
    useReactFlow,
    useUpdateNodeInternals,
    type NodeConnection,
    NodeResizeControl,
} from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { getNodeIcon } from '~/demo/utils/nodeHandlers';
import type { HandleData } from '~/types/handleTypes';
import { NodeContainerWithProgress } from '~/components/customNodes/nodeLayout/NodeContainerWithProgress';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { innerFlowInput, innerFlowOutput } from '~/mockData/nodes/general';
import { createAlmostRandomId } from '~/demo/utils/generalUtils';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';

import { getNodeMinHeight } from '~/utils/nodeSizeUtils';
import { NODE_HEIGHT_EXPANDED, NODE_WIDTH_EXPANDED } from '~/utils/constants';
import { getTypeFromCollection } from '~/utils/datatypeUtils';
import type { InnerFlowDataNodeData } from '~/components/customNodes/InnerFlowDataNode';

function ResizeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#7f78e8"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'absolute', right: 5, bottom: 5 }}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 20 20 20 20 16" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <polyline points="8 4 4 4 4 8" />
            <line x1="4" y1="4" x2="10" y2="10" />
        </svg>
    );
}

export type InnerFlowListOperationData = {
    label: string;
    iconType?: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type InnerFlowListOperationType = Node<InnerFlowListOperationData, 'listOperation'>;

export const InnerFlowListOperation = memo(
    ({ id, data, isConnectable, width, height }: NodeProps<InnerFlowListOperationType>) => {
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });

        const { updateNode, updateEdge, getNode, addNodes, getNodes, setNodes } = useReactFlow();
        const updateNodeInternals = useUpdateNodeInternals();
        const targetConnections = useNodeConnections({
            handleType: 'target',
        });

        // TODO: Listen to changes to source in case that is connected before output node
        const sourceConnections = useNodeConnections({
            handleType: 'source',
        });

        const [targetEdge, setTargetEdge] = useState<NodeConnection | undefined>(undefined);
        const [sourceEdge, setSourceEdge] = useState<NodeConnection | undefined>(undefined);

        useEffect(() => {
            if (!sourceEdge && sourceConnections.length > 0) {
                const newConnection = sourceConnections[0];
                setSourceEdge(newConnection);

                const isParent = getNodes().some((node) => node.parentId === id);

                if (!isParent) {
                    // TODO: Handle if users adds output first?????
                } else if (
                    data.sourceHandles?.[0].type === DataTypeDefinition.CollectionUndefined
                ) {
                    updateSourceHandleAndOutputNode(newConnection);
                }
            }
        }, [sourceConnections]);

        useEffect(() => {
            if (!targetEdge && targetConnections.length > 0) {
                const newConnection = targetConnections[0];
                setTargetEdge(newConnection);

                const isParent = getNodes().some((node) => node.parentId === id);
                if (!isParent) {
                    createInnerFlowNodesOnInitialTargetConnection(newConnection);
                }
            }
        }, [targetConnections]);

        const createInnerFlowNodesOnInitialTargetConnection = useCallback(
            (targetEdge: NodeConnection) => {
                const objectDefinitionNode = getNode(targetEdge.source)?.data;

                if (objectDefinitionNode) {
                    const incomingObjectHandle = objectDefinitionNode.sourceHandles
                        ? Object.values(objectDefinitionNode.sourceHandles).find(
                              (h) => h.id === targetEdge.sourceHandle
                          )
                        : undefined;

                    const newObjectData = {
                        label: incomingObjectHandle.label,
                        type: DataTypeDefinition.Object,
                        typeName: incomingObjectHandle.typeName,
                        required: true,
                    };

                    const existingHandle = data.targetHandles?.[0];

                    if (!existingHandle) return;

                    updateNode(id, {
                        data: {
                            ...data,
                            targetHandles: [
                                {
                                    ...existingHandle,
                                    ...newObjectData,
                                    id: existingHandle.id,
                                    type: DataTypeDefinition.CollectionObject,
                                },
                            ],
                        },
                        style: { height: NODE_HEIGHT_EXPANDED, width: NODE_WIDTH_EXPANDED },
                    });

                    const inputId = createAlmostRandomId('node-id', 'innerFlowInput');
                    addNodes([
                        {
                            ...innerFlowInput,
                            parentId: id,
                            extent: 'parent',
                            // draggable: false,
                            position: { x: 10, y: NODE_HEIGHT_EXPANDED / 2 - 10 },
                            id: inputId,
                            data: {
                                sourceHandles: [{ ...newObjectData, id: `${inputId}:s:a` }],
                                type: DataTypeDefinition.Object,
                                typeName: incomingObjectHandle.typeName || 'Object',
                                label: incomingObjectHandle.label || 'object',
                            },
                        },
                        {
                            ...innerFlowOutput,
                            parentId: id,
                            extent: 'parent',
                            // draggable: false,
                            position: {
                                x: NODE_WIDTH_EXPANDED - 100,
                                y: NODE_HEIGHT_EXPANDED / 2 - 10,
                            },
                            id: createAlmostRandomId('node-id', 'innerFlowOutput'),
                        },
                    ]);
                    updateNodeInternals(id);
                }
            },
            [data]
        );

        const updateSourceHandleAndOutputNode = useCallback(
            (sourceEdge: NodeConnection) => {
                const objectDefinitionNode = getNode(sourceEdge.target)?.data;

                if (objectDefinitionNode) {
                    const incomingObjectHandle = objectDefinitionNode.targetHandles
                        ? Object.values(objectDefinitionNode.targetHandles).find(
                              (h) => h.id === sourceEdge.targetHandle
                          )
                        : undefined;

                    const newSourceData = {
                        label: incomingObjectHandle.label,
                        type: incomingObjectHandle.type,
                        typeName: incomingObjectHandle.typeName,
                        required: true,
                    };

                    updateNode(id, {
                        data: {
                            ...data,
                            sourceHandles: [{ ...data.sourceHandles?.[0], ...newSourceData }],
                        },
                    });

                    const outputNode = getNodes().find(
                        (node): node is Node<InnerFlowDataNodeData> =>
                            node.parentId === id && node.type === 'innerFlowOutput'
                    );

                    if (outputNode && outputNode.data.type === DataTypeDefinition.Undefined) {
                        const currentOutputHandle = outputNode.data.targetHandles;
                        updateNode(outputNode.id, {
                            ...outputNode,
                            data: {
                                ...outputNode.data,
                                label: newSourceData.label,
                                type: getTypeFromCollection(newSourceData.type),
                                typeName: newSourceData.typeName,
                                targetHandles: [
                                    {
                                        ...currentOutputHandle?.[0],
                                        ...newSourceData,
                                        type: getTypeFromCollection(newSourceData.type),
                                    },
                                ],
                            },
                        });
                        updateNodeInternals([id, outputNode.id]);
                    }
                }
            },
            [data]
        );

        const updateInnerNodePositions = useCallback(
            (width?: number, height?: number) => {
                if (!width || !height) return;

                setNodes((nodes) =>
                    nodes.map((node) => {
                        if (node.parentId !== id) return node;

                        if (node.id.includes('innerFlowInput')) {
                            return {
                                ...node,
                                position: {
                                    x: 10,
                                    y: height / 2 - 10,
                                },
                            };
                        }

                        if (node.id.includes('innerFlowOutput')) {
                            return {
                                ...node,
                                position: {
                                    x: width - 100,
                                    y: height / 2 - 10,
                                },
                            };
                        }

                        return node;
                    })
                );
            },
            [id, setNodes]
        );

        useEffect(() => {
            updateInnerNodePositions(width, height);
        }, [width, height]);

        return (
            <NodeContainerWithProgress label={data.label} minHeight={minHeight.cssString}>
                <HandlesWithLabel
                    handles={data.targetHandles}
                    type={'target'}
                    isConnectable={targetConnections.length < 1}
                />
                <VStack
                    align={'center'}
                    justify={'center'}
                    gap="1"
                    style={{ minHeight: minHeight.cssString }}
                    padding={'1'}
                >
                    {targetConnections.length === 0 && data.iconType && getNodeIcon(data.iconType)}
                </VStack>
                {targetConnections.length > 0 && (
                    <NodeResizeControl minWidth={100} minHeight={50}>
                        <ResizeIcon />
                    </NodeResizeControl>
                )}
                <HandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </NodeContainerWithProgress>
        );
    }
);
