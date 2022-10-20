import display from "./display";

const deleteEntry = (deleteLink)=>{
    deleteLink.addEventListener('click', ()=>{
        let currentTask = (deleteLink.parentNode).parentNode;
        let currentTaskNumber = Number((currentTask.className).split(" ")[1]) -1;

        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.splice(currentTaskNumber,1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        display();
        
    });
}

export default deleteEntry;