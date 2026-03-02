import { type IInstanceMetadataContent } from '~/types/data/integration';
import type { IConfiguration, IValueMapping } from '~/types/data/configuration';
import type { CustomNode, DynamicStringNodeData } from '~/types/flow/nodes';
import type { Edge, Node } from '@xyflow/react';
import { defaultPosition } from '~/utils/constants';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { DataValueTypeAPI } from '~/types/data/dataValueTypeAPI';

const createNodeForValueMappingPerKey = (
    key: string,
    value: IValueMapping | undefined
): CustomNode | undefined => {
    if (value?.type === 'DYNAMIC_STRING') {
        return {
            id: `${key}-dynamicString`,
            type: 'dynamicString',
            data: {
                label: 'Opprett tekst',
                iconType: 'textEdit',
                typeName: 'test',
                textString: value.mappingString,
                type: value.type,
                sourceHandles: [
                    { id: 'a', type: DataValueTypeAPI.STRING, label: key, required: true },
                ],
                targetHandles: [
                    { id: 'a', type: DataValueTypeAPI.STRING, required: true },
                    { id: 'b', type: DataValueTypeAPI.STRING, required: true },
                    { id: 'c', type: DataValueTypeAPI.STRING, required: false },
                ],
            },
            position: defaultPosition,
        } as Node<DynamicStringNodeData>;
    }
};

export const createOutgoingDataNodes = (
    dataName: string,
    metadataContent?: IInstanceMetadataContent,
    configuration?: IConfiguration
): { nodes: CustomNode[]; edges: Edge[] } => {
    console.log('create data:', configuration);

    const nodes: CustomNode[] = [];

    const sl = configuration?.mapping.valueMappingPerKey?.['type'];

    if (sl && sl.mappingString === 'NEW') {
        const data = configuration?.mapping.objectMappingPerKey?.['newCase'];

        if (data?.valueMappingPerKey) {
            Object.keys(data?.valueMappingPerKey).forEach((key) => {
                const node = createNodeForValueMappingPerKey(key, data?.valueMappingPerKey?.[key]);
                if (node) {
                    nodes.push(node);
                }
            });
        }
    }

    return {
        nodes: nodes,
        edges: [],
    };
};
