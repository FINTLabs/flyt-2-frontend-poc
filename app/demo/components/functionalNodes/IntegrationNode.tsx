import React, { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import { BodyShort, HStack } from '@navikt/ds-react';
import { TypeTagOld } from '~/components/macros/TypeTagOld';
import { BaseNodeWrapperOld } from '../BaseNodeWrapperOld';
import type { HandleDataOld } from '~/types/handleTypes';
import { HandlesWithLabelOld } from '~/demo/components/HandlesWithLabelOld';

type IntegrationNodeData = {
    label: string;
    typeName: string;
    type: string;
    sourceHandles?: HandleDataOld[];
    targetHandles?: HandleDataOld[];
};

type IntegrationNodeType = Node<IntegrationNodeData, 'flowOutput' | 'flowInput'>;

export const IntegrationNode = memo(
    ({ data, isConnectable, type }: NodeProps<IntegrationNodeType>) => {
        const isInput = type === 'flowInput';
        const handleType = isInput ? 'source' : 'target';
        return (
            <BaseNodeWrapperOld>
                <HStack align={'center'} gap="1">
                    <TypeTagOld type={data.type} typeName={data.typeName} />
                    <BodyShort size={'small'}>{data.label}</BodyShort>
                </HStack>
                {data.sourceHandles?.length && (
                    <HandlesWithLabelOld
                        handles={data.sourceHandles}
                        type={handleType}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
                {data.targetHandles?.length && (
                    <HandlesWithLabelOld
                        handles={data.targetHandles}
                        type={handleType}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
            </BaseNodeWrapperOld>
        );
    }
);
