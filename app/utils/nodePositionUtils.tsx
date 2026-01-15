import { HANDLE_INTERVAL, NODE_BASE_HEIGHT } from '~/utils/constants';
import type { HandleData } from '~/types/flow/edges';

export const countNumberOfMetadataHandleItems = (items?: HandleData[]): number => {
    if (!items) return 0;

    const uniqueCategories = new Set(
        items.map((h) => h.categoryName).filter((name): name is string => Boolean(name))
    );

    return items.length + uniqueCategories.size;
};

export const getNodeMinHeight = ({
    targets,
    sources,
    handleInterval = HANDLE_INTERVAL,
    baseHeight = NODE_BASE_HEIGHT,
}: {
    targets?: number | undefined;
    sources?: number | undefined;
    handleInterval?: number;
    baseHeight?: number;
}): { number: number; cssString: string } => {
    const leftHandles = targets || 0;
    const rightHandles = sources || 0;
    const maxHandles = Math.max(leftHandles, rightHandles);

    const height = (maxHandles - 1) * handleInterval + baseHeight;

    return {
        number: height,
        cssString: height > 1 ? `${height}px` : 'auto',
    };
};

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

export const getHandlesByCategory = (handles: HandleData[]): Record<string, HandleData[]> => {
    return handles.reduce<Record<string, HandleData[]>>((acc, handle) => {
        if (!handle.categoryName) {
            return acc;
        }

        if (!acc[handle.categoryName]) {
            acc[handle.categoryName] = [];
        }

        acc[handle.categoryName].push(handle);
        return acc;
    }, {});
};
