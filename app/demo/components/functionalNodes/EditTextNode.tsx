import React, { memo } from 'react';
import { type Node, type NodeProps } from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { HandlesWithLabelOld } from '~/demo/components/HandlesWithLabelOld';
import { getNodeMinHeight, getNodeIcon } from '~/demo/utils/nodeHandlers';
import type { BaseNodeData } from '~/types/nodeTypes';
import { BaseNodeWrapperOld } from '~/demo/components/BaseNodeWrapperOld';

type JoinTextOperationNodeType = Node<BaseNodeData, 'operationJoinText'>;

export const EditTextNode = memo(
    ({ id, data, isConnectable }: NodeProps<JoinTextOperationNodeType>) => {
        const minHeight = getNodeMinHeight({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });

        return (
            <BaseNodeWrapperOld label={data.label} minHeight={minHeight.cssString}>
                <HandlesWithLabelOld
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
                <HandlesWithLabelOld
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </BaseNodeWrapperOld>
        );
    }
);
