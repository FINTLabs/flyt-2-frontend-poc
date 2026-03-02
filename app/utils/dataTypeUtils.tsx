import { measureTextWidth } from '~/utils/nodePositionUtils';
import { DataTypeDefinition, type DataTypeValue } from '~/types/data/datatypes';
import { measureTextWidthOld } from '~/demo/utils/nodeHandlers';

const SIZE_15: readonly DataTypeValue[] = [
    DataTypeDefinition.Text,
    DataTypeDefinition.Input,
    DataTypeDefinition.Reference,
    DataTypeDefinition.Undefined,
    DataTypeDefinition.File,
    DataTypeDefinition.Boolean,
] as const;

export const getValueTypeSymbolWidth = (type?: DataTypeValue, typeText?: string): number => {
    if (!type) {
        return typeText ? measureTextWidth(typeText) : 0;
    }

    if (SIZE_15.includes(type)) {
        return 15;
    }

    if (type === DataTypeDefinition.Object) {
        const text = `{${typeText}}`;
        return measureTextWidth(text, '0.7rem');
    }

    if (type.startsWith('Collection')) {
        if (type === DataTypeDefinition.CollectionObject) {
            const text = `{${typeText}}`;
            const textWidth = measureTextWidthOld(text, '0.7rem');
            return textWidth + 15;
        } else {
            return 30;
        }
    }
    return typeText ? measureTextWidth(typeText) : 0;
};

export const getValueTypeFromCollection = (type: string): DataTypeValue => {
    return DataTypeDefinition.File;
};
