import React, { memo } from 'react';
import { type NodeProps, type Node } from '@xyflow/react';
import { BodyShort, HStack } from '@navikt/ds-react';
import type { IncomingDataNodeType } from '~/types/flow/nodes';
import { HandlesWithLabel } from '~/components/customHandles/HandlesWithLabel';
import { NodeContainer } from '~/components/customNodes/nodeLayout/NodeContainer';
import { TypeTag } from '~/components/customHandles/TypeTag';

import { DataValueTypeAPI } from '~/types/data/dataValueTypeAPI';

export const IncomingDataNode = memo(
    ({ id, data, isConnectable }: NodeProps<IncomingDataNodeType>) => {
        return (
            <NodeContainer id={id}>
                <HStack align={'center'} gap="1" style={{ minHeight: 'inherit' }}>
                    <TypeTag type={data.type as DataValueTypeAPI} typeName={data.typeName} />
                    <BodyShort size={'small'}>{data.label}</BodyShort>
                </HStack>
                {data.sourceHandles?.length && (
                    <HandlesWithLabel
                        handles={data.sourceHandles}
                        type={'source'}
                        isConnectable={isConnectable}
                        hideLabels={true}
                    />
                )}
            </NodeContainer>
        );
    }
);
