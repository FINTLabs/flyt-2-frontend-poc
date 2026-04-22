import React, { useMemo } from 'react';
import { Box } from '@navikt/ds-react';
import { NodeLabel } from './NodeLabel';
import ProgressIndicator from '~/components/customNodes/nodeLayout/ProgressIndicator';
import type { RunStatusType } from '~/types/generalTypes';
import { useFlow } from '~/context/flowContext';

interface BaseNodeWrapperProps {
    children: React.ReactNode;
    label?: string;
    italic?: boolean;
    minHeight?: string;
    padding?: string;
    currentStep?: number;
    maxWidth?: string;
    width?: string;
    height?: string;
    sublabel?: string;
}

export const NodeContainerWithProgress: React.FC<BaseNodeWrapperProps> = ({
    children,
    label,
    sublabel,
    italic,
    minHeight,
    padding = '2px',
    currentStep,
    maxWidth,
    width,
    height,
}) => {
    const { flowState, isEditable } = useFlow();

    const nodeState: RunStatusType | undefined = useMemo(() => {
        if (isEditable) return undefined;
        return flowState?.find((state) => state.step === currentStep)?.state;
    }, [flowState, currentStep]);

    return (
        <Box style={{ minHeight, padding: padding, maxWidth, width, height }}>
            {label && <NodeLabel label={label} italic={italic} sublabel={sublabel} />}
            {nodeState && (
                <Box
                    style={{
                        position: 'absolute',
                        top: -13,
                        left: '70%',
                    }}
                >
                    <ProgressIndicator state={nodeState} />
                </Box>
            )}
            {children}
        </Box>
    );
};
