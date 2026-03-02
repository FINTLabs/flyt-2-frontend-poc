import { type Node, type NodeProps } from '@xyflow/react';
import React, { memo, useState } from 'react';
import { HStack, Select } from '@navikt/ds-react';
import type { SakslogikkNodeType } from '~/types/flow/nodes';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { NodeContainer } from '~/components/customNodes/nodeLayout/NodeContainer';
import NodeOperationConversionIcon from '~/components/icons/NodeOperationConversionIcon';

const sakslogikkOptionTemplate = [
    {
        displayName: 'Ny',
        value: 'NEW',
    },
    {
        displayName: 'På søk, eller ny',
        value: 'BY_SEARCH_OR_NEW',
    },
    {
        displayName: 'På saksnummer',
        value: 'BY_ID',
    },
];

export const SakslogikkNode = memo(({ id, data, isConnectable }: NodeProps<SakslogikkNodeType>) => {
    const [selected, setSelected] = useState(data.selectedValue);

    // @ts-ignore
    return (
        <NodeContainer id={id} label={data.label} italic={true}>
            <HandlesWithLabel
                handles={data.targetHandles}
                type={'target'}
                isConnectable={isConnectable}
            />
            <HStack align={'center'} justify={'center'} gap="1">
                <NodeOperationConversionIcon width={16} height={16} />
                <Select
                    label="Velg sakslogikk"
                    size="small"
                    hideLabel={true}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                >
                    <option value="">- Velg sakslogikk -</option>
                    {sakslogikkOptionTemplate.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.displayName}
                            </option>
                        );
                    })}
                </Select>
            </HStack>
            <HandlesWithLabel
                handles={data.sourceHandles}
                type={'source'}
                isConnectable={isConnectable}
            />
        </NodeContainer>
    );
});
