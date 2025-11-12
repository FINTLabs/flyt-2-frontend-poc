// EgrunnervervSakInstance
export type EgrvSakspartType = {
    navn: string;
    organisasjonsnummer: string;
    epost: string;
    telefon: string;
    postadresse: string;
    postnummer: string;
    poststed: string;
};

// EgrunnervervSakInstance
export type EgrvSakType = {
    id: string;
    kommunenavn: string;
    prosjektnavn: string;
    gaardsnummer: string;
    bruksnummer: string;
    seksjonsnummer: string;
    tittel: string;
    adresse: string;
    saksansvarligEpost: string;
    sakspartner: EgrvSakspartType;
};

export type ArkivSakType = {
    tittel: string;
    offentligTittel?: string;
    saksmappetype?: string; // Reference
    administrativEnhet?: string; // Reference
    saksansvarlig?: string; // Reference
    skjerming: {};
    arkivdel?: string; // Reference
    saksstatus?: string; // Reference
    parter?: Array<{}>;
};

export type AcosInstanceMetadataType = {
    formId: string;
    instanceId: string;
    instanceUri?: string;
};

export type AcosInstanceElementType = {
    id: string;
    value?: string;
    hashCode?: number;
};

export type AcosDocumentType = {
    name: string;
    encoding: string;
    filinnhold?: string; // Base64
    mediatype: string; // Reference
};

// AcosInstance
export type AcosInstanceType = {
    metadata: AcosInstanceMetadataType;
    formPdfBase64: string;
    elements: AcosInstanceElementType[];
    documents: AcosDocumentType[];
};
export type MockDataTypes =
    | EgrvSakType
    | ArkivSakType
    | EgrvSakspartType
    | AcosInstanceType
    | AcosInstanceMetadataType
    | AcosInstanceElementType
    | AcosDocumentType
    | undefined;
