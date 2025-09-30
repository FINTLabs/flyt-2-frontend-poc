import React from 'react';
import { TextField, VStack } from '@navikt/ds-react';
import type { EgrvSakType, MockDataTypes } from '~/mockData/dataObjects';

type TestFormPropsType = {
    dataContent: EgrvSakType;
};

const EgrvTestForm = ({ dataContent }: TestFormPropsType) => {
    return (
        <VStack gap={'2'}>
            <TextField label={'ID'} size={'small'} value={dataContent.id} />
            <TextField label={'Tittel'} size={'small'} value={dataContent.tittel} />
            <TextField label={'Kommunenavn'} size={'small'} value={dataContent.kommunenavn} />
            <TextField label={'Prosjektnavn'} size={'small'} value={dataContent.prosjektnavn} />
            <TextField label={'Gårdsnummer'} size={'small'} value={dataContent.gaardsnummer} />
            <TextField label={'Bruksnummer'} size={'small'} value={dataContent.bruksnummer} />
            <TextField label={'Seksjonsnummer'} size={'small'} value={dataContent.seksjonsnummer} />
            <TextField label={'Adresse'} size={'small'} value={dataContent.adresse} />
            <TextField
                label={'Saksansvarlig Epost'}
                size={'small'}
                value={dataContent.saksansvarligEpost}
            />
            <TextField
                label={'Sakspartner Navn'}
                size={'small'}
                value={dataContent.sakspartner.navn}
            />
            <TextField
                label={'Sakspartner Postnummer'}
                size={'small'}
                value={dataContent.sakspartner.postnummer}
            />
            <TextField
                label={'Sakspartner Poststed'}
                size={'small'}
                value={dataContent.sakspartner.poststed}
            />
            <TextField
                label={'Sakspartner Epost'}
                size={'small'}
                value={dataContent.sakspartner.epost}
            />
            <TextField
                label={'Sakspartner Telefon'}
                size={'small'}
                value={dataContent.sakspartner.telefon}
            />
            <TextField
                label={'Sakspartner Organisasjonsnummer'}
                size={'small'}
                value={dataContent.sakspartner.organisasjonsnummer}
            />
        </VStack>
    );
};

export default EgrvTestForm;
