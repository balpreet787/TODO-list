import display from "./display";

const editEntry = (editLink)=>{
    const formDiv = document.querySelector(".editFormDiv");
    const title = document.querySelector(".editedTitle");
    const project = document.querySelector(".EditedProjectName");
    const description = document.querySelector(".EditedDescription");
    const taskTime = document.querySelector(".EditedTime"); 
    const priority = document.querySelector(".editedPriority");
    const submit = document.querySelector(".Editedsubmit"); 
    const errorMessage = document.querySelector(".errorMessage");

    editLink.addEventListener('click', ()=>{
        
        formDiv.style.cssText = "display:block;";

        let currentTask = (editLink.parentNode).parentNode;
        let currentTaskNumber = Number((currentTask.className).split(" ")[1]) -1;

        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

        title.value = tasks[currentTaskNumber].title;
        project.value = tasks[currentTaskNumber].project;
        description.value = tasks[currentTaskNumber].description;
        taskTime.value = tasks[currentTaskNumber].taskTime;
        priority.value = tasks[currentTaskNumber].priority;

        submit.addEventListener('click', () =>{
            if (title.value ===""){
                errorMessage.textContent ="*please enter the title..."
            }
            else if ( taskTime.value ===""){
                errorMessage.textContent ="*please enter the date..."
            }
            else{
       
            tasks[currentTaskNumber].title = title.value;
            tasks[currentTaskNumber].project = project.value;
            tasks[currentTaskNumber].description = description.value;
            tasks[currentTaskNumber].taskTime = taskTime.value;
            tasks[currentTaskNumber].priority = priority.value;    
            localStorage.setItem("tasks", JSON.stringify(tasks));
            formDiv.style.cssText = "display:none;";
            display();
            }

        });

        
    });
}

export default editEntry;