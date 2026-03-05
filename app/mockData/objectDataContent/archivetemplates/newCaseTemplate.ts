import type {
    IElementTemplate,
    IMappingTemplate,
    IObjectTemplate,
    ISelectableValueTemplate,
    IValueTemplate,
} from '~/mockData/objectDataContent/archivetemplates/types';

const title_valueTemplate: IElementTemplate<IValueTemplate> = {
    order: 0,
    elementConfig: {
        key: 'tittel',
        displayName: 'Tittel',
        description: 'Tittel',
    },
    template: { type: 'DYNAMIC_STRING' },
};

const offentligTittel_valeTemplate: IElementTemplate<IValueTemplate> = {
    order: 1,
    elementConfig: {
        key: 'offentligTittel',
        displayName: 'Offentlig tittel',
        description: 'Offentlig tittel. Husk å legge til eventuell skjerming.',
    },
    template: { type: 'DYNAMIC_STRING' },
};

const saksmappetype_selectableValueTemplates: IElementTemplate<ISelectableValueTemplate> = {
    order: 2,
    elementConfig: {
        key: 'saksmappetype',
        displayName: 'Saksmappetype',
        description: 'Type saksmappe',
    },
    template: {
        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
        selectablesSources: [{ urlTemplate: 'api/intern/arkiv/kodeverk/saksmappetype' }],
    },
};

const administrativEnhet_selectableValueTemplates: IElementTemplate<ISelectableValueTemplate> = {
    order: 3,
    elementConfig: {
        key: 'administrativEnhet',
        displayName: 'Administrativ enhet',
        description:
            'Avdeling, kontor eller annen administrativ enhet som har ansvaret for saksbehandlingen.',
    },
    template: {
        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
        selectablesSources: [{ urlTemplate: 'api/intern/arkiv/kodeverk/administrativenhet' }],
    },
};

const saksansvarlig_selectableValueTemplates: IElementTemplate<ISelectableValueTemplate> = {
    order: 4,
    elementConfig: {
        key: 'saksansvarlig',
        displayName: 'Saksansvarlig',
        description: 'Person som er saksansvarlig',
    },
    template: {
        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
        selectablesSources: [{ urlTemplate: 'api/intern/arkiv/kodeverk/arkivressurs' }],
    },
};

const arkivdel_selectableValueTemplates: IElementTemplate<ISelectableValueTemplate> = {
    order: 5,
    elementConfig: {
        key: 'arkivdel',
        displayName: 'Arkivdel',
        description: 'Arkivdel som mappe tilhører',
    },
    template: {
        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
        selectablesSources: [{ urlTemplate: 'api/intern/arkiv/kodeverk/arkivdel' }],
    },
};

const saksstatus_selectableValueTemplates: IElementTemplate<ISelectableValueTemplate> = {
    order: 6,
    elementConfig: {
        key: 'saksstatus',
        displayName: 'Saksstatus',
        description:
            'Status til saksmappen. Det vil si hvor langt saksbehandlingen har kommet. \\nRegistreres automatisk gjennom forskjellig saksbehandlingsfunksjonalitet, eller overstyres manuelt.',
    },
    template: {
        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
        selectablesSources: [{ urlTemplate: 'api/intern/arkiv/kodeverk/sakstatus' }],
    },
};

const tilgangsgruppe_selectableValueTemplates: IElementTemplate<ISelectableValueTemplate> = {
    order: 7,
    elementConfig: {
        key: 'tilgangsgruppe',
        displayName: 'Tilgangsgruppe',
        description:
            'Tilgangsgruppe gir mulighet for å skjerme innhold internt for andre brukere. (OBS! Dette feltet gjelder kun for p360 arkivsystem)',
    },
    template: {
        type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
        selectablesSources: [{ urlTemplate: 'api/intern/arkiv/kodeverk/tilgangsgruppe' }],
    },
};

