import { useFlow } from '~/context/flowContext';
import { Accordion, BodyLong, BodyShort, Heading, Label, Tag, VStack } from '@navikt/ds-react';
import { BaseNode } from '~/components/sidebar/BaseNode';
import {
    operationCreateObject,
    operationCreateObjectAkrivsak,
    operationExternalGetSaksansvarlig,
    operationJoinText,
    operationOpenEGrvSak,
    operationOpenObject,
    variableInputNode,
    innerFlowListOperation,
    dataSourceNode,
    acosUploadFile,
    acosDocToDocDesc,
    operationEditText,
} from '~/demo/mockData/nodes';
import { useParams } from 'react-router';
import { elev, fravaer, person } from '~/demo/mockData/fintNodes';

export const Sidebar = () => {
    const { currentFlow } = useFlow();
    const { mode } = useParams();
    return (
        <aside className={'sidebar-flow'}>
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
                            size="small"
                        >
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
                        <Accordion.Header>ACOS</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap={'2'}>
                                <BaseNode label={'Fylkesråd: Last opp fil'} node={acosUploadFile} />
                                <BaseNode
                                    label={'ACOS dok. til dok.beskrivelser'}
                                    node={acosDocToDocDesc}
                                />
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Datakilder</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap={'2'}>
                                <BaseNode
                                    label={'Fylkesråd: Dokumentstatus'}
                                    node={{
                                        ...dataSourceNode,
                                        data: {
                                            ...dataSourceNode.data,
                                            label: 'Fylkesråd: Dokumentstatus',
                                        },
                                    }}
                                />
                                <BaseNode
                                    label={'Fylkesråd: Dokumenttype'}
                                    node={{
                                        ...dataSourceNode,
                                        data: {
                                            ...dataSourceNode.data,
                                            label: 'Fylkesråd: Dokumenttype',
                                        },
                                    }}
                                />
                                <BaseNode
                                    label={'Fylkesråd: Tilknyttet reg. som'}
                                    node={{
                                        ...dataSourceNode,
                                        data: {
                                            ...dataSourceNode.data,
                                            label: 'Fylkesråd: Tilknyttet reg. som',
                                        },
                                    }}
                                />
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>FINT Informasjonsmodell</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap={'2'}>
                                <BaseNode label={'Elev'} node={elev} />
                                <BaseNode label={'Person'} node={person} />
                                <BaseNode label={'Fravær'} node={fravaer} />
                            </VStack>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Header>Databehandling</Accordion.Header>
                        <Accordion.Content>
                            <VStack gap={'2'}>
                                <BaseNode label={'Hent ut data'} node={operationOpenObject} />
                                <BaseNode label={'Samle data'} node={operationCreateObject} />
                                <BaseNode label={'Fritekst'} node={variableInputNode} />
                                <BaseNode label={'Listehåndtering'} node={innerFlowListOperation} />
                                <BaseNode label={'Slå sammen tekst'} node={operationJoinText} />
                                <BaseNode
                                    label={'Tekst til store bokstaver'}
                                    node={operationEditText}
                                />
                                <BaseNode
                                    label={'Tekst til små bokstaver'}
                                    node={operationEditText}
                                />
                                <BaseNode
                                    label={'Tekst til stor forbokstav'}
                                    node={operationEditText}
                                />
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
