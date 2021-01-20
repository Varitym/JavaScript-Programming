import Note from "/js/Note.js";
import Db from '/js/Db.js';

const noteForm = document.querySelector("form");
const db = new Db();
let notesArr = [];

function init(){

    const notesLS = db.getNotes();
    if(notesLS){
        notesArr = [...notesLS];
        renderNotes(notesArr);
    }
    noteForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        const title = document.querySelector(".ntitle").value;
        const content = document.querySelector(".ncontent").value;
        addNote(
            new Note(title, content)
        )
        noteForm.clear();
        
    })
}

function addNote(note){
    const template = `<div class = "single">
                        <div class = "title">${note.title}</div>
                        <div class="content">${note.content}</div> 
                        </div>`
    notesArr.push(note)
    db.saveNotes(notesArr);
    const kontener = document.querySelector(".notes");
    kontener.innerHTML += template;
    console.log(note.title);
}

function renderNotes(notes){
    notes.forEach((note)=>{
        renderHTML(note);
    })
}

function renderHTML(note){
    const template = `<div class = "single">
                        <div class = "title">${note.title}</div>
                        <div class="content">${note.content}</div> 
                        </div>`
    const kontener = document.querySelector(".notes");
    kontener.innerHTML += template;
}

function deleteNote(note){
    
}

init();