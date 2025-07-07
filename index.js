#!/usr/bin/env node

import inquirer from 'inquirer';

let todayReviseList = [];
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
    let firstReviseDateObj = new Date(new Date(ISOdate).getTime() + 86400000);
    let firstReviseDate = firstReviseDateObj.toISOString();
    let firstReviseDateLocal = firstReviseDateObj.toLocaleString();
    firstReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, firstReviseDate, firstReviseDateLocal, done: false });

    // 3 days
    let secondReviseDateObj = new Date(new Date(ISOdate).getTime() + 259200000);
    let secondReviseDate = secondReviseDateObj.toISOString();
    let secondReviseDateLocal = secondReviseDateObj.toLocaleString();
    secondReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, secondReviseDate, secondReviseDateLocal, done: false });

    // 7 days
    let thirdReviseDateObj = new Date(new Date(ISOdate).getTime() + 604800000);
    let thirdReviseDate = thirdReviseDateObj.toISOString();
    let thirdReviseDateLocal = thirdReviseDateObj.toLocaleString();
    thirdReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, thirdReviseDate, thirdReviseDateLocal, done: false });

    // 30 days
    let fourthReviseDateObj = new Date(new Date(ISOdate).getTime() + 2592000000);
    let fourthReviseDate = fourthReviseDateObj.toISOString();
    let fourthReviseDateLocal = fourthReviseDateObj.toLocaleString();
    fourthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, fourthReviseDate, fourthReviseDateLocal, done: false });

    // 60 days
    let fifthReviseDateObj = new Date(new Date(ISOdate).getTime() + 5184000000);
    let fifthReviseDate = fifthReviseDateObj.toISOString();
    let fifthReviseDateLocal = fifthReviseDateObj.toLocaleString();
    fifthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, fifthReviseDate, fifthReviseDateLocal, done: false });

    // 90 days
    let sixthReviseDateObj = new Date(new Date(ISOdate).getTime() + 7776000000);
    let sixthReviseDate = sixthReviseDateObj.toISOString();
    let sixthReviseDateLocal = sixthReviseDateObj.toLocaleString();
    sixthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, sixthReviseDate, sixthReviseDateLocal, done: false });


    console.log("Saved successfully");
    await delay(2000);
    console.clear();
    return;
}

const showTodaysRevisionList = async () => {

    let today = new Date().toISOString().slice(0, 10);
    todayReviseList = [];

    // first
    todayReviseList.push(
        ...firstReviseList.filter(t =>
            t.firstReviseDate.startsWith(today)
        )
    )

    // second
    todayReviseList.push(
        ...secondReviseList.filter(t =>
            t.secondReviseDate.startsWith(today)
        )
    )

    // third
    todayReviseList.push(
        ...thirdReviseList.filter(t =>
            t.thirdReviseDate.startsWith(today)
        )
    )

    // fourth
    todayReviseList.push(
        ...fourthReviseList.filter(t =>
            t.fourthReviseDate.startsWith(today)
        )
    )

    // fifth
    todayReviseList.push(
        ...fifthReviseList.filter(t =>
            t.fifthReviseDate.startsWith(today)
        )
    )

    // sixth
    todayReviseList.push(
        ...sixthReviseList.filter(t =>
            t.sixthReviseDate.startsWith(today)
        )
    )

    if (todayReviseList.length === 0) {
        return;
    }

    todayReviseList.push({ name: ">>> Go bak", value: -1 });

    const selected = await inquirer.prompt([{
        name: "revesionList",
        type: "list",
        message: "Choose any one",
        choices: todayReviseList,
    }]);

    if (selected.revesionList === -1) {
        return;
    }

    // await viewDetailsOfLog(selected);

    await delay(2000);
    console.clear();
    return;
}

// temperory functions
const first = async () => {

    console.log(firstReviseList);
    console.log("-------------------------------------------------------------");
    console.log(secondReviseList);
    console.log("-------------------------------------------------------------");
    console.log(thirdReviseList);
    console.log("-------------------------------------------------------------");
    console.log(fourthReviseList);
    console.log("-------------------------------------------------------------");
    console.log(fifthReviseList);
    console.log("-------------------------------------------------------------");
    console.log(sixthReviseList);
    console.log("-------------------------------------------------------------");
    await delay(9000);
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
            await showTodaysRevisionList();
        } else if (menuResponse.choice === "Exit") {
            await first();
            // exit = true;
        }
    }
}

menu();