import type {
    AcosDocumentType,
    AcosInstanceElementType,
    AcosInstanceMetadataType,
    AcosInstanceType,
    ArkivSakType,
    EgrvSakspartType,
    EgrvSakType,
    MockDataTypes,
} from '~/types/mockedDataTypes';

export const eGrvSakMockData: EgrvSakType = {
    id: '123testID456',
    kommunenavn: '2222',
    prosjektnavn: '215400',
    gaardsnummer: '333',
    bruksnummer: '4',
    seksjonsnummer: '0',
    tittel: 'TEST - E39 Mandal - Lyngdal øst - Grunnerverv - 2222 / 333 / 4, 0, 0, H - Testvei 321 3531 KROKKLEIVA - Navnesen Navn',
    adresse: 'Testvei 321 3531 KROKKLEIVA',
    saksansvarligEpost: 'fornavn.etternavn@novari.no',
    sakspartner: {
        navn: 'Navnesen Navn',
        organisasjonsnummer: '07018549519',
        epost: 'navn.navnesen@gmail.com',
        telefon: '12345678',
        postadresse: 'Testadresse 12',
        postnummer: '1234',
        poststed: 'Oslo',
    },
};

export const mockDataContent = (dataType: string): MockDataTypes => {
    switch (dataType.toLowerCase()) {
        case 'egrv sak':
            return eGrvSakMockData;
        case 'arkiv sak':
            return {
                tittel: '',
                offentligTittel: '',
                saksmappetype: '',
                administrativEnhet: '',
                saksansvarlig: '',
                skjerming: {
                    skjermingshjemmel: '',
                    skjermingskode: '',
                    skjermingsfrist: '',
                    begrunnelse: '',
                },
                arkivdel: '',
                saksstatus: '',
                parter: [],
            } as ArkivSakType;
        case 'egrv sakspart':
            return {
                id: '',
                navn: '',
                organisasjonsnummer: '',
                epost: '',
                telefon: '',
                postadresse: '',
                postnummer: '',
                poststed: '',
            } as EgrvSakspartType;
        case 'acos':
            return {
                metadata: {
                    formId: '',
                    instanceId: '',
                    instanceUri: '',
                },
                formPdfBase64: '',
                elements: [],
                documents: [],
            } as AcosInstanceType;
        case 'acosinstancemetadata':
            return {
                formId: '',
                instanceId: '',
                instanceUri: '',
            } as AcosInstanceMetadataType;
        case 'acosinstanceelement':
            return {
                id: '',
                value: '',
                hashCode: 0,
            } as AcosInstanceElementType;
        case 'acosdocument':
            return {
                name: '',
                encoding: '',
                filinnhold: '',
                mediatype: '',
            } as AcosDocumentType;
        case 'object':
        default:
            return undefined;
    }
};
