import Sound from "./Sound.js";
import Track from "./Track.js";
import UI from './UI.js';

export default class Drumkit extends UI{
    constructor(){
        super();
        this.recordTrackButtons = null;
        this.playTrackButtons = null;
        this.playAllButton = null;

        this.tracks = {
            t1: new Track(),
            t2: new Track(),
            t3: new Track(),
            t4: new Track(),
        };

        this.recordStartTime = null;
        this.currentTrack = null;
        this.isRecording = false;
    }

    init() {
        this.handle();
        this.attachEventListeners();
        
    }

    attachEventListeners() {
        document.body.addEventListener('keypress', (ev) => this.onKey(ev));
        
        this.recordTrackButtons.forEach((btn) => {
            btn.addEventListener('click', (ev) => this.onRecordBtnClick(ev));
        });

        this.playTrackButtons.forEach((btn) => {
            btn.addEventListener('click', (ev) => this.onPlayBtnClick(ev));
        });
    }

    handle() {
        this.recordTrackButtons = this.getAll(this.uiSelectors.recordButton);
        this.playTrackButtons = this.getAll(this.uiSelectors.playButton);
        this.playAllButton = this.getAll(this.uiSelectors.playAllButton);
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

    startRecording() {
        this.playTrackButtons.forEach((btn) => (btn.disabled = true));
        this.recordTrackButtons.forEach((btn) => {
            btn.dataset.track == this.currentTrack
                ? (btn.innerHTML = 'Stop')
                : (btn.disabled = true);
        });
        this.playAllButton.disabled = true;
    }

        onRecordBtnClick(ev) {
            this.isRecording = !this.isRecording;
            
            if (this.isRecording) {
                this.currentTrack = ev.target.dataset.track;
                this.tracks[this.currentTrack].clearTrack();
                this.recordStartTime = Date.now();
                this.startRecording();
            } else {
                this.stopRecording();
            }
        }
        stopRecording() {
            this.playTrackButtons.forEach((btn) => {
                if (this.tracks[btn.dataset.track].soundsArr.length !== 0) btn.disabled = false;
            });
            this.recordTrackButtons.forEach((btn) => {
                btn.disabled = false;
                btn.innerHTML = 'Record';
            });
    
            Object.entries(this.tracks).forEach((track) => {
                const [key, value] = track;
                if (key === 't0') return;
    
                if (value.soundsArr.length !== 0) {
                    this.playAllButton.disabled = false;
                }
            });
        }
    
        onPlayBtnClick(ev) {
            const track = ev.target.dataset.track;
            this.tracks[track].playTrack();
        }

        

        //this.playAllButton.addEventListener('click', () => this.playAll());
    
}