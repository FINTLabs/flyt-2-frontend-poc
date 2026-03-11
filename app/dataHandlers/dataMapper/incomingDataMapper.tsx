import { type IInstanceMetadataContent } from '~/types/data/integration';
import {
    ConfigValueType,
    type IConfiguration,
    type IValueMapping,
} from '~/types/data/configuration';
import { mapMetaDataToNode } from '~/dataHandlers/dataMapper/metadataMapper';
import { mapConfigurationToNode } from '~/dataHandlers/dataMapper/configurationMapper';
import type { Edge, Node } from '@xyflow/react';
import type {
    ConfigurationNodeData,
    CustomNode,
    IncomingDataNodeData,
    SakslogikkNodeData,
} from '~/types/flow/nodes';
import { defaultPosition } from '~/utils/constants';
import { DataValueTypeAPI } from '~/types/data/dataValueTypeAPI';

const mapConfigValueTypeToDataType = (type: ConfigValueType): DataValueTypeAPI | undefined => {
    switch (type) {
        case ConfigValueType.STRING:
            return DataValueTypeAPI.STRING;
        case ConfigValueType.BOOLEAN:
            return DataValueTypeAPI.BOOLEAN;
        case ConfigValueType.URL:
            return DataValueTypeAPI.URL;
        case ConfigValueType.FILE:
            return DataValueTypeAPI.FILE;
        case ConfigValueType.DYNAMIC_STRING:
        default:
            return undefined;
    }
};

const createEdge = (
    sourceId: string,
    sourceHandleId: string,
    targetId: string,
    targetHandleId: string
): Edge => {
    return {
        id: `e-${sourceId}-${targetId}`,
        source: sourceId,
        sourceHandle: sourceHandleId,
        target: targetId,
        targetHandle: targetHandleId,
        type: 'step',
    };
};

const createIncomingDataNode = (dataName: string): Node<IncomingDataNodeData> => {
    return {
        id: 'dataName-incomingData',
        type: 'incomingData',
        data: {
            label: dataName,
            typeName: dataName,
            type: DataValueTypeAPI.DATA_OBJECT,
            iconType: 'dataInstanceIn',
            sourceHandles: [
                {
                    id: 'dataName-incomingData:s:a',
                    label: dataName,
                    type: DataValueTypeAPI.DATA_OBJECT,
                    typeName: dataName,
                    required: true,
                },
            ],
        },
        position: defaultPosition,
    };
};

const createDataTypeHandle = (dataName: string, identifier: string) => {
    return {
        id: `${dataName}-${identifier}`,
        label: 'Skjema',
        required: true,
        type: DataValueTypeAPI.DATA_OBJECT,
        typeName: dataName,
        categoryName: dataName,
    };
};

const createSakslogikkNode = (
    value: IValueMapping | undefined
): Node<SakslogikkNodeData> | undefined => {
    if (value) {
        return {
            id: 'sakslogikk',
            type: 'sakslogikkNode',
            data: {
                label: 'Sakslogikk',
                typeName: '',
                selectedValue: value.mappingString,
                type: value.type,
                sourceHandles: [],
                targetHandles: [],
            },
            position: defaultPosition,
        } as Node<SakslogikkNodeData>;
    }
};

export const createIncomingDataNodes = (
    dataName: string,
    metadataContent?: IInstanceMetadataContent,
    configuration?: IConfiguration
): { nodes: CustomNode[]; edges: Edge[] } => {
    let nodes: CustomNode[] = [];
    let edges: Edge[] = [];

    const dataNode = createIncomingDataNode(dataName);
    const dataNodeSourceHandle = createDataTypeHandle(dataName, 'incomingdatasource');
    dataNode.data.sourceHandles = [dataNodeSourceHandle];
    nodes.push(dataNode);

    const vmtype = configuration?.mapping.valueMappingPerKey?.['type'];
    const sakslogikkNode: Node<ConfigurationNodeData> | undefined = createSakslogikkNode(vmtype);

    const metadataNode = mapMetaDataToNode(metadataContent);
    const metadataTargetHandle = createDataTypeHandle(dataName, 'metadatatarget');
    metadataNode.data.targetHandles = [metadataTargetHandle];
    nodes.push(metadataNode);
    const mapping = configuration?.mapping;

    if (sakslogikkNode) {
        const sakslogikkTargetHandle = createDataTypeHandle(dataName, 'sakslogikktarget');
        const sakslogikkSourceHandle = createDataTypeHandle(dataName, 'sakslogikksource');
        sakslogikkNode.data.targetHandles = [sakslogikkTargetHandle];
        sakslogikkNode.data.sourceHandles = [sakslogikkSourceHandle];

        nodes.push(sakslogikkNode);
        const edge1 = createEdge(
            dataNode.id,
            dataNodeSourceHandle.id,
            sakslogikkNode.id,
            sakslogikkTargetHandle.id
        );
        edges.push(edge1);
        const edge2 = createEdge(
            sakslogikkNode.id,
            sakslogikkSourceHandle.id,
            metadataNode.id,
            metadataTargetHandle.id
        );

        edges.push(edge2);
    }

    return { nodes, edges };
};
