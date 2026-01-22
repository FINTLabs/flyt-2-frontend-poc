import type { HandleDataOld } from '~/types/handleTypes';
import { type Node, type NodeProps } from '@xyflow/react';
import React, { memo } from 'react';
import { HStack, Select } from '@navikt/ds-react';
import type { ConfigurationNodeType } from '~/types/flow/nodes';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { NodeContainer } from '~/components/customNodes/nodeLayout/NodeContainer';
import { TypeTag } from '~/components/customHandles/TypeTag';

export const ConfigurationNode = memo(
    ({ id, data, isConnectable }: NodeProps<ConfigurationNodeType>) => {
        // @ts-ignore
        return (
            <NodeContainer id={id} label={data.label} italic={true}>
                <HStack align={'center'} justify={'center'} gap="1">
                    {/*
                    <TypeTag typeConfigurationNode.tsx={data.type} typeName={data.typeName} size="small" />
*/}

                    <Select label="Velg bostedsland" size="small" hideLabel={true}>
                        <option>- Velg datakilde -</option>
                        <option value="norge">Norge</option>
                        <option value="sverige">Sverige</option>
                        <option value="danmark">Danmark</option>
                    </Select>
                </HStack>
                <HandlesWithLabel
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                />
            </NodeContainer>
        );
    }
);
