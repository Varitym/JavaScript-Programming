export default class Db {
    constructor() {
        this.notesLSKey = 'notes';
    }

    saveNotes(notes) {
        localStorage.setItem(this.notesLSKey, JSON.stringify(notes));
    }

    getNotes() {
        const notesFromStorage = JSON.parse(localStorage.getItem(this.notesLSKey));
        if (notesFromStorage) {
            const notes = notesFromStorage.map((note) => {
                note.createDate = new Date(note.createDate);
                return note;
            });

            return notes;
        }
        return;
    }
    removeNote(id){
        localStorage.removeItem(this.notesLSKey, JSON.stringify(id));
    }
}