#!/usr/bin/env node
import { readRevesionData, writeRevesionData } from './filehandler.js';
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
        message: "Any special note.? ",
        name: "notes",
        type: "input"
    }
    ]);
    let ISOdate = new Date().toISOString();
    let localDate = new Date(ISOdate).toLocaleString();
    todayStudyLog.push({ task: listResponse.studyLog, note: listResponse.notes, ISOdate, localDate, done: false });

    writeRevesionData("today", todayStudyLog);

    // Next day
    let firstReviseDateObj = new Date(new Date(ISOdate).getTime() + 86400000);
    let firstReviseDate = firstReviseDateObj.toISOString();
    let firstReviseDateLocal = firstReviseDateObj.toLocaleString();
    firstReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, firstReviseDate, firstReviseDateLocal, done: false });

    writeRevesionData("first", firstReviseList);

    // 3 days
    let secondReviseDateObj = new Date(new Date(ISOdate).getTime() + 259200000);
    let secondReviseDate = secondReviseDateObj.toISOString();
    let secondReviseDateLocal = secondReviseDateObj.toLocaleString();
    secondReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, secondReviseDate, secondReviseDateLocal, done: false });

    writeRevesionData("second", secondReviseList);

    // 7 days
    let thirdReviseDateObj = new Date(new Date(ISOdate).getTime() + 604800000);
    let thirdReviseDate = thirdReviseDateObj.toISOString();
    let thirdReviseDateLocal = thirdReviseDateObj.toLocaleString();
    thirdReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, thirdReviseDate, thirdReviseDateLocal, done: false });

    writeRevesionData("third", thirdReviseList);

    // 30 days
    let fourthReviseDateObj = new Date(new Date(ISOdate).getTime() + 2592000000);
    let fourthReviseDate = fourthReviseDateObj.toISOString();
    let fourthReviseDateLocal = fourthReviseDateObj.toLocaleString();
    fourthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, fourthReviseDate, fourthReviseDateLocal, done: false });

    writeRevesionData("fourth", fourthReviseList);

    // 60 days
    let fifthReviseDateObj = new Date(new Date(ISOdate).getTime() + 5184000000);
    let fifthReviseDate = fifthReviseDateObj.toISOString();
    let fifthReviseDateLocal = fifthReviseDateObj.toLocaleString();
    fifthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, fifthReviseDate, fifthReviseDateLocal, done: false });

    writeRevesionData("fifth", fifthReviseList);

    // 90 days
    let sixthReviseDateObj = new Date(new Date(ISOdate).getTime() + 7776000000);
    let sixthReviseDate = sixthReviseDateObj.toISOString();
    let sixthReviseDateLocal = sixthReviseDateObj.toLocaleString();
    sixthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, sixthReviseDate, sixthReviseDateLocal, done: false });

    writeRevesionData("sixth", sixthReviseList);


    console.log("Saved successfully");
    await delay(2000);
    console.clear();
    return;
}

const showTodaysRevisionList = async () => {

    let today = new Date().toISOString().slice(0, 10);
    todayReviseList = [];

    const allFiles = [
        { key: "first", dateKey: "firstReviseDate" },
        { key: "second", dateKey: "secondReviseDate" },
        { key: "third", dateKey: "thirdReviseDate" },
        { key: "fourth", dateKey: "fourthReviseDate" },
        { key: "fifth", dateKey: "fifthReviseDate" },
        { key: "sixth", dateKey: "sixthReviseDate" },
    ]

    for (let file of allFiles) {
        const data = readRevesionData(allFiles.key);
        const filterd = data.filter(task => task[file.dateKey]?.startsWith(today));
        todayReviseList.push(
            ...filterd.map((task, idx) => ({
                name: `${task.task} (${file.key} revision)`,
                value: { ...task, revision: file.key }
            }))
        );
    }

    if (todayReviseList.length === 0) {
        console.log("Nothing to revise today !! ");
        await delay(1000);
        console.clear();
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

    const data = readRevesionData("first");

    console.log(data);
    // console.log("-------------------------------------------------------------");
    // console.log(secondReviseList);
    // console.log("-------------------------------------------------------------");
    // console.log(thirdReviseList);
    // console.log("-------------------------------------------------------------");
    // console.log(fourthReviseList);
    // console.log("-------------------------------------------------------------");
    // console.log(fifthReviseList);
    // console.log("-------------------------------------------------------------");
    // console.log(sixthReviseList);
    // console.log("-------------------------------------------------------------");
    await delay(90000);
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
            // exit = true;
            await first();
        }
    }
}

menu();


//----------------------------------------------------------------------------------------------------------
// first
// todayReviseList.push(
//     ...firstReviseList.filter(t =>
//         t.firstReviseDate.startsWith(today)
//     )
// )

// // second
// todayReviseList.push(
//     ...secondReviseList.filter(t =>
//         t.secondReviseDate.startsWith(today)
//     )
// )

// // third
// todayReviseList.push(
//     ...thirdReviseList.filter(t =>
//         t.thirdReviseDate.startsWith(today)
//     )
// )

// // fourth
// todayReviseList.push(
//     ...fourthReviseList.filter(t =>
//         t.fourthReviseDate.startsWith(today)
//     )
// )

// // fifth
// todayReviseList.push(
//     ...fifthReviseList.filter(t =>
//         t.fifthReviseDate.startsWith(today)
//     )
// )

// // sixth
// todayReviseList.push(
//     ...sixthReviseList.filter(t =>
//         t.sixthReviseDate.startsWith(today)
//     )
// )