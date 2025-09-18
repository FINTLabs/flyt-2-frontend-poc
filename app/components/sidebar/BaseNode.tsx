import { useFlow } from '~/context/flowContext';
import { Box, Detail, HStack } from '@navikt/ds-react';
import type { BaseNodeData } from '~/types/nodeTypes';
import type { Node } from '@xyflow/react';
import { DragVerticalIcon } from '@navikt/aksel-icons';
import { getNodeIcon } from '~/utils/nodeHandlers';

export const BaseNode = ({ label, node }: { label: string; node: Node<BaseNodeData> }) => {
    const { setNewNodeId } = useFlow();

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeId: string) => {
        console.log('Sidebar onDragStart', nodeId);
        setNewNodeId(nodeId);
        event.dataTransfer.effectAllowed = 'move';
    };
    return (
        <Box
            className={`menu-base-node menu-node-${node.type}`}
            borderWidth="1"
            paddingInline={'2 0'}
            borderRadius={'small'}
            draggable
            onDragStart={(event) => onDragStart(event, node.id)}>
            <HStack wrap={false} justify={'space-between'} align={'center'} gap={'2'}>
                {getNodeIcon(node.data.iconType, true)}
                <Detail truncate>{label}</Detail>
                <DragVerticalIcon title="a11y-title" fontSize="1.5rem" />
            </HStack>
        </Box>
    );
};
