#!/usr/bin/env node

import inquirer from 'inquirer';

let todayTask=[];
let todayReviseList=[];

const delay = (ms) =>
    new Promise((r) =>
        setTimeout(r, ms)
    );

const updatetodayList = async () => {
    console.log("Updating list...");
    await delay(2000);
    console.clear();
    return;
}

const showTodaysReviseList = async () => {
    console.log("Todays list...");
    await delay(2000);
    console.clear();
    return;
}

const menu = async () => {
    let exit = false;
    while (!exit) {
        console.log("-------------Revize-----------------");
        let menuResponse = await inquirer.prompt([{
            name: "choice",
            message: "Choose an option :-",
            type: "list",
            choices: [
                {name:"1. Update today's log", value:"updateTask"},
                {name:"2. Today's revision task",value:"seeReviseList"},
                {name:"3. Exit",value:"Exit"}
            ]
        }])
        if (menuResponse.choice === "updateTask") {
            await updatetodayList();
        } else if (menuResponse.choice === "seeReviseList") {
            await showTodaysReviseList();
        } else if (menuResponse.choice === "Exit") {
            exit = true;
        }
    }
}

menu();