import { LightningElement, track } from 'lwc';

export default class CustomTimer extends LightningElement {
    // Segundos totales acumulados en el cronómetro
    totalSeconds = 0;
    
    // Almacena la referencia del intervalo asíncrono para poder detenerlo
    timerId = null;

    // Propiedad reactiva para controlar el estado de los botones
    isTimerRunning = false;

    // Getter para saber si el temporizador está pausado o sin iniciar
    get isTimerPaused() {
        return !this.isTimerRunning;
    }

    // Getter dinámico que convierte los segundos totales a formato legible "MM:SS"
    get formattedTime() {
        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;
        
        // Añade un cero a la izquierda si el número es menor de 10 para mantener la estética
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    // Método encargado de arrancar el temporizador de forma asíncrona
    startTimer() {
        if (!this.isTimerRunning) {
            this.isTimerRunning = true;
            
            // Crea un intervalo que se ejecuta de manera cíclica cada 1000 milisegundos (1 segundo)
            this.timerId = setInterval(() => {
                this.totalSeconds++;
            }, 1000);
        }
    }

    // Método encargado de congelar el avance del tiempo
    pauseTimer() {
        this.isTimerRunning = false;
        // Limpiamos el intervalo asíncrono del navegador para pausar la ejecución
        clearInterval(this.timerId);
    }

    // Método encargado de restablecer a cero el contador
    resetTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timerId);
        this.totalSeconds = 0;
    }

    // Buena práctica LWC: Limpiar el timer si el usuario se va de la pestaña para evitar fugas de memoria
    disconnectedCallback() {
        clearInterval(this.timerId);
    }
}