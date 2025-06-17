import { InternalHeader, Spacer } from '@navikt/ds-react';
import { useNavigate } from 'react-router';

export const AppBar = () => {
    const history = useNavigate();

    return (
        <InternalHeader className={'novari-header'}>
            <InternalHeader.Title
                style={{ color: 'var(--red-primary)' }}
                as="h1"
                onClick={() => {
                    history('/');
                }}>
                FINT Flyt 2
            </InternalHeader.Title>
            <InternalHeader.Button
                onClick={() => {
                    history('/test');
                }}>
                test
            </InternalHeader.Button>
        </InternalHeader>
    );
};
