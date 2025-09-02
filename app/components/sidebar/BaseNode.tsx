import { useFlow } from '~/context/flowContext';
import { Box, Detail } from '@navikt/ds-react';
import type { BaseNodeData } from '~/types/nodeTypes';
import type { Node } from '@xyflow/react';

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
            paddingInline={'2'}
            borderRadius={'small'}
            draggable
            onDragStart={(event) => onDragStart(event, node.id)}>
            <Detail>{label}</Detail>
        </Box>
    );
};
