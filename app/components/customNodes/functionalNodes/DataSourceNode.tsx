import type { HandleData } from '~/types/handleTypes';
import { type Node, type NodeProps } from '@xyflow/react';
import React, { memo } from 'react';
import { BaseNodeWrapper } from '~/components/customNodes/nodeLayout/BaseNodeWrapper';
import { HStack, Select } from '@navikt/ds-react';
import { TypeTag } from '~/components/macros/TypeTag';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import type { DataTypeValue } from '~/types/datatypes';

type DataSourceData = {
    label: string;
    iconType?: string;
    type: DataTypeValue;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
    typeName: string;
    value?: string;
    options?: string[];
};

type DataSourceType = Node<DataSourceData, 'dataSource'>;

export const DataSourceNode = memo(({ id, data, isConnectable }: NodeProps<DataSourceType>) => {
    return (
        <BaseNodeWrapper label={data.label} italic={true}>
            <HStack align={'center'} justify={'center'} gap="1">
                <TypeTag type={data.type} typeName={data.typeName} size="small" />

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
        </BaseNodeWrapper>
    );
});
