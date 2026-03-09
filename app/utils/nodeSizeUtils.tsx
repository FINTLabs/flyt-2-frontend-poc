import { HANDLE_INTERVAL, NODE_BASE_HEIGHT } from '~/utils/constants';

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
