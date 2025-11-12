import React, { useState } from 'react';
import { BodyShort, Button, Heading, HStack, Textarea, TextField, VStack } from '@navikt/ds-react';
import type { EgrvSakType, MockDataTypes } from '~/types/mockedDataTypes';

type TestFormPropsType = {
    dataContent: EgrvSakType;
    onRunFlow: (data: MockDataTypes) => void;
};

const EgrvTestForm = ({ dataContent, onRunFlow }: TestFormPropsType) => {
    const [id, setId] = useState(dataContent.id);
    const [tittel, setTittel] = useState(dataContent.tittel);
    const [kommunenavn, setKommunenavn] = useState(dataContent.kommunenavn);
    const [prosjektnavn, setProsjektnavn] = useState(dataContent.prosjektnavn);
    const [gaardsnummer, setGaardsnummer] = useState(dataContent.gaardsnummer);
    const [bruksnummer, setBruksnummer] = useState(dataContent.bruksnummer);
    const [seksjonsnummer, setSeksjonsnummer] = useState(dataContent.seksjonsnummer);
    const [adresse, setAdresse] = useState(dataContent.adresse);
    const [saksansvarligEpost, setSaksansvarligEpost] = useState(dataContent.saksansvarligEpost);
    const [sakspartnerNavn, setSakspartnerNavn] = useState(dataContent.sakspartner.navn);
    const [sakspartnerPostnummer, setSakspartnerPostnummer] = useState(
        dataContent.sakspartner.postnummer
    );
    const [sakspartnerPoststed, setSakspartnerPoststed] = useState(
        dataContent.sakspartner.poststed
    );
    const [sakspartnerPostadresse, setSakspartnerPostadresse] = useState(
        dataContent.sakspartner.postadresse
    );
    const [sakspartnerEpost, setSakspartnerEpost] = useState(dataContent.sakspartner.epost);
    const [sakspartnerTelefon, setSakspartnerTelefon] = useState(dataContent.sakspartner.telefon);
    const [sakspartnerOrganisasjonsnummer, setSakspartnerOrganisasjonsnummer] = useState(
        dataContent.sakspartner.organisasjonsnummer
    );

    const createDataObject = () => {
        const dataObject: EgrvSakType = {
            id: id,
            tittel: tittel,
            kommunenavn: kommunenavn,
            prosjektnavn: prosjektnavn,
            gaardsnummer: gaardsnummer,
            bruksnummer: bruksnummer,
            seksjonsnummer: seksjonsnummer,
            adresse: adresse,
            saksansvarligEpost: saksansvarligEpost,
            sakspartner: {
                navn: sakspartnerNavn,
                postnummer: sakspartnerPostnummer,
                poststed: sakspartnerPoststed,
                epost: sakspartnerEpost,
                telefon: sakspartnerTelefon,
                organisasjonsnummer: sakspartnerOrganisasjonsnummer,
                postadresse: sakspartnerPostadresse,
            },
        };
        onRunFlow(dataObject);
    };

    return (
        <VStack gap={'2'}>
            <HStack justify={'end'}>
                <Button size={'small'} onClick={createDataObject}>
                    Kjør flyt
                </Button>
            </HStack>
            <TextField
                label={'ID'}
                size={'small'}
                value={id}
                onChange={(e) => setId(e.target.value)}
            />
            <Textarea
                label={'Tittel'}
                size={'small'}
                value={tittel}
                onChange={(e) => setTittel(e.target.value)}
            />
            <TextField
                label={'Kommunenavn'}
                size={'small'}
                value={kommunenavn}
                onChange={(e) => setKommunenavn(e.target.value)}
            />
            <TextField
                label={'Prosjektnavn'}
                size={'small'}
                value={prosjektnavn}
                onChange={(e) => setProsjektnavn(e.target.value)}
            />
            <TextField
                label={'Gårdsnummer'}
                size={'small'}
                value={gaardsnummer}
                onChange={(e) => setGaardsnummer(e.target.value)}
            />
            <TextField
                label={'Bruksnummer'}
                size={'small'}
                value={bruksnummer}
                onChange={(e) => setBruksnummer(e.target.value)}
            />
            <TextField
                label={'Seksjonsnummer'}
                size={'small'}
                value={seksjonsnummer}
                onChange={(e) => setSeksjonsnummer(e.target.value)}
            />
            <Textarea
                label={'Adresse'}
                size={'small'}
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
            />
            <TextField
                label={'Saksansvarlig Epost'}
                size={'small'}
                value={saksansvarligEpost}
                onChange={(e) => setSaksansvarligEpost(e.target.value)}
            />
            <VStack gap={'2'} paddingInline={'4 0'} paddingBlock={'4 0'}>
                <Heading size="small">Saksparnere</Heading>
                <TextField
                    label={'Navn'}
                    size={'small'}
                    value={sakspartnerNavn}
                    onChange={(e) => setSakspartnerNavn(e.target.value)}
                />
                <TextField
                    label={'Org.nr.'}
                    size={'small'}
                    value={sakspartnerOrganisasjonsnummer}
                    onChange={(e) => setSakspartnerOrganisasjonsnummer(e.target.value)}
                />
                <TextField
                    label={'E-post'}
                    size={'small'}
                    value={sakspartnerEpost}
                    onChange={(e) => setSakspartnerEpost(e.target.value)}
                />
                <TextField
                    label={'Postnummer'}
                    size={'small'}
                    value={sakspartnerPostnummer}
                    onChange={(e) => setSakspartnerPostnummer(e.target.value)}
                />
                <TextField
                    label={'Poststed'}
                    size={'small'}
                    value={sakspartnerPoststed}
                    onChange={(e) => setSakspartnerPoststed(e.target.value)}
                />
                <TextField
                    label={'Adresse'}
                    size={'small'}
                    value={sakspartnerPostadresse}
                    onChange={(e) => setSakspartnerPostadresse(e.target.value)}
                />
                <TextField
                    label={'Telefon'}
                    size={'small'}
                    value={sakspartnerTelefon}
                    onChange={(e) => setSakspartnerTelefon(e.target.value)}
                />
            </VStack>
        </VStack>
    );
};

export default EgrvTestForm;
