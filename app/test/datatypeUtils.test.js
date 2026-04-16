import { describe, expect, test } from 'vitest';
import { isConnectionAllowed } from '../utils/datatypeUtils.ts';

const genericNode = {
    id: 'node:nodeID:1',
    type: 'operation',
    data: {
        label: 'Node label',
        iconType: 'textEdit',
        targetHandles: [
            {
                id: 'node:nodeID:1:t:a',
                type: 'text',
                required: true,
            },
            {
                id: 'node:nodeID:1:t:b',
                type: 'text',
                required: true,
            },
            {
                id: 'node:nodeID:1:t:c',
                type: 'text',
                required: false,
            },
        ],
        sourceHandles: [
            {
                id: 'node:nodeID:1:s:a',
                type: 'text',
                required: true,
            },
            {
                id: 'node:nodeID:1:s:b',
                type: 'text',
                required: true,
            },
            {
                id: 'node:nodeID:1:s:c',
                type: 'text',
                required: true,
            },
        ],
    },
    position: {
        x: 479.86217827447354,
        y: 825.9439370614185,
    },
};

const openObjectNode = {
    id: 'node:operationOpenObjectID',
    type: 'openObject',
    data: {
        label: 'Åpne objekt',
        iconType: 'openObject',
        targetHandles: [
            {
                id: 'node:operationOpenObjectID:t:a',
                type: 'object',
                required: true,
                typeName: '?',
            },
        ],
        sourceHandles: [],
    },
    position: {
        x: 596.9204112509483,
        y: 882.1926983618025,
    },
};

const createObjectNode = {
    id: 'node:operationCreateObjectID',
    type: 'createObject',
    data: {
        label: 'Opprett objekt',
        iconType: 'createObject',
        targetHandles: [],
        sourceHandles: [
            {
                id: 'node:operationCreateObjectID:s:a',
                type: 'object',
                required: true,
                typeName: '?',
            },
        ],
    },
    position: {
        x: 548.2728339100757,
        y: 774.2558861367414,
    },
};

const genericEdge = {
    source: 'node:nodeID:1',
    sourceHandle: 'node:nodeID:1:s:a',
    target: 'node:nodeID:2',
    targetHandle: 'node:nodeID:2:t:a',
};

describe('When comparing handles before connection', () => {
    test('Allow handles of equal types to connect', () => {
        const sourceNode = {
            ...genericNode,
            id: 'node:nodeID:1',
            data: {
                ...genericNode.data,
                sourceHandles: [
                    {
                        id: 'node:nodeID:1:s:a',
                        type: 'text',
                        required: true,
                    },
                ],
            },
        };

        const targetNode = {
            ...genericNode,
            id: 'node:nodeID:2',
            data: {
                ...genericNode.data,
                targetHandles: [
                    {
                        id: 'node:nodeID:2:t:a',
                        type: 'text',
                        required: true,
                    },
                ],
            },
        };

        const results = isConnectionAllowed(genericEdge, sourceNode, targetNode);
        expect(results).toBe(true);
    });

    test('Deny handles of different types to connect', () => {
        const sourceNode = {
            ...genericNode,
            id: 'node:nodeID:1',
            data: {
                ...genericNode.data,
                sourceHandles: [
                    {
                        id: 'node:nodeID:1:s:a',
                        type: 'text',
                        required: true,
                    },
                ],
            },
        };

        const targetNode = {
            ...genericNode,
            id: 'node:nodeID:2',
            data: {
                ...genericNode.data,
                targetHandles: [
                    {
                        id: 'node:nodeID:2:t:a',
                        type: 'boolean',
                        required: true,
                    },
                ],
            },
        };

        const results = isConnectionAllowed(genericEdge, sourceNode, targetNode);
        expect(results).toBe(false);
    });

    test('Allow object to connect to object of same type', () => {
        const sourceNode = {
            ...genericNode,
            id: 'node:nodeID:1',
            data: {
                ...genericNode.data,
                sourceHandles: [
                    {
                        id: 'node:nodeID:1:s:a',
                        type: 'object',
                        typeName: 'typename1',
                        required: true,
                    },
                ],
            },
        };

        const targetNode = {
            ...genericNode,
            id: 'node:nodeID:2',
            data: {
                ...genericNode.data,
                targetHandles: [
                    {
                        id: 'node:nodeID:2:t:a',
                        type: 'object',
                        typeName: 'typename1',
                        required: true,
                    },
                ],
            },
        };

        const results = isConnectionAllowed(genericEdge, sourceNode, targetNode);
        expect(results).toBe(true);
    });

    test('Deny object to connect to object with different typename', () => {
        const sourceNode = {
            ...genericNode,
            id: 'node:nodeID:1',
            data: {
                ...genericNode.data,
                sourceHandles: [
                    {
                        id: 'node:nodeID:1:s:a',
                        type: 'object',
                        typeName: 'typename1',
                        required: true,
                    },
                ],
            },
        };

        const targetNode = {
            ...genericNode,
            id: 'node:nodeID:2',
            data: {
                ...genericNode.data,
                targetHandles: [
                    {
                        id: 'node:nodeID:2:t:a',
                        type: 'object',
                        typeName: 'typename2',
                        required: true,
                    },
                ],
            },
        };

        const results = isConnectionAllowed(genericEdge, sourceNode, targetNode);
        expect(results).toBe(false);
    });
});

