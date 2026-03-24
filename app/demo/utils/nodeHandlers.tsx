import type { Node } from '@xyflow/react';
import React, { type ChangeEvent } from 'react';
import NodeOperationConversionIcon from '~/components/icons/NodeOperationConversionIcon';
import {
    ArchiveFillIcon,
    ArrowsSquarepathIcon,
    CaretRightCircleFillIcon,
    CogIcon,
    EnvelopeClosedIcon,
    EnvelopeOpenIcon,
    FileExportFillIcon,
    FileIcon,
    FileImportFillIcon,
    FilePlusFillIcon,
    FilePlusIcon,
    FolderFileFillIcon,
    InboxDownFillIcon,
    InboxUpFillIcon,
    PencilWritingFillIcon,
    SquareFillIcon,
} from '@navikt/aksel-icons';
import { DataTypeDefinition, type DataTypeValue } from '~/types/data/datatypes';

import { measureTextWidth } from '~/utils/handleUtils';
import { isCollectionType } from '~/utils/datatypeUtils';

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
        case 'openObject':
        case 'lookup':
            return <FolderFileFillIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'createObject':
            return <FilePlusFillIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />;
        case 'handleObject':
            return <CogIcon height={isSmall ? 15 : 55} width={isSmall ? 15 : 55} />;
        case 'conversion':
            return (
                <NodeOperationConversionIcon height={isSmall ? 15 : 45} width={isSmall ? 15 : 45} />
            );
        case 'textEdit':
            return <PencilWritingFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'dataInstanceIn':
            return (
                <CaretRightCircleFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />
            );
        case 'dataInstanceOut':
            return <ArchiveFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
        case 'listOperation':
            return <ArrowsSquarepathIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 45} />;
        default:
            return <SquareFillIcon height={isSmall ? 15 : 35} width={isSmall ? 15 : 35} />;
    }
};
