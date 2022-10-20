import deleteEntry from "./delete";
import editEntry from "./edit";
import completeTask from "./taskComplete";
import deletePic from "./deleteEntry.svg";
import editPic from "./editEntry.svg";
import { getWeek} from "date-fns";

// display the tasks on screen in the content area
const display = () => {
    const content = document.querySelector(".content");
    removeAllChildNodes(content); 
    let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    let taskDivs =[];
    let sortedTasks = tasks.sort(function compare(a, b) {
        var dateA = new Date(a.taskTime);
        var dateB = new Date(b.taskTime);
        return dateA - dateB;
      });;
      localStorage.setItem("tasks", JSON.stringify(sortedTasks));

      

    for (let i =0; i<sortedTasks.length; i++){
        
        taskDivs.push(document.createElement("div")); 
        taskDivs[i].classList.add("task",(i+1));

        
        
        
        if (sortedTasks[i]['project'] ==="" && sortedTasks[i]['description']===""){
            taskDivs[i].textContent = `${sortedTasks[i]['title']} at `;
        }

        else if (sortedTasks[i]['project'] ===""){
            taskDivs[i].textContent = `${sortedTasks[i]['title']}, details: ${sortedTasks[i]['description']} at `;
        }

        else if (sortedTasks[i]['description']===""){
            taskDivs[i].textContent = `${sortedTasks[i]['title']}, project: ${sortedTasks[i]['project']} at `;
        }
        
        else{
            taskDivs[i].textContent = `${sortedTasks[i]['title']}, project: ${sortedTasks[i]['project']},details:    ${sortedTasks[i]['description']} at `;
        }
        
        if (sortedTasks[i]["priority"]=== "low"){
            taskDivs[i].style.backgroundColor = "#77c897";
        }
        else if (sortedTasks[i]["priority"]=== "medium"){
            taskDivs[i].style.backgroundColor = "#ff8c40";
            taskDivs[i].style.color = "#000";
        }
        else if (sortedTasks[i]["priority"]=== "high"){
            taskDivs[i].style.backgroundColor = "#f94c56";
        }
        let dateAndTime = document.createElement("input")
        dateAndTime.classList.add("readOnlyTime", (i+1));
        dateAndTime.setAttribute("type","datetime-local");
        dateAndTime.readOnly = true;
        dateAndTime.value = sortedTasks[i]['taskTime'];
        
        let taskCheck = document.createElement("input");
        taskCheck.setAttribute("type", "checkbox");
        taskCheck.classList.add("check", (i+1));
        

        let deleteLink = document.createElement("a");
        deleteLink.classList.add("delete",(i+1));

        let deletePicture = new Image();
        deletePicture.src = deletePic;
        deletePicture.classList.add("deletePic");

        deleteLink.appendChild(deletePicture);

        let editLink = document.createElement("a");
        editLink.classList.add("edit",(i+1));

        let editPicture = new Image()
        editPicture.src = editPic;
        editPicture.classList.add("editPic");

        editLink.appendChild(editPicture);

        let modifydiv = document.createElement("div");
        modifydiv.classList.add("modify");
        modifydiv.appendChild(taskCheck);
        modifydiv.appendChild(editLink);
        modifydiv.appendChild(deleteLink);



        taskDivs[i].appendChild(dateAndTime);
        taskDivs[i].appendChild(modifydiv);
        
        content.appendChild(taskDivs[i]);

        deleteEntry(deleteLink);
        editEntry(editLink);
        completeTask(taskCheck);
        if (sortedTasks[i]["taskComplete"] === true){
            taskDivs[i].style.textDecoration = "line-through";
            taskCheck.checked = true;
        }
        else{
            taskDivs[i].style.textDecoration = "none";
            taskCheck.checked =false;
        }
        
    }

    allTasks(taskDivs);
    tasksOfTheDay(taskDivs, sortedTasks);
    tasksOFtheWeek(sortedTasks,taskDivs);
    projectSidebar(sortedTasks,taskDivs);
};
// function to remove all the tasks when displaying so we dont get repeat tasks
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// display all tasks when the user clicks all tasks
function allTasks(taskDivs){
    const allTasksLink = document.querySelector(".allTasks");
    allTasksLink.addEventListener('click', ()=>{
        for (let i =0; i<taskDivs.length; i++){  
           taskDivs[i].style.display = "block";
        }
    });
}

// display only today's tasks when user clicks today
function tasksOfTheDay(taskDivs, tasks) {


    const today = document.querySelector(".today");    
    let currentDate = (((new Date().toISOString().slice(0, -8)).toString()).split("T"))[0];
    

    today.addEventListener('click', ()=>{
        for (let i =0; i<tasks.length; i++){
            if (((tasks[i]["taskTime"]).split("T"))[0] === currentDate){
                
                taskDivs[i].style.display = "block";
            }
            else{
                taskDivs[i].style.display = "none";
            }
        }
    });

};

// display current week's tasks when the user clicks current week
function tasksOFtheWeek(tasks,taskDivs){

    const currentWeekLink = document.querySelector(".week");

    currentWeekLink.addEventListener('click', ()=>{
        let currentWeek =  getWeek(new Date())
        for(let i =0; i<tasks.length; i++){
            if(getWeek(new Date(tasks[i]["taskTime"])) === currentWeek){
                taskDivs[i].style.display = "block";
            }
            else{
                taskDivs[i].style.display = "none";
            }
        }
    });
}

// display the project names on the side bar and display the tasks related to the project clicked
function projectSidebar(tasks,taskDivs){
    const projectNamesDiv = document.querySelector(".projectNamesDiv");

    removeAllChildNodes(projectNamesDiv);

    const untitledProjectName = document.createElement("a");
    untitledProjectName.classList.add("project","untitled");
    untitledProjectName.textContent = "untitled Projects";

    projectNamesDiv.appendChild(untitledProjectName);

    let projects = [untitledProjectName];
    displayProjectTasks(projects[0],taskDivs,tasks);


    for(let i = 0; i< tasks.length; i++){
        if (tasks[i]['project']!=""){
            if(!projectNamesDiv.contains(document.querySelector(`.${tasks[i]['project']}`))){
                projects.push(document.createElement("a")); 
                projects[projects.length-1].classList.add("project", tasks[i]['project']);
                projects[projects.length-1].textContent = tasks[i]['project'];

                projectNamesDiv.appendChild(projects[projects.length-1]);
                displayProjectTasks(projects[projects.length-1],taskDivs,tasks);
                }
        }
        }
        

    document.querySelector("aside").appendChild(projectNamesDiv);

}

function displayProjectTasks(project,taskDivs,tasks){
    const projectName = project.className.split(" ")[1];
    project.addEventListener('click', ()=>{
        for(let i=0; i< tasks.length; i++){

            if (projectName ==="untitled" && tasks[i]['project'] ===""){
                taskDivs[i].style.display= "block";
            }
            else if (projectName === tasks[i]['project']){
                taskDivs[i].style.display= "block";
            }
            else{
                taskDivs[i].style.display= "none";
            }
        }
    });
}


export default display;