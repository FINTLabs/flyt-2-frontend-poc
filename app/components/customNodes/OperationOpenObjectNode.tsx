import React, { memo, useEffect, useMemo, useState } from 'react';
import {
    type NodeProps,
    type Node,
    useNodeConnections,
    useReactFlow,
    useUpdateNodeInternals,
    type NodeConnection,
} from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { getNodeIcon, getNodeMinHeight } from '~/demo/utils/nodeHandlers';
import type { HandleData } from '~/types/handleTypes';
import { NodeContainerWithProgress } from '~/components/customNodes/nodeLayout/NodeContainerWithProgress';
import { mockFetchDataContentHandles } from '~/demo/mockData/dataObjects';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { useFlow } from '~/context/flowContext';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';

type OperationObjectNodeData = {
    label: string;
    iconType?: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type OperationNodeType = Node<OperationObjectNodeData, 'openObject' | 'createObject'>;

export const OperationOpenObjectNode = memo(
    ({ id, data, isConnectable, type }: NodeProps<OperationNodeType>) => {
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });
        const { currentFlow } = useFlow();

        const isOpenObject = useMemo(() => type === 'openObject', [type]);

        const { updateNodeData, updateEdge, getNode } = useReactFlow();
        const updateNodeInternals = useUpdateNodeInternals();
        const connections = useNodeConnections({
            handleType: isOpenObject ? 'target' : 'source',
        });

        const [edge, setEdge] = useState<NodeConnection | undefined>(undefined);

        useEffect(() => {
            if (connections.length > 0) {
                setEdge(connections[0]);
            }
        }, [connections]);

        useEffect(() => {
            if (edge) {
                const objectDefinitionNode = getNode(
                    isOpenObject ? edge.source : edge.target
                )?.data;
                if (objectDefinitionNode) {
                    const incomingObjectHandle = objectDefinitionNode.sourceHandles
                        ? Object.values(objectDefinitionNode.sourceHandles).find(
                              (h) => h.id === edge.sourceHandle
                          )
                        : undefined;

                    const outgoingObjectHandle = objectDefinitionNode.targetHandles
                        ? Object.values(objectDefinitionNode.targetHandles).find(
                              (h) => h.id === edge.targetHandle
                          )
                        : undefined;

                    const objectHandle = {
                        id: 'a',
                        label: isOpenObject
                            ? incomingObjectHandle.label
                            : (outgoingObjectHandle.label ?? objectDefinitionNode.label),
                        type: DataTypeDefinition.Object,
                        typeName: isOpenObject
                            ? incomingObjectHandle.typeName
                            : (outgoingObjectHandle.typeName ?? objectDefinitionNode.typeName),
                        required: true,
                    };
                    const objectDefinitionHandles = mockFetchDataContentHandles(
                        objectHandle.typeName || 'Object',
                        objectHandle.label
                    );

                    updateNodeData(id, {
                        targetHandles: isOpenObject ? [objectHandle] : objectDefinitionHandles,
                        sourceHandles: isOpenObject ? objectDefinitionHandles : [objectHandle],
                    });

                    const handleID = isOpenObject ? { targetHandle: 'a' } : { sourceHandle: 'a' };
                    updateEdge(edge.edgeId, {
                        ...edge,
                        ...handleID,
                    });
                    updateNodeInternals(id);
                }
            }
        }, [edge]);

        return (
            <NodeContainerWithProgress
                label={data.label}
                minHeight={minHeight.cssString}
                currentStep={currentFlow?.id === 'demo' ? 1 : undefined}
            >
                <HandlesWithLabel
                    handles={data.targetHandles}
                    type={'target'}
                    isConnectable={isOpenObject ? connections.length < 1 : isConnectable}
                />
                <VStack
                    align={'center'}
                    justify={'center'}
                    gap="1"
                    style={{ minHeight: minHeight.cssString }}
                    padding={'1'}
                >
                    {data.iconType && getNodeIcon(data.iconType)}
                </VStack>
                <HandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={!isOpenObject ? connections.length < 1 : isConnectable}
                />
            </NodeContainerWithProgress>
        );
    }
);
