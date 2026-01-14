import React, { useMemo } from 'react';
import { Box } from '@navikt/ds-react';
import { NodeLabel } from '../../components/customNodes/nodeLayout/NodeLabel';
import ProgressIndicator from '~/demo/components/functionalNodes/ProgressIndicator';
import type { RunStatusType } from '~/types/generalTypes';
import { useFlow } from '~/context/flowContext';

interface BaseNodeWrapperProps {
    children: React.ReactNode;
    label?: string;
    italic?: boolean;
    minHeight?: string;
    margin?: string;
    currentStep?: number;
}

export const BaseNodeWrapperOld: React.FC<BaseNodeWrapperProps> = ({
    children,
    label,
    italic,
    minHeight,
    margin = '2',
    currentStep,
}) => {
    const { flowState, isEditable } = useFlow();

    const nodeState: RunStatusType | undefined = useMemo(() => {
        if (isEditable) return undefined;
        return flowState?.find((state) => state.step === currentStep)?.state;
    }, [flowState, currentStep]);

    return (
        <Box style={{ minHeight, margin }}>
            {label && <NodeLabel label={label} italic={italic} />}
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
