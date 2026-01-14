import React from 'react';
import { Box } from '@navikt/ds-react';
import { NodeLabel } from './NodeLabel';

interface BaseNodeWrapperProps {
    children: React.ReactNode;
    label?: string;
    italic?: boolean;
    minHeight?: string;
    margin?: string;
    currentStep?: number;
}

export const BaseNodeWrapper: React.FC<BaseNodeWrapperProps> = ({
    children,
    label,
    italic,
    minHeight,
    margin = '2',
    currentStep,
}) => {
    return (
        <Box style={{ minHeight, margin }}>
            {label && <NodeLabel label={label} italic={italic} />}
            {children}
        </Box>
    );
};
