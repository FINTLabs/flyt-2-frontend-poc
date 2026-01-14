import { HANDLE_INTERVAL, NODE_BASE_HEIGHT } from '~/utils/constants';
import type { HandlesWithCategories } from '~/types/flow/edges';

export const countNumberOfMetadataHandleItems = (items: HandlesWithCategories): number => {
    return items.reduce((count, item) => {
        if ('handles' in item) {
            return count + 1 + item.handles.length;
        } else {
            return count + 1;
        }
    }, 0);
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
