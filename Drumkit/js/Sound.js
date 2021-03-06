export default class Sound {
    constructor(sound, recordStart){
        this.sound = sound;
        this.time = Date.now() - recordStart;
        this.sounds = document.querySelectorAll('.key');
    }

    playSound() {
        const audio = document.querySelector('#' + this.sound);
        audio.currentTime = 0;
        audio.play();

        this.playSoundColor();
    }

    playSoundColor() {
        this.sounds.forEach((el) => {
            let check = el.textContent;
            if (this.sound == check) {
                el.classList.add('soundA');
                setTimeout(() => {
                    el.classList.remove('soundA');
                }, 150);
            }
        });
        }

}