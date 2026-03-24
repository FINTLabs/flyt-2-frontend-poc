import { useCallback, useEffect } from 'react';
import ELK, { type LayoutOptions } from 'elkjs/lib/elk.bundled.js';
import { type Edge, type Node, useNodesInitialized, useReactFlow } from '@xyflow/react';
import type { CustomNode } from '~/types/flow/nodes';

const elk = new ELK();

// https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
export const layoutOptionsFirstattempts: LayoutOptions = {
    'elk.algorithm': 'layered',
    'elk.direction': 'RIGHT',

    // Layering & cycle breaking (hvordan noder skal plasseres i lag???)
    // (https://eclipse.dev/elk/blog/posts/2025/25-08-21-layered.html)
    'elk.layered.layering.strategy': 'NETWORK_SIMPLEX', // NETWORK_SIMPLEX er default
    'elk.layered.cycleBreaking.strategy': 'GREEDY', // GREEDY er default
    'elk.layered.crossingMinimization.strategy': 'MEDIAN_LAYER_SWEEP', // LAYER_SWEEP er default
    'elk.layered.nodePlacement.strategy': 'BRANDES_KOEPF', // BRANDES_KOEPF er default

    // Disse kommer ann på BRANDES_KOEPF som nodePlacement.strategy
    'elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED', // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-nodePlacement-bk-fixedAlignment.html
    //'elk.layered.nodePlacement.bk.edgeStraightening': 'IMPROVE_STRAIGHTNESS', // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-nodePlacement-bk-edgeStraightening.html

    'elk.layered.nodePlacement.favorStraightEdges': 'true', // sant spesielt for orthogonal routing https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-nodePlacement-favorStraightEdges.html
    'elk.edgeRouting': 'ORTHOGONAL', // https://github.com/kieler/elkjs/issues/327

    // Rydd bort unødvendige bendpoints
    // 'elk.layered.unnecessaryBendpoints': 'false', // https://eclipse.dev/elk/reference/options.html

    // Spacing:
    'elk.layered.spacing.nodeNodeBetweenLayers': '220', // mellom lag (https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html)
    'elk.layered.spacing.edgeNodeBetweenLayers': '50',
    'elk.spacing.nodeNode': '90', // i samme lag (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-strategy.html)
    'elk.spacing.edgeEdge': '20', // kant–kant (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-strategy.html)

    // Model order: bruk som *hint* for mer praktisk rekkefølge (uten å låse helt)
    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES', // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-considerModelOrder-strategy.html

    // Stabilitet/feilsøking
    'elk.randomSeed': '42',
    'elk.separateConnectedComponents': 'false',
};

export const layoutOptions: LayoutOptions = {
    'elk.algorithm': 'layered',
    'elk.direction': 'RIGHT',

    'elk.edgeRouting': 'ORTHOGONAL',
    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES',

    'elk.spacing.nodeNode': '150',
    'elk.layered.spacing.nodeNodeBetweenLayers': '150',
    'elk.layered.spacing.edgeEdgeBetweenLayers': '50',
    'elk.layered.spacing.edgeNodeBetweenLayers': '150',
};

export const getLayoutedNodes = async (
    nodes: CustomNode[],
    edges: Edge[]
): Promise<{ layoutedNodes: CustomNode[]; layeredEdges: Edge[] }> => {
    const { superRoot, superEdges } = createSuperRootGraph(nodes, edges);

    const elkChildren = [
        superRoot,
        ...nodes.map((n) => {
            const targetPorts = n.data.targetHandles?.map((t) => ({
                id: t.id,
                properties: { side: 'WEST' },
            })) ?? [{ id: n.id }];

            const sourcePorts = n.data.sourceHandles?.map((s) => ({
                id: s.id,
                properties: { side: 'EAST' },
            })) ?? [{ id: n.id }];

            let nodeProps: Record<string, unknown> = {};

            if (n.type === 'operationJoinText') {
                nodeProps['org.eclipse.elk.portConstraints'] = 'FIXED_ORDER';
            }

            if (n.type === 'flowInput') {
                nodeProps['elk.layered.layering.layerConstraint'] = 'FIRST';
            }

            if (n.type === 'flowOutput') {
                nodeProps['elk.layered.layering.layerConstraint'] = 'LAST';
            }

            return {
                id: n.id,
                width: n.measured?.width ?? 150,
                height: n.measured?.height ?? 50,
                properties: nodeProps,
                ports: [{ id: n.id }, ...targetPorts, ...sourcePorts],
            };
        }),
    ];

    const elkEdges = [
        ...edges.map((e) => ({
            id: e.id,
            sources: [e.sourceHandle || e.source],
            targets: [e.targetHandle || e.target],
        })),
        ...superEdges,
    ];

    const graph = {
        id: 'root',
        layoutOptions,
        children: elkChildren,
        edges: elkEdges,
    };

    const layoutGraph = await elk.layout(graph);

    const layoutedNodes = nodes.map((node) => {
        const layoutNode = layoutGraph.children?.find((lgNode) => lgNode.id === node.id);

        return {
            ...node,
            position: {
                x: layoutNode?.x ?? 0,
                y: layoutNode?.y ?? 0,
            },
        };
    });

    const layeredEdges: Edge[] = layoutGraph.edges
        .map((edge) => {
            const initialEdge = edges.find((e) => e.id === edge.id);
            if (initialEdge) {
                // @ts-ignore
                const points = edge.sections[0].bendPoints;

                return {
                    ...initialEdge,
                    sources: edge.sources[0],
                    targets: edge.targets[0],
                    sourceHandle: initialEdge.sourceHandle,
                    targetHandle: initialEdge.targetHandle,
                    // @ts-ignore
                    data: { ...edge.data, bendPoints: points },
                };
            }
        })
        .filter((edge) => edge !== undefined);

    return {
        layoutedNodes,
        layeredEdges,
    };
};

export default function useLayoutNodes() {
    const nodesInitialized = useNodesInitialized();
    const { getNodes, getEdges, setNodes, setEdges, fitView } = useReactFlow<CustomNode>();

    const resetLayout = useCallback(() => {
        if (nodesInitialized) {
            const layoutNodes = async () => {
                const { layoutedNodes, layeredEdges } = await getLayoutedNodes(
                    getNodes(),
                    getEdges()
                );

                setNodes(layoutedNodes);
                setEdges(layeredEdges);
                // fitView();
            };

            layoutNodes();
        }
    }, [nodesInitialized]);

    /*    useEffect(() => {
        if (nodesInitialized) {
            const layoutNodes = async () => {
                const { layoutedNodes, layeredEdges } = await getLayoutedNodes(
                    getNodes(),
                    getEdges()
                );

                setNodes(layoutedNodes);
                setEdges(layeredEdges);
                fitView();
            };

            layoutNodes();
        }
    }, [nodesInitialized, getNodes, getEdges, setNodes, fitView]);*/

    return {
        resetLayout,
    };
}

function createSuperRootGraph(nodes: CustomNode[], edges: Edge[]) {
    const allTargets = new Set(edges.map((e) => e.target));
    const orphanNodes = nodes.filter((n) => !allTargets.has(n.id) && n.type !== 'flowInput');

    const superRoot = {
        id: '__superroot__',
        width: 1,
        height: 1,
        properties: {
            'elk.layered.layering.layerConstraint': 'FIRST',
        },
        ports: [{ id: '__superroot__s', properties: { side: 'EAST' } }],
    };

    const superEdges = orphanNodes.map((o) => ({
        id: `__superedge__${o.id}`,
        sources: ['__superroot__s'],
        targets: [o.id],
    }));

    return { superRoot, superEdges };
}
