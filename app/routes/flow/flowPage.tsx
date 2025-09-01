import React from 'react';
import '@xyflow/react/dist/style.css';
import Flow from '~/components/Flow';
import { FlowProvider } from '~/context/flowContext';
import { useParams } from 'react-router';



const FlowPageWrapper = () => {
    const { flowId } = useParams<{ flowId: string }>();
    if (!flowId) {
        throw new Error('Flow ID is required');
    }
    
    return (
        <FlowProvider flowId={flowId}>
            <div style={{ margin: 'auto', width: '90vw', height: '92vh' }}>
                <Flow />
            </div>
        </FlowProvider>
    );
};

export default FlowPageWrapper;
