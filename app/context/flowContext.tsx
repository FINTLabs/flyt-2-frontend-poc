import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { type Node, type Edge, useUpdateNodeInternals } from '@xyflow/react';
import {
    allFunctionalNodes,
    allIntegrationsInputNodes,
    arkivInstanceOutput,
    defaultPosition,
    getInitialDemoNodes,
} from '~/demo/mockData/nodes';
import { initDemoEdges } from '~/demo/mockData/edges';
import type { BaseNodeData, CustomNodeOld } from '~/types/nodeTypes';
import { createAlmostRandomId } from '~/demo/utils/generalUtils';
import { useParams } from 'react-router';
import type { ArkivSakType, EgrvSakType, MockDataTypes } from '~/types/mockedDataTypes';
import type { RunlogType, RunStatusType } from '~/types/generalTypes';
import { runlogsForDemo } from '~/demo/mockData/runlogs';

const FLOW_STORAGE_KEY = 'fint-flyt';
const FLOW_ID_PREFIX = 'flyt-id';

type LocalStorageFlow = {
    id: string;
    name: string;
    nodes: CustomNodeOld[];
    edges: Edge[];
    createdAt: string;
    updatedAt: string;
    state?: 'active' | 'inactive';
};

export interface FlowContextType {
    initNodes: CustomNodeOld[];
    initEdges: Edge[];
    newNodeId: string | null;
    setNewNodeId: React.Dispatch<React.SetStateAction<string | null>>;
    getCustomNodeDataById: (id: string) => CustomNodeOld;
    currentFlow?: LocalStorageFlow;
    inputNode?: CustomNodeOld;
    outputNode?: CustomNodeOld;
    saveFlow: (flowId: string, nodes: CustomNodeOld[], edges: Edge[]) => void;
    saveNewFlow: (name: string, nodes: CustomNodeOld[], edges: Edge[]) => string;
    allFlows: LocalStorageFlow[];
    getAllFlows: () => LocalStorageFlow[] | undefined;
    deleteFLow: (flowId: string) => void;
    runDataThroughFlow: (runType: string, data: MockDataTypes) => Promise<void>;
    testFlowOutput: { runType: string; data: ArkivSakType } | undefined;
    isEditable?: boolean;
    getRunlogsByFlowId: (flowId: string) => RunlogType[];
    flowState: { step: number; state: RunStatusType }[] | undefined;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);
interface FlowProviderProps {
    children: ReactNode;
}

