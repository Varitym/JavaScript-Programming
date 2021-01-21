export default class UI {
    constructor() {
        this.UiSelectors = {
            recordButton: '.recordTrack',
            playButton: '.playTrack',
            playAllButton: '.playAllTracks',
        };
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    getElements(selector) {
        return document.querySelectorAll(selector);
    }
}