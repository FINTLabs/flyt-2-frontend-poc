type SaksstructureData = {
    tittel: string;
    offentlig_tittel: string;
    saksmappetype: string; // datasource
    administrativ_enhet: string; // datasource
    saksansvarlig: string; // datasource
    arkivdel: string; // datasource
    saksstatus: string; // datasource
    tilgangsgruppe: string; // datasource
    parter: {
        faste_elementer: Part[];
        generert_fra_samling: Part[];
    };
    skjerming: Skjerming;
    klassering: {
        faste_elementer: Klassering[];
        generert_fra_samling: Klassering[];
    };
    journalposter: {
        faste_elementer: Journalpost[];
        generert_fra_samling: Journalpost[];
    };
};

type Part = {
    navn: string;
    rolle: string;
    kontaktperson: string;
    organisasjonsnummer: string;
    fødselsnummer: string;
    adresse: Adresse;
    kontaktinformasjon: Kontaktinformasjon;
};

type Klassering = {
    rekkefølge: string;
    klassifikasjonssystem: string; // datasource
    klasse_id: string; // datasource
    tittel: string;
    skjerming: Skjerming;
};

type Journalpost = {
    tittel: string;
    offentlig_tittel: string;
    journalposttype: string; // datasource
    administrativ_enhet: string; // datasource
    saksbehandler: string; // datasource
    journalstatus: string; // datasource
    tilgangsbruppe: string; // datasource
    skjerming: Skjerming;
    korrespondanseparter: {
        faste_elementer: Korrespondansepart[];
        generert_fra_samling: Korrespondansepart[];
    };
    dokumentbeskrivelser: {
        faste_elementer: Dokumentbeskrivelse[];
        generert_fra_samling: Dokumentbeskrivelse[];
    };
};

type Korrespondansepart = {
    korrespondanseparttype: string; // datasource
    organisasjonsnummer: string;
    fødselsnummer: string;
    navn: string;
    kontaktperson: string;
    adresse: Adresse;
    kontaktinformasjon: Kontaktinformasjon;
    skjerming: Skjerming;
};

type Dokumentbeskrivelse = {
    tittel: string;
    dokumentstatus: string; // datasource
    dokumenttype: string; // datasource
    tilknyttet_gregistrering_som: string; // datasource
    dokumentobjekter: { faste_elementer: Dokumentobjekt[]; generert_fra_samling: Dokumentobjekt[] };
    skjerming: Skjerming;
};

type Dokumentobjekt = {
    variantformat: string; // datasource
    filformat: string; // datasource
    fil: string;
};

type Adresse = {
    adresselinsjer: { faste_elementer: string[]; generert_fra_samling: string[] };
    postnummer: string;
    poststed: string;
};

type Kontaktinformasjon = {
    e_post: string;
    mobiltelefonnummer: string;
    telefonnummer: string;
};

type Skjerming = {
    tilgangsrestriksjon: string;
    skjermingshjemmel: string;
};
