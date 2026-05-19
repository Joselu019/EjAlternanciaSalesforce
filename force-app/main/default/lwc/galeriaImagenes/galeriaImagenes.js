import { LightningElement, track } from 'lwc';

export default class ImageGallery extends LightningElement {
    contador = 0;
    currentIndex = 0;

    listaImagenes = [
        {
            id: 1,
            titulo: 'Ecosistema de Ventas',
            iconName: 'standard:opportunity' // Icono de Oportunidades/Ventas (Bolsa de dinero)
        },
        {
            id: 2,
            titulo: 'Gestión de Contactos',
            iconName: 'standard:contact' // Icono de Contactos (Silueta de usuario)
        },
        {
            id: 3,
            titulo: 'Apps',
            iconName: 'standard:apps' // Icono de Analítica (Gráfico de barras)
        }
    ];

    get currentImage() {
        return this.listaImagenes[this.currentIndex];
    }

    handlePrevious() {
        
        if (this.currentIndex === 0) {
            this.currentIndex = this.listaImagenes.length - 1;
        } else {
            this.currentIndex--;
        }
    }

    handleNext() {
        this.contador++; 

        if (this.currentIndex === this.listaImagenes.length - 1) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
    }
}