import {
    CheckmarkCircleFillIcon,
    CogRotationFillIcon,
    MenuElipsisHorizontalCircleFillIcon,
    XMarkOctagonFillIcon,
} from '@navikt/aksel-icons';
import type { RunStatusType } from '~/types/generalTypes';

const ProgressIndicator = ({ state }: { state: RunStatusType }) => {
    switch (state) {
        case 'running':
            return (
                <CogRotationFillIcon
                    color={'orange'}
                    className="progress-rotation"
                    title="a11y-title"
                    fontSize="2rem"
                />
            );
        case 'completed':
            return <CheckmarkCircleFillIcon color="green" fontSize="2rem" />;
        case 'pending':
            return <MenuElipsisHorizontalCircleFillIcon color="blue" fontSize="2rem" />;
        case 'failed':
            return <XMarkOctagonFillIcon color="red" fontSize="2rem" />;
        default:
            return null;
    }
};

export default ProgressIndicator;
