import inquirer from "inquirer";

let todoList = [];

const updateToDoList = async () => {
    const res = await inquirer.prompt([{
        message: "Enter task : ",
        name: "task",
        type: "input",
        required: true
    }, {
        message: "Enter priority",
        name: "priority",
        type: "list",
        choices: [
            { name: "High", value: "high" },
            { name: "moderate", value: "moderate" },
            { name: "low", value: "low" },
        ]
    }]);
    if (res.task.trim() === "") {
        console.log("Enter a valid task");
    } else {
        todoList.push({ task: res.task, priority: res.priority, localeDate: todayLocalDate, done: false, compareDate: today });
        writeRevesionData("todayTODO", todoList);
        console.log("Addedd successfully");

        delay(1000);
    }

}

const showToDoList = async () => {
    updateToDoList();

    todoList.push({ task: "GO BACK..." });

    const res = await inquirer.prompt([{
        message: "Todays tasks:-",
        type: "list",
        choices: todoList
    }]);
    delay(5000);
}