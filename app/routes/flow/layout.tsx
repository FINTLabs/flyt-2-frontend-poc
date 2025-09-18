import { Page } from '@navikt/ds-react';
import { ReactFlowProvider } from '@xyflow/react';
import { Outlet, useParams } from 'react-router';
import { FlowProvider } from '~/context/flowContext';

export default function FlowLayout() {
    return (
        <Page.Block as="main" className="h-full">
            <ReactFlowProvider>
                <FlowProvider>
                    <Outlet />
                </FlowProvider>
            </ReactFlowProvider>
        </Page.Block>
    );
}
