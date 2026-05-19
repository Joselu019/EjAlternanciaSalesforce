import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactForm extends LightningElement {
    nombre = '';
    email = '';
    mensaje = '';

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'nombre') {
            this.nombre = event.target.value;
        } else if (field === 'email') {
            this.email = event.target.value;
        } else if (field === 'mensaje') {
            this.mensaje = event.target.value;
        }
    }

    handleBlur(event) {
        this.validarCampo(event.target);
    }

    validarCampo(inputCmp) {
        const fieldId = inputCmp.dataset.id;
        let errorMessage = '';

        if (inputCmp.required && !inputCmp.value) {
            errorMessage = 'Este campo es completamente obligatorio.';
        } 
        else if (fieldId === 'email' && inputCmp.value) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(inputCmp.value)) {
                errorMessage = 'Por favor, introduce un formato de email válido.';
            }
        } 
        else if (fieldId === 'mensaje' && inputCmp.value) {
            if (inputCmp.value.length < 15) {
                errorMessage = 'El mensaje es demasiado corto (mínimo 15 caracteres).';
            }
        }

        inputCmp.setCustomValidity(errorMessage);
        inputCmp.reportValidity();
    }

    handleSubmit() {
        const inputs = this.template.querySelectorAll('lightning-input, lightning-textarea');
        let formValido = true;

        inputs.forEach(inputCmp => {
            this.validarCampo(inputCmp);
            if (!inputCmp.checkValidity()) {
                formValido = false;
            }
        });

        if (formValido) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: '¡Formulario Válido!',
                    message: 'Los datos se han verificado correctamente.',
                    variant: 'success'
                })
            );
        } else {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error de validación',
                    message: 'Por favor, corrige los errores en los campos antes de enviar.',
                    variant: 'error'
                })
            );
        }
    }
}