import React from 'react';
import NodeOperationConversionIcon from '~/components/icons/NodeOperationConversionIcon';
import {
    ArchiveFillIcon,
    ArrowsSquarepathIcon,
    CaretRightCircleFillIcon,
    CogIcon,
    FilePlusFillIcon,
    FolderFileFillIcon,
    PencilWritingFillIcon,
    SquareFillIcon,
} from '@navikt/aksel-icons';

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
