import inquirer from 'inquirer';

let today = new Date().toISOString().slice(0, 10);

import { readRevesionData, writeRevesionData } from '../filehandler/filehandler.js';
import { log } from './log.js';
import { delay } from './utils.js';

let todayReviseList = [];
let todayStudyLog = [];
let firstReviseList = [];
let secondReviseList = [];
let thirdReviseList = [];
let fourthReviseList = [];
let fifthReviseList = [];
let sixthReviseList = [];

const allFiles = [
    { key: "first", dateKey: "firstReviseDate" },
    { key: "second", dateKey: "secondReviseDate" },
    { key: "third", dateKey: "thirdReviseDate" },
    { key: "fourth", dateKey: "fourthReviseDate" },
    { key: "fifth", dateKey: "fifthReviseDate" },
    { key: "sixth", dateKey: "sixthReviseDate" },
    { key: "todayTODO", dateKey: "todayTODO" },
]

// To update today's study log
export async function updatetodayStudyLog(){
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

    // saving to today's study list
    todayReviseList = readRevesionData("today");
    let ISOdate = new Date().toISOString();
    let localDate = new Date(ISOdate).toLocaleString();
    todayStudyLog.push({ task: listResponse.studyLog, note: listResponse.notes, ISOdate, localDate, done: false });
    writeRevesionData("today", todayStudyLog);

    // saving Next day
    firstReviseList = readRevesionData("first");
    let firstReviseDateObj = new Date(new Date(ISOdate).getTime() + 86400000);
    let firstReviseDate = firstReviseDateObj.toISOString();
    let firstReviseDateLocal = firstReviseDateObj.toLocaleString();
    firstReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, firstReviseDate, firstReviseDateLocal, done: false });

    writeRevesionData("first", firstReviseList);

    // saving 3 days
    secondReviseList = readRevesionData("second");
    let secondReviseDateObj = new Date(new Date(ISOdate).getTime() + 259200000);
    let secondReviseDate = secondReviseDateObj.toISOString();
    let secondReviseDateLocal = secondReviseDateObj.toLocaleString();
    secondReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, secondReviseDate, secondReviseDateLocal, done: false });

    writeRevesionData("second", secondReviseList);

    // saving 7 days
    thirdReviseList = readRevesionData("third");
    let thirdReviseDateObj = new Date(new Date(ISOdate).getTime() + 604800000);
    let thirdReviseDate = thirdReviseDateObj.toISOString();
    let thirdReviseDateLocal = thirdReviseDateObj.toLocaleString();
    thirdReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, thirdReviseDate, thirdReviseDateLocal, done: false });

    writeRevesionData("third", thirdReviseList);

    // saving 30 days
    fourthReviseList = readRevesionData("fourth");
    let fourthReviseDateObj = new Date(new Date(ISOdate).getTime() + 2592000000);
    let fourthReviseDate = fourthReviseDateObj.toISOString();
    let fourthReviseDateLocal = fourthReviseDateObj.toLocaleString();
    fourthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, fourthReviseDate, fourthReviseDateLocal, done: false });

    writeRevesionData("fourth", fourthReviseList);

    // saving 60 days
    fifthReviseList = readRevesionData("fifth");
    let fifthReviseDateObj = new Date(new Date(ISOdate).getTime() + 5184000000);
    let fifthReviseDate = fifthReviseDateObj.toISOString();
    let fifthReviseDateLocal = fifthReviseDateObj.toLocaleString();
    fifthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, fifthReviseDate, fifthReviseDateLocal, done: false });

    writeRevesionData("fifth", fifthReviseList);

    // saving 90 days
    sixthReviseList = readRevesionData("sixth");
    let sixthReviseDateObj = new Date(new Date(ISOdate).getTime() + 7776000000);
    let sixthReviseDate = sixthReviseDateObj.toISOString();
    let sixthReviseDateLocal = sixthReviseDateObj.toLocaleString();
    sixthReviseList.push({ task: listResponse.studyLog, note: listResponse.notes, sixthReviseDate, sixthReviseDateLocal, done: false });

    writeRevesionData("sixth", sixthReviseList);


    console.log(log.brightGreen("Saved successflly"));
    await delay(2000);
    console.clear();
    return;
}
//----------------------------------------------------------------------------------------------------------

export async function updateTodayRevisionList(){

    todayReviseList = [];

    for (let file of allFiles) {
        const data = readRevesionData(file.key);
        const filterd = data.filter(task => task[file.dateKey]?.startsWith(today) && task.done === false);
        todayReviseList.push(
            ...filterd.map((task, idx) => ({
                name: `${idx + 1}. ${task.task} (${file.key} revision)`,
                value: { ...task, revision: file.key }
            }))
        );
    }
}

export async function viewDetailsOfLog(task){
    updateTodayRevisionList();
    console.clear();

    console.log(`TASK: ${task}`);
    const res = await inquirer.prompt([{
        message: log.cyan("Choose operation:-  "),
        name: "operation",
        type: "list",
        choices: [
            { name: log.yellow("Mark as done "), value: "markAsDone" },
            { name: log.gray("Go back"), value: "Go back" }
        ]
    }])

    if (res.operation === "markAsDone") {

        const allTasks = readRevesionData(task.revision);
        const updated = allTasks.map(t =>
            t.task === task.task &&
                t[`${task.revision}ReviseDate`] === task[`${task.revision}ReviseDate`]
                ? { ...t, done: true }
                : t
        );
        writeRevesionData(task.revision, updated);
        console.log(log.brightGreen("Marked as Done"));
        return;
    } else if (res.operation === "Go back") {
        delay(1000);
        console.clear();
        return;
    }
}


export async function showTodaysRevisionList(){

    updateTodayRevisionList();

    if (todayReviseList.length === 0) {
        console.log(log.yellow("Nothing to revise today"));
        await delay(1000);
        console.clear();
        return;
    }

    todayReviseList.push({ name: log.gray(">>> GO BACK"), value: -1 });

    const selected = await inquirer.prompt([{
        name: "revesionList",
        type: "list",
        message: log.cyan("Choose any one"),
        choices: todayReviseList,
    }]);

    if (selected.revesionList === -1) {
        delay(1000);
        console.clear();
        return;
    }

    await viewDetailsOfLog(selected.revesionList);

    await delay(1000);
    console.clear();
    return;
}