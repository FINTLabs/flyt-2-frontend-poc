import React from 'react';
import { BodyShort } from '@navikt/ds-react';

interface NodeLabelProps {
    label: string;
    size?: 'small' | 'medium' | 'large';
    subLabel?: string;
}

export const NodeLabel: React.FC<NodeLabelProps> = ({ label, subLabel, size = 'small' }) => {
    return (
        <BodyShort
            size={size}
            style={{
                position: 'absolute',
                top: -25,
                left: '50%',
                transform: 'translateX(-50%)',
                textWrap: 'nowrap',
            }}>
            {label}
        </BodyShort>
    );
};
