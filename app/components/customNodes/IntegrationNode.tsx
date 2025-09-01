import React, { memo } from 'react';
import { Handle, type NodeProps, Position, type Node } from '@xyflow/react';
import { BodyShort, HStack } from '@navikt/ds-react';
import { TypeTag } from '~/components/macros/TypeTag';
import { BaseNodeWrapper } from './nodeLayout/BaseNodeWrapper';

type IntegrationNodeData = {
    label: string;
    typeName: string;
    type: string
  };

type IntegrationNodeType = Node<IntegrationNodeData, 'flowOutput' | 'flowInput'>;

export const IntegrationNode = memo(({ data, isConnectable, positionAbsoluteX, positionAbsoluteY, type }: NodeProps<IntegrationNodeType>) => {
    const isInput = type === 'flowInput';
    const handleType = isInput ? 'source' : 'target';
    const handlePosition = isInput ? Position.Right : Position.Left;
    return (
        <BaseNodeWrapper
            positionAbsoluteX={positionAbsoluteX}
            positionAbsoluteY={positionAbsoluteY}
        >
            <HStack align={'center'} gap="1">
                <TypeTag type={data.type} typeName={data.typeName} />
                <BodyShort size={'small'}>{data.label}</BodyShort>
            </HStack>
            <Handle 
                type={handleType} 
                position={handlePosition} 
                isConnectable={isConnectable} 
            />
        </BaseNodeWrapper>
    );
});
