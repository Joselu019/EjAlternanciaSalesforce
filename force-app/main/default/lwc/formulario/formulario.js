import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactForm extends LightningElement {
    // Propiedades para almacenar los valores de los campos
    nombre = '';
    email = '';
    mensaje = '';

    // Captura los cambios en tiempo real mientras el usuario escribe (onchange)
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

    // Se ejecuta cuando el usuario quita el foco del campo (onblur)
    handleBlur(event) {
        this.validarCampo(event.target);
    }

    // Lógica centralizada de validaciones con mensajes personalizados en tiempo real
    validarCampo(inputCmp) {
        const fieldId = inputCmp.dataset.id;
        let errorMessage = '';

        // 1. Validación de campos obligatorios
        if (inputCmp.required && !inputCmp.value) {
            errorMessage = 'Este campo es completamente obligatorio.';
        } 
        // 2. Validación de formato de email mediante Expresión Regular (Regex)
        else if (fieldId === 'email' && inputCmp.value) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(inputCmp.value)) {
                errorMessage = 'Por favor, introduce un formato de email válido.';
            }
        } 
        // 3. Validación de longitud mínima para el mensaje (mínimo 15 caracteres)
        else if (fieldId === 'mensaje' && inputCmp.value) {
            if (inputCmp.value.length < 15) {
                errorMessage = 'El mensaje es demasiado corto (mínimo 15 caracteres).';
            }
        }

        // Inyecta el error visual de forma nativa en Salesforce
        inputCmp.setCustomValidity(errorMessage);
        inputCmp.reportValidity();
    }

    // Maneja el clic en el botón de envío
    handleSubmit() {
        // Obtenemos todos los inputs instalados en el HTML
        const inputs = this.template.querySelectorAll('lightning-input, lightning-textarea');
        let formValido = true;

        // Validamos todos los campos a la vez antes de procesar
        inputs.forEach(inputCmp => {
            this.validarCampo(inputCmp);
            if (!inputCmp.checkValidity()) {
                formValido = false;
            }
        });

        // Si el formulario es totalmente válido muestra un Toast de éxito
        if (formValido) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: '¡Formulario Válido!',
                    message: 'Los datos se han verificado correctamente.',
                    variant: 'success'
                })
            );
        } else {
            // Si hay errores muestra un Toast de aviso de error
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