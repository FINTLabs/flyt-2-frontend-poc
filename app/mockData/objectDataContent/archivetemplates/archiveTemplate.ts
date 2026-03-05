import type {
    IElementTemplate,
    IMappingTemplate,
    IObjectTemplate,
} from '~/mockData/objectDataContent/archivetemplates/types';
import { objectTemplateCaseNEW } from '~/mockData/objectDataContent/archivetemplates/newCaseTemplate';

const objectTemplateCaseBY_ID: IElementTemplate<IObjectTemplate> = {
    order: 4,
    elementConfig: {
        key: 'journalpost',
        displayName: 'Journalposter',
        description: 'Journalposter knyttet til saksmappe',
        showDependency: {
            hasAnyCombination: [[{ key: 'type', defined: true, value: 'BY_ID' }]],
        },
    },
    template: {
        elementTemplate: {
            valueTemplates: [
                {
                    order: 0,
                    elementConfig: {
                        key: 'tittel',
                        displayName: 'Tittel',
                        description: 'Tittel',
                    },
                    template: { type: 'DYNAMIC_STRING' },
                },
                {
                    order: 1,
                    elementConfig: {
                        key: 'offentligTittel',
                        displayName: 'Offentlig tittel',
                        description: 'Offentlig tittel. Husk å legge til eventuell skjerming.',
                    },
                    template: { type: 'DYNAMIC_STRING' },
                },
            ],
            selectableValueTemplates: [
                {
                    order: 2,
                    elementConfig: {
                        key: 'journalposttype',
                        displayName: 'Journalposttype',
                        description:
                            'Navn på type journalpost. Tilsvarer "Noark dokumenttype" i Noark 4',
                    },
                    template: {
                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                        selectablesSources: [
                            {
                                urlTemplate: 'api/intern/arkiv/kodeverk/journalposttype',
                            },
                        ],
                    },
                },
                {
                    order: 3,
                    elementConfig: {
                        key: 'administrativEnhet',
                        displayName: 'Administrativ enhet',
                        description:
                            'Navn på avdeling, kontor eller annen administrativ enhet som har \\nansvaret for saksbehandlingen',
                    },
                    template: {
                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                        selectablesSources: [
                            {
                                urlTemplate: 'api/intern/arkiv/kodeverk/administrativenhet',
                            },
                        ],
                    },
                },
                {
                    order: 4,
                    elementConfig: {
                        key: 'saksbehandler',
                        displayName: 'Saksbehandler',
                        description: 'Navn på person som er saksbehandler',
                    },
                    template: {
                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                        selectablesSources: [
                            { urlTemplate: 'api/intern/arkiv/kodeverk/arkivressurs' },
                        ],
                    },
                },
                {
                    order: 5,
                    elementConfig: {
                        key: 'journalstatus',
                        displayName: 'Journalstatus',
                        description: 'Status for journalposten',
                    },
                    template: {
                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                        selectablesSources: [
                            { urlTemplate: 'api/intern/arkiv/kodeverk/journalstatus' },
                        ],
                    },
                },
                {
                    order: 6,
                    elementConfig: {
                        key: 'tilgangsgruppe',
                        displayName: 'Tilgangsgruppe',
                        description:
                            'Tilgangsgruppe gir mulighet for å skjerme innhold internt for andre brukere. (OBS! Dette feltet gjelder kun for p360 arkivsystem)',
                    },
                    template: {
                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                        selectablesSources: [
                            { urlTemplate: 'api/intern/arkiv/kodeverk/tilgangsgruppe' },
                        ],
                    },
                },
            ],
            objectTemplates: [
                {
                    order: 7,
                    elementConfig: {
                        key: 'skjerming',
                        displayName: 'Skjerming',
                        description: 'Skjerming av registrering',
                    },
                    template: {
                        selectableValueTemplates: [
                            {
                                order: 0,
                                elementConfig: {
                                    key: 'tilgangsrestriksjon',
                                    displayName: 'Tilgangsrestriksjon',
                                    description:
                                        'Angivelse av at dokumentene som tilhører arkivenheten ikke er offentlig \\ntilgjengelig i henhold til offentlighetsloven eller av en annen grunn',
                                },
                                template: {
                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                    selectablesSources: [
                                        {
                                            urlTemplate:
                                                'api/intern/arkiv/kodeverk/tilgangsrestriksjon',
                                        },
                                    ],
                                },
                            },
                            {
                                order: 1,
                                elementConfig: {
                                    key: 'skjermingshjemmel',
                                    displayName: 'Skjermingshjemmel',
                                    description:
                                        'Henvisning til hjemmel (paragraf) i offentlighetsloven, sikkerhetsloven\\neller beskyttelsesinstruksen',
                                },
                                template: {
                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                    selectablesSources: [
                                        {
                                            urlTemplate:
                                                'api/intern/arkiv/kodeverk/skjermingshjemmel',
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                },
            ],
            objectCollectionTemplates: [
                {
                    order: 8,
                    elementConfig: {
                        key: 'korrespondansepart',
                        displayName: 'Korrespondanseparter',
                        description: 'Mottaker eller sender av arkivdokumenter.',
                    },
                    template: {
                        elementTemplate: {
                            valueTemplates: [
                                {
                                    order: 1,
                                    elementConfig: {
                                        key: 'organisasjonsnummer',
                                        displayName: 'Organisasjonsnummer',
                                        description: 'Organisasjonsnummer',
                                    },
                                    template: { type: 'DYNAMIC_STRING' },
                                },
                                {
                                    order: 2,
                                    elementConfig: {
                                        key: 'fodselsnummer',
                                        displayName: 'Fødselsnummer',
                                        description: 'Fødselsnummer',
                                    },
                                    template: { type: 'DYNAMIC_STRING' },
                                },
                                {
                                    order: 3,
                                    elementConfig: {
                                        key: 'korrespondansepartNavn',
                                        displayName: 'Navn',
                                        description: 'Navn på person eller organisasjon',
                                    },
                                    template: { type: 'DYNAMIC_STRING' },
                                },
                                {
                                    order: 4,
                                    elementConfig: {
                                        key: 'kontaktperson',
                                        displayName: 'Kontaktperson',
                                        description: 'Kontaktperson hos en organisasjon',
                                    },
                                    template: { type: 'DYNAMIC_STRING' },
                                },
                            ],
                            selectableValueTemplates: [
                                {
                                    order: 0,
                                    elementConfig: {
                                        key: 'korrespondanseparttype',
                                        displayName: 'Korrespondanseparttype',
                                        description: 'Type korrespondansepart',
                                    },
                                    template: {
                                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                        selectablesSources: [
                                            {
                                                urlTemplate:
                                                    'api/intern/arkiv/kodeverk/korrespondanseparttype',
                                            },
                                        ],
                                    },
                                },
                            ],
                            objectTemplates: [
                                {
                                    order: 5,
                                    elementConfig: {
                                        key: 'adresse',
                                        displayName: 'Adresse',
                                        description: 'Adresse',
                                    },
                                    template: {
                                        valueTemplates: [
                                            {
                                                order: 1,
                                                elementConfig: {
                                                    key: 'postnummer',
                                                    displayName: 'Postnummer',
                                                    description: 'Postnummer',
                                                },
                                                template: { type: 'DYNAMIC_STRING' },
                                            },
                                            {
                                                order: 2,
                                                elementConfig: {
                                                    key: 'poststed',
                                                    displayName: 'Poststed',
                                                    description: 'Poststed',
                                                },
                                                template: { type: 'DYNAMIC_STRING' },
                                            },
                                        ],
                                        valueCollectionTemplates: [
                                            {
                                                order: 0,
                                                elementConfig: {
                                                    key: 'adresselinje',
                                                    displayName: 'Adresselinjer',
                                                    description:
                                                        'Adresseinformasjon. Linjer representeres hver for seg, fra øverst til nederst. \\nDette kan være: Gateadresse, Postboksadresse, Bolignummer, C/O adresse, Attn, Mottak på vegne av andre.',
                                                },
                                                template: {
                                                    elementTemplate: {
                                                        type: 'DYNAMIC_STRING',
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                                {
                                    order: 6,
                                    elementConfig: {
                                        key: 'kontaktinformasjon',
                                        displayName: 'Kontaktinformasjon',
                                        description: 'Kontaktinformasjon',
                                    },
                                    template: {
                                        valueTemplates: [
                                            {
                                                order: 0,
                                                elementConfig: {
                                                    key: 'epostadresse',
                                                    displayName: 'E-post',
                                                    description: 'E-postadresse',
                                                },
                                                template: { type: 'DYNAMIC_STRING' },
                                            },
                                            {
                                                order: 1,
                                                elementConfig: {
                                                    key: 'mobiltelefonnummer',
                                                    displayName: 'Mobiltelefonnummer',
                                                    description: 'Mobiltelefonnummer',
                                                },
                                                template: { type: 'DYNAMIC_STRING' },
                                            },
                                            {
                                                order: 2,
                                                elementConfig: {
                                                    key: 'telefonnummer',
                                                    displayName: 'Telefonnummer',
                                                    description: 'Telefonnummer',
                                                },
                                                template: { type: 'DYNAMIC_STRING' },
                                            },
                                        ],
                                    },
                                },
                                {
                                    order: 7,
                                    elementConfig: {
                                        key: 'skjerming',
                                        displayName: 'Skjerming',
                                        description: 'Skjerming av korrespodansepart',
                                    },
                                    template: {
                                        selectableValueTemplates: [
                                            {
                                                order: 0,
                                                elementConfig: {
                                                    key: 'tilgangsrestriksjon',
                                                    displayName: 'Tilgangsrestriksjon',
                                                    description:
                                                        'Angivelse av at dokumentene som tilhører arkivenheten ikke er offentlig \\ntilgjengelig i henhold til offentlighetsloven eller av en annen grunn',
                                                },
                                                template: {
                                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                                    selectablesSources: [
                                                        {
                                                            urlTemplate:
                                                                'api/intern/arkiv/kodeverk/tilgangsrestriksjon',
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                order: 1,
                                                elementConfig: {
                                                    key: 'skjermingshjemmel',
                                                    displayName: 'Skjermingshjemmel',
                                                    description:
                                                        'Henvisning til hjemmel (paragraf) i offentlighetsloven, sikkerhetsloven\\neller beskyttelsesinstruksen',
                                                },
                                                template: {
                                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                                    selectablesSources: [
                                                        {
                                                            urlTemplate:
                                                                'api/intern/arkiv/kodeverk/skjermingshjemmel',
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    order: 9,
                    elementConfig: {
                        key: 'dokumentbeskrivelse',
                        displayName: 'Dokumentbeskrivelser',
                        description: 'Dokumentbeskrivelsene til en registrering',
                    },
                    template: {
                        elementTemplate: {
                            valueTemplates: [
                                {
                                    order: 0,
                                    elementConfig: {
                                        key: 'tittel',
                                        displayName: 'Tittel',
                                        description: 'Tittel eller navn på arkivenheten',
                                    },
                                    template: { type: 'DYNAMIC_STRING' },
                                },
                            ],
                            selectableValueTemplates: [
                                {
                                    order: 1,
                                    elementConfig: {
                                        key: 'dokumentstatus',
                                        displayName: 'Dokumentstatus',
                                        description: 'Status til dokumentet',
                                    },
                                    template: {
                                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                        selectablesSources: [
                                            {
                                                urlTemplate:
                                                    'api/intern/arkiv/kodeverk/dokumentstatus',
                                            },
                                        ],
                                    },
                                },
                                {
                                    order: 2,
                                    elementConfig: {
                                        key: 'dokumentType',
                                        displayName: 'Dokumenttype',
                                        description: 'Navn på type dokument',
                                    },
                                    template: {
                                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                        selectablesSources: [
                                            {
                                                urlTemplate:
                                                    'api/intern/arkiv/kodeverk/dokumenttype',
                                            },
                                        ],
                                    },
                                },
                                {
                                    order: 3,
                                    elementConfig: {
                                        key: 'tilknyttetRegistreringSom',
                                        displayName: 'Tilknyttet registrering som',
                                        description:
                                            'Angivelse av hvilken "rolle" dokumentet har i forhold til registreringen',
                                    },
                                    template: {
                                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                        selectablesSources: [
                                            {
                                                urlTemplate:
                                                    'api/intern/arkiv/kodeverk/tilknyttetregistreringsom',
                                            },
                                        ],
                                    },
                                },
                            ],
                            objectTemplates: [
                                {
                                    order: 5,
                                    elementConfig: {
                                        key: 'skjerming',
                                        displayName: 'Skjerming',
                                        description: 'Skjerming av dokument',
                                    },
                                    template: {
                                        selectableValueTemplates: [
                                            {
                                                order: 0,
                                                elementConfig: {
                                                    key: 'tilgangsrestriksjon',
                                                    displayName: 'Tilgangsrestriksjon',
                                                    description:
                                                        'Angivelse av at dokumentene som tilhører arkivenheten ikke er offentlig \\ntilgjengelig i henhold til offentlighetsloven eller av en annen grunn',
                                                },
                                                template: {
                                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                                    selectablesSources: [
                                                        {
                                                            urlTemplate:
                                                                'api/intern/arkiv/kodeverk/tilgangsrestriksjon',
                                                        },
                                                    ],
                                                },
                                            },
                                            {
                                                order: 1,
                                                elementConfig: {
                                                    key: 'skjermingshjemmel',
                                                    displayName: 'Skjermingshjemmel',
                                                    description:
                                                        'Henvisning til hjemmel (paragraf) i offentlighetsloven, sikkerhetsloven\\neller beskyttelsesinstruksen',
                                                },
                                                template: {
                                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                                    selectablesSources: [
                                                        {
                                                            urlTemplate:
                                                                'api/intern/arkiv/kodeverk/skjermingshjemmel',
                                                        },
                                                    ],
                                                },
                                            },
                                        ],
                                    },
                                },
                            ],
                            objectCollectionTemplates: [
                                {
                                    order: 4,
                                    elementConfig: {
                                        key: 'dokumentobjekt',
                                        displayName: 'Dokumentobjekter',
                                        description:
                                            'Dokumentobjekt tilhørende dokumentbeskrivelsen',
                                    },
                                    template: {
                                        elementTemplate: {
                                            valueTemplates: [
                                                {
                                                    order: 2,
                                                    elementConfig: {
                                                        key: 'fil',
                                                        displayName: 'Fil',
                                                        description:
                                                            'Referanse til filen som inneholder det elektroniske dokumentet som dokumentobjektet beskriver',
                                                    },
                                                    template: { type: 'FILE' },
                                                },
                                            ],
                                            selectableValueTemplates: [
                                                {
                                                    order: 0,
                                                    elementConfig: {
                                                        key: 'variantformat',
                                                        displayName: 'Variantformat',
                                                        description:
                                                            'Angivelse av hvilken variant et dokument forekommer i',
                                                    },
                                                    template: {
                                                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                                        selectablesSources: [
                                                            {
                                                                urlTemplate:
                                                                    'api/intern/arkiv/kodeverk/variantformat',
                                                            },
                                                        ],
                                                    },
                                                },
                                                {
                                                    order: 1,
                                                    elementConfig: {
                                                        key: 'filformat',
                                                        displayName: 'Filformat',
                                                        description: 'Dokumentets format',
                                                    },
                                                    template: {
                                                        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                                        selectablesSources: [
                                                            {
                                                                urlTemplate:
                                                                    'api/intern/arkiv/kodeverk/format',
                                                            },
                                                        ],
                                                    },
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
            ],
        },
    },
};

const objectTemplateCaseBY_SEARCH_OR_NEW: IElementTemplate<IObjectTemplate> = {
    order: 1,
    elementConfig: {
        key: 'caseSearchParameters',
        displayName: 'Søkeparametre',
        description:
            'Parametre for søk på sak. Huk av for de feltene som skal være med i søket. \\nVerdiene for de avhukede feltene hentes fra oppsett for ny sak, så husk å fylle ut disse.',
        showDependency: {
            hasAnyCombination: [[{ key: 'type', defined: true, value: 'BY_SEARCH_OR_NEW' }]],
        },
    },
    template: {
        valueTemplates: [
            {
                order: 0,
                elementConfig: {
                    key: 'arkivdel',
                    displayName: 'Arkivdel',
                    description: '',
                },
                template: { type: 'BOOLEAN' },
            },
            {
                order: 1,
                elementConfig: {
                    key: 'administrativEnhet',
                    displayName: 'Administrativ enhet',
                    description: '',
                },
                template: { type: 'BOOLEAN' },
            },
            {
                order: 2,
                elementConfig: {
                    key: 'tilgangsrestriksjon',
                    displayName: 'Tilgangsrestriksjon',
                    description: '',
                },
                template: { type: 'BOOLEAN' },
            },
            {
                order: 3,
                elementConfig: {
                    key: 'saksmappetype',
                    displayName: 'Saksmappetype',
                    description: '',
                },
                template: { type: 'BOOLEAN' },
            },
            {
                order: 4,
                elementConfig: {
                    key: 'saksstatus',
                    displayName: 'Saksstatus',
                    description: '',
                },
                template: { type: 'BOOLEAN' },
            },
            {
                order: 5,
                elementConfig: {
                    key: 'tittel',
                    displayName: 'Tittel',
                    description: '',
                },
                template: { type: 'BOOLEAN' },
            },
            {
                order: 6,
                elementConfig: {
                    key: 'klassering',
                    displayName: 'Klassering',
                    description: '',
                },
                template: { type: 'BOOLEAN' },
            },
            {
                order: 7,
                elementConfig: {
                    key: 'klasseringRekkefolge',
                    displayName: 'Rekkefølge',
                    description: '',
                    enableDependency: {
                        hasAnyCombination: [[{ key: 'klassering', defined: true, value: 'true' }]],
                    },
                },
                template: { type: 'STRING' },
            },
            {
                order: 8,
                elementConfig: {
                    key: 'klasseringKlassifikasjonssystem',
                    displayName: 'Klassifikasjonssystem',
                    description: '',
                    enableDependency: {
                        hasAnyCombination: [
                            [
                                { key: 'klassering', defined: true, value: 'true' },
                                {
                                    key: 'klasseringRekkefolge',
                                    defined: true,
                                    notValue: '',
                                },
                            ],
                        ],
                    },
                },
                template: { type: 'BOOLEAN' },
            },
            {
                order: 9,
                elementConfig: {
                    key: 'klasseringKlasseId',
                    displayName: 'KlasseID',
                    description: '',
                    enableDependency: {
                        hasAnyCombination: [
                            [
                                { key: 'klassering', defined: true, value: 'true' },
                                {
                                    key: 'klasseringKlassifikasjonssystem',
                                    defined: true,
                                    notValue: '',
                                },
                            ],
                        ],
                    },
                },
                template: { type: 'BOOLEAN' },
            },
        ],
    },
};

const testObjectTemplateSak: IMappingTemplate = {
    displayName: 'Arkivering',
    rootObjectTemplate: {
        valueTemplates: [
            {
                order: 3,
                elementConfig: {
                    key: 'caseId',
                    displayName: 'Saksnummer',
                    description:
                        'Entydig identifikasjon av mappen innenfor det arkivet mappen tilhører',
                    showDependency: {
                        hasAnyCombination: [
                            [
                                {
                                    key: 'type',
                                    defined: true,
                                    value: 'BY_ID',
                                },
                            ],
                        ],
                    },
                },
                template: {
                    type: 'DYNAMIC_STRING',
                    search: {
                        urlTemplate: 'api/intern/arkiv/saker/{caseId}/tittel',
                        valueRefPerPathParamKey: {
                            caseId: 'caseId',
                        },
                    },
                },
            },
        ],
        selectableValueTemplates: [
            {
                order: 0,
                elementConfig: {
                    key: 'type',
                    displayName: 'Sakslogikk',
                    description:
                        'Logikk for oppretting eller gjenfinning av sak.\\nVed "Ny sak" opprettes det ny sak i arkivet.\\nVed "På saksnummer" brukes eksisterende sak med innfyllt saksnummer.\\nVed "På søk, eller ny" gjøres det først et forsøk på å finne saker som passer med valgte søkekriterier. \\nSøket har tre utfall: \\n\\t(1) Ingen funn: Ny sak opprettes.\\n\\t(2) Én sak funnet: Journalposter legges på funnet sak.\\n\\t(3) To eller flere saker funnet: Instansprosessen feiler.',
                },
                template: {
                    type: 'DROPDOWN',
                    selectables: [
                        {
                            displayName: 'Ny',
                            value: 'NEW',
                        },
                        {
                            displayName: 'På søk, eller ny',
                            value: 'BY_SEARCH_OR_NEW',
                        },
                        { displayName: 'På saksnummer', value: 'BY_ID' },
                    ],
                },
            },
        ],
        objectTemplates: [objectTemplateCaseBY_SEARCH_OR_NEW, objectTemplateCaseNEW],
        objectCollectionTemplates: [objectTemplateCaseBY_ID],
    },
};
