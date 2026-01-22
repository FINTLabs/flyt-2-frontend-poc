import React, { memo, useMemo } from 'react';
import { type NodeProps } from '@xyflow/react';
import { BodyShort, HStack } from '@navikt/ds-react';
import type { MetadataNodeType } from '~/types/flow/nodes';
import { NodeContainer } from '~/components/customNodes/nodeLayout/NodeContainer';
import { MetadataHandles } from '~/components/customHandles/MetadataHandles';
import { countNumberOfMetadataHandleItems } from '~/utils/nodePositionUtils';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';

export const MetadataNode = memo(
    ({ id, data, isConnectable, width }: NodeProps<MetadataNodeType>) => {
        const totalHandleItems = useMemo(
            () => countNumberOfMetadataHandleItems(data.sourceHandles),
            []
        );

        return (
            <NodeContainer
                id={id}
                sourceHandleAmount={totalHandleItems}
                targetHandleAmount={data.targetHandles?.length}
                minWidth={width}
            >
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
                {data.targetHandles?.length && (
                    <HandlesWithLabel
                        handles={data.targetHandles}
                        type={'target'}
                        isConnectable={isConnectable}
                    />
                )}
            </NodeContainer>
        );
    }
);
