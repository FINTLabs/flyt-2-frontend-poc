import React, { memo, useEffect, useState } from 'react';
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
        const { updateNodeData } = useReactFlow();

        const [output, setOutput] = useState<Record<number, string>>({});

        const connections = useNodeConnections({
            handleType: 'target',
        });
        console.log('JoinTextOperationNode - connections:', connections);

        const nodesData = useNodesData<Node<BaseNodeData>>(connections[1]?.source);
        console.log('JoinTextOperationNode - connected node data:', nodesData);

        const textNode = nodesData?.type === 'variableInput' ? nodesData : null;

        useEffect(() => {
            if (textNode?.data.text) {
                console.log('JoinTextOperationNode - updating text to uppercase:', textNode.data.text);
                updateNodeData(id, { text: textNode?.data.text });
            }
        }, [textNode]);

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
                    <div>{data.text}</div>
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
