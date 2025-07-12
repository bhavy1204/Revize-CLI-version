import inquirer from "inquirer";
import { log } from "./log.js";

export async function menu(){
    let exit = false;
    while (!exit) {
        console.log(log.yellow("-------------Revize-----------------"));
        let menuResponse = await inquirer.prompt([{
            name: "choice",
            message: log.cyan("Choose an option :-"),
            type: "list",
            choices: [
                { name: log.blueBold("1. Update today's log"), value: "updateTask" },
                { name: log.blueBold("2. Today's revision task"), value: "seeReviseList" },
                { name: log.blueBold("3. Update Today's ToDo list"), value: "updateToDolist" },
                { name: log.blueBold("4. Today's ToDo list"), value: "seeToDoList" },
                { name: log.blueBold("5. Exit"), value: "Exit" }
            ]
        }])
        if (menuResponse.choice === "updateTask") {
            console.clear();
            await updatetodayStudyLog();
        } else if (menuResponse.choice === "seeReviseList") {
            console.clear();
            await showTodaysRevisionList();
        } else if (menuResponse.choice === "updateToDolist") {
            console.clear();
            await updateToDoList();
        } else if (menuResponse.choice === "seeToDoList") {
            console.clear();
            await showToDoList();
        } else if (menuResponse.choice === "Exit") {
            exit = true;
        }
    }
}