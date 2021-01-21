export default class Note{
    constructor(title, content, color){
        this.title = title;
        this.content = content;
        this.id = new Date().getTime();
        this.color = color;
        this.createDate = new Date();
        /*this.color = color;
        this.pinned = pinned;
        this.date = new Date();*/
    }
}