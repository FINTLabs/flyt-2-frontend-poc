import type { Edge, Node } from '@xyflow/react';
import type { CustomNode, MetadataNodeData } from '~/types/flow/nodes';
import {
    type IInstanceMetadataCategory,
    type IInstanceMetadataContent,
    type IInstanceObjectCollectionMetadata,
    type IInstanceValueMetadata,
    ValueType,
} from '~/types/data/integration';
import type { HandleData, HandlesWithCategories } from '~/types/flow/edges';
export const defaultPosition = { x: 0, y: 0 };

export const initNodes: CustomNode[] = [];
export const initEdges: Edge[] = [];

const getMetadataHandles = (
    metadataContent?: IInstanceMetadataContent,
    categoryDisplayName?: string
): HandlesWithCategories => {
    const sourceHandles: HandlesWithCategories = [];

    if (metadataContent?.instanceValueMetadata) {
        metadataContent?.instanceValueMetadata.forEach((md: IInstanceValueMetadata) => {
            sourceHandles.push({
                id: md.key,
                label: md.displayName,
                required: true,
                type: md.type,
            });
        });
    }

    if (metadataContent?.instanceObjectCollectionMetadata) {
        // TODO: finn eksempel med dette

        metadataContent?.instanceObjectCollectionMetadata.forEach(
            (md: IInstanceObjectCollectionMetadata) => {
                sourceHandles.push({
                    id: md.key,
                    label: md.displayName,
                    required: true,
                    type: ValueType.COLLECTION,
                });
            }
        );
    }

    if (metadataContent?.categories) {
        metadataContent?.categories.forEach((mdCategory: IInstanceMetadataCategory) => {
            const categoryHandles = getMetadataHandles(mdCategory.content, mdCategory.displayName);
            sourceHandles.push({
                displayName: mdCategory.displayName,
                handles: categoryHandles as HandleData[],
            });
        });
    }

    return sourceHandles;
};

export const mapMetaDataToNode = (
    metadataContent?: IInstanceMetadataContent
): Node<MetadataNodeData> => {
    console.log('mapMetaDataToNode', metadataContent);
    const sourceHandles = getMetadataHandles(metadataContent);

    return {
        id: 'metadataInput',
        type: 'metadataNode',
        data: {
            label: 'Metadata',
            typeName: 'test',
            type: 'test',
            sourceHandles: sourceHandles,
            targetHandles: [],
        },
        position: defaultPosition,
    };
};
