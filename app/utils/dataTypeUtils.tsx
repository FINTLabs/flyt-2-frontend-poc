import { DataValueType, type ValueTypeValue } from '~/types/data/integration';
import { measureTextWidth } from '~/utils/nodePositionUtils';

export const getValueTypeSymbolWidth = (type?: DataValueType, typeText?: string): number => {
    if (!type) {
        return typeText ? measureTextWidth(typeText) : 0;
    }

    /*
    if (type === 'object') {
        const text = `{${typeText}}`;
        return measureTextWidth(text, '0.7rem');
    }
*/

    /*    if (type === ValueType.COLLECTION) {
        const text = `{${typeText}}`;
        const textWidth = measureTextWidth(text, '0.7rem');
        return textWidth + 15;
    }*/

    if (type === DataValueType.COLLECTION) {
        return 30;
    }
    if (type === DataValueType.STRING) {
        return 15;
    }
    return typeText ? measureTextWidth(typeText) : 0;
};

export const getValueTypeFromCollection = (type: string): ValueTypeValue => {
    return DataValueType.FILE;
};
