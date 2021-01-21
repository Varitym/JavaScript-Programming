export default class UI {
    constructor() {
        this.uiSelectors = {
            notes: '[data-notes]',
            titleInput: '[data-titleInput]',
            contentInput: '[data-contentInput]',
            noteID: '[data-noteID]',
            color: '[data-color]',
            deleteBtn: '[data-del]',
            editBtn: '[data-editBtn]',
            addBtn: '[data-addBtn]',
            saveEditBtn: '[data-saveEditBtn]',
        };
    }

    qs(selector) {
        return document.querySelector(selector);
    }

    qsAll(selector) {
        return document.querySelectorAll(selector);
    }
}