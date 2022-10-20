
const completeTask = (check)=>{
    

    
    check.addEventListener('change', () => {
        let currentTask = (check.parentNode).parentNode;
        let currentTaskNumber = Number((currentTask.className).split(" ")[1]) -1;
        let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        console.log(check.className + check.checked);
        if (check.checked === true) {
            tasks[currentTaskNumber]["taskComplete"] = true;
            currentTask.style.textDecoration = "line-through";
        } 
        else{
           tasks[currentTaskNumber]["taskComplete"] = false;
           currentTask.style.textDecoration = "none";
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
}

export default completeTask;

