import React from 'react';
import { BodyShort, Detail, VStack } from '@navikt/ds-react';

interface NodeLabelProps {
    label: string;
    size?: 'small' | 'medium' | 'large';
    italic?: boolean;
    sublabel?: string;
}

export const NodeLabel: React.FC<NodeLabelProps> = ({
    label,
    italic = false,
    size = 'small',
    sublabel,
}) => {
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
        <VStack>
            <BodyShort
                size={size}
                style={{
                    position: 'absolute',
                    top: sublabel ? -45 : -25,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textWrap: 'nowrap',
                }}
            >
                {label}
            </BodyShort>
            {sublabel && (
                <BodyShort
                    size={'small'}
                    style={{
                        fontSize: 'var(--a-font-size-small)',
                        position: 'absolute',
                        top: -25,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        textWrap: 'nowrap',
                    }}
                >
                    {sublabel}
                </BodyShort>
            )}
        </VStack>
    );
};
