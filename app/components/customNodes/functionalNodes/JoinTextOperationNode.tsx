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
import { BodyShort, Box, Button, Detail, HStack, VStack } from '@navikt/ds-react';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { getNodeMinHeight, getNodeIcon } from '~/utils/nodeHandlers';
import type { BaseNodeData } from '~/types/nodeTypes';
import { BaseNodeWrapper } from '~/components/customNodes/nodeLayout/BaseNodeWrapper';
import { MinusIcon, PlusIcon } from '@navikt/aksel-icons';
import { DataType } from '~/types/datatypes';

type JoinTextOperationNodeType = Node<BaseNodeData, 'operationJoinText'>;

export const JoinTextOperationNode = memo(
    ({ id, data, isConnectable }: NodeProps<JoinTextOperationNodeType>) => {
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });
        const reactFlow = useReactFlow();

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
        const connectedNodesData = useNodesData<Node<BaseNodeData>>(connectionsNodeIds);

        const handleAddHandle = useCallback(() => {
            console.log('Add handle');
            console.log('data.targetHandles', data.targetHandles);

            const newHandle = {
                id: `handle-${data.targetHandles?.length || 0}`,
                type: DataType.Text,
            };
            console.log('New handle', newHandle);
            reactFlow.updateNodeData(id, {
                targetHandles: [...(data.targetHandles || []), newHandle],
            });
        }, [data.targetHandles]);

        const handleRemoveHandle = useCallback(() => {
            console.log('Remove handle');
        }, [data.targetHandles]);

        // TODO: add joinedText to a tooltiop in stead
        useEffect(() => {
            if (connectedNodesData && connectionsNodeIds.length > 0) {
                const newOutputText = connections
                    .sort((a, b) => (a?.targetHandle || '').localeCompare(b?.targetHandle || ''))
                    .map((edge) => {
                        const nodeData = connectedNodesData.find((node) => node.id === edge.source);
                        if (!nodeData) return null;
                        if (nodeData.type === 'variableInput') {
                            return { inputType: nodeData.type, text: nodeData.data.text || '' };
                        }
                        const handleLabel = nodeData.data.sourceHandles?.find(
                            (handle) => handle.id === edge?.sourceHandle
                        )?.label;
                        return { inputType: nodeData.type, text: handleLabel || '?' };
                    })
                    .filter(Boolean) as { inputType: string; text: string }[];
                setOutputText(newOutputText);
            } else {
                setOutputText([]);
            }
        }, [connectedNodesData, connectionsNodeIds]);

        return (
            <BaseNodeWrapper label={data.label} minHeight={minHeight.cssString}>
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
                        />
                    </HStack>
                </NodeToolbar>
                <NodeToolbar position={Position.Right} align={'start'}>
                    <Box
                        background={'bg-default'}
                        padding={'1'}
                        borderRadius={'small'}
                        borderWidth={'1'}
                        borderColor={'border-subtle'}>
                        <Detail size={'small'} >
                            {outputText.map((text, index) =>
                                text.inputType === 'variableInput' ? (
                                    <span key={index}>{text.text}</span>
                                ) : (
                                    <span key={index}>
                                        <b>{`<${text.text}>`}</b>
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
                    nodeHeight={minHeight.number}
                />
                <VStack
                    align={'center'}
                    justify={'center'}
                    gap="1"
                    padding={"1"}
                    style={{ minHeight: minHeight.cssString }}>
                    {data.iconType && getNodeIcon(data.iconType)}
                </VStack>
                <HandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                    nodeHeight={minHeight.number}
                />
            </BaseNodeWrapper>
        );
    }
);
