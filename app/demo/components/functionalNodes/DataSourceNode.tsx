import type { HandleDataOld } from '~/types/handleTypes';
import { type Node, type NodeProps } from '@xyflow/react';
import React, { memo } from 'react';
import { BaseNodeWrapperOld } from '~/demo/components/BaseNodeWrapperOld';
import { HStack, Select } from '@navikt/ds-react';
import { TypeTagOld } from '~/components/macros/TypeTagOld';
import { HandlesWithLabelOld } from '~/demo/components/HandlesWithLabelOld';
import type { DataTypeValue } from '~/demo/types/datatypes';

type DataSourceData = {
    label: string;
    iconType?: string;
    type: DataTypeValue;
    sourceHandles?: HandleDataOld[];
    targetHandles?: HandleDataOld[];
    typeName: string;
    value?: string;
    options?: string[];
};

type DataSourceType = Node<DataSourceData, 'dataSource'>;

export const DataSourceNode = memo(({ id, data, isConnectable }: NodeProps<DataSourceType>) => {
    return (
        <BaseNodeWrapperOld label={data.label} italic={true}>
            <HStack align={'center'} justify={'center'} gap="1">
                <TypeTagOld type={data.type} typeName={data.typeName} size="small" />

                <Select label="Velg bostedsland" size="small" hideLabel={true}>
                    <option>- Velg datakilde -</option>
                    <option value="norge">Norge</option>
                    <option value="sverige">Sverige</option>
                    <option value="danmark">Danmark</option>
                </Select>
            </HStack>
            <HandlesWithLabelOld
                handles={data.sourceHandles}
                type={'source'}
                isConnectable={isConnectable}
            />
        </BaseNodeWrapperOld>
    );
});
