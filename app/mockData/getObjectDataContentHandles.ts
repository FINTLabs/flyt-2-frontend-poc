import type { HandleData } from '~/types/handleTypes';
import { DataTypeDefinition } from '~/types/data/datatypes';
import { eGrunnervervSaksHandles } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/eGrunnervervSak';
import { archiveSakHandles } from '~/mockData/objectDataContent/objectHandles/archiveSak';
import { skjermingHandles } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/skjerming';
import { journalpost } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/journalpost';
import { sakspart } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/sakspart';
import { part } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/part';
import { klassering } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/klassering';
import { dokumentbeskrivelse } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/dokumentbeskrivelse';
import { dokumentobjekt } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/dokumentobjekt';
import { korrespondansepart } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/korrespondansepart';
import { eGrunnervervJournalpostHandles } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/eGrunnervervJournalpost';
import { vedleggHandles } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/vedlegg';
import { mottakereHandles } from '~/mockData/objectDataContent/objectHandles/eGrunnerverv/mottakere';

export const mockFetchDataContentHandles = (
    nodeID: string,
    handleType: 's' | 't',
    dataType: string,
    dataLabel?: string
): HandleData[] | undefined => {
    switch (dataType.toLowerCase()) {
        case 'egrv sak':
            return eGrunnervervSaksHandles(nodeID, handleType);
        case 'egrv journalpost':
            return eGrunnervervJournalpostHandles(nodeID, handleType);
        case 'arkivsak':
            return archiveSakHandles(nodeID, handleType);
        case 'sakspart':
            return sakspart(nodeID, handleType);
        case 'part':
            return part(nodeID, handleType);
        case 'klassering':
            return klassering(nodeID, handleType);
        case 'skjerming':
            return skjermingHandles(nodeID, handleType);
        case 'journalpost':
            return journalpost(nodeID, handleType);
        case 'korrpart':
            return korrespondansepart(nodeID, handleType);
        case 'dokbeskr':
            return dokumentbeskrivelse(nodeID, handleType);
        case 'dokobj':
            return dokumentobjekt(nodeID, handleType);
        case 'mottakere':
            return mottakereHandles(nodeID, handleType);
        case 'vedlegg':
            return vedleggHandles(nodeID, handleType);
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
        case 'adresse':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: 'Postnummer',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Text,
                    label: 'Poststed',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.CollectionText,
                    label: 'Adresselinjer',
                    required: false,
                },
            ];
        case 'kontaktinformasjon':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: 'E-post',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:b`,
                    type: DataTypeDefinition.Text,
                    label: 'Mobiltelefonnummer',
                    required: true,
                },
                {
                    id: `${nodeID}:${handleType}:c`,
                    type: DataTypeDefinition.Text,
                    label: 'Telefonnummer',
                    required: false,
                },
            ];
        case 'text':
            return [
                {
                    id: `${nodeID}:${handleType}:a`,
                    type: DataTypeDefinition.Text,
                    label: dataLabel ?? dataType,
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
