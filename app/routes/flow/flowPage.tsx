import React from 'react';
import '@xyflow/react/dist/style.css';
import Flow from '~/components/Flow';
import { FlowProvider } from '~/context/flowContext';
import { useParams } from 'react-router';
import { Sidebar } from '~/components/Sidebar';

const FlowPageWrapper = () => {
    const { flowId } = useParams<{ flowId: string }>();
    if (!flowId) {
        throw new Error('Flow ID is required');
    }
    
    return (
        <div className="flow-page">
            <FlowProvider flowId={flowId}>
                <Sidebar />
                <div className="reactflow-wrapper">
                    <Flow />
                </div>
            </FlowProvider>
        </div>
    );
};

export default FlowPageWrapper;
