import React, { memo, useEffect, useMemo, useState } from 'react';
import {
    type NodeProps,
    type Node,
    useNodeConnections,
    useReactFlow,
    useUpdateNodeInternals,
    type NodeConnection,
    NodeResizeControl,
    useNodes,
} from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { getNodeIcon, getNodeMinHeight } from '~/utils/nodeHandlers';
import type { HandleData } from '~/types/handleTypes';
import { BaseNodeWrapper } from '~/components/customNodes/nodeLayout/BaseNodeWrapper';
import { mockFetchDataContent } from '~/mockData/dataObjects';
import { DataType } from '~/types/datatypes';
import { useFlow } from '~/context/flowContext';
import { ExpandIcon } from '@navikt/aksel-icons';
import { innerFlowInput, innerFlowOutput } from '~/mockData/nodes';
import { createAlmostRandomId } from '~/utils/generalUtils';

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
            style={{ position: 'absolute', right: 5, bottom: 5 }}>
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="16 20 20 20 20 16" />
            <line x1="14" y1="14" x2="20" y2="20" />
            <polyline points="8 4 4 4 4 8" />
            <line x1="4" y1="4" x2="10" y2="10" />
        </svg>
    );
}

type InnerFlowListOperationData = {
    label: string;
    iconType?: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type InnerFlowListOperationType = Node<InnerFlowListOperationData, 'listOperation'>;

export const InnerFlowListOperation = memo(
    ({ id, data, isConnectable, type }: NodeProps<InnerFlowListOperationType>) => {
        const { getCustomNodeDataById } = useFlow();
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });

        const { updateNode, updateEdge, getNode, addNodes } = useReactFlow();
        const updateNodeInternals = useUpdateNodeInternals();
        const connections = useNodeConnections({
            handleType: 'target',
        });

        const [edge, setEdge] = useState<NodeConnection | undefined>(undefined);

        useEffect(() => {
            if (connections.length > 0) {
                setEdge(connections[0]);
            }
        }, [connections]);

        useEffect(() => {
            if (edge) {
                const objectDefinitionNode = getNode(edge.source)?.data;
                if (objectDefinitionNode) {
                    const incomingObjectHandle = objectDefinitionNode.sourceHandles
                        ? Object.values(objectDefinitionNode.sourceHandles).find(
                              (h) => h.id === edge.sourceHandle
                          )
                        : undefined;

                    const objectHandle = {
                        id: 'a',
                        label: incomingObjectHandle.label,
                        type: DataType.Object,
                        typeName: incomingObjectHandle.typeName,
                        required: true,
                    };
                    /*               const objectDefinitionHandles = mockFetchDataContent(
                        objectHandle.typeName || 'Object',
                        objectHandle.label
                    );
*/
                    updateNode(id, {
                        data: {
                            ...data,
                            targetHandles: [objectHandle],
                        },
                        style: { height: 150, width: 270 },
                    });
                    addNodes([
                        {
                            ...innerFlowInput,
                            parentId: id,
                            extent: 'parent',
                            position: { x: 10, y: 55 },
                            id: createAlmostRandomId('node-id', 'innerFlowInput'),
                            data: {
                                sourceHandles: [objectHandle],
                                type: DataType.Object,
                                typeName: incomingObjectHandle.typeName || 'Object',
                                label: incomingObjectHandle.label || 'object',
                            },
                        },
                        {
                            ...innerFlowOutput,
                            parentId: id,
                            extent: 'parent',
                            position: { x: 170, y: 55 },
                            id: createAlmostRandomId('node-id', 'innerFlowOutput'),
                        },
                    ]);

                    /*
                    *     style: {
        height: 150,
        width: 270,
    },*/
                    const handleID = { targetHandle: 'a' };
                    updateEdge(edge.edgeId, {
                        ...edge,
                        ...handleID,
                    });
                    updateNodeInternals(id);
                }
            }
        }, [edge]);

        return (
            <BaseNodeWrapper label={data.label} minHeight={minHeight.cssString}>
                <HandlesWithLabel
                    handles={data.targetHandles}
                    type={'target'}
                    isConnectable={connections.length < 1}
                />
                <VStack
                    align={'center'}
                    justify={'center'}
                    gap="1"
                    style={{ minHeight: minHeight.cssString }}
                    padding={'1'}>
                    {connections.length === 0 && data.iconType && getNodeIcon(data.iconType)}
                </VStack>
                {connections.length > 0 && (
                    <NodeResizeControl minWidth={100} minHeight={50}>
                        <ResizeIcon />
                    </NodeResizeControl>
                )}
                <HandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </BaseNodeWrapper>
        );
    }
);
