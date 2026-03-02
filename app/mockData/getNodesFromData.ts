import type { HandleData } from '~/types/handleTypes';
import { arkivsakMetadata } from '~/mockData/eGrunnerverv/arkivsak';

export const getSourceHandlesFromMetadata = (): HandleData[] => {
    return arkivsakMetadata.map((metadata) => {
        return {
            id: metadata.id,
            type: metadata.type,
            required: true,
            label: metadata.displayName,
            typeName: metadata.type,
            categoryName: undefined,
        };
    });
};
