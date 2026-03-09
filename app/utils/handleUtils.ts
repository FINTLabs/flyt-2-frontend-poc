import { DataTypeDefinition, type DataTypeValue } from '~/types/data/datatypes';
import { HANDLE_HEIGHT, HANDLE_INTERVAL } from '~/utils/constants';

const SIZE_15: readonly DataTypeValue[] = [
    DataTypeDefinition.Text,
    DataTypeDefinition.Input,
    DataTypeDefinition.Reference,
    DataTypeDefinition.Undefined,
    DataTypeDefinition.File,
    DataTypeDefinition.Boolean,
] as const;

export const measureTextWidth = (
    text: string,
    fontSize: string = '0.875rem',
    fontFamily: string = '"Source Sans 3", "Source Sans Pro", Arial, sans-serif'
): number => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
        context.font = `${fontSize} ${fontFamily}`;
        const metrics = context.measureText(text);
        return metrics.width + 4;
    }
    return text.length * 8 + 8;
};
export const getValueTypeSymbolWidth = (type?: DataTypeValue, typeText?: string): number => {
    if (!type) {
        return typeText ? measureTextWidth(typeText) : 0;
    }

    if (SIZE_15.includes(type)) {
        return 15;
    }

    if (type === DataTypeDefinition.Object) {
        const text = `{${typeText}}`;
        return measureTextWidth(text, '0.75rem');
    }

    if (type.startsWith('collection')) {
        if (type === DataTypeDefinition.CollectionObject) {
            const text = `{${typeText}}`;
            const textWidth = measureTextWidth(text, '0.75rem');
            return textWidth + 15;
        } else {
            return 30;
        }
    }
    return typeText ? measureTextWidth(typeText) : 0;
};
export const getValueTypeFromCollection = (type: string): DataTypeValue => {
    if (type === DataTypeDefinition.CollectionObject) {
        return DataTypeDefinition.Object;
    }
    return DataTypeDefinition.File;
};
export const calculateHandlePosition = (
    index: number,
    totalHandles: number,
    interval: number = HANDLE_INTERVAL
): string => {
    if (totalHandles === 1) {
        return '50%';
    }
    const isEven = totalHandles % 2 === 0;
    const middleIndex = isEven ? totalHandles / 2 - 1 : Math.floor(totalHandles / 2);
    const offsetFromMiddle = index - middleIndex;
    return `calc(50% + ${(offsetFromMiddle - (isEven ? 0.5 : 0)) * interval - HANDLE_HEIGHT / 2}px)`;
};
