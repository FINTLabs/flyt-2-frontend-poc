import type { HandleData } from '~/types/handleTypes';
import { type Node, type NodeProps, useReactFlow } from '@xyflow/react';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { NodeContainerWithProgress } from '~/components/customNodes/nodeLayout/NodeContainerWithProgress';
import { BodyShort, HStack, Select, UNSAFE_Combobox } from '@navikt/ds-react';
import type { DataTypeValue } from '~/types/data/datatypes';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { TypeTag } from '~/components/customHandles/TypeTag';

type Option = { label: string; value: string };

type DataSourceData = {
    label: string;
    iconType?: string;
    type: DataTypeValue;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
    typeName: string;
    value?: string;
    options?: { id: string; displayName: string }[];
    selectedOption?: string;
};

type DataSourceType = Node<DataSourceData, 'dataSource'>;

export const DataSourceNode = memo(({ id, data, isConnectable }: NodeProps<DataSourceType>) => {
    const reactFlow = useReactFlow();

    const selectOptions = useMemo(
        () =>
            data.options?.map((op) => ({
                label: op.displayName.trim(),
                value: String(op.id),
            })) ?? [],
        [data.options]
    );

    const selectedLabel = useMemo(() => {
        if (!data.selectedOption || !selectOptions.length) return undefined;
        return selectOptions.find((o) => o.value === data.selectedOption)?.label;
    }, [data.selectedOption, selectOptions]);

    const onToggleSelected = useCallback(
        (value: string, isSelected: boolean) => {
            reactFlow.updateNodeData(id, {
                selectedOption: isSelected ? value : undefined,
            });
        },
        [id, reactFlow]
    );
    return (
        <NodeContainerWithProgress label={'Datakilde'} width={'300px'} sublabel={data.label}>
            <HStack align={'center'} justify={'center'} gap="1" wrap={false}>
                <TypeTag type={data.type} typeName={data.typeName} size="small" />
                <UNSAFE_Combobox
                    className={'node-combobox'}
                    inputClassName={'node-combobox-input'}
                    label={data.label}
                    size={'small'}
                    options={selectOptions}
                    hideLabel
                    selectedOptions={selectedLabel ? [selectedLabel] : []}
                    onToggleSelected={onToggleSelected}
                />
            </HStack>
            <HandlesWithLabel
                handles={data.sourceHandles}
                type={'source'}
                isConnectable={isConnectable}
            />
        </NodeContainerWithProgress>
    );
});
