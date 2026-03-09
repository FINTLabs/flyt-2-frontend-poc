import type { Node } from '@xyflow/react';
import React, { type ChangeEvent } from 'react';
import NodeOperationConversionIcon from '~/components/icons/NodeOperationConversionIcon';
import {
    ArrowsSquarepathIcon,
    CogIcon,
    EnvelopeClosedIcon,
    EnvelopeOpenIcon,
    FileExportFillIcon,
    FileImportFillIcon,
    FolderFileFillIcon,
    InboxDownFillIcon,
    InboxUpFillIcon,
    PencilWritingFillIcon,
    SquareFillIcon,
} from '@navikt/aksel-icons';
import { DataTypeDefinition, type DataTypeValue } from '~/types/data/datatypes';

import { measureTextWidth } from '~/utils/handleUtils';

export const onChangeNodeColor = (
    event: ChangeEvent<HTMLInputElement>,
    allNodes: Node[]
): { newColor: string; newNodes: Node[] } => {
    const newNodes = allNodes.map((node: Node) => {
        if (node.id === '2') {
            return { ...node, data: { ...node.data, color: event.target.value } };
        }
        return node;
    });

    return { newColor: event.target.value, newNodes };
};

export const getTypeSymbolWidth = (type?: DataTypeValue, typeText?: string): number => {
    if (!type) {
        return typeText ? measureTextWidth(typeText) : 0;
    }

    if (type === 'object') {
        const text = `{${typeText}}`;
        return measureTextWidth(text, '0.7rem');
    }

    if (isCollectionType(type)) {
        if (type === DataTypeDefinition.CollectionObject) {
            const text = `{${typeText}}`;
            const textWidth = measureTextWidth(text, '0.7rem');
            return textWidth + 15;
        } else {
            return 30;
        }
    }

    if (
        type === 'text' ||
        type === 'input' ||
        type === 'reference' ||
        type === 'undefined' ||
        type === 'file' ||
        type === 'boolean'
    ) {
        return 15;
    }

    return typeText ? measureTextWidth(typeText) : 0;
};

export const getNodeIcon = (iconType: string | undefined, isSmall?: true) => {
    switch (iconType) {
        case 'handleObject':
            return <CogIcon height={isSmall ? 15 : 55} width={isSmall ? 15 : 55} />;
        case 'conversion':
            return (
                <NodeOperationConversionIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />
            );
        case 'lookup':
            return <FolderFileFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'openData':
            return <FileExportFillIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'openData2':
            return <EnvelopeOpenIcon height={isSmall ? 15 : 40} width={isSmall ? 15 : 40} />;
        case 'packData':
            return <FileImportFillIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'packData2':
            return <EnvelopeClosedIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'textEdit':
            return <PencilWritingFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'dataInstanceIn':
            return <InboxDownFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'dataInstanceOut':
            return <InboxUpFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'listOperation':
            return <ArrowsSquarepathIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 45} />;
        default:
            return <SquareFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
    }
};

export const getCollectionTypeFromType = (
    type: DataTypeValue | string | undefined
): DataTypeValue => {
    if (!type) return DataTypeDefinition.Undefined;
    if (type === DataTypeDefinition.Object) return DataTypeDefinition.CollectionObject;
    if (type === DataTypeDefinition.Undefined) return DataTypeDefinition.CollectionUndefined;
    if (type === DataTypeDefinition.Text) return DataTypeDefinition.CollectionText;
    if (type === DataTypeDefinition.Number) return DataTypeDefinition.CollectionNumber;
    if (type === DataTypeDefinition.Boolean) return DataTypeDefinition.CollectionBoolean;
    if (type === DataTypeDefinition.File) return DataTypeDefinition.CollectionFile;
    if (type === DataTypeDefinition.Reference) return DataTypeDefinition.CollectionReference;

    return DataTypeDefinition.Undefined;
};

export const getTypeFromCollectionOld = (
    type: DataTypeValue | string | undefined
): DataTypeValue => {
    if (!type) return DataTypeDefinition.CollectionUndefined;
    if (type === DataTypeDefinition.CollectionObject) return DataTypeDefinition.Object;
    if (type === DataTypeDefinition.CollectionUndefined) return DataTypeDefinition.Undefined;
    if (type === DataTypeDefinition.CollectionText) return DataTypeDefinition.Text;
    if (type === DataTypeDefinition.CollectionNumber) return DataTypeDefinition.Number;
    if (type === DataTypeDefinition.CollectionBoolean) return DataTypeDefinition.Boolean;
    if (type === DataTypeDefinition.CollectionFile) return DataTypeDefinition.File;
    if (type === DataTypeDefinition.CollectionReference) return DataTypeDefinition.Reference;

    return DataTypeDefinition.CollectionUndefined;
};

export const isCollectionType = (type: DataTypeValue | string | undefined): boolean => {
    if (!type) return false;
    return type.startsWith('collection');
};
