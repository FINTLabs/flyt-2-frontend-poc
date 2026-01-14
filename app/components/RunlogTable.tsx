import { useFlow } from '~/context/flowContext';
import { Heading, HStack, Page, Table, VStack } from '@navikt/ds-react';
import { useMemo, useState } from 'react';
import ProgressIndicator from '~/demo/components/functionalNodes/ProgressIndicator';
import RunlogContent from '~/components/RunlogContent';

const RunlogTable = () => {
    const { currentFlow, getRunlogsByFlowId } = useFlow();

    const [openId, setOpenId] = useState<string | undefined>(undefined);

    const runlog = useMemo(() => {
        if (currentFlow) {
            return getRunlogsByFlowId(currentFlow.id);
        }
        return [];
    }, [currentFlow, getRunlogsByFlowId]);

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Kjørelogg-ID</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Tidspunkt</Table.HeaderCell>
                    <Table.HeaderCell scope="col" align={'center'}>
                        Status
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {runlog.map((runData, i) => {
                    return (
                        <Table.ExpandableRow
                            key={i + runData.id}
                            open={openId === runData.id}
                            onOpenChange={(isOpen) => {
                                if (isOpen) {
                                    setOpenId(runData.id);
                                } else {
                                    setOpenId(undefined);
                                }
                            }}
                            togglePlacement={'right'}
                            content={
                                <RunlogContent runData={runData} open={openId === runData.id} />
                            }
                        >
                            <Table.HeaderCell scope="row">{runData.id}</Table.HeaderCell>
                            <Table.DataCell>
                                {new Date(runData.timestamp).toLocaleString('no-NO')}
                            </Table.DataCell>
                            <Table.DataCell align={'center'}>
                                <HStack justify={'center'}>
                                    <ProgressIndicator state={runData.status} />
                                </HStack>
                            </Table.DataCell>
                        </Table.ExpandableRow>
                    );
                })}
            </Table.Body>
        </Table>
    );
};

export default RunlogTable;
