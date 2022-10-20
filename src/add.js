
const add = (display) => {
    const submit = document.querySelector(".submit");
    const form = document.querySelector(".addToListForm")
    const formDiv = document.querySelector(".addFormDiv")
    const title = document.querySelector(".title");
    const project = document.querySelector(".projectName");
    const description = document.querySelector(".description");
    const taskTime = document.querySelector(".time"); 
    const priority = document.querySelector(".priority");
    const errorMessage = document.querySelector(".errorMessage");

    class Task{
        constructor(title, project, description, time, priority,taskComplete){
            this.title = title;
            this.project = project;
            this.description = description;
            this.time = time;
            this.priority = priority;
            this.taskComplete = taskComplete;
        }
    }
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let currentTask = undefined;
    submit.addEventListener('click',()=>{
        if (title.value ===""){
            errorMessage.textContent ="*please enter the title..."
        }
        else if ( taskTime.value ===""){
            errorMessage.textContent ="*please enter the date..."
        }
        else{
   
            currentTask = new Task(title.value,project.value,description.value, taskTime.value,priority.value, false);
            tasks.push({"title":currentTask.title,"project":currentTask.project,"description":currentTask.description,"taskTime":currentTask.time,"priority":currentTask.priority,"taskComplete":false})
            localStorage.setItem("tasks", JSON.stringify(tasks));
            form.reset();
            formDiv.style.display = "none";
            display();
        }

    });

    
    
};

export default add;