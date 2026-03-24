import React, { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import { BodyShort, HStack } from '@navikt/ds-react';
import { NodeContainerWithProgress } from './nodeLayout/NodeContainerWithProgress';
import type { HandleData } from '~/types/handleTypes';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import type { DataTypeValue } from '~/types/data/datatypes';
import { getNodeIcon } from '~/demo/utils/nodeHandlers';

type IntegrationNodeData = {
    label: string;
    typeName: string;
    type: DataTypeValue;
    iconType: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type IntegrationNodeType = Node<IntegrationNodeData, 'flowOutput' | 'flowInput'>;

export const IntegrationNode = memo(
    ({ data, isConnectable, type }: NodeProps<IntegrationNodeType>) => {
        return (
            <NodeContainerWithProgress>
                <HStack align={'center'} gap="2" paddingInline={'1 2'}>
                    {getNodeIcon(data.iconType)}
                    <BodyShort size={'small'}>{data.label}</BodyShort>
                </HStack>
                {data.sourceHandles?.length && (
                    <HandlesWithLabel
                        handles={data.sourceHandles}
                        type={'source'}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
                {data.targetHandles?.length && (
                    <HandlesWithLabel
                        handles={data.targetHandles}
                        type={'target'}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
            </NodeContainerWithProgress>
        );
    }
);
