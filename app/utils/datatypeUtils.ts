import { DataTypeDefinition, type DataTypeValue } from '~/types/data/datatypes';
import type { HandleData } from '~/types/handleTypes';

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

export const isObjectSameAsCollection = (handle1: HandleData, handle2: HandleData) => {
    if (isCollectionType(handle1.type)) {
        const collectionType = getTypeFromCollection(handle1.type);
        return collectionType === handle2.type && handle1.typeName === handle2.typeName;
    } else {
        const collectionType = getTypeFromCollection(handle2.type);
        return collectionType === handle1.type && handle1.typeName === handle2.typeName;
    }
};

export const isObjectMatchingDefinition = (handle1: HandleData, handle2: HandleData) => {
    if (handle1.type === handle2.type) {
        return handle1.typeName === handle2.typeName;
    }
    return false;
};
