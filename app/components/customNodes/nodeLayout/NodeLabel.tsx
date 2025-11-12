import React from 'react';
import { BodyShort, Detail, VStack } from '@navikt/ds-react';

interface NodeLabelProps {
    label: string;
    size?: 'small' | 'medium' | 'large';
    italic?: boolean;
}

export const NodeLabel: React.FC<NodeLabelProps> = ({ label, italic = false, size = 'small' }) => {
    if (italic) {
        return (
            <VStack
                align={'start'}
                gap={'0'}
                style={{
                    position: 'absolute',
                    top: -22,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textWrap: 'nowrap',
                }}
            >
                <Detail>
                    <i>{label}</i>
                </Detail>
            </VStack>
        );
    }
    return (
        <BodyShort
            size={size}
            style={{
                position: 'absolute',
                top: -35,
                left: '50%',
                transform: 'translateX(-50%)',
                textWrap: 'nowrap',
            }}
        >
            {label}
        </BodyShort>
    );
};