export const FlowProvider: React.FC<FlowProviderProps> = ({ children }) => {
    const { flowId: paramsFlowId, mode } = useParams();

    const [currentFlow, setCurrentFlow] = useState<LocalStorageFlow | undefined>(undefined);
    const isEditable = useMemo(() => mode === 'edit', [mode]);
    const [flowState, setFlowState] = useState<
        { step: number; state: RunStatusType }[] | undefined
    >(undefined);
    const [allFlows, setAllFlows] = useState<LocalStorageFlow[]>([]);
    const [initNodes, setInitialNodes] = useState<CustomNodeOld[]>([]);
    const [initEdges, setInitialEdges] = useState<Edge[]>([]);
    const [newNodeId, setNewNodeId] = useState<string | null>(null);
    const [testFlowOutput, setTestFlowOutput] = useState<
        { runType: string; data: ArkivSakType } | undefined
    >();
    const updateNodeInternals = useUpdateNodeInternals();

    const inputNode = useMemo(() => {
        return allIntegrationsInputNodes.find((node) =>
            currentFlow?.nodes.some((flowNode) => flowNode.type === node.type)
        );
    }, [currentFlow]);

    const outputNode = useMemo(() => {
        return currentFlow?.nodes.find(
            (flowNode: CustomNodeOld) => flowNode.type === arkivInstanceOutput.type
        );
    }, [currentFlow]);

    useEffect(() => {
        if (allFlows.length === 0) {
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
                    updateNodeInternals(flow.nodes.map((node) => node.id));
                } else {
                    setCurrentFlow(undefined);
                    setInitialNodes([]);
                    setInitialEdges([]);
                    updateNodeInternals([]);
                }
            }

            if (mode === 'view') {
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
            const flows = allFlows.length ? allFlows : getAllFlows() || [];
            return flows.find((flow) => flow.id === id);
        },
        [allFlows]
    );

    const getCustomNodeDataById = (id: string): Node<BaseNodeData> => {
        let newNode = allFunctionalNodes.find((node) => node.id === id);

        if (newNode) {
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
        (flowId: string, nodes: CustomNodeOld[], edges: Edge[]) => {
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
            return;
        }
        setAllFlows((prevFlows) => {
            const updatedFlows = prevFlows.filter((flow) => flow.id !== flowId);
            saveAllFlowsToLocaleStorage(updatedFlows);
            return updatedFlows;
        });
    }, []);

    const saveNewFlow = useCallback(
        (name: string, nodes: CustomNodeOld[], edges: Edge[]): string => {
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
                return updatedFlows;
            });
            return newFlowId;
        },
        []
    );

    const saveAllFlowsToLocaleStorage = (flows: LocalStorageFlow[]) => {
        localStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(flows));
    };

    const updateFlowState = (progress: number) => {
        setFlowState((prev) => {
            if (!prev) return prev;
            return prev.map((step) => {
                if (step.step < progress) {
                    return { ...step, state: 'completed' };
                } else if (step.step === progress) {
                    return { ...step, state: 'running' };
                } else {
                    return { ...step, state: 'pending' };
                }
            });
        });
    };

    const simulateFlowProgress = useCallback((): Promise<void> => {
        setFlowState([
            { step: 0, state: 'pending' },
            { step: 1, state: 'pending' },
            { step: 2, state: 'pending' },
            { step: 3, state: 'pending' },
            { step: 4, state: 'pending' },
            { step: 5, state: 'pending' },
        ]);
        return new Promise((resolve) => {
            let progress = 0;
            updateFlowState(progress);

            const progressIntervals = [200, 200, 200, 200, 1500, 200];

            const runNextStep = () => {
                progress += 1;
                updateFlowState(progress);

                if (progress >= 6) {
                    resolve();
                } else {
                    const nextInterval = progressIntervals[progress] || 500;
                    setTimeout(runNextStep, nextInterval);
                }
            };

            setTimeout(runNextStep, progressIntervals[0]);
        });
    }, []);

    const runDataThroughFlow = async (runType: string, data: MockDataTypes) => {
        if (runType === 'egrv sak') {
            setTestFlowOutput(undefined);
            await simulateFlowProgress();
            const egrData = data as EgrvSakType;
            console.log('Running data through flow:', data);
            const title = `${egrData.kommunenavn} kommune - ${egrData.prosjektnavn} gbnr ${egrData.gaardsnummer}/${egrData.bruksnummer} - Grunnerverv`;
            setTestFlowOutput({
                runType: 'egrv sak',
                data: {
                    tittel: title,
                    offentligTittel: title,
                    saksansvarlig: `'https://api.felleskomponent.no/arkiv/noark/arkivressurs/systemid/${egrData.saksansvarligEpost.split('@')[0]}'`,
                    arkivdel: '', // 'https://beta.felleskomponent.no/arkiv/noark/arkivdel/systemid/GRUNNERV',
                    saksstatus: '', // 'https://beta.felleskomponent.no/arkiv/kodeverk/saksstatus/systemid/R',
                    administrativEnhet: '', // 'https://beta.felleskomponent.no/arkiv/noark/administrativenhet/systemid/94',
                    skjerming: {},
                },
            });
        } else {
            console.warn('Unsupported run type:', runType);
        }
    };

    const getRunlogsByFlowId = (flowId: string): RunlogType[] => {
        if (flowId === 'demo') {
            return runlogsForDemo;
        } else {
            return [];
        }
    };

    const contextValue: FlowContextType = {
        currentFlow,
        inputNode,
        outputNode,
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
        runDataThroughFlow,
        testFlowOutput,
        isEditable,
        getRunlogsByFlowId,
        flowState,
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