describe('When comparing handles before connecting to createObjectNodes', () => {
    test('Allow objects to connect to unknown createObjectNodes', () => {
        const edge = {
            source: 'node:operationCreateObjectID',
            sourceHandle: 'node:operationCreateObjectID:s:a',
            target: 'node:nodeID:1',
            targetHandle: 'node:nodeID:1:t:a',
        };

        const targetNode = {
            ...genericNode,
            type: 'operation',
            data: {
                label: 'Operation label',
                targetHandles: [
                    {
                        id: 'node:nodeID:1:t:a',
                        type: 'object',
                        required: true,
                        typeName: 'typeName',
                    },
                ],
                sourceHandles: [],
            },
        };

        const results = isConnectionAllowed(edge, createObjectNode, targetNode);
        expect(results).toBe(true);
    });

    test('Allow collections to connect to unknown createObjectNodes', () => {
        const edge = {
            source: 'node:operationCreateObjectID',
            sourceHandle: 'node:operationCreateObjectID:s:a',
            target: 'node:nodeID:1',
            targetHandle: 'node:nodeID:1:t:a',
        };

        const targetNode = {
            ...genericNode,
            type: 'operation',
            data: {
                label: 'Operation label',
                targetHandles: [
                    {
                        id: 'node:nodeID:1:t:a',
                        type: 'collectionObject',
                        required: true,
                        typeName: 'typeName',
                    },
                ],
                sourceHandles: [],
            },
        };

        const results = isConnectionAllowed(edge, createObjectNode, targetNode);
        expect(results).toBe(true);
    });

    test('Deny primitive types to connect to unknown createObjectNodes', () => {
        const edge = {
            source: 'node:operationCreateObjectID',
            sourceHandle: 'node:operationCreateObjectID:s:a',
            target: 'node:nodeID:1',
            targetHandle: 'node:nodeID:1:t:a',
        };

        const results = isConnectionAllowed(edge, createObjectNode, genericNode);
        expect(results).toBe(false);
    });
});

describe('When comparing handles before connecting to openObjectNodes', () => {
    test('Allow objects to connect to unknown openObjectNodes', () => {
        const edge = {
            source: 'node:operationNodeID',
            sourceHandle: 'node:nodeID:1:s:a',
            target: 'node:operationOpenObjectID',
            targetHandle: 'node:operationOpenObjectID:t:a',
        };

        const sourceNode = {
            ...genericNode,
            type: 'operation',
            data: {
                label: 'Operation label',
                sourceHandles: [
                    {
                        id: 'node:nodeID:1:s:a',
                        type: 'object',
                        required: true,
                        typeName: 'typeName',
                    },
                ],
                targetHandles: [],
            },
        };

        const results = isConnectionAllowed(edge, sourceNode, openObjectNode);
        expect(results).toBe(true);
    });

    test('Allow collections to connect to unknown openObjectNodes', () => {
        const edge = {
            source: 'node:collectionID',
            sourceHandle: 'node:collectionID:s:a',
            target: 'node:operationOpenObjectID',
            targetHandle: 'node:operationOpenObjectID:t:a',
        };

        const collectionNode = {
            ...genericNode,
            id: 'node:collectionID',
            type: 'ope',
            data: {
                label: 'CollectionLabel',
                iconType: 'openObject',
                sourceHandles: [
                    {
                        id: 'node:collectionID:s:a',
                        type: 'collectionObject',
                        required: true,
                        typeName: 'collectionTypeName',
                    },
                ],
            },
        };
        const results = isConnectionAllowed(edge, collectionNode, openObjectNode);
        expect(results).toBe(true);
    });

    test('Deny primitive types to connect to unknown openObjectNodes', () => {
        const edge = {
            source: 'node:nodeID:1',
            sourceHandle: 'node:nodeID:1:s:a',
            target: 'node:operationOpenObjectID',
            targetHandle: 'node:operationOpenObjectID:t:a',
        };

        const results = isConnectionAllowed(edge, genericNode, openObjectNode);
        expect(results).toBe(false);
    });
});

