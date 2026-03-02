import React from 'react';
import { VStack } from '@navikt/ds-react';
import { getNodeIcon } from '~/demo/utils/nodeHandlers';
import { NODE_BASE_HEIGHT } from '~/utils/constants';

interface NodeIconProps {
    iconName: string;
    minHeight?: string | number;
}

export const NodeIcon: React.FC<NodeIconProps> = ({ iconName, minHeight = NODE_BASE_HEIGHT }) => {
    return (
        <VStack align={'center'} justify={'center'} style={{ minHeight }}>
            {getNodeIcon(iconName)}
        </VStack>
    );
};
