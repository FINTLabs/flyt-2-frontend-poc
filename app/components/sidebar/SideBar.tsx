import { useFlow } from '~/context/flowContext';
import { Accordion, BodyLong, BodyShort, Heading, Label, Tag, VStack } from '@navikt/ds-react';
import { BaseNode } from '~/components/sidebar/BaseNode';
import {
    instanceEGrunnervervSak,
    instanceOutputArkivsak, operationCreateObject,
    operationCreateObjectAkrivsak,
    operationExternalGetSaksansvarlig,
    operationJoinText,
    operationOpenEGrvSak, operationOpenObject,
    variableInputNode,
} from '~/mockData/nodes';
import { useParams } from 'react-router';

export const Sidebar = () => {
    const { currentFlow } = useFlow();
    const { mode } = useParams();
    return (
        <aside>
            <VStack paddingInline={'4'}>
                <Heading size="xsmall" spacing>
                    Flow: {currentFlow?.name ? currentFlow.name : 'Ny flyt'}
                </Heading>
                {mode === 'edit' && (
                    <BodyLong size={'small'} spacing>
                        Dra og slipp noder fra menyen inn i arbeidsområdet for å bygge ditt
                        flytskjema.
                    </BodyLong>
                )}
            </VStack>
            {mode === 'view' && (
                <VStack paddingInline={'4'} gap={'1'}>
                    <Label size={'small'}>Opprettet</Label>
                    <BodyShort size="small" spacing>
                        {currentFlow?.createdAt
                            ? new Date(currentFlow.createdAt).toLocaleDateString()
                            : '-'}
                    </BodyShort>
                    <Label size={'small'}>Oppdatert</Label>
                    <BodyShort size="small" spacing>
                        {currentFlow?.updatedAt
                            ? new Date(currentFlow.updatedAt).toLocaleDateString()
                            : '-'}
                    </BodyShort>
                    <Label size={'small'}>Status</Label>
                    <BodyShort size="small" spacing>
                        <Tag
                            variant={currentFlow?.state === 'active' ? 'success' : 'neutral'}
                            size="small">
                            {currentFlow?.state === 'active' ? 'Aktiv' : 'Inaktiv'}
                        </Tag>
                    </BodyShort>
                </VStack>
            )}
            {mode === 'edit' && (
                <Accordion size="small" indent={false}>
                    <Accordion.Item>
                        <Accordion.Header>Arkiv</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap={'2'}>
                                <BaseNode label={'Send til arkiv'} node={instanceOutputArkivsak} />
                                <BaseNode
                                    label={'Opprett akrivsak'}
                                    node={operationCreateObjectAkrivsak}
                                />
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>eGrunnerverv</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap={'2'}>
                                <BaseNode
                                    label={'Innkommne saker'}
                                    node={instanceEGrunnervervSak}
                                />
                                <BaseNode
                                    label={'Hent ut eGrunnervervdata'}
                                    node={operationOpenEGrvSak}
                                />
                                <BaseNode
                                    label={'Finn saksansvarlig ref.'}
                                    node={operationExternalGetSaksansvarlig}
                                />
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Primitiver</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap={'2'}>
                                <BaseNode label={'Slå sammen tekst'} node={operationJoinText} />
                                <BaseNode label={'Fritekst'} node={variableInputNode} />
                                <BaseNode label={"Hent ut data"} node={operationOpenObject} />
                                <BaseNode label={"Samle data"} node={operationCreateObject} />
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Matte</Accordion.Header>
                        <Accordion.Content>Todo.</Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            )}
        </aside>
    );
};
