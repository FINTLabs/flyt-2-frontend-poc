import type { HandleData } from '~/types/handleTypes';
import type { Node, NodeProps } from '@xyflow/react';
import React, { memo } from 'react';
import { BaseNodeWrapper } from '~/components/customNodes/nodeLayout/BaseNodeWrapper';
import { BodyShort, HStack } from '@navikt/ds-react';
import { TypeTag } from '~/components/macros/TypeTag';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import type { DataTypeValue } from '~/types/datatypes';

type InnerFlowDataNodeData = {
    label: string;
    type: DataTypeValue;
    typeName: string;
    iconType?: string;
    sourceHandles?: HandleData[];
    targetHandles?: HandleData[];
};

type InnerFlowDataNodeType = Node<InnerFlowDataNodeData, 'innerFlowInput' | 'innerFlowOutput'>;

export const InnerFlowDataNode = memo(
    ({ id, data, isConnectable, type }: NodeProps<InnerFlowDataNodeType>) => {
        console.log('Rendering InnerFlowDataNode', id, data);
        const isInput = type === 'innerFlowInput';
        const handleType = isInput ? 'source' : 'target';
        return (
            <BaseNodeWrapper>
                <HStack align={'center'} gap="1">
                    <TypeTag type={data.type} typeName={data.typeName} />
                    <BodyShort size={'small'}>{data.label}</BodyShort>
                </HStack>
                {data.sourceHandles?.length && (
                    <HandlesWithLabel
                        handles={data.sourceHandles}
                        type={handleType}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
                {data.targetHandles?.length && (
                    <HandlesWithLabel
                        handles={data.targetHandles}
                        type={handleType}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
            </BaseNodeWrapper>
        );
    }
);
