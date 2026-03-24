import { DataTypeDefinition, type DataTypeValue } from '~/types/data/datatypes';
import type { HandleData } from '~/types/handleTypes';
import type { Connection, Edge, Node } from '@xyflow/react';

export const isCollectionType = (type: DataTypeValue | string | undefined): boolean => {
    if (!type) return false;
    return type.startsWith('collection');
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
export const getTypeFromCollection = (type: DataTypeValue | string | undefined): DataTypeValue => {
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

export const isObjectTypeEqual = (
    type1: DataTypeValue | string | undefined,
    typename1: DataTypeValue | string | undefined,
    type2: DataTypeValue | string | undefined,
    typename2: DataTypeValue | string | undefined
) => {
    if (typename1 === '?' || typename2 === '?') {
        return type1 === type2;
    }
    return type1 === type2 && typename1 === typename2;
};

export const isObjectSameAsCollection = (handle1: HandleData, handle2: HandleData) => {
    if (isCollectionType(handle1.type) && isCollectionType(handle2.type)) {
        const collectionType1 = getTypeFromCollection(handle1.type);
        const collectionType2 = getTypeFromCollection(handle2.type);
        return isObjectTypeEqual(
            collectionType1,
            handle1.typeName,
            collectionType2,
            handle2.typeName
        );
    }
    if (isCollectionType(handle1.type)) {
        const collectionType = getTypeFromCollection(handle1.type);
        return isObjectTypeEqual(collectionType, handle1.typeName, handle2.type, handle2.typeName);
    } else {
        const collectionType = getTypeFromCollection(handle2.type);
        return isObjectTypeEqual(handle1.type, handle1.typeName, collectionType, handle2.typeName);
    }
};

export const isObjectMatchingDefinition = (handle1: HandleData, handle2: HandleData) => {
    if (handle1.type === handle2.type) {
        return handle1.typeName === handle2.typeName;
    }
    return false;
};

export const isConnectionAllowed = (
    edge: Edge | Connection,
    sourceNode: Node,
    targetNode: Node
): boolean => {
    if (targetNode.type === 'innerFlowOutput') return true;

    const sourceNodeData = sourceNode.data;
    const targetNodeData = targetNode.data;
    if (!sourceNodeData || !targetNodeData) return false;

    const sourceHandle: HandleData = sourceNodeData.sourceHandles
        ? Object.values(sourceNodeData.sourceHandles).find((h) => h.id === edge.sourceHandle)
        : sourceNodeData;

    const targetHandle: HandleData = targetNodeData.targetHandles
        ? Object.values(targetNodeData.targetHandles).find((h) => h.id === edge.targetHandle)
        : targetNodeData;

    if (
        sourceNode.type &&
        ['openObject', 'createObject'].includes(sourceNode.type) &&
        (targetHandle.type === DataTypeDefinition.Object || isCollectionType(targetHandle.type))
    ) {
        return true;
    }

    if (sourceHandle.type && targetHandle.type) {
        if (isCollectionType(sourceHandle.type) || isCollectionType(targetHandle.type)) {
            return isObjectSameAsCollection(sourceHandle, targetHandle);
        }
        if (sourceHandle.type === DataTypeDefinition.Object) {
            return isObjectMatchingDefinition(sourceHandle, targetHandle);
        }
        return sourceHandle.type === targetHandle.type;
    }
    return false;
};
