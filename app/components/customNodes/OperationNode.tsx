import React, { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { getNodeIcon, getNodeMinHeightCss } from '~/utils/nodeHandlers';
import { BaseNodeWrapper } from './nodeLayout/BaseNodeWrapper';
import type { HandleData } from '~/types/handleTypes';

type OperationNodeData = {
    label: string;
    iconType?: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type OperationNodeType = Node<OperationNodeData, 'operation'>;

export const OperationNode = memo(({ data, isConnectable }: NodeProps<OperationNodeType>) => {
    const minHeight = getNodeMinHeightCss({
        sources: data.sourceHandles?.length,
        targets: data.targetHandles?.length,
    });

    return (
        <BaseNodeWrapper label={data.label} minHeight={minHeight}>
            <HandlesWithLabel
                handles={data.targetHandles}
                type={'target'}
                isConnectable={isConnectable}
            />
            <VStack align={'center'} justify={'center'} gap="1" style={{ minHeight }} padding={'1'}>
                {data.iconType && getNodeIcon(data.iconType)}
            </VStack>
            <HandlesWithLabel
                handles={data.sourceHandles}
                type={'source'}
                isConnectable={isConnectable}
            />
        </BaseNodeWrapper>
    );
});
