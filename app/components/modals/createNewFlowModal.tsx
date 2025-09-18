import { Button, Modal, TextField } from '@navikt/ds-react';

interface FormElements extends HTMLFormControlsCollection {
    name: HTMLInputElement;
}
interface NewFlowFormElement extends HTMLFormElement {
    readonly elements: FormElements;
}

type CreateNewFlowModalProps = {
    open: boolean;
    onCancel: () => void;
    onSave: (name: string) => void;
};

export const CreateNewFlowModal = ({ open, onCancel, onSave }: CreateNewFlowModalProps) => {
    const onSubmit = (e: React.FormEvent<NewFlowFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        onSave(form.elements.name.value);
    };
    return (
        <Modal
            open={open}
            onClose={onCancel}
            header={{ heading: 'Lagre ny flyt' }}
            size="small"
            width={400}>
            <Modal.Body>
                <form method="dialog" id="skjema" onSubmit={onSubmit}>
                    <TextField id={'name'} label="Visningsnavn" />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button form="skjema">Lagre</Button>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
