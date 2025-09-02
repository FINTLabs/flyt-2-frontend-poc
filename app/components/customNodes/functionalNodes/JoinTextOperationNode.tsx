import React, { memo, useEffect, useMemo, useState } from 'react';
import {
    type NodeProps,
    type Node,
    useReactFlow,
    useNodeConnections,
    useNodesData,
} from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { MultipleHandlesWithLabel } from '~/components/customHandles/MultipleHandlesWithLabel';
import { getOperationIcon, getNodeMinHeight } from '~/utils/nodeHandlers';
import type { HandleData } from '~/types/handleTypes';
import type { BaseNodeData, CustomNode } from '~/types/nodeTypes';
import { BaseNodeWrapper } from '~/components/customNodes/nodeLayout/BaseNodeWrapper';

type JoinTextOperationNodeType = Node<BaseNodeData, 'operationJoinText'>;

export const JoinTextOperationNode = memo(
    ({
        id,
        data,
        isConnectable,
        positionAbsoluteX,
        positionAbsoluteY,
    }: NodeProps<JoinTextOperationNodeType>) => {
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });
        const { updateNodeData } = useReactFlow(); // Removed to prevent infinite loop

        const [joinedText, setJoinedText] = useState<string>('');
        const [outputText, setOutputText] = useState<{ id: string; text: string }[]>([]);

        const connections = useNodeConnections({
            handleType: 'target',
        });

        // Get all connected source node IDs
        const connectionsNodeIds = useMemo(
            () =>
                connections
                    .sort((a, b) => (a?.targetHandle || '').localeCompare(b?.targetHandle || ''))
                    .map((connection) => connection.source)
                    .filter(Boolean),
            [connections]
        );

        // Get data from all connected nodes
        const connectedNodesData = useNodesData<Node<BaseNodeData>>(connectionsNodeIds);

        useEffect(() => {
            if (connectedNodesData && connectionsNodeIds.length > 0) {
                const newOutputText = connections
                    .sort((a, b) => (a?.targetHandle || '').localeCompare(b?.targetHandle || ''))
                    .map((edge) => {
                        const nodeData = connectedNodesData.find((node) => node.id === edge.source);
                        if (!nodeData) return null;
                        if (nodeData.type === 'variableInput') {
                            return { id: nodeData.id, text: nodeData.data.text || '' };
                        }
                        const handleLabel = nodeData.data.sourceHandles?.find(
                            (handle) => handle.id === edge?.sourceHandle
                        )?.label;
                        return { id: nodeData.id, text: handleLabel || '?' };
                    })
                    .filter(Boolean) as { id: string; text: string }[];
                setOutputText(newOutputText);
            } else {
                setJoinedText('');
                setOutputText([]);
            }
        }, [connectedNodesData, connectionsNodeIds]);

        useEffect(() => {
            setJoinedText(outputText.map((text) => text.text).join(''));
        }, [outputText]);

        useEffect(() => {
            updateNodeData(id, {
                sourceHandles: [{ ...data?.sourceHandles?.[0], label: joinedText }],
            });
        }, [joinedText]);

        return (
            <BaseNodeWrapper
                showPosition={true}
                positionAbsoluteX={positionAbsoluteX}
                positionAbsoluteY={positionAbsoluteY}
                label={data.label}
                minHeight={minHeight}>
                <MultipleHandlesWithLabel
                    handles={data.targetHandles}
                    type={'target'}
                    isConnectable={isConnectable}
                />
                <VStack align={'center'} justify={'center'} gap="1" style={{ minHeight }}>
                    {data.iconType && getOperationIcon(data.iconType)}
                </VStack>
                <MultipleHandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </BaseNodeWrapper>
        );
    }
);
