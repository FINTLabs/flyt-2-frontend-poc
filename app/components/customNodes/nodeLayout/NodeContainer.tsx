import React, { useMemo } from 'react';
import { Box } from '@navikt/ds-react';
import { NodeLabel } from './NodeLabel';
import { NODE_BASE_WIDTH } from '~/utils/constants';
import { getNodeMinHeight } from '~/utils/nodeSizeUtils';

interface NodeContainerProps {
    id: string;
    sourceHandleAmount?: number;
    targetHandleAmount?: number;
    children: React.ReactNode;
    label?: string;
    italic?: boolean;
    subLabel?: string;
    minWidth?: number;
    minHeight?: string;
}

export const NodeContainer: React.FC<NodeContainerProps> = ({
    sourceHandleAmount = 0,
    targetHandleAmount = 0,
    children,
    label,
    subLabel,
    italic,
    minWidth = NODE_BASE_WIDTH,
    minHeight,
}) => {
    return (
        <Box style={{ minHeight, margin: '2', minWidth }}>
            {label && <NodeLabel label={label} italic={italic} sublabel={subLabel} />}
            {children}
        </Box>
    );
};
