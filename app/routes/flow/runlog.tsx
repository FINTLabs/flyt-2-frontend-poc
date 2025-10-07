import { useFlow } from '~/context/flowContext';
import { useEffect } from 'react';
import { Heading, Page, Table, VStack } from '@navikt/ds-react';
import RunlogTable from '~/components/RunlogTable';

export default function RunLog() {
    const { getAllFlows, currentFlow } = useFlow();

    useEffect(() => {
        getAllFlows();
    }, []);

    return (
        <Page.Block gutters>
            <VStack paddingBlock="8" gap="4">
                <Heading size="large" level="1">
                    Kjøringslogg - {currentFlow?.name}
                </Heading>
                <RunlogTable />
            </VStack>
        </Page.Block>
    );
}
