import type { HandleDataOld } from '~/types/handleTypes';
import {
    type Node,
    type NodeConnection,
    type NodeProps,
    useNodeConnections,
    useNodes,
    useNodesData,
    useReactFlow,
} from '@xyflow/react';
import React, { memo, useEffect, useState } from 'react';
import { BaseNodeWrapperOld } from '~/demo/components/BaseNodeWrapperOld';
import { BodyShort, HStack } from '@navikt/ds-react';
import { TypeTagOld } from '~/components/macros/TypeTagOld';
import { HandlesWithLabelOld } from '~/demo/components/HandlesWithLabelOld';
import { DataTypeOld, type DataTypeValue } from '~/demo/types/datatypes';
import { getCollectionTypeFromType } from '~/demo/utils/nodeHandlers';

type InnerFlowDataNodeData = {
    label: string;
    type: DataTypeValue;
    typeName: string;
    iconType?: string;
    sourceHandles?: HandleDataOld[];
    targetHandles?: HandleDataOld[];
};

type InnerFlowDataNodeType = Node<InnerFlowDataNodeData, 'innerFlowInput' | 'innerFlowOutput'>;

export const InnerFlowDataNode = memo(
    ({ id, data, isConnectable, type, parentId }: NodeProps<InnerFlowDataNodeType>) => {
        const { updateNode, updateEdge, getNode, addNodes, getNodes } = useReactFlow();

        const isInput = type === 'innerFlowInput';
        const handleType = isInput ? 'source' : 'target';

        const parentNode = parentId && useNodesData(parentId);

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
            if (!isInput && targetEdge && data.type === DataTypeOld.Undefined) {
                const objectDefinitionNode = getNode(targetEdge.source)?.data;
                if (objectDefinitionNode) {
                    console.log('objectDefinitionNode: ', objectDefinitionNode);
                    const incomingObjectHandle: HandleDataOld | undefined =
                        objectDefinitionNode.sourceHandles
                            ? Object.values(objectDefinitionNode.sourceHandles).find(
                                  (h) => h.id === targetEdge.sourceHandle
                              )
                            : undefined;

                    if (!incomingObjectHandle) return;
                    console.log('incomingObjectHandle: ', incomingObjectHandle);

                    const objectHandle = {
                        id: 'a',
                        label: incomingObjectHandle.label,
                        type: incomingObjectHandle.type,
                        typeName: incomingObjectHandle.typeName,
                        required: incomingObjectHandle.required,
                    };

                    updateNode(id, {
                        data: {
                            ...data,
                            type: objectHandle.type,
                            label: objectHandle.label,
                            typeName: objectHandle.typeName,
                            targetHandles: [objectHandle],
                        },
                    });
                    if (parentId && parentNode) {
                        updateNode(parentId, {
                            ...parentNode,
                            data: {
                                ...parentNode.data,
                                sourceHandles: [
                                    {
                                        ...objectHandle,
                                        type: getCollectionTypeFromType(objectHandle.type),
                                    },
                                ],
                            },
                        });
                    }
                }
            }
        }, [targetEdge]);

        return (
            <BaseNodeWrapperOld>
                <HStack align={'center'} gap="1">
                    <TypeTagOld type={data.type} typeName={data.typeName} />
                    <BodyShort size={'small'}>{data.label}</BodyShort>
                </HStack>
                {data.sourceHandles?.length && (
                    <HandlesWithLabelOld
                        handles={data.sourceHandles}
                        type={handleType}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
                {data.targetHandles?.length && (
                    <HandlesWithLabelOld
                        handles={data.targetHandles}
                        type={handleType}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
            </BaseNodeWrapperOld>
        );
    }
);
