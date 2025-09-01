import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { type Node, type Edge, useUpdateNodeInternals} from '@xyflow/react';
import { onChangeNodeColor } from '~/utils/nodeHandlers';
import { getInitialDemoNodes } from '~/mockData/nodes';
import { initDemoEdges } from '~/mockData/edges';

export interface FlowContextType {
    initNodes: Node[];
    initEdges: Edge[];
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);
interface FlowProviderProps {
  children: ReactNode;
  flowId: string;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({
  children,
  flowId,
}) => {
  const [initNodes, setInitialNodes] = useState<Node[]>([]);
  const [initEdges, setInitialEdges] = useState<Edge[]>([]);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    if (flowId === 'demo') {
        const nodes = getInitialDemoNodes();
        setInitialNodes(nodes);
        setInitialEdges(initDemoEdges);
        updateNodeInternals(nodes.map((node) => node.id));
    }

}, []);


  const contextValue: FlowContextType = {
    initNodes,
    initEdges
  };

  return (
    <FlowContext.Provider value={contextValue}>
      {children}
    </FlowContext.Provider>
  );
};

export const useFlow = (): FlowContextType => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};