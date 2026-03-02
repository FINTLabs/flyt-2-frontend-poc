import React, { memo, useMemo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import { VStack } from '@navikt/ds-react';
import { getNodeIcon, getNodeMinHeightCss } from '~/demo/utils/nodeHandlers';
import { NodeContainerWithProgress } from './nodeLayout/NodeContainerWithProgress';
import type { HandleData } from '~/types/handleTypes';
import { useFlow } from '~/context/flowContext';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';

type OperationNodeData = {
    label: string;
    iconType?: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type OperationNodeType = Node<OperationNodeData, 'operation' | 'externalFunction'>;

export const OperationNode = memo(
    ({ id, data, isConnectable, type }: NodeProps<OperationNodeType>) => {
        const minHeight = getNodeMinHeightCss({
            sources: data.sourceHandles?.length,
            targets: data.targetHandles?.length,
        });
        const { currentFlow } = useFlow();
        const step = useMemo(() => {
            if (currentFlow?.id !== 'demo') return undefined;
            console.log('OperationNode step', { id, type });
            if (type === 'externalFunction') return 4;
            if (type === 'operation') {
                if (id === 'n2-openOperation') return 2;
                if (id === 'n6-createObjectOperation') return 5;
            }
            return undefined;
        }, [currentFlow]);

        return (
            <NodeContainerWithProgress label={data.label} minHeight={minHeight} currentStep={step}>
                <HandlesWithLabel
                    handles={data.targetHandles}
                    type={'target'}
                    isConnectable={isConnectable}
                />
                <VStack
                    align={'center'}
                    justify={'center'}
                    gap="1"
                    style={{ minHeight }}
                    padding={'1'}
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
