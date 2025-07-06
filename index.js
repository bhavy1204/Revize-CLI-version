#!/usr/bin/env node

import inquirer from 'inquirer';

let todayStudyLog = [];
let firstReviseList = [];
let secondReviseList = [];
let thirdReviseList = [];
let fourthReviseList = [];
let fifthReviseList = [];
let sixthReviseList = [];

const delay = (ms) =>
    new Promise((r) =>
        setTimeout(r, ms)
    );

const updatetodayStudyLog = async () => {
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
    todayStudyLog.push({ task: listResponse.studyLog, note: listResponse.notes, ISOdate, localDate, done: false });

    // Next day
    let firstReviseDateObj = new Date(new Date(ISOdate).getTime + 86400000);
    let firstReviseDate = firstReviseDateObj.toISOString();
    let firstReviseDateLocal = firstReviseDate.toLocaleString();
    firstReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, firstReviseDate, firstReviseDateLocal, done: false });

    // 3 days
    let secondReviseDateObj = new Date(new Date(ISOdate).getTime + 259200000);
    let secondReviseDate = secondReviseDateObj.toISOString();
    let secondReviseDateLocal = secondReviseDate.toLocaleString();
    secondReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, secondReviseDate, secondReviseDateLocal, done: false });

    // 7 days
    let thirdReviseDateObj = new Date(new Date(ISOdate).getTime + 604800000);
    let thirdReviseDate = thirdReviseDateObj.toISOString();
    let thirdReviseDateLocal = thirdReviseDate.toLocaleString();
    thirdReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, thirdReviseDate, thirdReviseDateLocal, done: false });

    // 30 days
    let fourthReviseDateObj = new Date(new Date(ISOdate).getTime + 2592000000);
    let fourthReviseDate = fourthReviseDateObj.toISOString();
    let fourthReviseDateLocal = fourthReviseDate.toLocaleString();
    fourthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, fourthReviseDate, fourthReviseDateLocal, done: false });

    // 60 days
    let fifthReviseDateObj = new Date(new Date(ISOdate).getTime + 5184000000);
    let fifthReviseDate = fifthReviseDateObj.toISOString();
    let fifthReviseDateLocal = fifthReviseDate.toLocaleString();
    fifthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, fifthReviseDate, fifthReviseDateLocal, done: false });

    // 90 days
    let sixthReviseDateObj = new Date(new Date(ISOdate).getTime + 7776000000);
    let sixthReviseDate = sixthReviseDateObj.toISOString();
    let sixthReviseDateLocal = sixthReviseDate.toLocaleString();
    sixthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, sixthReviseDate, sixthReviseDateLocal, done: false });


    console.log("Saved successfully");
    await delay(2000);
    console.clear();
    return;
}

const showTodaysReviseList = async () => {

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
            await updatetodayStudyLog();
        } else if (menuResponse.choice === "seeReviseList") {
            await showTodaysReviseList();
        } else if (menuResponse.choice === "Exit") {
            exit = true;
        }
    }
}

menu();