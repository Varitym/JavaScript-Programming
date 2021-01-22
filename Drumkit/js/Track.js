export default class Track{
    constructor(){
        this.soundsArray= [];
    }
        recordTrack(soundObj) {
            this.soundsArray.push(soundObj);
        }
    
        clearTrack() {
            this.soundsArray = [];
        }
        
        playTrack() {
            this.soundsArray.forEach((sound) => {
                setTimeout(() => {
                    sound.playSound();
                }, sound.time);
            });
        }
    }
    
