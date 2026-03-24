type SaksstructureData = {
    tittel: string;
    offentlig_tittel: string;
    saksmappetype: string; // datasource saksmappetypeOptions
    administrativ_enhet: string; // datasource administrativenhetOptions
    saksansvarlig: string; // datasource arkivressursOptions
    arkivdel: string; // datasource arkivdelOptions
    saksstatus: string; // datasource saksstatusOption
    tilgangsgruppe: string; // datasource tilgangsgruppeOptions
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

// object defined
type Part = {
    navn: string;
    rolle: string;
    kontaktperson: string;
    organisasjonsnummer: string;
    fødselsnummer: string;
    adresse: Adresse;
    kontaktinformasjon: Kontaktinformasjon;
};

// object defined
type Klassering = {
    rekkefølge: string;
    klassifikasjonssystem: string; // datasource klassifikasjonssystemOptions
    klasse_id: string; // datasource klasseidOptions
    tittel: string;
    skjerming: Skjerming;
};

// object defined
type Journalpost = {
    tittel: string;
    offentlig_tittel: string;
    journalposttype: string; // datasource journalposttypeOptions
    administrativ_enhet: string; // datasource administrativenhetOptions
    saksbehandler: string; // datasource arkivressursOptions
    journalstatus: string; // datasource journalstatusOptions
    tilgangsbruppe: string; // datasource tilgangsgruppeOptions
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

// object defined
type Korrespondansepart = {
    korrespondanseparttype: string; // datasource korrespondanseparttypeOptions
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
    dokumentstatus: string; // datasource dokumentstatusOptions
    dokumenttype: string; // datasource dokumenttypeOptions
    tilknyttet_gregistrering_som: string; // datasource tilknyttetregistreringsomOptions
    dokumentobjekter: { faste_elementer: Dokumentobjekt[]; generert_fra_samling: Dokumentobjekt[] };
    skjerming: Skjerming;
};

type Dokumentobjekt = {
    variantformat: string; // datasource variantformatOptions
    filformat: string; // datasource formatOptions
    fil: string;
};

// object defined
type Adresse = {
    adresselinsjer: { faste_elementer: string[]; generert_fra_samling: string[] };
    postnummer: string;
    poststed: string;
};

// object defined
type Kontaktinformasjon = {
    e_post: string;
    mobiltelefonnummer: string;
    telefonnummer: string;
};

// object defined
type Skjerming = {
    tilgangsrestriksjon: string;
    skjermingshjemmel: string;
};