// TODO: finish this
describe('When comparing handles before connecting to innerFlowOutput', () => {
    test('Always allow connection to innerFlowOutput', () => {
        const edge = {
            source: 'node:nodeID:1',
            sourceHandle: 'node:nodeID:1:s:a',
            target: 'node:operationNodeID',
            targetHandle: 'node:operationNodeID:t:a',
        };

        const operationNode = {
            ...genericNode,
            id: 'node:operationNodeID',
            type: 'operation',
            data: {
                label: 'Operation label',
                targetHandles: [
                    {
                        id: 'node:operationNodeID:t:a',
                        type: 'object',
                        required: true,
                        typeName: '?',
                    },
                ],
                sourceHandles: [],
            },
        };

        const innerFlowOutputNode = {
            ...genericNode,
            type: 'innerFlowOutput',
            data: {
                ...genericNode.data,
                sourceHandles: [
                    {
                        id: 'node:nodeID:1:s:a',
                        label: 'Label',
                        type: 'object',
                        typeName: '?',
                        required: true,
                    },
                ],
            },
        };

        const results = isConnectionAllowed(edge, operationNode, innerFlowOutputNode);
        expect(results).toBe(true);
    });
    test('Always allow connection to output of innerFlow if unknown', () => {
        const innerFlowNode = {
            ...genericNode,
            id: 'node:listOperationNodeID',
            type: 'listOperation',
            data: {
                label: 'Operation label',
                sourceHandles: [
                    {
                        id: 'node:listOperationNodeID:s:a',
                        type: 'collectionUndefined',
                        required: true,
                        typeName: '?',
                    },
                ],
                targetHandles: [],
            },
        };

        const operationNode = {
            ...genericNode,
            id: 'node:operationCreateObject',
            type: 'createObject',
            data: {
                ...genericNode.data,
                targetHandles: [
                    {
                        id: 'node:operationCreateObject:t:part',
                        type: 'collectionObject',
                        required: true,
                        label: 'Parter',
                        typeName: 'part',
                    },
                ],
                sourceHandles: [],
            },
        };
        const edge = {
            source: 'node:listOperationNodeID',
            sourceHandle: 'node:listOperationNodeID:s:a',
            target: 'node:operationCreateObject',
            targetHandle: 'node:operationCreateObject:t:part',
        };

        const results = isConnectionAllowed(edge, innerFlowNode, operationNode);
        expect(results).toBe(true);
    });
    test('Allow connection to output of innerFlow of correct type when known', () => {});
    test('Deny connection to output of innerFlow of different type when known', () => {});
});

describe('When connecting to a innerFlow node', () => {
    test('Only allow connection from inner input to a child node', () => {
        const edge = {
            source: 'node:operationNodeID',
            sourceHandle: 'node:nodeID:1:s:a',
            target: 'node:operationOpenObjectID',
            targetHandle: 'node:operationOpenObjectID:t:a',
        };

        const sourceNode = {
            ...genericNode,
            type: 'operation',
            data: {
                label: 'Operation label',
                sourceHandles: [
                    {
                        id: 'node:nodeID:1:s:a',
                        type: 'object',
                        required: true,
                        typeName: 'typeName',
                    },
                ],
                targetHandles: [],
            },
        };

        const results = isConnectionAllowed(edge, sourceNode, openObjectNode);
        expect(results).toBe(true);
    });
});
