import React, { useRef } from 'react';
import '@xyflow/react/dist/style.css';
import Flow from '~/components/Flow';
import { Sidebar } from '~/components/sidebar/SideBar';

const FlowPageWrapper = () => {
    const reactFlowWrapper = useRef(null);

    return (
        <div className="flow-page">
            <Sidebar />
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <Flow />
            </div>
        </div>
    );
};

export default FlowPageWrapper;
