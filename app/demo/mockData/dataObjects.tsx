import type { EgrvSakType } from '~/types/mockedDataTypes';

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
