import React, { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import { BodyShort, HStack } from '@navikt/ds-react';
import { TypeTag } from '~/components/macros/TypeTag';
import { BaseNodeWrapper } from './nodeLayout/BaseNodeWrapper';
import type { HandleData } from '~/types/handleTypes';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';

type IntegrationNodeData = {
    label: string;
    typeName: string;
    type: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type IntegrationNodeType = Node<IntegrationNodeData, 'flowOutput' | 'flowInput'>;

export const IntegrationNode = memo(
    ({ data, isConnectable, type }: NodeProps<IntegrationNodeType>) => {
        const isInput = type === 'flowInput';
        const handleType = isInput ? 'source' : 'target';
        return (
            <BaseNodeWrapper>
                <HStack align={'center'} gap="1">
                    <TypeTag type={data.type} typeName={data.typeName} />
                    <BodyShort size={'small'}>{data.label}</BodyShort>
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
            </BaseNodeWrapper>
        );
    }
);
