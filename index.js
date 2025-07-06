#!/usr/bin/env node

import inquirer from 'inquirer';

let todayTask = [];
let todayReviseList = [];

const delay = (ms) =>
    new Promise((r) =>
        setTimeout(r, ms)
    );

const updatetodayList = async () => {
    const listResponse = await inquirer.prompt([{
        message: "What did you study....?",
        name: "studyLog",
        type: "input",
        required: true,
    }, {
        message: "ANy special note.?",
        name: "notes",
        type: "input"
    }
    ]);
    let ISOdate = new Date().toISOString();
    let localDate = new Date(ISOdate).toLocaleString();
    todayTask.push({ task: listResponse.studyLog, note: listResponse.notes, ISOdate, localDate, done:false });
    console.log("Saved successfully");
    await delay(2000);
    console.clear();
    return;
}

const showTodaysReviseList = async () => {
    if (todayReviseList.length === 0) {
        console.log("No task to show ");
        await delay(1000);
        return;
    }

    const reviseToday = todayTask.map((item, idx) => ({
        name: `[${idx + 1}]. ${item.task}`,
        value: idx,
    }));

    reviseToday.push({ name: ">>> Go bak", value: -1 });

    const selected = await inquirer.prompt([{
        name: "revesionList",
        type: "list",
        message: "Choose any one",
        choices: reviseToday,
    }]);

    if (selected.revesionList === -1) {
        return;
    }

    // await viewDetailsOfLog(selected);

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
                { name: "1. Update today's log", value: "updateTask" },
                { name: "2. Today's revision task", value: "seeReviseList" },
                { name: "3. Exit", value: "Exit" }
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