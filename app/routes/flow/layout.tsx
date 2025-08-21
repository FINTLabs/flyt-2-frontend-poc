import { Page } from "@navikt/ds-react";
import { ReactFlowProvider } from "@xyflow/react";
import { Outlet } from "react-router";

export default function FlowLayout() {
    return (
       <Page.Block as="main" className="h-full">
            <ReactFlowProvider>
                <Outlet />
            </ReactFlowProvider>
       </Page.Block>
        
    )
}