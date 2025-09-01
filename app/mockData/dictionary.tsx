export interface DictionaryTerm {
    id: string;
    term: string;
    definition: string;
    category: string;
    examples?: string[];
}

export const dictionaryData: DictionaryTerm[] = [
    {
        id: 'object',
        term: 'Objekt',
        definition: 'En datastruktur som inneholder egenskaper og metoder. I FINT Flyt brukes objekter til å representere komplekse datatyper som kan inneholde flere verdier.',
        category: 'Datatype',
        examples: [
            'Arkiv Sak - et objekt som inneholder informasjon om en sak',
            'eGrv Sak - et objekt som representerer en eGrunnerverv sak'
        ]
    },
    {
        id: 'reference',
        term: 'Referanse',
        definition: 'En peker eller lenke til et annet objekt eller ressurs. Referanser brukes til å koble sammen ulike deler av data uten å duplisere informasjon.',
        category: 'Datatype',
        examples: [
            'Saksmappetype - refererer til en definert mappetype',
            'Saksansvarlig - refererer til en person som er ansvarlig for saken'
        ]
    },
    {
        id: 'collection',
        term: 'Collection',
        definition: 'En samling av objekter av samme type. Collections kan inneholde et ubegrenset antall elementer og støtter operasjoner som å legge til, fjerne og søke.',
        category: 'Datatype',
        examples: [
            'Arkiv Part - en samling av parter knyttet til en sak',
            'eGrv Sakspart - en samling av sakspartnere'
        ]
    },
    {
        id: 'flow',
        term: 'Flow',
        definition: 'En sekvens av operasjoner som behandler data fra input til output. Flows definerer hvordan data flyter gjennom systemet og hvilke transformasjoner som skjer.',
        category: 'Konsept',
        examples: [
            'eGrunnerverv sak flow - behandler data for grunnerverv saker',
            'Arkivsak opprettelse - flyter data gjennom ulike valideringstrinn'
        ]
    },
    {
        id: 'operation',
        term: 'Operation',
        definition: 'En handling eller prosess som utføres på data. Operasjoner kan være enkle (som tekstsammenslåing) eller komplekse (som objektgenerering).',
        category: 'Konsept',
        examples: [
            'Hent ut data - henter informasjon fra en datakilde',
            'Opprett objekt - genererer et nytt objekt basert på input data'
        ]
    },
    {
        id: 'parameter',
        term: 'Parameter',
        definition: 'En variabel som kan brukes i en operasjon. Parameter kan være en input, output eller en variabel som kan brukes i en operasjon.',
        category: 'UI Element',
        examples: [
            'Parameter - en variabel som kan brukes i en operasjon'
        ]
    },
    {
        id: 'datatype',
        term: 'Datatype',
        definition: 'En type som beskriver hvordan data skal behandles. Datatyper kan være primitive (som streng, tall, dato) eller komplekse (som objekt, array, map).',
        category: 'Datatype',
        examples: [
            'String - en sekvens av tegn',
            'Number - et tall',
            'Date - en dato'
        ]
    },
    {
        id: 'integration',
        term: 'Integrasjon',
        definition: 'En sammenheng mellom to systemer eller tjenester. Integrasjoner brukes til å koble sammen ulike deler av data uten å duplisere informasjon.',
        category: 'Konsept',
        examples: [
            'Arkivsak - integrerer data fra Arkivsak med eGrunnerverv sak',
            'eGrunnerverv sak - integrerer data fra eGrunnerverv sak med Arkivsak'
        ]
    },
    {
        id: 'instance',
        term: 'Instans',
        definition: 'En instans av et objekt eller en operasjon. Instanser brukes til å representere en spesifikk verdi eller en spesifikk handling.',
        category: 'Konsept',
        examples: [
            'Arkivsak - en instans av en sak',
            'eGrunnerverv sak - en instans av en eGrunnerverv sak'
        ]
    }
];
