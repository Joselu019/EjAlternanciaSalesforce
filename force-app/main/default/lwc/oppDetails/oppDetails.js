import { LightningElement, track } from 'lwc';

export default class OpportunityDetail extends LightningElement {
    isDarkMode = false;

    get themeClass() {
        return this.isDarkMode ? 'theme-dark' : 'theme-light';
    }

    get buttonLabel() {
        return this.isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro';
    }

    get buttonIcon() {
        return this.isDarkMode ? 'utility:dayview' : 'utility:nightview';
    }

    get buttonVariant() {
        return this.isDarkMode ? 'neutral' : 'brand-inverse';
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
    }
}