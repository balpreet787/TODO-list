import allTasks from "./allTasks.svg";
import calenderTodayPhoto from "./calendarToday.svg";
import calenderWeekPhoto from "./calendarWeek.svg";

const body = document.body;

const header = () =>{
    const heading = document.createElement("header");
    const title = document.createElement("h1");
    title.textContent = "Things to do..."
    heading.appendChild(title);
    body.appendChild(heading);
}

const sidebar = () =>{
    const sideContent = document.createElement("aside");
    
    const allTasksLink = document.createElement("a");
    allTasksLink.classList.add("allTasks");

    const allTasksPhoto = new Image();
    allTasksPhoto.src = allTasks;
    allTasksPhoto.classList.add("image","allTasksPhoto");

    const allTasksSpan =  document.createElement("span");
    allTasksSpan.classList.add("link","allTasks");
    allTasksSpan.textContent = "All tasks";

    allTasksLink.appendChild(allTasksPhoto);
    allTasksLink.appendChild(allTasksSpan);

    const todayLink = document.createElement("a");
    todayLink.classList.add("today");

    const photoToday = new Image();
    photoToday.src = calenderTodayPhoto;
    photoToday.classList.add("image","todayPhoto");

    const todaySpan =  document.createElement("span");
    todaySpan.classList.add("link","today");
    todaySpan.textContent = "Today";

    todayLink.appendChild(photoToday);
    todayLink.appendChild(todaySpan);


    const currentWeekLink = document.createElement("a");
    currentWeekLink.classList.add("week");

    const photoWeek = new Image();
    photoWeek.src = calenderWeekPhoto;
    photoWeek.classList.add("image","weekPhoto");

    const weekSpan =  document.createElement("span");
    weekSpan.classList.add("link","week");
    weekSpan.textContent = "Week";

    currentWeekLink.appendChild(photoWeek);
    currentWeekLink.appendChild(weekSpan);

    sideContent.appendChild(allTasksLink);
    sideContent.appendChild(todayLink);
    sideContent.appendChild(currentWeekLink);



    const projectHeading = document.createElement("h2");
    projectHeading.textContent = "Projects:";
    sideContent.appendChild(projectHeading);

    const projectNamesDiv = document.createElement("div");
    projectNamesDiv.classList.add("projectNamesDiv");

    sideContent.appendChild(projectNamesDiv);

    body.appendChild(sideContent);

};

const addToListForm = () =>{
    const addBtn = document.createElement("button");
    addBtn.classList.add("btn","add");
    addBtn.textContent = "+";

    const formDiv = document.createElement("div");
    formDiv.classList.add("addFormDiv");

    const form = document.createElement("form");
    form.classList.add("addToListForm");
    form.setAttribute("action", "");

    const title = document.createElement("input");
    title.classList.add("title");
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("placeholder", "Title");

    const projectName = document.createElement("input");
    projectName.classList.add("projectName");
    projectName.setAttribute("type", "text");
    projectName.setAttribute("name", "project");
    projectName.setAttribute("placeholder", "Project name");

    const description = document.createElement("textarea");
    description.classList.add("description");
    description.setAttribute("name", "details");
    description.setAttribute("placeholder", "Type the details here....");

    const dateAndTime = document.createElement("input");
    dateAndTime.classList.add("time");
    dateAndTime.setAttribute("type","datetime-local");
    dateAndTime.setAttribute("name","dateAndTime");
    let currentDate = new Date().toISOString().slice(0, -8);
    dateAndTime.setAttribute("min",currentDate);

    const priority = document.createElement("select");
    priority.classList.add("priority");
    const lowPriority = document.createElement("option");
    lowPriority.setAttribute("value","low");
    lowPriority.setAttribute("selected","selected");
    lowPriority.textContent="Low";
    const mediumPriority = document.createElement("option");
    mediumPriority.setAttribute("value","medium");
    mediumPriority.textContent="Medium";
    const highPriority = document.createElement("option");
    highPriority.setAttribute("value","high");
    highPriority.textContent="High";

    priority.appendChild(lowPriority);
    priority.appendChild(mediumPriority);
    priority.appendChild(highPriority);

    const errorMessage = document.createElement("div");
    errorMessage.classList.add("errorMessage");


    const submit = document.createElement("button");
    submit.setAttribute("type","button");
    submit.classList.add("submit");
    submit.textContent="Submit";

    form.appendChild(title);
    form.appendChild(projectName);
    form.appendChild(description);
    form.appendChild(dateAndTime);
    form.appendChild(priority);
    form.append(errorMessage);
    form.appendChild(submit);

    formDiv.appendChild(form)
    body.appendChild(addBtn);
    body.appendChild(formDiv);

    addBtn.addEventListener('click', ()=>{
        if (formDiv.style.display === "block"){
            formDiv.style.display = "none";
        }
        else{
            formDiv.style.cssText = "display:block;";
        }
    });

};

const taskDisplay =()=>{
    const content = document.createElement("div");
    content.classList.add("content")
    body.appendChild(content);
};

const editTaskForm = () =>{
    const formDiv = document.createElement("div");
    formDiv.classList.add("editFormDiv");

    const form = document.createElement("form");
    form.classList.add("editTaskForm");
    form.setAttribute("action", "");

    const title = document.createElement("input");
    title.classList.add("editedTitle");
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("placeholder", "Title");

    const projectName = document.createElement("input");
    projectName.classList.add("EditedProjectName");
    projectName.setAttribute("type", "text");
    projectName.setAttribute("name", "project");
    projectName.setAttribute("placeholder", "Project name");

    const description = document.createElement("textarea");
    description.classList.add("EditedDescription");
    description.setAttribute("name", "details");
    description.setAttribute("placeholder", "Type the details here....");

    const dateAndTime = document.createElement("input");
    dateAndTime.classList.add("EditedTime");
    dateAndTime.setAttribute("type","datetime-local");
    dateAndTime.setAttribute("name","dateAndTime");
    let currentDate = new Date().toISOString().slice(0, -8);
    dateAndTime.setAttribute("min",currentDate);

    const priority = document.createElement("select");
    priority.classList.add("editedPriority");
    const lowPriority = document.createElement("option");
    lowPriority.setAttribute("value","low");
    lowPriority.setAttribute("selected","selected");
    lowPriority.textContent="Low";
    const mediumPriority = document.createElement("option");
    mediumPriority.setAttribute("value","medium");
    mediumPriority.textContent="Medium";
    const highPriority = document.createElement("option");
    highPriority.setAttribute("value","high");
    highPriority.textContent="High";

    priority.appendChild(lowPriority);
    priority.appendChild(mediumPriority);
    priority.appendChild(highPriority);
    
    const errorMessage = document.createElement("div");
    errorMessage.classList.add("errorMessage");


    const submit = document.createElement("button");
    submit.setAttribute("type","button");
    submit.classList.add("Editedsubmit");
    submit.textContent="Submit";

    const cancel = document.createElement("button");
    cancel.classList.add("cancel");
    cancel.setAttribute("type","button");
    cancel.textContent = "X"

    cancel.addEventListener("click", ()=>{
        formDiv.style.display = "none";
       });

    form.appendChild(cancel);
    form.appendChild(title);
    form.appendChild(projectName);
    form.appendChild(description);
    form.appendChild(dateAndTime);
    form.appendChild(priority);
    form.append(errorMessage);
    form.appendChild(submit);
    formDiv.appendChild(form)
    body.appendChild(formDiv);
};

export {header, sidebar, addToListForm, taskDisplay, editTaskForm};