import { LightningElement, track } from 'lwc';

export default class CustomTimer extends LightningElement {

    totalSeconds = 0;
    
    timerId = null;

    isTimerRunning = false;

    get isTimerPaused() {
        return !this.isTimerRunning;
    }

    get formattedTime() {
        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;
        
        // Añadir un cero a la izquierda si el número es menor de 10 (estética)
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    startTimer() {
        if (!this.isTimerRunning) {
            this.isTimerRunning = true;
            
            this.timerId = setInterval(() => {
                this.totalSeconds++;
            }, 1000);
        }
    }

    pauseTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timerId);
    }

    resetTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timerId);
        this.totalSeconds = 0;
    }

    disconnectedCallback() {
        clearInterval(this.timerId);
    }
}