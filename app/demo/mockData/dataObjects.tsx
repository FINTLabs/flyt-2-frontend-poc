import { DataTypeOld } from '~/demo/types/datatypes';
import type { HandleDataOld } from '~/types/handleTypes';
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
): HandleDataOld[] | undefined => {
    console.log('mockFetchDataContentHandles', dataType, dataLabel);
    switch (dataType.toLowerCase()) {
        case 'egrv sak':
            return [
                { id: 'a', label: 'Kommunenavn', type: DataTypeOld.Text, required: true },
                { id: 'b', label: 'Prosjektnavn', type: DataTypeOld.Text, required: true },
                { id: 'c', label: 'Gårdsnummer', type: DataTypeOld.Text, required: true },
                { id: 'd', label: 'Bruksnummer', type: DataTypeOld.Text, required: true },
                { id: 'e', label: 'Seksjonsnummer', type: DataTypeOld.Text, required: true },
                { id: 'f', label: 'Tittel', type: DataTypeOld.Text, required: true },
                { id: 'g', label: 'Adresse', type: DataTypeOld.Text, required: true },
                { id: 'h', label: 'Saksansvarlig e-post', type: DataTypeOld.Text, required: true },
                {
                    id: 'i',
                    label: 'Sakspartner',
                    type: DataTypeOld.Object,
                    typeName: 'eGrv Sakspart',
                    required: true,
                },
            ];
        case 'arkiv sak':
            return [
                { id: 'a', type: DataTypeOld.Text, label: 'Tittel', required: true },
                { id: 'b', type: DataTypeOld.Text, label: 'Offentlig tittel', required: false },
                { id: 'c', type: DataTypeOld.Reference, label: 'Saksmappetype', required: false },
                {
                    id: 'd',
                    type: DataTypeOld.Reference,
                    label: 'Administrativ enhet',
                    required: false,
                },
                { id: 'e', type: DataTypeOld.Reference, label: 'Saksansvarlig', required: false },
                {
                    id: 'f',
                    type: DataTypeOld.Object,
                    typeName: 'Arkiv Skjerming',
                    label: 'Skjerming',
                    required: true,
                },
                { id: 'g', type: DataTypeOld.Reference, label: 'Arkivdel', required: false },
                { id: 'h', type: DataTypeOld.Reference, label: 'Saksstatus', required: false },
                {
                    id: 'i',
                    type: DataTypeOld.CollectionObject,
                    typeName: 'Arkiv Part',
                    label: 'Parter',
                    required: false,
                },
            ];
        case 'egrv sakspart':
            return [
                { id: 'a', label: 'Navn', type: DataTypeOld.Text, required: true },
                { id: 'b', label: 'Organisasjonsnummer', type: DataTypeOld.Text, required: true },
                { id: 'c', label: 'E-post', type: DataTypeOld.Text, required: true },
                { id: 'd', label: 'Telefon', type: DataTypeOld.Text, required: true },
                { id: 'e', label: 'Postadresse', type: DataTypeOld.Text, required: true },
                { id: 'f', label: 'Postnummer', type: DataTypeOld.Text, required: true },
                { id: 'g', label: 'Poststed', type: DataTypeOld.Text, required: true },
            ];
        case 'acos':
            // AcosInstance
            return [
                {
                    id: 'a',
                    type: DataTypeOld.Object,
                    typeName: 'AcosInstanceMetadata',
                    label: 'metadata',
                    required: true,
                },
                { id: 'b', type: DataTypeOld.Text, label: 'formPdfBase64', required: true },
                {
                    id: 'c',
                    type: DataTypeOld.CollectionObject,
                    typeName: 'AcosInstanceElement',
                    label: 'elements',
                    required: true,
                },
                {
                    id: 'd',
                    type: DataTypeOld.CollectionObject,
                    typeName: 'AcosDocument',
                    label: 'documents',
                    required: true,
                },
            ];
        case 'acos vik304':
            return [
                {
                    id: 'a',
                    type: DataTypeOld.File,
                    label: 'Skjema-PDF',
                    required: true,
                },
                {
                    id: 'b',
                    type: DataTypeOld.CollectionObject,
                    typeName: 'Vedlegg',
                    label: 'Vedlegg',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataTypeOld.Object,
                    typeName: 'Innledning',
                    label: 'Innledning',
                    required: true,
                },
                {
                    id: 'd',
                    type: DataTypeOld.Object,
                    typeName: 'Ref',
                    label: 'Ref',
                    required: true,
                },
            ];
        case 'innledning':
            return [
                {
                    id: 'a',
                    type: DataTypeOld.Object,
                    typeName: 'Soeker',
                    label: 'Om søkeren',
                    required: true,
                },
                {
                    id: 'b',
                    type: DataTypeOld.Object,
                    label: 'Om flyttingen',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataTypeOld.Object,
                    label: 'Ny adresse',
                    required: true,
                },
            ];
        case 'ref':
            return [{ id: 'a', type: DataTypeOld.Text, label: 'Ref', required: true }];
        case 'soeker':
            return [
                { id: 'a', type: DataTypeOld.Text, label: 'Fødselsnummer', required: true },
                {
                    id: 'b',
                    type: DataTypeOld.Text,
                    label: 'Fnr til avlevering',
                    required: true,
                },
                {
                    id: 'c',
                    type: DataTypeOld.Text,
                    label: 'Fødselsdato',
                    required: true,
                },
                { id: 'd', type: DataTypeOld.Text, label: 'Fødsel', required: true },
                { id: 'e', type: DataTypeOld.Text, label: 'Fornavn', required: true },
                { id: 'f', type: DataTypeOld.Text, label: 'Etternavn', required: true },
                { id: 'g', type: DataTypeOld.Text, label: 'Adresse', required: true },
                { id: 'h', type: DataTypeOld.Text, label: 'Postnr', required: true },
                { id: 'i', type: DataTypeOld.Text, label: 'Telefonnr', required: true },
                { id: 'j', type: DataTypeOld.Text, label: 'E-post', required: true },
            ];
        case 'acosinstancemetadata':
            return [
                { id: 'a', type: DataTypeOld.Text, label: 'formId', required: true },
                { id: 'b', type: DataTypeOld.Text, label: 'instanceId', required: true },
                { id: 'c', type: DataTypeOld.Text, label: 'instanceUri', required: false },
            ];
        case 'acosinstanceelement':
            return [
                { id: 'a', type: DataTypeOld.Text, label: 'id', required: true },
                { id: 'b', type: DataTypeOld.Text, label: 'value', required: false },
                { id: 'c', type: DataTypeOld.Number, label: 'hashCode', required: false },
            ];
        case 'acosdocument':
            return [
                { id: 'a', type: DataTypeOld.Text, label: 'name', required: true },
                { id: 'b', type: DataTypeOld.Text, label: 'encoding', required: true },
                { id: 'c', type: DataTypeOld.File, label: 'filinnhold', required: false },
                { id: 'd', type: DataTypeOld.Reference, label: 'mediatype', required: true },
            ];
        case 'object':
        default:
            return [
                {
                    id: 'a',
                    type: DataTypeOld.Object,
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
