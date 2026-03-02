import type { Metadata } from '~/types/data/metadata';
import { DataTypeDefinition } from '~/types/data/datatypes';

const arkivsak = {
    instanceValueMetadata: [
        { displayName: 'Kommunenummer', type: 'STRING', key: 'knr' },
        { displayName: 'Gårdsnummer', type: 'STRING', key: 'gnr' },
        { displayName: 'Bruksnummer', type: 'STRING', key: 'bnr' },
        { displayName: 'Festenummer', type: 'STRING', key: 'fnr' },
        { displayName: 'Seksjonsnummer', type: 'STRING', key: 'snr' },
        { displayName: 'Eierforholdskode', type: 'STRING', key: 'eierforholdskode' },
        { displayName: 'Eierforholdsnavn', type: 'STRING', key: 'eierforholdsnavn' },
        { displayName: 'Takstnummer', type: 'STRING', key: 'takstnummer' },
        { displayName: 'Prosjektnummer', type: 'STRING', key: 'prosjektnr' },
        { displayName: 'Prosjektnavn', type: 'STRING', key: 'prosjektnavn' },
        { displayName: 'Kommunenavn', type: 'STRING', key: 'kommunenavn' },
        { displayName: 'Adresse', type: 'STRING', key: 'adresse' },
        { displayName: 'Tittel', type: 'STRING', key: 'tittel' },
        { displayName: 'Saksansvarlig E-post', type: 'STRING', key: 'saksansvarligEpost' },
        { displayName: 'Saksansvarlig', type: 'STRING', key: 'saksansvarlig' },
    ],
    instanceObjectCollectionMetadata: [
        {
            displayName: 'Saksparter',
            objectMetadata: {
                instanceValueMetadata: [
                    { displayName: 'Navn', type: 'STRING', key: 'navn' },
                    {
                        displayName: 'Organisasjonsnummer',
                        type: 'STRING',
                        key: 'organisasjonsnummer',
                    },
                    { displayName: 'E-post', type: 'STRING', key: 'epost' },
                    { displayName: 'Telefon', type: 'STRING', key: 'telefon' },
                    { displayName: 'Postadresse', type: 'STRING', key: 'postadresse' },
                    { displayName: 'Postnummer', type: 'STRING', key: 'postnummer' },
                    { displayName: 'Poststed', type: 'STRING', key: 'poststed' },
                ],
                instanceObjectCollectionMetadata: [],
                categories: [],
            },
            key: 'saksparter',
        },
    ],
    categories: [],
};

export const arkivsakMetadata: Metadata[] = [
    { id: '01-knr', displayName: 'Kommunenummer', key: 'knr', type: DataTypeDefinition.Text },
    { id: '02-gnr', displayName: 'Gårdsnummer', key: 'gnr', type: DataTypeDefinition.Text },
    { id: '03-bnr', displayName: 'Bruksnummer', key: 'bnr', type: DataTypeDefinition.Text },
    { id: '04-fnr', displayName: 'Festenummer', key: 'fnr', type: DataTypeDefinition.Text },
    { id: '05-snr', displayName: 'Seksjonsnummer', key: 'snr', type: DataTypeDefinition.Text },
    {
        id: '06-eierforholdskode',
        displayName: 'Eierforholdskode',
        key: 'eierforholdskode',
        type: DataTypeDefinition.Text,
    },
    {
        id: '07-eierforholdsnavn',
        displayName: 'Eierforholdsnavn',
        key: 'eierforholdsnavn',
        type: DataTypeDefinition.Text,
    },
    {
        id: '08-takstnummer',
        displayName: 'Takstnummer',
        key: 'takstnummer',
        type: DataTypeDefinition.Text,
    },
    {
        id: '09-prosjektnr',
        displayName: 'Prosjektnummer',
        key: 'prosjektnr',
        type: DataTypeDefinition.Text,
    },
    {
        id: '10-prosjektnavn',
        displayName: 'Prosjektnavn',
        key: 'prosjektnavn',
        type: DataTypeDefinition.Text,
    },
    {
        id: '11-kommunenavn',
        displayName: 'Kommunenavn',
        key: 'kommunenavn',
        type: DataTypeDefinition.Text,
    },
    { id: '12-adresse', displayName: 'Adresse', key: 'adresse', type: DataTypeDefinition.Text },
    { id: '13-tittel', displayName: 'Tittel', key: 'tittel', type: DataTypeDefinition.Text },
    {
        id: '14-saksansvarligEpost',
        displayName: 'Saksansvarlig E-post',
        key: 'saksansvarligEpost',
        type: DataTypeDefinition.Text,
    },
    {
        id: '15-saksansvarlig',
        displayName: 'Saksansvarlig',
        key: 'saksansvarlig',
        type: DataTypeDefinition.Text,
    },
];
