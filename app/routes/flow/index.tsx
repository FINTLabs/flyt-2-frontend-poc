import React from 'react';
import { BodyShort, Heading, Page, VStack, LinkCard, Tag, Box, HGrid } from '@navikt/ds-react';
import { BandageIcon } from '@navikt/aksel-icons';

export default function FlowTest() {
    return (
        <Page.Block gutters>
            <VStack paddingBlock="8" gap="4">
                <Heading size="large" level="1">
                    Flow Test
                </Heading>
                <BodyShort>Siden er under konstruksjon. Det er foreløpig begrenset med handlinger.</BodyShort>

                <HGrid gap="space-24" columns={3} paddingBlock={"space-16"}>

                <LinkCard size="small">
                    <Box
                        asChild
                        borderRadius="12"
                        padding="space-8"
                        style={{ backgroundColor: "var(--ax-bg-moderateA)" }}
                    >
                        <LinkCard.Icon>
                            <BandageIcon fontSize="2rem" />
                        </LinkCard.Icon>
                    </Box>
                    <LinkCard.Title>
                        <LinkCard.Anchor href="/flow/eksempel">Se en enkel flyt</LinkCard.Anchor>
                    </LinkCard.Title>
                    <LinkCard.Description>
                        Denne siden viser en enkel flyt med noen få noder og kanter. Du kan utforske hvordan noder og kanter fungerer.
                    </LinkCard.Description>
                    <LinkCard.Footer>
                        <Tag size="small" variant="neutral">
                            Demo
                        </Tag>
                    </LinkCard.Footer>
                </LinkCard>
                </HGrid>
            </VStack>
        </Page.Block>
    );
}
