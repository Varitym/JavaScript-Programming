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
            track1: new Track(),
            track2: new Track(),
            track3: new Track(),
            track4: new Track(),
        };

        this.recordStart = null;
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
                sound = new Sound('kick', this.recordStart);
                break;
            case 'KeyS':
                sound = new Sound('hi-hat', this.recordStart);
                break;
            case 'KeyD':
                sound = new Sound('open-hat', this.recordStart);
                break;
            case 'KeyF':
                sound = new Sound('snare', this.recordStart);
                break;
            case 'KeyG':
                sound = new Sound('bass', this.recordStart);
                break;
            case 'KeyH':
                sound = new Sound('chant', this.recordStart);
                break;
        }
        if (sound) {
            if (this.isRecording) {
                this.tracks[this.currentTrack].recordTrack(sound);
            }
        sound.playSound();
    }
}

    onRecordBtnClick(ev) {
        this.isRecording = !this.isRecording;
        //console.log(ev.target);
        if (this.isRecording) {
            this.currentTrack = ev.target.dataset.track;
            //console.log(this.currentTrack);
            let t = this.tracks[this.currentTrack]
            //console.log(t);
            t.clearTrack();
            this.recordStart = Date.now();
            this.startRecording();
        } else {
            this.stopRecording();
        }
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

        
        stopRecording() {
            this.playTrackButtons.forEach((btn) => {
                console.log(this.tracks);
                this.currentTrack = btn.dataset.track;
                console.log(this.currentTrack);
                if (this.tracks[this.currentTrack].soundsArray.length !== 0) {btn.disabled = false;}
            });
            this.recordTrackButtons.forEach((btn) => {
                btn.disabled = false;
                btn.innerHTML = 'Record';
            });
    
            Object.entries(this.tracks).forEach((track) => {
                const [key, value] = track;
                if (key === 't0') return;
    
                if (value.soundsArray.length !== 0) {
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