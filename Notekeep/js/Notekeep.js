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
        const pin = document.querySelectorAll('[data-pin]');
        pin.forEach((el) => {
            el.addEventListener('click', (ev) => {
                const id = ev.target.dataset.id;
                this.pinNote(id);
 
 
            });
        });
    }
 
    removeNote(id) {
        this.notesArr = this.notesArr.filter(item => item.id != id);
        const deletedNote = document.getElementById(id)
        deletedNote.parentElement.removeChild(deletedNote);
        this.db.saveNotes(this.notesArr);
 
    }
 
    pinNote(id) {
        const pinned = this.notesArr.find(item => item.id == id);
        console.log(pinned);
        this.notesArr = this.notesArr.filter(item => item.id != id);
        const pinnedNote = document.getElementById(id)
        pinnedNote.parentElement.removeChild(pinnedNote);
        this.notesArr.unshift(pinned)
        this.db.saveNotes(this.notesArr);
 
        this.notesUI.renderNotes(this.notesArr);
        this.attachEventListeners();
 
    }
 
 
}