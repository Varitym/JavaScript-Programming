import Notekeep from "/js/Notekeep.js";
const notes = new Notekeep;
notes.init();

// import Note from "/js/Note.js";
// import Db from "/js/Db.js";

// const noteForm = document.querySelector("form");
// const db = new Db();
// let notesArr = [];

// function init() {
//   const notesLS = db.getNotes();
//   if (notesLS) {
//     notesArr = [...notesLS];
//     renderNotes(notesArr);
//   }
//   noteForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const title = document.querySelector(".ntitle").value;
//     const content = document.querySelector(".ncontent").value;
//     addNote(new Note(title, content));
//     noteForm.reset();
//   });
// }
// function addNote(note) {
//   const template = document.createElement("div");
//   template.classList.add("single");
//   template.innerHTML = `<div class = "close">X</div>
//                         <div class = "title">${note.title}</div>
//                         <div class="content">${note.content}</div>
//                         ${note.id}`;
//   // tu tworzysz unikalny timestamp (data w milisekundach), wklej sobie w konsolę new Date().getTime(), zobaczysz, że jest tworzone na podstawie aktualnej daty i godziny
//   const closer = document.querySelector(".close");
//   closer.setAttribute('data-id', '');
//   const id = template.getAttribute('data-id');
//   //console.log(id);
//   template.querySelector(".close").addEventListener("click", (ev)=>{
//     console.log(ev.target);
//     const id = ev.target.dataset.id;
//     deleteNote(note.id);
//   });

//   notesArr.push(note);
//   db.saveNotes(notesArr);
//   const kontener = document.querySelector(".notes");
//   kontener.prepend(template);
  
// }

// function renderNotes(notes) {
//   notes.forEach((note) => {
//     renderHTML(note);
//   });
// }

// function renderHTML(note) {
//   const template = `<div class = "single">
//                         <div class = "close">X</div>
//                       <div class = "title">${note.title}</div>
//                       <div class="content">${note.content}</div> 
//                     </div>`;
//   const kontener = document.querySelector(".notes");
//   const id = kontener.getAttribute("note-id");
//   console.log(note.id);
//   kontener.innerHTML += template;
//   kontener.querySelector(".close").addEventListener("click", (ev)=>{
//     const id = ev.target.dataset.id;
//     deleteNote(note.id);
//   });

  

// }


// function deleteNote(id) {
//     const at = document.getElementById(id);
//     console.log(at);
//     //const filtered = notesArr.filter(item => item.id !== id);
//     //db.saveNotes(filtered);

//     //console.log(id);
//     //db.removeNote(id);

// }

// init();
