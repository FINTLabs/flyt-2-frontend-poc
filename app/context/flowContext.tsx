import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { type Node, type Edge, useUpdateNodeInternals } from '@xyflow/react';
import { allFunctionalNodes, defaultPosition, getInitialDemoNodes } from '~/mockData/nodes';
import { initDemoEdges } from '~/mockData/edges';
import type { BaseNodeData } from '~/types/nodeTypes';
import { createAlmostRandomId } from '~/utils/generalUtils';
import { useParams } from 'react-router';

const FLOW_STORAGE_KEY = 'fint-flyt';
const FLOW_ID_PREFIX = 'flyt-id';

type LocalStorageFlow = {
    id: string;
    name: string;
    nodes: Node[];
    edges: Edge[];
    createdAt: string;
    updatedAt: string;
    state?: 'active' | 'inactive';
};

export interface FlowContextType {
    initNodes: Node[];
    initEdges: Edge[];
    newNodeId: string | null;
    setNewNodeId: React.Dispatch<React.SetStateAction<string | null>>;
    getCustomNodeDataById: (id: string) => Node<BaseNodeData>;
    currentFlow?: LocalStorageFlow;
    saveFlow: (flowId: string, nodes: Node[], edges: Edge[]) => void;
    saveNewFlow: (name: string, nodes: Node[], edges: Edge[]) => void;
    allFlows: LocalStorageFlow[];
    getAllFlows: () => LocalStorageFlow[] | undefined;
    deleteFLow: (flowId: string) => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);
interface FlowProviderProps {
    children: ReactNode;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({ children }) => {
    const { flowId: paramsFlowId } = useParams();

    const [currentFlow, setCurrentFlow] = useState<LocalStorageFlow | undefined>(undefined);
    const [allFlows, setAllFlows] = useState<LocalStorageFlow[]>([]);
    const [initNodes, setInitialNodes] = useState<Node[]>([]);
    const [initEdges, setInitialEdges] = useState<Edge[]>([]);
    const [newNodeId, setNewNodeId] = useState<string | null>(null);
    const updateNodeInternals = useUpdateNodeInternals();

    useEffect(() => {
        if (allFlows.length === 0) {
            console.log('No flows found in state, checking localStorage...');
            const flows = getAllFlows();
            if (!flows || flows.length === 0) {
                const demoFlow = getDemoFLow();
                setAllFlows([demoFlow]);
                saveAllFlowsToLocaleStorage([demoFlow]);
            }
        }
    }, [allFlows]);

    useEffect(() => {
        if (paramsFlowId) {
            console.log('FlowId from params:', paramsFlowId);
            if (paramsFlowId === 'demo') {
                const nodes = getInitialDemoNodes();
                const demoFlow = getDemoFLow();
                setCurrentFlow(demoFlow);
                setInitialNodes(nodes);
                setInitialEdges(initDemoEdges);
                updateNodeInternals(nodes.map((node) => node.id));
            } else {
                const flow = getFlowById(paramsFlowId);
                if (flow) {
                    setCurrentFlow(flow);
                    setInitialNodes(flow.nodes);
                    setInitialEdges(flow.edges);
                } else {
                    setCurrentFlow(undefined);
                    setInitialNodes([]);
                    setInitialEdges([]);
                }
            }
        }
    }, [paramsFlowId]);

    const getDemoFLow = useCallback((): LocalStorageFlow => {
        const nodes = getInitialDemoNodes();
        return {
            id: 'demo',
            name: 'eGrunnerverv sak til arkiv',
            nodes,
            edges: initDemoEdges,
            createdAt: '3.20.2025',
            updatedAt: '3.20.2025',
            state: 'active',
        };
    }, []);

    const getAllFlows = useCallback(() => {
        const allRawFlows = localStorage.getItem(FLOW_STORAGE_KEY);
        if (allRawFlows) {
            const parsedFlows = JSON.parse(allRawFlows) as LocalStorageFlow[];
            setAllFlows(parsedFlows);
            return parsedFlows;
        } else {
        }
    }, []);

    const getFlowById = useCallback(
        (id: string): LocalStorageFlow | undefined => {
            return allFlows.find((flow) => flow.id === id);
        },
        [allFlows]
    );

    const getCustomNodeDataById = (id: string): Node<BaseNodeData> => {
        let newNode = allFunctionalNodes.find((node) => node.id === id);

        if (newNode) {
            console.log('Found newNode', newNode);
            return {
                ...newNode,
                id: createAlmostRandomId('node-id', id),
            };
        } else {
            return {
                id: createAlmostRandomId('node-id', id),
                type: 'input',
                position: defaultPosition,
                data: { label: `${newNodeId} node not found` },
            };
        }
    };

    const saveFlow = useCallback(
        (flowId: string, nodes: Node[], edges: Edge[]) => {
            console.log('Saving flow...', { nodes, edges });
            console.log('Save flow id:', flowId);
            setAllFlows((prevFlows) => {
                const updatedFlows = prevFlows.map((flow) => {
                    if (flow.id === flowId) {
                        return {
                            ...flow,
                            nodes,
                            edges,
                            updatedAt: new Date().toString(),
                        };
                    }
                    return flow;
                });
                saveAllFlowsToLocaleStorage(updatedFlows);
                return updatedFlows;
            });
        },
        [allFlows]
    );

    const deleteFLow = useCallback((flowId: string) => {
        if (flowId === 'demo') {
            console.warn('Cannot delete demo flow');
            return;
        }
        setAllFlows((prevFlows) => {
            const updatedFlows = prevFlows.filter((flow) => flow.id !== flowId);
            saveAllFlowsToLocaleStorage(updatedFlows);
            return updatedFlows;
        });
    }, []);

    const saveNewFlow = useCallback((name: string, nodes: Node[], edges: Edge[]) => {
        const newFlowId = createAlmostRandomId(FLOW_ID_PREFIX, name);
        setAllFlows((prevFlows) => {
            const newFlow: LocalStorageFlow = {
                id: newFlowId,
                name,
                nodes,
                edges,
                createdAt: new Date().toString(),
                updatedAt: new Date().toString(),
            };
            const updatedFlows = [...prevFlows, newFlow];
            saveAllFlowsToLocaleStorage(updatedFlows);
            setCurrentFlow(newFlow);
            // TODO: redirect to new flow
            return updatedFlows;
        });
    }, []);

    const saveAllFlowsToLocaleStorage = (flows: LocalStorageFlow[]) => {
        localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flows));
    };

    const contextValue: FlowContextType = {
        currentFlow,
        initNodes,
        initEdges,
        newNodeId,
        setNewNodeId,
        getCustomNodeDataById,
        saveFlow,
        saveNewFlow,
        allFlows,
        getAllFlows,
        deleteFLow,
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
