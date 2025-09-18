import React, { memo } from 'react';
import { type NodeProps, type Node, useReactFlow } from '@xyflow/react';
import { HStack, TextField } from '@navikt/ds-react';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { getNodeMinHeightCss } from '~/utils/nodeHandlers';
import { TypeTag } from '~/components/macros/TypeTag';
import { BaseNodeWrapper } from '../nodeLayout/BaseNodeWrapper';
import type { HandleData } from '~/types/handleTypes';

type VariableInputData = {
    label: string;
    typeName: string;
    type: string;
    sourceHandles?: HandleData[];
    text?: string;
};

type VariableNodeType = Node<VariableInputData, 'variableInput'>;

export const VariableNode = memo(
    ({
        id,
        data,
        isConnectable,
    }: NodeProps<VariableNodeType>) => {
        const { updateNodeData } = useReactFlow();

        const minHeight = getNodeMinHeightCss({
            sources: data.sourceHandles?.length,
            handleInterval: 0,
        });

        return (
            <BaseNodeWrapper minHeight={minHeight}>
                <HStack align={'center'} justify={'center'} gap="1">
                    <TypeTag type={data.type} typeName={data.typeName} size="small" />
                    <TextField
                        size={'small'}
                        label={'Variable Name'}
                        value={data.text || ''}
                        hideLabel
                        onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
                    />
                </HStack>
                <HandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </BaseNodeWrapper>
        );
    }
);
