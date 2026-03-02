import { Box, HStack, Tag } from '@navikt/ds-react';
import { DataTypeDefinition, type DataTypeValue } from '~/types/data/datatypes';
import React from 'react';
import DataTypeText from '~/components/icons/DataTypeText';
import {
    BulletListIcon,
    FileIcon,
    LinkIcon,
    QuestionmarkDiamondIcon,
    QuestionmarkIcon,
} from '@navikt/aksel-icons';
import { getValueTypeFromCollection } from '~/utils/dataTypeUtils';

type TypeProps = {
    type: DataTypeValue;
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
            <Tag className={'type-tag'} variant="neutral" size="small">
                <TypeSymbol type={type} typeName={typeName} size="medium" />
            </Tag>
        );
    } else if (size === 'small') {
        return (
            <Box
                borderWidth={inner ? '0 0 0 1' : '1'}
                className={'type-tag'}
                borderRadius={inner ? '0' : '2'}
                borderColor="border-default"
                style={{
                    borderStyle: required ? 'solid' : 'dashed',
                }}
            >
                <TypeSymbol type={type} typeName={typeName} size="small" />
            </Box>
        );
    }
};

const TypeSymbol = ({ type, typeName, size }: TypeProps) => {
    if (!type) return typeName ?? undefined;
    if (type === DataTypeDefinition.Object) {
        return (
            <p
                style={{
                    textWrap: 'nowrap',
                    lineHeight: '0.9rem',
                    margin: '0 2px',
                    fontSize: '0.7rem',
                }}
            >
                {`{${typeName}}`}
            </p>
        );
    }
    if (type === DataTypeDefinition.Text) {
        return <DataTypeText />;
    }
    if (type === DataTypeDefinition.Reference) return <LinkIcon fontSize="0.95rem" />;
    if (type === DataTypeDefinition.Undefined) return <QuestionmarkIcon fontSize="0.9rem" />;
    if (type === DataTypeDefinition.Boolean) return <QuestionmarkDiamondIcon fontSize="0.9rem" />;

    if (type.startsWith('Collection')) {
        const innertype = getValueTypeFromCollection(type);

        return (
            <HStack wrap={false} gap={'space-1'} align="center">
                <BulletListIcon fontSize="0.9rem" />
                <TypeTag type={innertype} typeName={typeName} size={size} inner={true} />
            </HStack>
        );
    }
    if (type === DataTypeDefinition.File) {
        return <FileIcon fontSize="0.9rem" />;
    }
    return typeName;
};
