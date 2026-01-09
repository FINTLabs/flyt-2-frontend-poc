import { Controller } from 'react-hook-form';
import { type ChangeEvent, forwardRef } from 'react';
import { Checkbox, CheckboxGroup } from '@navikt/ds-react';

interface Props {
    name: string;
    displayName: string;
    disabled?: boolean;
    required?: boolean;
}

const ControlledCheckbox: React.FunctionComponent<Props> = forwardRef<HTMLTextAreaElement, Props>(
    (props: Props, ref) => {
        return (
            <Controller
                name={props.name}
                render={({ field }) => (
                    <CheckboxGroup
                        legend={props.displayName}
                        hideLegend
                        disabled={props.disabled}
                        onChange={(val: string[]) => {
                            field.onChange(val.includes(props.name));
                        }}
                        value={[field.value && props.name]}
                    >
                        <Checkbox
                            {...field}
                            size={'small'}
                            id="form-complete"
                            aria-label={props.name + '-checkbox'}
                            value={props.name}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                field.onChange(event.target.checked);
                            }}
                        >
                            {props.displayName}
                        </Checkbox>
                    </CheckboxGroup>
                )}
            />
        );
    }
);
export default ControlledCheckbox;
