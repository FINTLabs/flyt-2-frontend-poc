import { PageLayout } from '~/components/layout/PageLayout';
import { DictTerm } from '~/components/macros/DictionaryTooltip';
import { Box, Heading, BodyShort, VStack } from '@navikt/ds-react';

export function Welcome() {
    return (
        <PageLayout>
            <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
                <header className="flex flex-col items-center gap-9"></header>
                <div className="max-w-[800px] w-full space-y-6 px-4">
                    <Heading level="1" size="large" className="text-center">
                        Velkommen til FINT Flyt 2
                    </Heading>
                    
                    <Box padding="6" background="surface-default" borderRadius="medium">
                        <VStack gap="4">
                            <BodyShort>
                                FINT Flyt 2 er et verktøy for å bygge og administrere dataflows. 
                                Her kan du lage <DictTerm termId="flow">flows</DictTerm> som behandler 
                                data gjennom ulike <DictTerm termId="operation">operasjoner</DictTerm>.
                            </BodyShort>
                            
                            <BodyShort>
                                Hver <DictTerm termId="node">node</DictTerm> i et flow kan ha 
                                <DictTerm termId="handle">handles</DictTerm> som definerer hvordan 
                                data flyter inn og ut. Du kan bruke ulike datatyper som 
                                <DictTerm termId="object">objekter</DictTerm>, 
                                <DictTerm termId="reference">referanser</DictTerm>, og 
                                <DictTerm termId="collection">collections</DictTerm>.
                            </BodyShort>
                            
                            <BodyShort>
                                Prøv å hover over de understrekede ordene for å se definisjoner, 
                                eller besøk <a href="/dictionary" className="text-blue-600 hover:text-blue-800 underline">
                                    ordlisten
                                </a> for en komplett oversikt over alle termer.
                            </BodyShort>
                        </VStack>
                    </Box>
                </div>
            </div>
        </PageLayout>
    );
}
