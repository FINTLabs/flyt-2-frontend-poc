import React, { useMemo } from 'react';
import { Box } from '@navikt/ds-react';
import { NodeLabel } from './NodeLabel';
import { getNodeMinHeight } from '~/utils/nodePositionUtils';

interface NodeContainerProps {
    id: string;
    sourceHandleAmount?: number;
    targetHandleAmount?: number;
    children: React.ReactNode;
    label?: string;
    italic?: boolean;
    minWidth?: number;
}

export const NodeContainer: React.FC<NodeContainerProps> = ({
    sourceHandleAmount = 0,
    targetHandleAmount = 0,
    children,
    label,
    italic,
}) => {
    const minHeight = useMemo(
        () =>
            getNodeMinHeight({
                sources: sourceHandleAmount,
                targets: targetHandleAmount,
            }),
        []
    );

    return (
        <Box style={{ minHeight: minHeight.cssString, margin: '2' }}>
            {label && <NodeLabel label={label} italic={italic} />}
            {children}
        </Box>
    );
};
