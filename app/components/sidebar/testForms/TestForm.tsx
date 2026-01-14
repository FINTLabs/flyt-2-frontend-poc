import React from 'react';
import { TextField, VStack } from '@navikt/ds-react';
import type { MockDataTypes } from '~/demo/mockData/dataObjects';

type TestFormPropsType = {
    dataContent: MockDataTypes;
};

const TestForm = ({ dataContent }: TestFormPropsType) => {
    return (
        <VStack gap={'4'}>
            {dataContent &&
                Object.entries(dataContent).map(([key, value]) =>
                    typeof value === 'string' ? (
                        <TestFormInput key={key} label={key} value={value} />
                    ) : null
                )}
        </VStack>
    );
};

export type TestFormProps = {
    label: string;
    value: string;
};

const TestFormInput = ({ label, value }: TestFormProps) => {
    return <TextField id={label} size={'small'} label={label} value={value} />;
};

export default TestForm;
