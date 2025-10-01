import React, { useRef } from 'react';
import '@xyflow/react/dist/style.css';
import RunnableFlow from '~/components/RunnableFlow';
import OutputSidebar from '~/components/sidebar/OutputSidebar';
import InputSidebar from '~/components/sidebar/InputSidebar';

const RunnableFlowPageWrapper = () => {
    const reactFlowWrapper = useRef(null);

    return (
        <div className="flow-page runnable">
            <InputSidebar />
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <RunnableFlow />
            </div>
            <OutputSidebar />
        </div>
    );
};

export default RunnableFlowPageWrapper;
