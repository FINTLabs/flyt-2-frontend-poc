import { DataTypeDefinition } from '~/types/data/datatypes';
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
                { id: 'a', label: 'Kommunenavn', type: DataTypeDefinition.Text, required: true },
                { id: 'b', label: 'Prosjektnavn', type: DataTypeDefinition.Text, required: true },
                { id: 'c', label: 'Gårdsnummer', type: DataTypeDefinition.Text, required: true },
                { id: 'd', label: 'Bruksnummer', type: DataTypeDefinition.Text, required: true },
                { id: 'e', label: 'Seksjonsnummer', type: DataTypeDefinition.Text, required: true },
                { id: 'f', label: 'Tittel', type: DataTypeDefinition.Text, required: true },
                { id: 'g', label: 'Adresse', type: DataTypeDefinition.Text, required: true },
                {
                    id: 'h',
                    label: 'Saksansvarlig e-post',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: 'i',
                    label: 'Sakspartner',
                    type: DataTypeDefinition.Object,
                    typeName: 'eGrv Sakspart',
                    required: true,
                },
            ];
        case 'arkiv sak':
            return [
                { id: 'a', type: DataTypeDefinition.Text, label: 'Tittel', required: true },
                {
                    id: 'b',
                    type: DataTypeDefinition.Text,
                    label: 'Offentlig tittel',
                    required: false,
                },
                {
                    id: 'c',
                    type: DataTypeDefinition.Reference,
                    label: 'Saksmappetype',
                    required: false,
                },
                {
                    id: 'd',
                    type: DataTypeDefinition.Reference,
                    label: 'Administrativ enhet',
                    required: false,
                },
                {
                    id: 'e',
                    type: DataTypeDefinition.Reference,
                    label: 'Saksansvarlig',
                    required: false,
                },
                {
                    id: 'f',
                    type: DataTypeDefinition.Object,
                    typeName: 'Arkiv Skjerming',
                    label: 'Skjerming',
                    required: true,
                },
                { id: 'g', type: DataTypeDefinition.Reference, label: 'Arkivdel', required: false },
                {
                    id: 'h',
                    type: DataTypeDefinition.Reference,
                    label: 'Saksstatus',
                    required: false,
                },
                {
                    id: 'i',
                    type: DataTypeDefinition.CollectionObject,
                    typeName: 'Arkiv Part',
                    label: 'Parter',
                    required: false,
                },
            ];
        case 'egrv sakspart':
            return [
                { id: 'a', label: 'Navn', type: DataTypeDefinition.Text, required: true },
                {
                    id: 'b',
                    label: 'Organisasjonsnummer',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                { id: 'c', label: 'E-post', type: DataTypeDefinition.Text, required: true },
                { id: 'd', label: 'Telefon', type: DataTypeDefinition.Text, required: true },
                { id: 'e', label: 'Postadresse', type: DataTypeDefinition.Text, required: true },
                { id: 'f', label: 'Postnummer', type: DataTypeDefinition.Text, required: true },
                { id: 'g', label: 'Poststed', type: DataTypeDefinition.Text, required: true },
            ];
        case 'acos':
            // AcosInstance
            return [
                {
                    id: 'a',
                    type: DataTypeDefinition.Object,
                    typeName: 'AcosInstanceMetadata',
                    label: 'metadata',
                    required: true,
                },
                { id: 'b', type: DataTypeDefinition.Text, label: 'formPdfBase64', required: true },
                {
                    id: 'c',
                    type: DataTypeDefinition.CollectionObject,
                    typeName: 'AcosInstanceElement',
                    label: 'elements',
                    required: true,
                },
                {
                    id: 'd',
                    type: DataTypeDefinition.CollectionObject,
                    typeName: 'AcosDocument',
                    label: 'documents',
                    required: true,
                },
            ];
        case 'acos vik304':
            return [
                {
                    id: 'a',
                    type: DataTypeDefinition.File,
                    label: 'Skjema-PDF',
                    required: true,
                },
                {
                    id: 'b',
                    type: DataTypeDefinition.CollectionObject,
                    typeName: 'Vedlegg',
                    label: 'Vedlegg',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataTypeDefinition.Object,
                    typeName: 'Innledning',
                    label: 'Innledning',
                    required: true,
                },
                {
                    id: 'd',
                    type: DataTypeDefinition.Object,
                    typeName: 'Ref',
                    label: 'Ref',
                    required: true,
                },
            ];
        case 'innledning':
            return [
                {
                    id: 'a',
                    type: DataTypeDefinition.Object,
                    typeName: 'Soeker',
                    label: 'Om søkeren',
                    required: true,
                },
                {
                    id: 'b',
                    type: DataTypeDefinition.Object,
                    label: 'Om flyttingen',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataTypeDefinition.Object,
                    label: 'Ny adresse',
                    required: true,
                },
            ];
        case 'ref':
            return [{ id: 'a', type: DataTypeDefinition.Text, label: 'Ref', required: true }];
        case 'soeker':
            return [
                { id: 'a', type: DataTypeDefinition.Text, label: 'Fødselsnummer', required: true },
                {
                    id: 'b',
                    type: DataTypeDefinition.Text,
                    label: 'Fnr til avlevering',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataTypeDefinition.Text,
                    label: 'Fødselsdato',
                    required: true,
                },
                { id: 'd', type: DataTypeDefinition.Text, label: 'Fødsel', required: true },
                { id: 'e', type: DataTypeDefinition.Text, label: 'Fornavn', required: true },
                { id: 'f', type: DataTypeDefinition.Text, label: 'Etternavn', required: true },
                { id: 'g', type: DataTypeDefinition.Text, label: 'Adresse', required: true },
                { id: 'h', type: DataTypeDefinition.Text, label: 'Postnr', required: true },
                { id: 'i', type: DataTypeDefinition.Text, label: 'Telefonnr', required: true },
                { id: 'j', type: DataTypeDefinition.Text, label: 'E-post', required: true },
            ];
        case 'acosinstancemetadata':
            return [
                { id: 'a', type: DataTypeDefinition.Text, label: 'formId', required: true },
                { id: 'b', type: DataTypeDefinition.Text, label: 'instanceId', required: true },
                { id: 'c', type: DataTypeDefinition.Text, label: 'instanceUri', required: false },
            ];
        case 'acosinstanceelement':
            return [
                { id: 'a', type: DataTypeDefinition.Text, label: 'id', required: true },
                { id: 'b', type: DataTypeDefinition.Text, label: 'value', required: false },
                { id: 'c', type: DataTypeDefinition.Number, label: 'hashCode', required: false },
            ];
        case 'acosdocument':
            return [
                { id: 'a', type: DataTypeDefinition.Text, label: 'name', required: true },
                { id: 'b', type: DataTypeDefinition.Text, label: 'encoding', required: true },
                { id: 'c', type: DataTypeDefinition.File, label: 'filinnhold', required: false },
                { id: 'd', type: DataTypeDefinition.Reference, label: 'mediatype', required: true },
            ];
        case 'object':
        default:
            return [
                {
                    id: 'a',
                    type: DataTypeDefinition.Object,
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
