import inquirer from "inquirer";
import { writeRevesionData, readRevesionData } from "../filehandler/filehandler.js";
import { delay } from "./utils.js";

let todayLocalDate = new Date().toLocaleString();
let today = new Date().toISOString().slice(0, 10);
let todoList = [];

export async function updateToDoList() {
    await updateTodayTODOList();
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
        console.log("Added successfully");

        delay(1000);
    }

}

export async function showToDoList() {
    await updateTodayTODOList();

    const choice = todoList.map((t, index) => ({
        name: `[${t.priority.toUpperCase()}] ${t.task}`,
        value: index
    }));
    choice.push({ name: "GO BACK...", value: -1 });

    const res = await inquirer.prompt([{
        message: "Todays tasks:-",
        type: "list",
        choices: choice
    }]);

     if (res === -1) {
        console.log("Returning to main menu...");
    }

    delay(1000);
}

export async function updateTodayTODOList() {
    todoList = [];
    const data = await readRevesionData("todayTODO");
    todoList = data;
}