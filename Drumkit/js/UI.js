export default class UI {
    constructor() {
        this.uiSelectors = {
            recordButton: '.recordTrack',
            playButton: '.playTrack',
            playAllButton: '.playAllTracks',
        };
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    getAll(selector) {
        return document.querySelectorAll(selector);
    }
}