export const objectTemplateCaseNEW: IElementTemplate<IObjectTemplate> = {
    order: 2,
    elementConfig: {
        key: 'newCase',
        displayName: 'Sak',
        description: 'Generisk sak',
        showDependency: {
            hasAnyCombination: [
                [{ key: 'type', defined: true, value: 'NEW' }],
                [{ key: 'type', defined: true, value: 'BY_SEARCH_OR_NEW' }],
            ],
        },
    },
    template: {
        valueTemplates: [title_valueTemplate, offentligTittel_valeTemplate],
        selectableValueTemplates: [
            saksmappetype_selectableValueTemplates,
            administrativEnhet_selectableValueTemplates,
            saksansvarlig_selectableValueTemplates,
            arkivdel_selectableValueTemplates,
            saksstatus_selectableValueTemplates,
            tilgangsgruppe_selectableValueTemplates,
        ],
        objectTemplates: [
            {
                order: 9,
                elementConfig: {
                    key: 'skjerming',
                    displayName: 'Skjerming',
                    description:
                        'Skjerming benyttes til å skjerme registrerte opplysninger eller enkeltdokumenter. Skjermingen trer i kraft når en tilgangskode påføresden enkelte mappe, registrering eller det enkelte dokument.',
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
                                        urlTemplate: 'api/intern/arkiv/kodeverk/skjermingshjemmel',
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
                    key: 'part',
                    displayName: 'Parter',
                    description: 'Parter',
                },
                template: {
                    elementTemplate: {
                        valueTemplates: [
                            {
                                order: 0,
                                elementConfig: {
                                    key: 'partNavn',
                                    displayName: 'Navn',
                                    description: 'Navn på virksomhet eller person',
                                },
                                template: { type: 'DYNAMIC_STRING' },
                            },
                            {
                                order: 2,
                                elementConfig: {
                                    key: 'kontaktperson',
                                    displayName: 'Kontaktperson',
                                    description: 'Kontaktperson hos en organisasjon',
                                },
                                template: { type: 'DYNAMIC_STRING' },
                            },
                            {
                                order: 3,
                                elementConfig: {
                                    key: 'organisasjonsnummer',
                                    displayName: 'Organisasjonsnummer',
                                    description: 'Organisasjonsnummer',
                                },
                                template: { type: 'DYNAMIC_STRING' },
                            },
                            {
                                order: 4,
                                elementConfig: {
                                    key: 'fodselsnummer',
                                    displayName: 'Fødselsnummer',
                                    description: 'Fødselsnummer',
                                },
                                template: { type: 'DYNAMIC_STRING' },
                            },
                        ],
                        selectableValueTemplates: [
                            {
                                order: 1,
                                elementConfig: {
                                    key: 'partRolle',
                                    displayName: 'Rolle',
                                    description: 'Partens rolle',
                                },
                                template: {
                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                    selectablesSources: [
                                        {
                                            urlTemplate: 'api/intern/arkiv/kodeverk/partrolle',
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
                        ],
                    },
                },
            },
            {
                order: 10,
                elementConfig: {
                    key: 'klasse',
                    displayName: 'Klassering',
                    description: 'Klassifisering av mappe',
                },
                template: {
                    elementTemplate: {
                        valueTemplates: [
                            {
                                order: 0,
                                elementConfig: {
                                    key: 'rekkefolge',
                                    displayName: 'Rekkefølge',
                                    description:
                                        'Rekkefølge for klassifiseringer. \\nVed bruk av primær, sekundær og tertiærklasseringer, bruk følgende verdier: \\n1 for primær, 2 for sekundær, og 3 for tertiær.',
                                },
                                template: { type: 'STRING' },
                            },
                            {
                                order: 3,
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
                                    key: 'klassifikasjonssystem',
                                    displayName: 'Klassifikasjonssystem',
                                    description:
                                        'Beskriver den overordnede strukturen for mappene i en eller flere arkivdeler',
                                },
                                template: {
                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                    selectablesSources: [
                                        {
                                            urlTemplate:
                                                'api/intern/arkiv/kodeverk/klassifikasjonssystem',
                                        },
                                    ],
                                },
                            },
                            {
                                order: 2,
                                elementConfig: {
                                    key: 'klasseId',
                                    displayName: 'KlasseID',
                                    description:
                                        'Entydig identifikasjon av klassen innenfor klassifikasjonssystemet',
                                },
                                template: {
                                    type: 'DYNAMIC_STRING_OR_SEARCH_SELECT',
                                    selectablesSources: [
                                        {
                                            urlTemplate: 'api/intern/arkiv/kodeverk/klasse',
                                            valueRefPerRequestParamKey: {
                                                klassifikasjonssystemLink: 'klassifikasjonssystem',
                                            },
                                        },
                                    ],
                                },
                            },
                        ],
                        objectTemplates: [
                            {
                                order: 4,
                                elementConfig: {
                                    key: 'skjerming',
                                    displayName: 'Skjerming',
                                    description: 'Skjerming av klasse',
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
                order: 11,
                elementConfig: {
                    key: 'journalpost',
                    displayName: 'Journalposter',
                    description:
                        'En journalpost representer en "innføring i journalen". \\nJournalen er en kronologisk fortegnelse over inn- og utgående dokumenter (dvs. korrespondansedokumenter) brukt i saksbehandlingen, og eventuelt også interne dokumenter.',
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
                                    description:
                                        'Offentlig tittel. Husk å legge til eventuell skjerming.',
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
                                            urlTemplate:
                                                'api/intern/arkiv/kodeverk/journalposttype',
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
                                            urlTemplate:
                                                'api/intern/arkiv/kodeverk/administrativenhet',
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
                                        {
                                            urlTemplate: 'api/intern/arkiv/kodeverk/arkivressurs',
                                        },
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
                                        {
                                            urlTemplate: 'api/intern/arkiv/kodeverk/journalstatus',
                                        },
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
                                        {
                                            urlTemplate: 'api/intern/arkiv/kodeverk/tilgangsgruppe',
                                        },
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
                                                    description:
                                                        'Navn på person eller organisasjon',
                                                },
                                                template: { type: 'DYNAMIC_STRING' },
                                            },
                                            {
                                                order: 4,
                                                elementConfig: {
                                                    key: 'kontaktperson',
                                                    displayName: 'Kontaktperson',
                                                    description:
                                                        'Kontaktperson hos en organisasjon',
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
                                                            template: {
                                                                type: 'DYNAMIC_STRING',
                                                            },
                                                        },
                                                        {
                                                            order: 2,
                                                            elementConfig: {
                                                                key: 'poststed',
                                                                displayName: 'Poststed',
                                                                description: 'Poststed',
                                                            },
                                                            template: {
                                                                type: 'DYNAMIC_STRING',
                                                            },
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
                                                            template: {
                                                                type: 'DYNAMIC_STRING',
                                                            },
                                                        },
                                                        {
                                                            order: 1,
                                                            elementConfig: {
                                                                key: 'mobiltelefonnummer',
                                                                displayName: 'Mobiltelefonnummer',
                                                                description: 'Mobiltelefonnummer',
                                                            },
                                                            template: {
                                                                type: 'DYNAMIC_STRING',
                                                            },
                                                        },
                                                        {
                                                            order: 2,
                                                            elementConfig: {
                                                                key: 'telefonnummer',
                                                                displayName: 'Telefonnummer',
                                                                description: 'Telefonnummer',
                                                            },
                                                            template: {
                                                                type: 'DYNAMIC_STRING',
                                                            },
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
                                                    description:
                                                        'Tittel eller navn på arkivenheten',
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
                                                                template: {
                                                                    type: 'FILE',
                                                                },
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
                                                                    description:
                                                                        'Dokumentets format',
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
            },
        ],
    },
};
