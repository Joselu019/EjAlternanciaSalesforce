import { LightningElement, track } from 'lwc';

export default class OpportunityDetail extends LightningElement {
    // Propiedad reactiva para controlar el estado del tema (false = Claro, true = Oscuro)
    isDarkMode = false;

    // Getter dinámico para aplicar las clases CSS correspondientes al contenedor principal
    get themeClass() {
        return this.isDarkMode ? 'theme-dark' : 'theme-light';
    }

    // Getter dinámico para cambiar el texto del botón según el estado
    get buttonLabel() {
        return this.isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
    }

    // Getter dinámico para cambiar el icono del botón
    get buttonIcon() {
        return this.isDarkMode ? 'utility:dayview' : 'utility:nightview';
    }

    // Getter dinámico para cambiar el color del botón
    get buttonVariant() {
        return this.isDarkMode ? 'neutral' : 'brand-inverse';
    }

    // Manejador del evento clic que conmuta el estado entre verdadero y falso (onchange de tema)
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
    }
}