import { BodyShort, Box, Detail, HStack, Tag } from '@navikt/ds-react';
import type { DataTypeValue } from '~/types/datatypes';
import React from 'react';
import DataTypeText from '~/components/icons/DataTypeText';
import { BulletListIcon, FileIcon, LinkIcon, QuestionmarkIcon } from '@navikt/aksel-icons';

type TypeProps = {
    type: DataTypeValue | string;
    typeName?: string;
    className?: string;
    size?: 'small' | 'medium' | 'large';
    required?: boolean;
    inner?: boolean;
};

export const TypeTag = ({
    type,
    typeName,
    className = '',
    size = 'medium',
    required = true,
    inner = false,
}: TypeProps) => {
    if (size === 'medium') {
        return (
            <Tag variant="neutral" size="small">
                <TypeSymbol type={type} typeName={typeName} size="medium" />
            </Tag>
        );
    } else if (size === 'small') {
        return (
            <Box
                borderWidth={inner ? '0 0 0 1' : '1'}
                borderRadius={inner ? '0' : '2'}
                borderColor="border-default"
                background="surface-subtle"
                style={{
                    borderStyle: required ? 'solid' : 'dashed',
                }}>
                <TypeSymbol type={type} typeName={typeName} size="small" />
            </Box>
        );
    }
};

const TypeSymbol = ({ type, typeName, size }: TypeProps) => {
    if (!type) return typeName ?? undefined;
    if (type === 'object') {
        return (
            <p
                style={{
                    textWrap: 'nowrap',
                    lineHeight: '0.9rem',
                    margin: '0 2px',
                    fontSize: '0.7rem',
                }}>{`{${typeName}}`}</p>
        );
    }
    if (type === 'collectionObject') {
        return (
            <HStack wrap={false} gap={'space-1'} align="center">
                <BulletListIcon fontSize="0.9rem" />
                <TypeTag type="object" typeName={typeName} size={size} inner={true} />
            </HStack>
        );
    }
    if (type === 'text' || type === 'input') return <DataTypeText />;
    if (type === 'reference') return <LinkIcon fontSize="0.95rem" />;
    if (type === 'undefined') return <QuestionmarkIcon fontSize="0.9rem" />
    if (type === 'file') return <FileIcon fontSize="0.9rem" />
    return typeName;
};
