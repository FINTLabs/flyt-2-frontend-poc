import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
    type NodeProps,
    type Node,
    useNodeConnections,
    useReactFlow,
    useUpdateNodeInternals,
    type NodeConnection,
} from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { getNodeIcon } from '~/demo/utils/nodeHandlers';
import type { HandleData } from '~/types/handleTypes';
import { NodeContainerWithProgress } from '~/components/customNodes/nodeLayout/NodeContainerWithProgress';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { useFlow } from '~/context/flowContext';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { mockFetchDataContentHandles } from '~/mockData/getObjectDataContentHandles';

import { getNodeMinHeight } from '~/utils/nodeSizeUtils';

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

        const handleOpenObject = useCallback(
            (newEdge: NodeConnection) => {
                console.log('handleOpenObject');
                const sourceNodeData = getNode(newEdge.source)?.data;

                console.log('sourceNodeData', sourceNodeData);

                if (sourceNodeData && sourceNodeData.sourceHandles) {
                    const sourceHandle = Object.values(sourceNodeData.sourceHandles).find(
                        (h) => h.id === newEdge.sourceHandle
                    );

                    console.log('sourceHandle', sourceHandle);

                    const handleID = `${id}:t:a`;

                    const incomingObjectTargetHandle = {
                        id: handleID,
                        label: sourceHandle.label,
                        type: DataTypeDefinition.Object,
                        typeName: sourceHandle.typeName,
                        required: true,
                    };

                    const objectDefinitionHandles = mockFetchDataContentHandles(
                        id,
                        's',
                        incomingObjectTargetHandle.typeName || 'Object',
                        incomingObjectTargetHandle.label
                    );

                    updateNodeData(id, {
                        label: `Pakk ut ${sourceHandle.label}`,
                        targetHandles: [incomingObjectTargetHandle],
                        sourceHandles: objectDefinitionHandles,
                    });

                    const newHandle = isOpenObject
                        ? { targetHandle: handleID }
                        : { sourceHandle: handleID };
                    updateEdge(newEdge.edgeId, {
                        ...newEdge,
                        ...newHandle,
                    });
                    updateNodeInternals(id);
                }
            },
            [id]
        );

        const handleCreateObject = useCallback(
            (newEdge: NodeConnection) => {
                console.log('handleCreateObject');

                const targetNodeData = getNode(newEdge.target)?.data;

                console.log('targetNodeData', targetNodeData);

                if (targetNodeData && targetNodeData.targetHandles) {
                    const targetHandle = Object.values(targetNodeData.targetHandles).find(
                        (h) => h.id === newEdge.targetHandle
                    );
                    console.log('targetHandle', targetHandle);

                    const handleID = `${id}:s:a`;

                    const outgoingObjectSourceHandle = {
                        id: handleID,
                        label: targetHandle.label ?? targetNodeData.label,
                        type: DataTypeDefinition.Object,
                        typeName: targetHandle.typeName ?? targetNodeData.typeName,
                        required: true,
                    };

                    const objectDefinitionHandles = mockFetchDataContentHandles(
                        id,
                        't',
                        outgoingObjectSourceHandle.typeName || 'Object',
                        outgoingObjectSourceHandle.label
                    );

                    updateNodeData(id, {
                        label: `Opprett ${targetHandle.label.toLowerCase() ?? targetNodeData.label}`, // TODO: Håndter flertall hvis det er en liste
                        targetHandles: objectDefinitionHandles,
                        sourceHandles: [outgoingObjectSourceHandle],
                    });

                    const newHandle = isOpenObject
                        ? { targetHandle: handleID }
                        : { sourceHandle: handleID };
                    updateEdge(newEdge.edgeId, {
                        ...newEdge,
                        ...newHandle,
                    });
                    updateNodeInternals(id);
                }
            },
            [id]
        );

        useEffect(() => {
            if (edge) {
                console.log('==== NEW Edge', edge);
                if (isOpenObject) {
                    handleOpenObject(edge);
                } else {
                    handleCreateObject(edge);
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
