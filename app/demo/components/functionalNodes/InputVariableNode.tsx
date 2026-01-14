import React, { memo } from 'react';
import { type NodeProps, type Node, useReactFlow } from '@xyflow/react';
import { HStack, TextField } from '@navikt/ds-react';
import { HandlesWithLabelOld } from '~/demo/components/HandlesWithLabelOld';
import { TypeTagOld } from '~/components/macros/TypeTagOld';
import { BaseNodeWrapperOld } from '../BaseNodeWrapperOld';
import type { HandleDataOld } from '~/types/handleTypes';
import { useFlow } from '~/context/flowContext';

type VariableInputData = {
    label: string;
    typeName: string;
    type: string;
    sourceHandles?: HandleDataOld[];
    text?: string;
};

type VariableNodeType = Node<VariableInputData, 'variableInput'>;

export const InputVariableNode = memo(
    ({ id, data, isConnectable }: NodeProps<VariableNodeType>) => {
        const { updateNodeData } = useReactFlow();
        const { isEditable } = useFlow();

        return (
            <BaseNodeWrapperOld>
                <HStack align={'center'} justify={'center'} gap="1">
                    <TypeTagOld type={data.type} typeName={data.typeName} size="small" />
                    <TextField
                        size={'small'}
                        label={'Variable Name'}
                        disabled={!isEditable}
                        value={data.text || ''}
                        hideLabel
                        onChange={(evt) => updateNodeData(id, { text: evt.target.value })}
                    />
                </HStack>
                <HandlesWithLabelOld
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </BaseNodeWrapperOld>
        );
    }
);
