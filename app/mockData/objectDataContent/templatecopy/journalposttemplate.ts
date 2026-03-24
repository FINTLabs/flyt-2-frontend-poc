const journalposttemplate = {
    instanceValueMetadata: [
        { displayName: 'Saksnummer', type: 'STRING', key: 'saksnummer' },
        { displayName: 'Tittel', type: 'STRING', key: 'tittel' },
        { displayName: 'Dokumentnavn', type: 'STRING', key: 'dokumentNavn' },
        { displayName: 'Dokumentdato', type: 'STRING', key: 'dokumentDato' },
        { displayName: 'Forsendelsesmåte', type: 'STRING', key: 'forsendelsesmaate' },
        { displayName: 'Kommunenavn', type: 'STRING', key: 'kommunenavn' },
        { displayName: 'Kommunenummer', type: 'STRING', key: 'knr' },
        { displayName: 'Gårdsnummer', type: 'STRING', key: 'gnr' },
        { displayName: 'Bruksnummer', type: 'STRING', key: 'bnr' },
        { displayName: 'Festenummer', type: 'STRING', key: 'fnr' },
        { displayName: 'Seksjonsnummer', type: 'STRING', key: 'snr' },
        { displayName: 'Eierforhold', type: 'STRING', key: 'eierforhold' },
        { displayName: 'Id', type: 'STRING', key: 'id' },
        { displayName: 'Maltittel', type: 'STRING', key: 'maltittel' },
        { displayName: 'Saksbehandler E-post', type: 'STRING', key: 'saksbehandlerEpost' },
        { displayName: 'Saksbehandler', type: 'STRING', key: 'saksbehandler' },
        { displayName: 'Prosjektnavn', type: 'STRING', key: 'prosjektnavn' },
    ],
    instanceObjectCollectionMetadata: [
        {
            displayName: 'Mottakere',
            objectMetadata: {
                instanceValueMetadata: [
                    { displayName: 'Navn', type: 'STRING', key: 'navn' },
                    {
                        displayName: 'Organisasjonsnummer',
                        type: 'STRING',
                        key: 'organisasjonsnummer',
                    },
                    { displayName: 'Fødselsnummer', type: 'STRING', key: 'fodselsnummer' },
                    { displayName: 'E-post', type: 'STRING', key: 'epost' },
                    { displayName: 'Telefon', type: 'STRING', key: 'telefon' },
                    { displayName: 'Postadresse', type: 'STRING', key: 'postadresse' },
                    { displayName: 'Postnummer', type: 'STRING', key: 'postnummer' },
                    { displayName: 'Poststed', type: 'STRING', key: 'poststed' },
                ],
                instanceObjectCollectionMetadata: [],
                categories: [],
            },
            key: 'mottakere',
        },
        {
            displayName: 'Vedlegg',
            objectMetadata: {
                instanceValueMetadata: [
                    { displayName: 'Tittel', type: 'STRING', key: 'tittel' },
                    { displayName: 'Filnavn', type: 'STRING', key: 'filnavn' },
                    { displayName: 'Fil', type: 'FILE', key: 'fil' },
                    { displayName: 'Mediatype', type: 'STRING', key: 'mediatype' },
                ],
                instanceObjectCollectionMetadata: [],
                categories: [],
            },
            key: 'vedlegg',
        },
    ],
    categories: [
        {
            displayName: 'Hoveddokument',
            content: {
                instanceValueMetadata: [
                    { displayName: 'Tittel', type: 'STRING', key: 'hoveddokumentTittel' },
                    { displayName: 'Filnavn', type: 'STRING', key: 'hoveddokumentFilnavn' },
                    {
                        displayName: 'HoveddokumentMediatype',
                        type: 'STRING',
                        key: 'hoveddokumentMediatype',
                    },
                    { displayName: 'Fil', type: 'FILE', key: 'hoveddokumentFil' },
                ],
                instanceObjectCollectionMetadata: [],
                categories: [],
            },
        },
    ],
};

const eGrunnervervMetadata = {};
