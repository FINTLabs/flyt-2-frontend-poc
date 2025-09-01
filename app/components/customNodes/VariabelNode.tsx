import React, { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import { HStack, TextField } from '@navikt/ds-react';
import { MultipleHandlesWithLabel } from '~/components/customHandles/MultipleHandlesWithLabel';
import { getNodeMinHeight } from '~/utils/nodeHandlers';
import { TypeTag } from '~/components/macros/TypeTag';
import { BaseNodeWrapper } from './nodeLayout/BaseNodeWrapper';
import { PositionDisplay } from './PositionDisplay';
import type { HandleData } from '~/types/handleTypes';

type VariableInputData = {
    label: string;
    typeName: string;
    type: string
    sourceHandles?: HandleData[];
  };

type VariableNodeType = Node<VariableInputData, 'variableInput'>;

export const VariabelNode = memo(({ data, isConnectable, positionAbsoluteX, positionAbsoluteY }: NodeProps<VariableNodeType>) => {
    const minHeight = getNodeMinHeight({
        sources: data.sourceHandles?.length,
        handleInterval: 0,
    });

    return (
        <BaseNodeWrapper minHeight={minHeight}>
            <PositionDisplay x={positionAbsoluteX} y={positionAbsoluteY} position="top" />
            <HStack align={'center'} justify={'center'} gap="1">
                <TypeTag type={data.type} typeName={data.typeName} size='small' />
                <TextField size={'small'} label={'Variable Name'} value={data.label} hideLabel />
            </HStack>
            <MultipleHandlesWithLabel
                handles={data.sourceHandles}
                type={'source'}
                isConnectable={isConnectable}
            />
        </BaseNodeWrapper>
    );
});
