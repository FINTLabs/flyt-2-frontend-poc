import { useFlow } from '~/context/flowContext';
import { Accordion, BodyLong, Heading, VStack } from '@navikt/ds-react';
import { BaseNode } from '~/components/sidebar/BaseNode';
import {
    instanceEGrunnervervSak, instanceOutputArkivsak, operationCreateObjectAkrivsak,
    operationExternalGetSaksansvarlig,
    operationJoinText, operationOpenEGrvSak,
} from '~/mockData/nodes';

export const Sidebar = () => {
    const { flowId } = useFlow();
    return (
        <aside>
            <VStack paddingInline={'4'}>
                <Heading size="xsmall" spacing>
                    Flow ID: {flowId}
                </Heading>
                <BodyLong size={'small'} spacing>
                    Dra og slipp noder fra menyen inn i arbeidsområdet for å bygge ditt flytskjema.
                </BodyLong>
            </VStack>
            <Accordion size="small" indent={false}>
                <Accordion.Item>
                    <Accordion.Header>Arkiv</Accordion.Header>
                    <Accordion.Content>
                        <VStack gap={'2'}>
                            <BaseNode label={'Send til arkiv'} node={instanceOutputArkivsak} />
                            <BaseNode label={'Opprett akrivsak'} node={operationCreateObjectAkrivsak} />
                        </VStack>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>eGrunnerverv</Accordion.Header>
                    <Accordion.Content>
                        <VStack gap={'2'}>
                            <BaseNode label={'Innkommne saker'} node={instanceEGrunnervervSak} />
                            <BaseNode label={'Hent ut eGrunnervervdata'} node={operationOpenEGrvSak}/>
                            <BaseNode label={'Finn saksansvarlig ref.'} node={operationExternalGetSaksansvarlig} />
                        </VStack>
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Primitiver</Accordion.Header>
                    <Accordion.Content>
                        <BaseNode label={'Slå sammen tekst'} node={operationJoinText} />
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>Matte</Accordion.Header>
                    <Accordion.Content>Todo.</Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </aside>
    );
};
