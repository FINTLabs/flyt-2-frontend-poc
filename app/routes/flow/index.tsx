import React, { useEffect } from 'react';
import {
    BodyShort,
    Heading,
    Page,
    VStack,
    Tag,
    Table,
    Button,
    HStack,
    ActionMenu,
} from '@navikt/ds-react';
import {
    ExpandIcon,
    MenuElipsisVerticalIcon,
    PencilIcon,
    PlusIcon,
    TasklistIcon,
    TestFlaskIcon,
    TrashIcon,
} from '@navikt/aksel-icons';
import { Link } from 'react-router';
import { useFlow } from '~/context/flowContext';

export default function FlowIndex() {
    const { allFlows, getAllFlows, deleteFLow } = useFlow();

    useEffect(() => {
        getAllFlows();
    }, []);

    return (
        <Page.Block gutters>
            <VStack paddingBlock="8" gap="4">
                <Heading size="large" level="1">
                    Flow Test
                </Heading>
                <HStack justify="space-between" style={{ width: '100%' }}>
                    <BodyShort>
                        Siden er under konstruksjon. Det er foreløpig begrenset med handlinger.
                    </BodyShort>
                    <Button
                        as={Link}
                        to={'/flow/new'}
                        size="small"
                        iconPosition="right"
                        icon={<PlusIcon title="Opprett ny" fontSize="2rem" />}>
                        Opprett ny flyt
                    </Button>
                </HStack>

                <Table size={'small'}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Navn</Table.HeaderCell>
                            <Table.HeaderCell>Opprettet</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell scope="col" align="right"></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {allFlows &&
                            allFlows.map((flow) => (
                                <Table.Row key={flow.id}>
                                    <Table.DataCell>{flow.name}</Table.DataCell>
                                    <Table.DataCell>
                                        {new Date(flow.createdAt).toLocaleDateString()}
                                    </Table.DataCell>
                                    <Table.DataCell>
                                        <Tag
                                            variant={
                                                flow.state === 'active' ? 'success' : 'neutral'
                                            }
                                            size="small">
                                            {flow.state === 'active' ? 'Aktiv' : 'Inaktiv'}
                                        </Tag>
                                    </Table.DataCell>
                                    <Table.DataCell align="right">
                                        <ActionMenu>
                                            <ActionMenu.Trigger>
                                                <Button
                                                    icon={<MenuElipsisVerticalIcon title="Meny" />}
                                                    size="small"
                                                    variant="tertiary"
                                                />
                                            </ActionMenu.Trigger>
                                            <ActionMenu.Content>
                                                <ActionMenu.Group label={`Flyt: ${flow.name}`}>
                                                    <ActionMenu.Item
                                                        icon={<ExpandIcon />}
                                                        as={Link}
                                                        to={`/flow/view/${flow.id}`}>
                                                        Åpne
                                                    </ActionMenu.Item>
                                                    <ActionMenu.Item
                                                        disabled={flow.id === 'demo'}
                                                        icon={<PencilIcon />}
                                                        as={Link}
                                                        to={`/flow/edit/${flow.id}`}>
                                                        Rediger
                                                    </ActionMenu.Item>
                                                    <ActionMenu.Item
                                                        icon={<TestFlaskIcon />}
                                                        disabled={flow.id !== 'demo'}
                                                        as={Link}
                                                        to={`/flow/run/${flow.id}`}>
                                                        Test
                                                    </ActionMenu.Item>
                                                    <ActionMenu.Item
                                                        icon={<TasklistIcon />}
                                                        disabled={flow.id !== 'demo'}
                                                        as={Link}
                                                        to={`/flow/log/${flow.id}`}>
                                                        Se kjørelogg
                                                    </ActionMenu.Item>
                                                </ActionMenu.Group>
                                                <ActionMenu.Divider />
                                                <ActionMenu.Item
                                                    variant="danger"
                                                    icon={<TrashIcon />}
                                                    disabled={flow.state === 'active'}
                                                    onSelect={() => {
                                                        deleteFLow(flow.id);
                                                    }}>
                                                    Slett flyt
                                                </ActionMenu.Item>
                                            </ActionMenu.Content>
                                        </ActionMenu>
                                    </Table.DataCell>
                                </Table.Row>
                            ))}
                    </Table.Body>
                </Table>
            </VStack>
        </Page.Block>
    );
}
