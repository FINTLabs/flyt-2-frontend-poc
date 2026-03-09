import { useCallback, useEffect } from 'react';
import ELK, { type LayoutOptions } from 'elkjs/lib/elk.bundled.js';
import { type Edge, useNodesInitialized, useReactFlow } from '@xyflow/react';
import type { CustomNode } from '~/types/flow/nodes';

const elk = new ELK();

// https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
export const layoutOptions: LayoutOptions = {
    'elk.algorithm': 'layered',
    'elk.direction': 'RIGHT',

    // Layering & cycle breaking (hvordan noder skal plasseres i lag???)
    // (https://eclipse.dev/elk/blog/posts/2025/25-08-21-layered.html)
    'elk.layered.layering.strategy': 'NETWORK_SIMPLEX', // NETWORK_SIMPLEX er default
    'elk.layered.cycleBreaking.strategy': 'GREEDY', // GREEDY er default
    'elk.layered.crossingMinimization.strategy': 'MEDIAN_LAYER_SWEEP', // LAYER_SWEEP er default
    'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF', // BRANDES_KOEPF er default

    // Disse kommer ann på BRANDES_KOEPF som nodePlacement.strategy
    'elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED', // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-nodePlacement-bk-fixedAlignment.html)
    'elk.layered.nodePlacement.bk.edgeStraightening': 'IMPROVE_STRAIGHTNESS', // (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-nodePlacement-bk-edgeStraightening.html)

    'elk.layered.nodePlacement.favorStraightEdges': 'true', // sant spesielt for orthogonal routing (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-nodePlacement-favorStraightEdges.html)
    'elk.edgeRouting': 'ORTHOGONAL', //(https://github.com/kieler/elkjs/issues/327)

    // Rydd bort unødvendige bendpoints
    'elk.layered.unnecessaryBendpoints': 'false', //(https://eclipse.dev/elk/reference/options.html)

    // Spacing:
    'elk.layered.spacing.nodeNodeBetweenLayers': '220', // mellom lag (https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html)
    'elk.layered.spacing.edgeNodeBetweenLayers': '50',
    'elk.spacing.nodeNode': '90', // i samme lag (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-strategy.html)
    'elk.spacing.edgeEdge': '20', // kant–kant (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-strategy.html)

    // Model order: bruk som *hint* for mer praktisk rekkefølge (uten å låse helt)
    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES', // eller NODES_AND_EDGES (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-considerModelOrder-strategy.html)
    'elk.layered.considerModelOrder.portModelOrder': 'true', // respekter portrekkefølge i modellen (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-considerModelOrder-portModelOrder.html)

    // Stabilitet/feilsøking
    'elk.randomSeed': '3',
    'elk.separateConnectedComponents': 'false',
};

// uses elkjs to give each node a layouted position
export const getLayoutedNodes = async (nodes: CustomNode[], edges: Edge[]) => {
    const { superRoot, superEdges } = createSuperRootGraph(nodes, edges);

    console.log('getLayoutedNodes', nodes);
    console.log('edges', edges);

    const children = [
        superRoot,
        ...nodes.map((n) => {
            const defaultTargetPortId = `${n.id}__t_default`;
            const defaultSourcePortId = `${n.id}__s_default`;

            const targetPorts =
                n.data.targetHandles?.map((t) => ({
                    id: t.id,
                    properties: { side: 'WEST' },
                })) ?? [];

            const sourcePorts =
                n.data.sourceHandles?.map((s) => ({
                    id: s.id,
                    properties: { side: 'EAST' },
                })) ?? [];

            let nodeProps: Record<string, unknown> = {};

            if (n.type === 'flowInput') {
                nodeProps['elk.layered.layering.layerConstraint'] = 'FIRST';
            }

            if (n.type === 'flowOutput') {
                nodeProps['elk.layered.layering.layerConstraint'] = 'LAST';
            }

            if (n.type === 'operationJoinText') {
                nodeProps['elk.layered.layering.layerConstraint'] = 'UPPER';
            }

            return {
                id: n.id,
                width: n.measured?.width ?? 150,
                height: n.measured?.height ?? 50,
                properties: nodeProps,
                ports: [
                    { id: defaultTargetPortId, properties: { side: 'WEST' } },
                    { id: defaultSourcePortId, properties: { side: 'EAST' } },
                    ...targetPorts,
                    ...sourcePorts,
                ],
            };
        }),
    ];

    const allEdges = [
        ...edges.map((e) => ({
            id: e.id,
            sources: [e.sourceHandle ?? `${e.source}__s_default`],
            targets: [e.targetHandle ?? `${e.target}__t_default`],
        })),
        ...superEdges,
    ];

    const graph = {
        id: 'root',
        layoutOptions,
        children,
        edges: allEdges,
    };

    console.log('GRAPH', graph);

    const layoutGraph = await elk.layout(graph);

    console.log('layoutGraph', layoutGraph);

    return nodes.map((node) => {
        const layoutNode = layoutGraph.children?.find((lgNode) => lgNode.id === node.id);

        return {
            ...node,
            position: {
                x: layoutNode?.x ?? 0,
                y: layoutNode?.y ?? 0,
            },
        };
    });
};

export default function useLayoutNodes() {
    const nodesInitialized = useNodesInitialized();
    const { getNodes, getEdges, setNodes, fitView } = useReactFlow<CustomNode>();

    const resetLayout = useCallback(() => {
        if (nodesInitialized) {
            const layoutNodes = async () => {
                const layoutedNodes = await getLayoutedNodes(getNodes(), getEdges());

                setNodes(layoutedNodes);
                // fitView();
            };

            layoutNodes();
        }
    }, [nodesInitialized]);

    useEffect(() => {
        if (nodesInitialized) {
            const layoutNodes = async () => {
                const layoutedNodes = await getLayoutedNodes(getNodes(), getEdges());

                setNodes(layoutedNodes);
                fitView();
            };

            layoutNodes();
        }
    }, [nodesInitialized, getNodes, getEdges, setNodes, fitView]);

    return {
        resetLayout,
    };
}

function createSuperRootGraph(nodes: CustomNode[], edges: Edge[]) {
    // 1. Finn alle innkommende target IDs
    const allTargets = new Set(edges.map((e) => e.target));

    // 2. Finn orphans: noder uten innkommende edges (men IKKE flowInput)
    const orphanNodes = nodes.filter((n) => !allTargets.has(n.id) && n.type !== 'flowInput');

    // 3. Lag super-root node (usynlig)
    const superRoot = {
        id: '__superroot__',
        width: 1,
        height: 1,
        properties: {
            'elk.layered.layering.layerConstraint': 'FIRST',
        },
        ports: [{ id: '__superroot__s', properties: { side: 'EAST' } }],
    };

    // 4. Lag edges fra super-root til orphan nodes
    const superEdges = orphanNodes.map((o) => ({
        id: `__superedge__${o.id}`,
        sources: ['__superroot__s'],
        targets: [`${o.id}__t_default`],
    }));

    return { superRoot, superEdges };
}
