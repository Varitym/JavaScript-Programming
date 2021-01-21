import Note from "./Note.js";
import Notekeep from "./Notekeep.js";
import UI from "./UI.js";

export default class NotesUI extends UI{
    constructor(containerSelector){
        super()
        this.noteForm = document.querySelector("form");
        this.title = this.qs(this.uiSelectors.titleInput);
        this.content = this.qs(this.uiSelectors.contentInput);
        this.color = this.qs(this.uiSelectors.color);
        this.addBtn = this.qs(this.uiSelectors.addBtn);
        this.container = this.qs(containerSelector);
    }
    

    renderNotes(notes) {
        this.container.innerHTML = '';
        notes.forEach((note) => {
            this.renderHTML(note);
        });
    }

    renderHTML(note){
        const template= document.createElement("div");
        const htmlTitle = document.createElement("div");
        const htmlContent = document.createElement("div");
        const htmlDel = document.createElement("img") ;
        const htmlDate = document.createElement("div");

        template.classList.add("single");
        htmlTitle.classList.add("title");
        htmlContent.classList.add("content");
        htmlDel.classList.add("close");
        htmlDate.classList.add("date");
        template.style.backgroundColor = note.color;
        htmlTitle.innerHTML = note.title;
        htmlContent.innerHTML = note.content;
        htmlDate.innerHTML = note.createDate.toLocaleString();
        htmlDel.setAttribute('data-id', note.id);
        htmlDel.src = '/js/del.png';
        htmlDel.setAttribute('data-del', '');
        

        template.appendChild(htmlDel);
        template.appendChild(htmlTitle);
        template.appendChild(htmlContent);
        template.appendChild(htmlDate);
        

        this.container.appendChild(template);

        

    }

    clearForm() {
        this.title.value = '';
        this.content.value = '';
        
    }

}