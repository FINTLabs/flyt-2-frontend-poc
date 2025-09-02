import React, { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { MultipleHandlesWithLabel } from '~/components/customHandles/MultipleHandlesWithLabel';
import { getOperationIcon, getNodeMinHeight } from '~/utils/nodeHandlers';
import { BaseNodeWrapper } from './nodeLayout/BaseNodeWrapper';
import type { HandleData } from '~/types/handleTypes';

type OperationNodeData = {
    label: string;
    iconType?: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type OperationNodeType = Node<OperationNodeData, 'operation'>;

export const OperationNode = memo(
    ({
        data,
        isConnectable,
        positionAbsoluteX,
        positionAbsoluteY,
    }: NodeProps<OperationNodeType>) => {
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });

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
