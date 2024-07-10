const btnEl = document.getElementById("btn");
const appEl = document.getElementById("app");
getNote().forEach((note)=>{
  const noteEl = createNoteEl(note.id,note.content)
  appEl.insertBefore(noteEl, btnEl);
});

function createNoteEl(id,content){
    const element = document.createElement("textarea")
    element.classList.add("note")
    element.placeholder = "Empty Note"
    element.value = content

    element.addEventListener("dblclick", ()=>{
         const warning = confirm("Do you want to delete this not")
         if(warning){
            deleteNote(id, element)
         }
    })
  element.addEventListener("input",()=>{
    updateNote(id,element.value)
  }) 
  return element; 

}
function deleteNote(id,element){
  const note = getNote().filter((note)=>note.id != id)
  saveNote(note)
  appEl.removeChild(element)
}
function updateNote(id,content){
  const note = getNote()
  const target = note.filter((note) =>note.id == id )[0];
  target.content = content;
  saveNote(note);

}

function addNote(){
    const note = getNote();
const noteObj ={
id: Math.floor(Math.random()*10000),
content:"",
};
const noteEl = createNoteEl(noteObj.id,noteObj.content);
appEl.insertBefore(noteEl,btnEl);

note.push(noteObj);

saveNote(note);

}

function saveNote(note){
    localStorage.setItem("note-app",JSON.stringify(note))
}
function getNote(){
 return JSON.parse(localStorage.getItem("note-app") || "[]");
}

btnEl.addEventListener("click",addNote)