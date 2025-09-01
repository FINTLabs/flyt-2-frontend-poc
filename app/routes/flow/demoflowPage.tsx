import React from 'react';
import '@xyflow/react/dist/style.css';
import DemoFlow from '~/components/DemoFlow';



const FlowPageWrapper = () => {
    return (
        <div style={{ margin: 'auto', width: '90vw', height: '92vh' }}>
            <DemoFlow />
        </div>
    );
};

export default FlowPageWrapper;
