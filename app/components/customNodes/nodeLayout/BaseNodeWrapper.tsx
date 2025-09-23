import React from 'react';
import { Box } from '@navikt/ds-react';
import { NodeLabel } from './NodeLabel';

interface BaseNodeWrapperProps {
    children: React.ReactNode;
    label?: string;
    subLabel?: string;
    minHeight?: string;
    margin?: string;
}

export const BaseNodeWrapper: React.FC<BaseNodeWrapperProps> = ({
    children,
    label,
    subLabel,
    minHeight,
    margin = '2',
}) => {
    return (
        <Box style={{ minHeight, margin }}>
            {label && <NodeLabel label={label} subLabel={subLabel}/>}
            {children}
        </Box>
    );
};
