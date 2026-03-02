import React, { memo, useMemo } from 'react';
import { type NodeProps } from '@xyflow/react';
import type { MetadataNodeType } from '~/types/flow/nodes';
import { NodeContainer } from '~/components/customNodes/nodeLayout/NodeContainer';
import { MetadataHandles } from '~/components/customHandles/MetadataHandles';
import { countNumberOfMetadataHandleItems } from '~/utils/nodePositionUtils';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { getNodeMinHeight } from '~/demo/utils/nodeHandlers';
import { NodeIcon } from '~/components/customNodes/nodeLayout/NodeIcon';

export const MetadataNode = memo(
    ({ id, data, isConnectable, width }: NodeProps<MetadataNodeType>) => {
        const totalHandleItems = useMemo(
            () => countNumberOfMetadataHandleItems(data.sourceHandles),
            []
        );

        const minHeight = useMemo(
            () =>
                getNodeMinHeight({
                    sources: totalHandleItems,
                    targets: data.targetHandles?.length,
                }),
            []
        );

        return (
            <NodeContainer
                id={id}
                label={'Metadata'}
                subLabel={data.label}
                minHeight={minHeight.cssString}
            >
                <NodeIcon iconName={'openData2'} minHeight={minHeight.cssString} />
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
