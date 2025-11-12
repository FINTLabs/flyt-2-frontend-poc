import { DataType } from '~/types/datatypes';
import type { HandleData } from '~/types/handleTypes';
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

export const mockFetchDataContentHandles = (
    dataType: string,
    dataLabel?: string
): HandleData[] | undefined => {
    console.log('mockFetchDataContentHandles', dataType, dataLabel);
    switch (dataType.toLowerCase()) {
        case 'egrv sak':
            return [
                { id: 'a', label: 'Kommunenavn', type: DataType.Text, required: true },
                { id: 'b', label: 'Prosjektnavn', type: DataType.Text, required: true },
                { id: 'c', label: 'Gårdsnummer', type: DataType.Text, required: true },
                { id: 'd', label: 'Bruksnummer', type: DataType.Text, required: true },
                { id: 'e', label: 'Seksjonsnummer', type: DataType.Text, required: true },
                { id: 'f', label: 'Tittel', type: DataType.Text, required: true },
                { id: 'g', label: 'Adresse', type: DataType.Text, required: true },
                { id: 'h', label: 'Saksansvarlig e-post', type: DataType.Text, required: true },
                {
                    id: 'i',
                    label: 'Sakspartner',
                    type: DataType.Object,
                    typeName: 'eGrv Sakspart',
                    required: true,
                },
            ];
        case 'arkiv sak':
            return [
                { id: 'a', type: DataType.Text, label: 'Tittel', required: true },
                { id: 'b', type: DataType.Text, label: 'Offentlig tittel', required: false },
                { id: 'c', type: DataType.Reference, label: 'Saksmappetype', required: false },
                {
                    id: 'd',
                    type: DataType.Reference,
                    label: 'Administrativ enhet',
                    required: false,
                },
                { id: 'e', type: DataType.Reference, label: 'Saksansvarlig', required: false },
                {
                    id: 'f',
                    type: DataType.Object,
                    typeName: 'Arkiv Skjerming',
                    label: 'Skjerming',
                    required: true,
                },
                { id: 'g', type: DataType.Reference, label: 'Arkivdel', required: false },
                { id: 'h', type: DataType.Reference, label: 'Saksstatus', required: false },
                {
                    id: 'i',
                    type: DataType.CollectionObject,
                    typeName: 'Arkiv Part',
                    label: 'Parter',
                    required: false,
                },
            ];
        case 'egrv sakspart':
            return [
                { id: 'a', label: 'Navn', type: DataType.Text, required: true },
                { id: 'b', label: 'Organisasjonsnummer', type: DataType.Text, required: true },
                { id: 'c', label: 'E-post', type: DataType.Text, required: true },
                { id: 'd', label: 'Telefon', type: DataType.Text, required: true },
                { id: 'e', label: 'Postadresse', type: DataType.Text, required: true },
                { id: 'f', label: 'Postnummer', type: DataType.Text, required: true },
                { id: 'g', label: 'Poststed', type: DataType.Text, required: true },
            ];
        case 'acos':
            // AcosInstance
            return [
                {
                    id: 'a',
                    type: DataType.Object,
                    typeName: 'AcosInstanceMetadata',
                    label: 'metadata',
                    required: true,
                },
                { id: 'b', type: DataType.Text, label: 'formPdfBase64', required: true },
                {
                    id: 'c',
                    type: DataType.CollectionObject,
                    typeName: 'AcosInstanceElement',
                    label: 'elements',
                    required: true,
                },
                {
                    id: 'd',
                    type: DataType.CollectionObject,
                    typeName: 'AcosDocument',
                    label: 'documents',
                    required: true,
                },
            ];
        case 'acos vik304':
            return [
                {
                    id: 'a',
                    type: DataType.File,
                    label: 'Skjema-PDF',
                    required: true,
                },
                {
                    id: 'b',
                    type: DataType.CollectionObject,
                    typeName: 'Vedlegg',
                    label: 'Vedlegg',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataType.Object,
                    typeName: 'Innledning',
                    label: 'Innledning',
                    required: true,
                },
                {
                    id: 'd',
                    type: DataType.Object,
                    typeName: 'Ref',
                    label: 'Ref',
                    required: true,
                },
            ];
        case 'innledning':
            return [
                {
                    id: 'a',
                    type: DataType.Object,
                    typeName: 'Soeker',
                    label: 'Om søkeren',
                    required: true,
                },
                {
                    id: 'b',
                    type: DataType.Object,
                    label: 'Om flyttingen',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataType.Object,
                    label: 'Ny adresse',
                    required: true,
                },
            ];
        case 'ref':
            return [{ id: 'a', type: DataType.Text, label: 'Ref', required: true }];
        case 'soeker':
            return [
                { id: 'a', type: DataType.Text, label: 'Fødselsnummer', required: true },
                {
                    id: 'b',
                    type: DataType.Text,
                    label: 'Fnr til avlevering',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataType.Text,
                    label: 'Fødselsdato',
                    required: true,
                },
                { id: 'd', type: DataType.Text, label: 'Fødsel', required: true },
                { id: 'e', type: DataType.Text, label: 'Fornavn', required: true },
                { id: 'f', type: DataType.Text, label: 'Etternavn', required: true },
                { id: 'g', type: DataType.Text, label: 'Adresse', required: true },
                { id: 'h', type: DataType.Text, label: 'Postnr', required: true },
                { id: 'i', type: DataType.Text, label: 'Telefonnr', required: true },
                { id: 'j', type: DataType.Text, label: 'E-post', required: true },
            ];
        case 'acosinstancemetadata':
            return [
                { id: 'a', type: DataType.Text, label: 'formId', required: true },
                { id: 'b', type: DataType.Text, label: 'instanceId', required: true },
                { id: 'c', type: DataType.Text, label: 'instanceUri', required: false },
            ];
        case 'acosinstanceelement':
            return [
                { id: 'a', type: DataType.Text, label: 'id', required: true },
                { id: 'b', type: DataType.Text, label: 'value', required: false },
                { id: 'c', type: DataType.Number, label: 'hashCode', required: false },
            ];
        case 'acosdocument':
            return [
                { id: 'a', type: DataType.Text, label: 'name', required: true },
                { id: 'b', type: DataType.Text, label: 'encoding', required: true },
                { id: 'c', type: DataType.File, label: 'filinnhold', required: false },
                { id: 'd', type: DataType.Reference, label: 'mediatype', required: true },
            ];
        case 'object':
        default:
            return [
                {
                    id: 'a',
                    type: DataType.Object,
                    typeName: dataType,
                    label: dataLabel ?? dataType,
                    required: true,
                },
            ];
    }
};

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
