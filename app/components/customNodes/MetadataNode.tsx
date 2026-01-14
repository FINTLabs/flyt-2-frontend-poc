import React, { memo, useEffect } from 'react';
import { type NodeProps } from '@xyflow/react';
import { BodyShort, HStack } from '@navikt/ds-react';
import type { MetadataNodeType } from '~/types/flow/nodes';
import { BaseNodeWrapper } from '~/components/customNodes/nodeLayout/BaseNodeWrapper';
import { MetadataHandles } from '~/components/customHandles/MetadataHandles';
import { countNumberOfMetadataHandleItems, getNodeMinHeight } from '~/utils/nodePositionUtils';

export const MetadataNode = memo(({ data, isConnectable }: NodeProps<MetadataNodeType>) => {
    const totalHandleItems = countNumberOfMetadataHandleItems(data.sourceHandles ?? []);
    const minHeight = getNodeMinHeight({
        sources: totalHandleItems,
        targets: data.targetHandles?.length,
    });

    useEffect(() => {
        console.log('data.sourceHandles', data.sourceHandles);
    }, []);
    return (
        <BaseNodeWrapper minHeight={minHeight.cssString}>
            <HStack align={'center'} gap="1">
                <BodyShort size={'small'}>{data.label}</BodyShort>
            </HStack>
            {data.sourceHandles?.length && (
                <MetadataHandles
                    handles={data.sourceHandles}
                    type={'source'}
                    isConnectable={isConnectable}
                    totalItems={totalHandleItems}
                />
            )}
        </BaseNodeWrapper>
    );
});
