import Sound from "./Sound.js";
export default class Drumkit{
    constructor(){

    }

    init() {
        this.attachEventListeners();
    }

    attachEventListeners() {
        document.body.addEventListener('keypress', (ev) => this.onKey(ev));
    }
    onKey(ev) {
        let sound;
        switch (ev.code) {
            case 'KeyA':
                sound = new Sound('kick');
                break;
            case 'KeyS':
                sound = new Sound('hi-hat');
                break;
            case 'KeyD':
                sound = new Sound('open-hat');
                break;
            case 'KeyF':
                sound = new Sound('snare');
                break;
            case 'KeyG':
                sound = new Sound('bass');
                break;
            case 'KeyH':
                sound = new Sound('chant');
                break;
        }
        sound.playSound();

}
}