import React, { memo } from 'react';
import { type Node, type NodeProps } from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { getNodeMinHeight, getNodeIcon } from '~/utils/nodeHandlers';
import type { BaseNodeData } from '~/types/nodeTypes';
import { BaseNodeWrapper } from '~/components/customNodes/nodeLayout/BaseNodeWrapper';

type JoinTextOperationNodeType = Node<BaseNodeData, 'operationJoinText'>;

export const EditTextNode = memo(
    ({ id, data, isConnectable }: NodeProps<JoinTextOperationNodeType>) => {
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });

        return (
            <BaseNodeWrapper label={data.label} minHeight={minHeight.cssString}>
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
                    style={{ minHeight: minHeight.cssString }}>
                    {data.iconType && getNodeIcon(data.iconType)}
                </VStack>
                <HandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </BaseNodeWrapper>
        );
    }
);
