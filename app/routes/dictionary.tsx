import React from 'react';
import { Page, Heading, BodyShort, Box, VStack, HStack, Tag, List } from '@navikt/ds-react';
import { dictionaryData } from '~/mockData/dictionary';
import type { DictionaryTerm } from '~/mockData/dictionary';

export default function DictionaryPage() {
    return (
        <Page>
            <Box padding="8" maxWidth="1200px">
                <Heading level="1" size="large" spacing>
                    Ordliste
                </Heading>
                <BodyShort spacing>
                    Her finner du definisjoner av viktige begreper og termer som brukes i FINT Flyt.
                </BodyShort>

                <VStack gap="6" className="mt-8">
                    {dictionaryData.map((term: DictionaryTerm) => (
                        <Box
                            key={term.id}
                            padding="6"
                            background="surface-default"
                            borderWidth="1"
                            borderColor="border-default"
                            borderRadius="medium"
                            shadow="small"
                        >
                            <HStack gap="3" align="start">
                                <Tag variant="info" size="small">
                                    {term.category}
                                </Tag>
                                <Box>
                                    <Heading level="2" size="medium" spacing>
                                        {term.term}
                                    </Heading>
                                    <BodyShort spacing>
                                        {term.definition}
                                    </BodyShort>
                                    {term.examples && (
                                        <Box className="mt-3">
                                            <BodyShort weight="semibold" spacing>
                                                Eksempler:
                                            </BodyShort>
                                            <List>
                                                {term.examples.map((example, index) => (
                                                    <List.Item key={index}>
                                                        <BodyShort size="small">
                                                            {example}
                                                        </BodyShort>
                                                    </List.Item>
                                                ))}
                                            </List>
                                        </Box>
                                    )}
                                </Box>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
            </Box>
        </Page>
    );
}
