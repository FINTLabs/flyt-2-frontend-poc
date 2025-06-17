import { Box, HStack, Link } from '@navikt/ds-react';
import { NovariIKS } from '../../../public/NovariIKS';

export default function Footer() {
    return (
        <Box
            style={{
                padding: '2rem',
                marginTop: '2rem',
                backgroundColor: 'var(--red-primary)',
            }}>
            <HStack gap={'10'} align={'center'}>
                <NovariIKS width={'9em'} />
                <HStack gap={'4'} align={'center'}>
                    <Link
                        href="https://novari.no/driftsmeldinger/"
                        style={{ color: 'var(--beige-60)' }}>
                        Driftsmeldinger
                    </Link>
                    <p style={{ color: 'var(--beige-60)' }}>|</p>
                    <Link href="http://support.novari.no" style={{ color: 'var(--beige-60)' }}>
                        Opprett supportsak
                    </Link>
                </HStack>
            </HStack>
        </Box>
    );
}
