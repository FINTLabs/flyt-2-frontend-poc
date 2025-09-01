export const useDemoNodes = () => {
    return [
        {
            id: '1',
            type: 'input',
            data: { label: 'Start' },
            position: { x: 0, y: 0 },
        },
        {
            id: '2',
            data: { label: 'Node 2' },
            position: { x: 100, y: 100 },
        },
        {
            id: '3',
            data: { label: 'Node 3' },
            position: { x: 200, y: 200 },
        },
    ];
}