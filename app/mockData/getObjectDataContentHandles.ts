import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';

export const mockFetchDataContentHandles = (
    nodeID: string,
    handleType: 's' | 't',
    dataType: string,
    dataLabel?: string
): HandleData[] | undefined => {
    console.log('mockFetchDataContentHandles', dataType, dataLabel);
    switch (dataType.toLowerCase()) {
        case 'egrv sak':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    label: 'Kommunenavn',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    label: 'Prosjektnavn',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    label: 'Gårdsnummer',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:d`,
                    label: 'Bruksnummer',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:e`,
                    label: 'Seksjonsnummer',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:f`,
                    label: 'Tittel',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:g`,
                    label: 'Adresse',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:h`,
                    label: 'Saksansvarlig e-post',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:i`,
                    label: 'Sakspartner',
                    type: DataTypeDefinition.Object,
                    typeName: 'eGrv Sakspart',
                    required: true,
                },
            ];
        case 'arkiv sak':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: 'Tittel',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Text,
                    label: 'Offentlig tittel',
                    required: false,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.Reference,
                    label: 'Saksmappetype',
                    required: false,
                },
                {
                    id: `${nodeID}:${handleType}:d`,
                    type: DataTypeDefinition.Reference,
                    label: 'Administrativ enhet',
                    required: false,
                },
                {
                    id: `${nodeID}:${handleType}:e`,
                    type: DataTypeDefinition.Reference,
                    label: 'Saksansvarlig',
                    required: false,
                },
                {
                    id: `${nodeID}:${handleType}:f`,
                    type: DataTypeDefinition.Object,
                    typeName: 'Arkiv Skjerming',
                    label: 'Skjerming',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:g`,
                    type: DataTypeDefinition.Reference,
                    label: 'Arkivdel',
                    required: false,
                },
                {
                    id: `${nodeID}:${handleType}:h`,
                    type: DataTypeDefinition.Reference,
                    label: 'Saksstatus',
                    required: false,
                },
                {
                    id: `${nodeID}:${handleType}:i`,
                    type: DataTypeDefinition.CollectionObject,
                    typeName: 'Arkiv Part',
                    label: 'Parter',
                    required: false,
                },
            ];
        case 'egrv sakspart':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    label: 'Navn',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    label: 'Organisasjonsnummer',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    label: 'E-post',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:d`,
                    label: 'Telefon',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:e`,
                    label: 'Postadresse',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:f`,
                    label: 'Postnummer',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:g`,
                    label: 'Poststed',
                    type: DataTypeDefinition.Text,
                    required: true,
                },
            ];
        case 'acos':
            // AcosInstance
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Object,
                    typeName: 'AcosInstanceMetadata',
                    label: 'metadata',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Text,
                    label: 'formPdfBase64',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.CollectionObject,
                    typeName: 'AcosInstanceElement',
                    label: 'elements',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:d`,
                    type: DataTypeDefinition.CollectionObject,
                    typeName: 'AcosDocument',
                    label: 'documents',
                    required: true,
                },
            ];
        case 'acos vik304':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.File,
                    label: 'Skjema-PDF',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.CollectionObject,
                    typeName: 'Vedlegg',
                    label: 'Vedlegg',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.Object,
                    typeName: 'Innledning',
                    label: 'Innledning',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:d`,
                    type: DataTypeDefinition.Object,
                    typeName: 'Ref',
                    label: 'Ref',
                    required: true,
                },
            ];
        case 'innledning':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Object,
                    typeName: 'Soeker',
                    label: 'Om søkeren',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Object,
                    label: 'Om flyttingen',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.Object,
                    label: 'Ny adresse',
                    required: true,
                },
            ];
        case 'ref':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: 'Ref',
                    required: true,
                },
            ];
        case 'soeker':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: 'Fødselsnummer',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Text,
                    label: 'Fnr til avlevering',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.Text,
                    label: 'Fødselsdato',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:d`,
                    type: DataTypeDefinition.Text,
                    label: 'Fødsel',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:e`,
                    type: DataTypeDefinition.Text,
                    label: 'Fornavn',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:f`,
                    type: DataTypeDefinition.Text,
                    label: 'Etternavn',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:g`,
                    type: DataTypeDefinition.Text,
                    label: 'Adresse',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:h`,
                    type: DataTypeDefinition.Text,
                    label: 'Postnr',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:i`,
                    type: DataTypeDefinition.Text,
                    label: 'Telefonnr',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:j`,
                    type: DataTypeDefinition.Text,
                    label: 'E-post',
                    required: true,
                },
            ];
        case 'acosinstancemetadata':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: 'formId',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Text,
                    label: 'instanceId',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.Text,
                    label: 'instanceUri',
                    required: false,
                },
            ];
        case 'acosinstanceelement':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: 'id',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Text,
                    label: 'value',
                    required: false,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.Number,
                    label: 'hashCode',
                    required: false,
                },
            ];
        case 'acosdocument':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: 'name',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Text,
                    label: 'encoding',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.File,
                    label: 'filinnhold',
                    required: false,
                },
                {
                    id: `${nodeID}:${handleType}:d`,
                    type: DataTypeDefinition.Reference,
                    label: 'mediatype',
                    required: true,
                },
            ];
        case 'object':
        default:
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Object,
                    typeName: dataType,
                    label: dataLabel ?? dataType,
                    required: true,
                },
            ];
    }
};
