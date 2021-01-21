import Note from "./Note.js";
import Db from "./Db.js";
import NotesUI from "./NotesUI.js";

export default class Notekeep{
    constructor() {
        this.notesArr = [];
        this.db = new Db();
        this.notesUI = new NotesUI('[data-notes]');
        
    }

    init(){
        const notesLS = this.db.getNotes();
        if (notesLS) {
            this.notesArr = [...notesLS];
            this.notesUI.renderNotes(this.notesArr);
        }
        this.notesUI.addBtn.addEventListener('click', () => {
            this.addNote(
                new Note(
                    this.notesUI.title.value,
                    this.notesUI.content.value,
                    this.notesUI.color.value,
                )
            );
        });
        this.attachEventListeners();
    }

    addNote(note) {
        this.notesArr.push(note);

        this.db.saveNotes(this.notesArr);

        this.notesUI.renderNotes(this.notesArr);
        this.attachEventListeners();

        this.notesUI.clearForm();
    }

    attachEventListeners(){
        const del = document.querySelectorAll('[data-del]');
        del.forEach((el) => {
            el.addEventListener('click', (ev) => {
                const id = ev.target.dataset.id;
                this.removeNote(id);
                

            });
        });
    }

    removeNote(id) {
        const filtered = this.notesArr.filter(item => item.id != id);
        this.notesArr = filtered;
        const deletedNote = document.querySelector('[data-id]', id).parentElement;
        deletedNote.parentElement.removeChild(deletedNote);
        this.db.saveNotes(this.notesArr);
        
    }

    
}