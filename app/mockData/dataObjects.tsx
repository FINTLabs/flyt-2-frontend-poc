import { DataType } from '~/types/datatypes';
import type { HandleData } from '~/types/handleTypes';

export const mockFetchDataContent = (
    dataType: string,
    dataLabel?: string
): HandleData[] | undefined => {
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
                { id: 'g', label: 'Poststed', type: DataType.Text, required: true }
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
