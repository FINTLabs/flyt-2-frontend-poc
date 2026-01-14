import { Controller } from 'react-hook-form';
import { forwardRef } from 'react';
import { Textarea } from '@navikt/ds-react';
import FormErrorText from './FormErrorText';

interface Props {
    name: string;
    displayName: string;
    disabled?: boolean;
    required?: boolean;
}

const ControlledTextAreaInput: React.FunctionComponent<Props> = forwardRef<
    HTMLTextAreaElement,
    Props
>((props: Props, ref) => {
    return (
        <Controller
            name={props.name}
            render={({ field, fieldState }) => (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Textarea
                        {...field}
                        id={props.name}
                        autoComplete={'off'}
                        style={{ backgroundColor: 'white', width: '352px' }}
                        size="small"
                        label={props.displayName}
                        name={props.name}
                        ref={ref}
                        disabled={props.disabled}
                        required={props.required}
                        maxRows={4}
                        error={!!fieldState?.error}
                    />
                    {fieldState?.error && (
                        <FormErrorText errorMessage={fieldState?.error.message} />
                    )}
                </div>
            )}
        />
    );
});
export default ControlledTextAreaInput;
