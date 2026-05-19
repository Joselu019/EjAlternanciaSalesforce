import { LightningElement, track } from 'lwc';

export default class ImageGallery extends LightningElement {
    // Variable reactiva para el contador de interacciones
    contador = 0;
    // Índice actual de la imagen mostrada
    currentIndex = 0;

    // Array de imágenes de ejemplo (puedes cambiar los títulos o las URLs si prefieres)
    listaImagenes = [
        {
            id: 1,
            titulo: 'Ecosistema Salesforce',
            url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80'
        },
        {
            id: 2,
            titulo: 'Desarrollo Cloud Eficiente',
            url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80'
        },
        {
            id: 3,
            titulo: 'LWC y Modern Web Standards',
            url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&q=80'
        }
    ];

    // Getter para obtener la imagen que corresponde al índice actual en el HTML
    get currentImage() {
        return this.listaImagenes[this.currentIndex];
    }

    // Acción al pulsar el botón "Anterior"
    handlePrevious() {
        this.contador++; // Incrementamos contador por la interacción
        
        if (this.currentIndex === 0) {
            // Si está en la primera, vuelve a la última (bucle infinito)
            this.currentIndex = this.listaImagenes.length - 1;
        } else {
            this.currentIndex--;
        }
    }

    // Acción al pulsar el botón "Siguiente"
    handleNext() {
        this.contador++; // Incrementamos contador por la interacción

        if (this.currentIndex === this.listaImagenes.length - 1) {
            // Si está en la última, vuelve a la primera
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
    }
}