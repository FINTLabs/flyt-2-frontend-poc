import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { type Node, type Edge, useUpdateNodeInternals } from '@xyflow/react';
import { allFunctionalNodes, defaultPosition, getInitialDemoNodes } from '~/mockData/nodes';
import { initDemoEdges } from '~/mockData/edges';
import type { BaseNodeData } from '~/types/nodeTypes';
import { createAlmostRandomId } from '~/utils/nodeHandlers';

export interface FlowContextType {
    initNodes: Node[];
    initEdges: Edge[];
    newNodeId: string | null;
    setNewNodeId: React.Dispatch<React.SetStateAction<string | null>>;
    getNodeDataById: (id: string) => Node<BaseNodeData>;
    flowId?: string;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);
interface FlowProviderProps {
    children: ReactNode;
    flowId: string;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({ children, flowId }) => {
    const [initNodes, setInitialNodes] = useState<Node[]>([]);
    const [initEdges, setInitialEdges] = useState<Edge[]>([]);
    const [newNodeId, setNewNodeId] = useState<string | null>(null);

    const updateNodeInternals = useUpdateNodeInternals();

    useEffect(() => {
        if (flowId === 'demo') {
            const nodes = getInitialDemoNodes();
            setInitialNodes(nodes);
            setInitialEdges(initDemoEdges);
            updateNodeInternals(nodes.map((node) => node.id));
        }
    }, [flowId]);

    const getNodeDataById = (id: string): Node<BaseNodeData> => {
        let newNode = allFunctionalNodes.find((node) => node.id === id);

        if (newNode) {
            return {
                ...newNode,
                id: createAlmostRandomId(id),
            };
        } else {
            return {
                id: createAlmostRandomId(id),
                type: 'input',
                position: defaultPosition,
                data: { label: `${newNodeId} node not found` },
            };
        }
    };

    const contextValue: FlowContextType = {
        flowId,
        initNodes,
        initEdges,
        newNodeId,
        setNewNodeId,
        getNodeDataById,
    };

    return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
};

export const useFlow = (): FlowContextType => {
    const context = useContext(FlowContext);
    if (context === undefined) {
        throw new Error('useFlow must be used within a FlowProvider');
    }
    return context;
};
