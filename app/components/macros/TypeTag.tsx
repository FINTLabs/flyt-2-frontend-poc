import { BodyShort, Box, Detail, Tag } from '@navikt/ds-react';
import { getTypeSymbol } from '~/utils/nodeHandlers';

export const TypeTag = ({
    type,
    typeName,
    className = '',
    size = 'medium',
}: {
    type: string;
    typeName?: string;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}) => {
    if (size === 'medium') {
        return (
            <Tag variant="neutral" size="small">
                {getTypeSymbol(type, typeName)}
            </Tag>
        );
    } else if (size === 'small') {
        return (
            <Box
                borderWidth="1"
                borderRadius="2"
                borderColor="border-default"
                background="bg-default"
            >
                {getTypeSymbol(type, typeName)}
            </Box>
        );
    }
};
