import React, { memo, useEffect, useMemo, useState } from 'react';
import { Detail, HStack } from '@navikt/ds-react';
import {
    type Node,
    type NodeConnection,
    type NodeProps,
    useNodeConnections,
    useNodesData,
    useReactFlow,
    useUpdateNodeInternals,
} from '@xyflow/react';
import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition, type DataTypeValue } from '~/types/data/datatypes';
import { NodeContainerWithProgress } from '~/components/customNodes/nodeLayout/NodeContainerWithProgress';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { TypeTag } from '~/components/customHandles/TypeTag';
import { getCollectionTypeFromType } from '~/utils/datatypeUtils';
import type { InnerFlowListOperationData } from '~/components/customNodes/OperationListInnerFlowNode';

export type InnerFlowDataNodeData = {
    label: string;
    type: DataTypeValue;
    typeName: string;
    iconType?: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type InnerFlowDataNodeType = Node<InnerFlowDataNodeData, 'innerFlowInput' | 'innerFlowOutput'>;

export const InnerFlowDataNode = memo(
    ({ id, data, isConnectable, type, parentId }: NodeProps<InnerFlowDataNodeType>) => {
        const { updateNode, updateNodeData, getNode } = useReactFlow();
        const updateNodeInternals = useUpdateNodeInternals();

        const isInput = type === 'innerFlowInput';
        const handleType = isInput ? 'source' : 'target';

        const parentNode = parentId
            ? useNodesData<Node<InnerFlowListOperationData>>(parentId)
            : undefined;

        const targetConnections = useNodeConnections({
            handleType: 'target',
        });

        const [targetEdge, setTargetEdge] = useState<NodeConnection | undefined>(undefined);

        useEffect(() => {
            if (targetConnections.length > 0) {
                setTargetEdge(targetConnections[0]);
            }
        }, [targetConnections]);

        useEffect(() => {
            if (!isInput && targetEdge && data.type === DataTypeDefinition.Undefined) {
                const objectDefinitionNode = getNode(targetEdge.source)?.data;
                if (objectDefinitionNode) {
                    const incomingObjectHandle: HandleData | undefined =
                        objectDefinitionNode.sourceHandles
                            ? Object.values(objectDefinitionNode.sourceHandles).find(
                                  (h) => h.id === targetEdge.sourceHandle
                              )
                            : undefined;

                    if (!incomingObjectHandle) return;

                    const objectHandleData = {
                        label: incomingObjectHandle.label,
                        type: incomingObjectHandle.type,
                        typeName: incomingObjectHandle.typeName,
                        required: incomingObjectHandle.required,
                    };

                    updateNodeData(id, {
                        type: objectHandleData.type,
                        label: objectHandleData.label,
                        typeName: objectHandleData.typeName,

                        targetHandles: [
                            {
                                ...(data?.targetHandles?.[0] ?? { id: `${id}:t:a` }),
                                ...objectHandleData,
                            },
                        ],
                    });

                    updateNodeInternals(id);

                    if (parentId && parentNode) {
                        const currentParentSourceHandles = parentNode.data.sourceHandles;
                        updateNode(parentId, {
                            ...parentNode,
                            data: {
                                ...parentNode.data,
                                sourceHandles: [
                                    {
                                        ...currentParentSourceHandles?.[0],
                                        ...objectHandleData,
                                        type: getCollectionTypeFromType(objectHandleData.type),
                                    },
                                ],
                            },
                        });
                        updateNodeInternals(id);
                    }
                }
            }
        }, [targetEdge]);

        return (
            <NodeContainerWithProgress padding={'2px 5px'}>
                <HStack align={'center'} gap="1" wrap={false}>
                    <TypeTag type={data.type} typeName={data.typeName} size={'small'} />
                    <Detail style={{ textWrap: 'nowrap', lineHeight: '1rem' }}>{data.label}</Detail>
                </HStack>
                {data.sourceHandles?.length && (
                    <HandlesWithLabel
                        handles={data.sourceHandles}
                        type={handleType}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
                {data.targetHandles?.length && (
                    <HandlesWithLabel
                        handles={data.targetHandles}
                        type={handleType}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
            </NodeContainerWithProgress>
        );
    }
);
