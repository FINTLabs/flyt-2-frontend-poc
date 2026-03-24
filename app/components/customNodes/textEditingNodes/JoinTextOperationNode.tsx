import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import {
    type Node,
    type NodeProps,
    NodeToolbar,
    Position,
    useNodeConnections,
    useNodesData,
    useReactFlow,
} from '@xyflow/react';
import { Box, Button, Detail, HStack, VStack } from '@navikt/ds-react';
import { getNodeIcon } from '~/demo/utils/nodeHandlers';
import type { CustomNodeDemo, InputNodeData } from '~/types/nodeTypes';
import { NodeContainerWithProgress } from '~/components/customNodes/nodeLayout/NodeContainerWithProgress';
import { MinusIcon, PlusIcon } from '@navikt/aksel-icons';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { useFlow } from '~/context/flowContext';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';

import { getNodeMinHeight } from '~/utils/nodeSizeUtils';
import { createHandleId } from '~/demo/utils/generalUtils';
import type { HandleData } from '~/types/handleTypes';

type JoinTextOperationNodeType = Node<InputNodeData, 'operationJoinText'>;

export const JoinTextOperationNode = memo(
    ({ id, data, isConnectable }: NodeProps<JoinTextOperationNodeType>) => {
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });
        const { currentFlow } = useFlow();
        const { updateNodeData, deleteElements } = useReactFlow();

        const [outputText, setOutputText] = useState<{ inputType: string; text: string }[]>([]);

        const connections = useNodeConnections({
            handleType: 'target',
        });

        const connectionsNodeIds = useMemo(
            () =>
                connections
                    .sort((a, b) => (a?.targetHandle || '').localeCompare(b?.targetHandle || ''))
                    .map((connection) => connection.source)
                    .filter(Boolean),
            [connections]
        );
        const connectedNodesData = useNodesData<CustomNodeDemo>(connectionsNodeIds);

        const handleAddHandle = useCallback(() => {
            const newHandle: HandleData = {
                id: createHandleId(id, 't'),
                type: DataTypeDefinition.Text,
                required: false,
            };
            updateNodeData(id, {
                targetHandles: [...(data.targetHandles || []), newHandle],
            });
        }, [data.targetHandles]);

        const handleRemoveHandle = useCallback(() => {
            if (data.targetHandles && data.targetHandles.length > 2) {
                const removedHandle = data.targetHandles?.pop();
                if (removedHandle) {
                    const edge = connections.find(
                        (connection) => connection.targetHandle === removedHandle.id
                    );
                    updateNodeData(id, {
                        targetHandles: [...(data.targetHandles || [])],
                    });
                    if (edge) {
                        deleteElements({ edges: [{ id: edge.edgeId }] });
                    }
                }
            }
        }, [data.targetHandles]);

        useEffect(() => {
            if (connectedNodesData && connectionsNodeIds.length > 0) {
                const newOutputText = data.targetHandles
                    ?.map((handle) => {
                        const edge = connections.find(
                            (connection) => connection.targetHandle === handle.id
                        );
                        const node = connectedNodesData.find((node) => node.id === edge?.source);

                        if (!node) return null;

                        if (node.type === 'inputText') {
                            return {
                                inputType: node.type,
                                text: (node.data as InputNodeData)?.text || '',
                            };
                        }
                        const handleLabel = node.data.sourceHandles?.find(
                            (handle) => handle.id === edge?.sourceHandle
                        )?.label;
                        return { inputType: node.type, text: handleLabel || '?' };
                    })
                    .filter(Boolean) as { inputType: string; text: string }[];
                setOutputText(newOutputText);
            } else {
                setOutputText([]);
            }
        }, [connectedNodesData, connectionsNodeIds]);

        return (
            <NodeContainerWithProgress
                label={data.label}
                minHeight={minHeight.cssString}
                currentStep={currentFlow?.id === 'demo' ? 3 : undefined}
            >
                <NodeToolbar position={Position.Bottom} align={'start'}>
                    <HStack gap="2">
                        <Button
                            icon={<PlusIcon title="Legg til input" />}
                            variant="secondary-neutral"
                            size="small"
                            onClick={handleAddHandle}
                        />
                        <Button
                            icon={<MinusIcon title="Fjern siste input" />}
                            variant="secondary-neutral"
                            size="small"
                            onClick={handleRemoveHandle}
                            disabled={data.targetHandles && data.targetHandles.length < 3}
                        />
                    </HStack>
                </NodeToolbar>
                <NodeToolbar position={Position.Right} align={'start'}>
                    <Box
                        background={'bg-default'}
                        padding={'1'}
                        borderRadius={'small'}
                        borderWidth={'1'}
                        borderColor={'border-subtle'}
                    >
                        <Detail size={'small'}>
                            {outputText?.map((text, index) =>
                                text?.inputType === 'inputText' ? (
                                    <span key={index}>{text?.text}</span>
                                ) : (
                                    <span key={index}>
                                        <b>{`<${text?.text}>`}</b>
                                    </span>
                                )
                            )}
                        </Detail>
                    </Box>
                </NodeToolbar>
                <HandlesWithLabel
                    handles={data.targetHandles}
                    type={'target'}
                    isConnectable={isConnectable}
                />
                <VStack
                    align={'center'}
                    justify={'center'}
                    gap="1"
                    padding={'1'}
                    style={{ minHeight: minHeight.cssString }}
                >
                    {data.iconType && getNodeIcon(data.iconType)}
                </VStack>
                <HandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </NodeContainerWithProgress>
        );
    }
);
