import React, { memo, useEffect, useState } from 'react';
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
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { getNodeIcon, getNodeMinHeight } from '~/utils/nodeHandlers';
import type { HandleData } from '~/types/handleTypes';
import { BaseNodeWrapper } from '~/components/customNodes/nodeLayout/BaseNodeWrapper';
import { DataType } from '~/types/datatypes';
import { useFlow } from '~/context/flowContext';
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

        const { updateNode, updateEdge, getNode, addNodes, getNodes } = useReactFlow();
        const updateNodeInternals = useUpdateNodeInternals();
        const targetConnections = useNodeConnections({
            handleType: 'target',
        });

        // TODO: Listen to changes to source in case that is connected before output node
        const sourceConnections = useNodeConnections({
            handleType: 'source',
        });

        const [targetEdge, setTargetEdge] = useState<NodeConnection | undefined>(undefined);

        useEffect(() => {
            if (targetConnections.length > 0) {
                setTargetEdge(targetConnections[0]);
            }
        }, [targetConnections]);

        useEffect(() => {
            if (targetEdge && data.targetHandles?.[0]?.type === DataType.CollectionObject) {
                console.log('FOUND EDGE', targetEdge, data);
                const objectDefinitionNode = getNode(targetEdge.source)?.data;
                if (objectDefinitionNode) {
                    const incomingObjectHandle = objectDefinitionNode.sourceHandles
                        ? Object.values(objectDefinitionNode.sourceHandles).find(
                              (h) => h.id === targetEdge.sourceHandle
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
                            targetHandles: [{
                                ...objectHandle,
                                type: DataType.CollectionObject,
                            }],
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
                }
                const handleID = { targetHandle: 'a' };
                updateEdge(targetEdge.edgeId, {
                    ...targetEdge,
                    ...handleID,
                });
                updateNodeInternals(id);
            }
        }, [targetEdge]);

        return (
            <BaseNodeWrapper label={data.label} minHeight={minHeight.cssString}>
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
                    padding={'1'}>
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
            </BaseNodeWrapper>
        );
    }
);
