import { type Metadata } from '~/types/data/metadata';

import { DataTypeDefinition } from '~/types/data/datatypes';

const metadataMock: Metadata[] = [
    {
        id: '01-saksnummer',
        displayName: 'Saksnummer',
        key: 'saksnummer',
        type: DataTypeDefinition.Text,
    },
    { id: '02-tittel', displayName: 'Tittel', key: 'tittel', type: DataTypeDefinition.Text },
    {
        id: '03-dokumentNavn',
        displayName: 'Dokumentnavn',
        key: 'dokumentNavn',
        type: DataTypeDefinition.Text,
    },
    {
        id: '04-dokumentDato',
        displayName: 'Dokumentdato',
        key: 'dokumentDato',
        type: DataTypeDefinition.Text,
    },
    {
        id: '05-forsendelsesmaate',
        displayName: 'Forsendelsesmåte',
        key: 'forsendelsesmaate',
        type: DataTypeDefinition.Text,
    },
    {
        id: '06-kommunenavn',
        displayName: 'Kommunenavn',
        key: 'kommunenavn',
        type: DataTypeDefinition.Text,
    },
    { id: '07-knr', displayName: 'Kommunenummer', key: 'knr', type: DataTypeDefinition.Text },
    { id: '08-gnr', displayName: 'Gårdsnummer', key: 'gnr', type: DataTypeDefinition.Text },
    { id: '09-bnr', displayName: 'Bruksnummer', key: 'bnr', type: DataTypeDefinition.Text },
    { id: '10-fnr', displayName: 'Festenummer', key: 'fnr', type: DataTypeDefinition.Text },
    {
        id: '11-adresse',
        displayName: 'Adresse',
        key: 'adresse',
        type: DataTypeDefinition.Text,
    },
    { id: '12-snr', displayName: 'Seksjonsnummer', key: 'snr', type: DataTypeDefinition.Text },
    {
        id: '13-eierforhold',
        displayName: 'Eierforhold',
        key: 'eierforhold',
        type: DataTypeDefinition.Text,
    },
    {
        id: '14-eierforholdskode',
        displayName: 'Eierforholdskode',
        key: 'eierforholdskode',
        type: DataTypeDefinition.Text,
    },
    {
        id: '15-eierforholdsnavn',
        displayName: 'Eierforholdsnavn',
        key: 'eierforholdsnavn',
        type: DataTypeDefinition.Text,
    },
    { id: '16-id', displayName: 'Id', key: 'id', type: DataTypeDefinition.Text },
    {
        id: '17-maltittel',
        displayName: 'Maltittel',
        key: 'maltittel',
        type: DataTypeDefinition.Text,
    },
    {
        id: '18-saksbehandlerEpost',
        displayName: 'Saksbehandler E-post',
        key: 'saksbehandlerEpost',
        type: DataTypeDefinition.Text,
    },
    {
        id: '19-saksbehandler',
        displayName: 'Saksbehandler',
        key: 'saksbehandler',
        type: DataTypeDefinition.Text,
    },
    {
        id: '20-takstnummer',
        displayName: 'Takstnummer',
        key: 'takstnummer',
        type: DataTypeDefinition.Text,
    },
    {
        id: '21-prosjektnavn',
        displayName: 'Prosjektnavn',
        key: 'prosjektnavn',
        type: DataTypeDefinition.Text,
    },
    {
        id: '22-prosjektnr',
        displayName: 'Prosjektnummer',
        key: 'prosjektnr',
        type: DataTypeDefinition.Text,
    },
    {
        id: '23-saksansvarligEpost',
        displayName: 'Saksansvarlig E-post',
        key: 'saksansvarligEpost',
        type: DataTypeDefinition.Text,
    },
    {
        id: '24-saksansvarlig',
        displayName: 'Saksansvarlig',
        key: 'saksansvarlig',
        type: DataTypeDefinition.Text,
    },
];

export default metadataMock;
