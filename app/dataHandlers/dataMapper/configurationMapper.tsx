import { DataValueType, type IInstanceMetadataContent } from '~/types/data/integration';
import type { Node } from '@xyflow/react';
import type { ConfigurationNodeData, CustomNode, MetadataNodeData } from '~/types/flow/nodes';
import {
    ConfigValueType,
    type IConfiguration,
    type IValueMapping,
} from '~/types/data/configuration';
import { DataTypeOld } from '~/demo/types/datatypes';
import { defaultPosition } from '~/utils/constants';

export const mapConfigurationToNode = (
    configuration?: IConfiguration
): Node<ConfigurationNodeData>[] => {
    let allConfigNodes: Node<ConfigurationNodeData>[] = [
        {
            id: 'configuration',
            type: 'configNode',
            data: {
                label: 'Metadata',
                typeName: 'test',
                type: 'test',
                sourceHandles: [],
                targetHandles: [],
            },
            position: defaultPosition,
        },
    ];

    const mapping = configuration?.mapping;
    console.log('mapConfigurationToNode mapping', mapping);

    return allConfigNodes;
};
