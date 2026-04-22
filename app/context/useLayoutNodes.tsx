import { useCallback } from 'react';
import ELK, { type LayoutOptions, type ElkNode } from 'elkjs/lib/elk.bundled.js';
import { type Edge, type Node, useNodesInitialized, useReactFlow } from '@xyflow/react';
import type { CustomNode } from '~/types/flow/nodes';
import { NODE_HEIGHT_EXPANDED, NODE_WIDTH_EXPANDED } from '~/utils/constants';

const elk = new ELK();

// https://www.eclipse.org/elk/reference/algorithms/org-eclipse-elk-layered.html
// https://eclipse.dev/elk/blog/posts/2025/25-08-21-layered.html

export const layoutOptions: LayoutOptions = {
    'elk.algorithm': 'layered',
    'elk.direction': 'RIGHT',

    'elk.edgeRouting': 'ORTHOGONAL', // https://github.com/kieler/elkjs/issues/327
    'elk.layered.considerModelOrder.strategy': 'NODES_AND_EDGES', // https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-considerModelOrder-strategy.html

    'elk.spacing.nodeNode': '150', // i samme lag (https://eclipse.dev/elk/reference/options/org-eclipse-elk-layered-crossingMinimization-strategy.html)
    'elk.layered.spacing.nodeNodeBetweenLayers': '150', // mellom lag (https://eclipse.dev/elk/reference/algorithms/org-eclipse-elk-layered.html)
    'elk.layered.spacing.edgeEdgeBetweenLayers': '50',
    'elk.layered.spacing.edgeNodeBetweenLayers': '150',

    'elk.hierarchyHandling': 'INCLUDE_CHILDREN',
};

function createSuperRootGraph(nodes: CustomNode[], edges: Edge[]) {
    const allTargets = new Set(edges.map((e) => e.target));
    const orphanNodes = nodes.filter(
        (n) => !allTargets.has(n.id) && n.type !== 'flowInput' && !n.parentId
    );

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

function buildNodeProperties(node: CustomNode): LayoutOptions {
    const options: LayoutOptions = {};

    if (node.type === 'operationJoinText') {
        options['org.eclipse.elk.portConstraints'] = 'FIXED_ORDER';
    }

    if (node.type === 'flowInput') {
        options['elk.layered.layering.layerConstraint'] = 'FIRST';
    }

    if (node.type === 'flowOutput') {
        options['elk.layered.layering.layerConstraint'] = 'LAST';
    }

    if (isParentNode(node)) {
        options['elk.algorithm'] = 'layered';
        options['elk.direction'] = 'RIGHT';

        options['elk.spacing.nodeNode'] = '150';
        options['elk.layered.spacing.nodeNodeBetweenLayers'] = '150';
        options['elk.padding'] = '[top=40,left=40,bottom=40,right=40]';
        options['elk.hierarchyHandling'] = 'INCLUDE_CHILDREN';
    }
    return options;
}

function buildPorts(node: CustomNode) {
    const targetPorts = node.data.targetHandles?.map((t) => ({
        id: t.id,
        properties: { side: 'WEST' },
    })) ?? [{ id: node.id }];

    const sourcePorts = node.data.sourceHandles?.map((s) => ({
        id: s.id,
        properties: { side: 'EAST' },
    })) ?? [{ id: node.id }];

    return [{ id: node.id }, ...targetPorts, ...sourcePorts];
}

function isParentNode(node: CustomNode, nodes?: CustomNode[]) {
    // return nodes.some((n) => n.parentId === node.id);
    return node.type === 'listOperation';
}

function buildElkNodeMap(nodes: CustomNode[]): Map<string, ElkNode> {
    const map = new Map<string, ElkNode>();

    nodes.forEach((node) => {
        map.set(node.id, {
            id: node.id,

            width: isParentNode(node)
                ? (node.width ?? NODE_WIDTH_EXPANDED)
                : (node.measured?.width ?? 150),

            height: isParentNode(node)
                ? (node.height ?? NODE_HEIGHT_EXPANDED)
                : (node.measured?.height ?? 50),

            layoutOptions: buildNodeProperties(node),
            ports: buildPorts(node),
            children: [],
        });
    });

    return map;
}

function buildElkHierarchy(nodes: CustomNode[]) {
    const nodeMap = buildElkNodeMap(nodes);
    const roots: ElkNode[] = [];

    nodes.forEach((node) => {
        const elkNode = nodeMap.get(node.id);

        if (!elkNode) return;

        if (node.parentId) {
            const parent = nodeMap.get(node.parentId);
            if (parent) {
                parent.children!.push(elkNode);
            } else {
                roots.push(elkNode);
            }
        } else {
            roots.push(elkNode);
        }
    });

    return roots;
}

function flattenElkLayout(
    elkNode: ElkNode,
    result = new Map<string, { x: number; y: number; width?: number; height?: number }>()
) {
    result.set(elkNode.id, {
        x: elkNode.x ?? 0,
        y: elkNode.y ?? 0,
        width: elkNode.width,
        height: elkNode.height,
    });

    elkNode.children?.forEach((child) => {
        flattenElkLayout(child, result);
    });

    return result;
}

export const getGraphWithLayout = async (
    nodes: CustomNode[],
    edges: Edge[]
): Promise<{ nodesWithLayout: CustomNode[]; edgesWithLayout: Edge[] }> => {
    const { superRoot, superEdges } = createSuperRootGraph(nodes, edges);

    const elkChildren = [superRoot, ...buildElkHierarchy(nodes)];

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

    const elkGraphWithLayout = await elk.layout(graph);

    const layouts = new Map<string, { x: number; y: number; width?: number; height?: number }>();
    elkGraphWithLayout.children?.forEach((child) => flattenElkLayout(child, layouts));

    const nodesWithLayout = nodes.map((node) => {
        const layout = layouts.get(node.id) ?? { x: 0, y: 0 };

        return {
            ...node,
            position: {
                x: layout.x,
                y: layout.y,
            },
            width: layout.width,
            height: layout.height,
        };
    });

    const edgesWithLayout: Edge[] = elkGraphWithLayout.edges
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
        nodesWithLayout: nodesWithLayout,
        edgesWithLayout: edgesWithLayout,
    };
};

export default function useLayoutNodes() {
    const nodesInitialized = useNodesInitialized();
    const { getNodes, getEdges, setNodes, setEdges, fitView } = useReactFlow<CustomNode>();

    const resetLayout = useCallback(() => {
        if (nodesInitialized) {
            const layoutNodes = async () => {
                const { nodesWithLayout, edgesWithLayout } = await getGraphWithLayout(
                    getNodes(),
                    getEdges()
                );

                setNodes(nodesWithLayout);
                setEdges(edgesWithLayout);
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
