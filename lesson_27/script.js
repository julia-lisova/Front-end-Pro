const taskForm = document.querySelector(`#taskForm`);
const taskFormTitle = document.querySelector(`#taskFormTitle`);
const taskFormReporter = document.querySelector(`#taskFormReporter`);
const taskFormAssignee = document.querySelector(`#taskFormAssignee`);

const taskTableTodo = document.querySelector(`#taskTableTodo`);
const taskTableInProgress = document.querySelector(`#taskTableInProgress`);
const taskTableTesting = document.querySelector(`#taskTableTesting`);
const taskTableReopened = document.querySelector(`#taskTableReopened`);
const taskTableDone = document.querySelector(`#taskTableDone`);

// service
const API = `https://63693f7228cd16bba71904e4.mockapi.io`;

const getList = path => fetch(API+path).then(data => data.json());

const addItem = (path, obj) => fetch(API+path, {
    method: `POST`,
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(data => data.json());

const changeItem = (path, obj) => fetch(API+path, {
    method: `PUT`,
    headers: {
        "Content-type": "application/json"
    },
    body: JSON.stringify(obj)
}).then(data => data.json());

const deleteItem = (path) => fetch(API+path, {method: `DELETE`}).then(data => data.json());
// service

// renderReporter
const renderReporter = list => {    
    taskFormReporter.innerHTML = list
        .map(item => `<option value="${item.name}">${item.name}</option>`)
        .join(``);
}
// renderReporter

// renderAssignee
const renderAssignee = list => {
    taskFormAssignee.innerHTML = list
        .map(item => `<option value="${item.name}">${item.name}</option>`)
        .join(``);
}
// renderAssignee

// renderSelects
const renderSelects = async () => {
    let users = await getList(`/users`);
    
    renderReporter(users);
    renderAssignee(users);
}
// renderSelects

// taskForm
taskForm.addEventListener(`submit`, async e=>{
    e.preventDefault();

    if(taskFormReporter.value === taskFormAssignee.value){
        console.log(`👻 ${taskFormReporter.value} already reporter!`);
        return;
    }


    let task = {
        title: taskFormTitle.value,
        reporter: taskFormReporter.value,
        assignee: taskFormAssignee.value,
        status: 0,
    }
    let users = await getList(`/users`);
    const objUser=users.find((objUser)=>taskFormAssignee.value === objUser.name);

    await changeItem(`/users/${objUser.id}`, {statusUser: true});
    let addedItem = await addItem(`/tasks`, task);
    renderTask(addedItem);
})
// taskForm

const modifyItem = async (taskId, status) => {
    let changedTask = await changeItem(`/tasks/${taskId}`, {status: status});
    document.querySelector(`.task[data-id="${taskId}"]`).remove();
    renderTask(changedTask);
}

const toProgress = task => modifyItem(task.id, 1);
const toTesting = task => modifyItem(task.id, 2);

const toDone = async (task) => {
    let changedTask = await changeItem(`/tasks/${task.id}`, {status: 4});
    document.querySelector(`.task[data-id="${task.id}"]`).remove();
    renderTask(changedTask);
}
const toReopen = async (task) => {
    let changedTask = await changeItem(`/tasks/${task.id}`, {status: 3});
    document.querySelector(`.task[data-id="${task.id}"]`).remove();
    renderTask(changedTask);
}
const toToDo = async (task) => {
    let changedTask = await changeItem(`/tasks/${task.id}`, {status: 0});
    document.querySelector(`.task[data-id="${task.id}"]`).remove();
    renderTask(changedTask);
}
const toClose = async (task) => {
    await deleteItem(`/tasks/${task.id}`);
    document.querySelector(`.task[data-id="${task.id}"]`).remove();
}

const TASK_STATUS = {
    0: {
        td: taskTableTodo,
        actions: [
            {
                btnText: `Progress`,
                action: toProgress
            }
        ]
    },
    1: {
        td: taskTableInProgress,
        actions: [
            {
                btnText: `Need testing`,
                action: toTesting
            }
        ]
    },
    2: {
        td: taskTableTesting,
        actions: [
            {
                btnText: `Done`,
                action: toDone
            },
            {
                btnText: `Reopen`,
                action: toReopen
            }
        ]
    },
    3: {
        td: taskTableReopened,
        actions: [
            {
                btnText: `To Do`,
                action: toToDo
            }
        ]
    },
    4: {
        td: taskTableDone,
        actions: [
            {
                btnText: `Close`,
                action: toClose
            }
        ]
    }
}

// createTaskBtn
const createTaskBtn = (btn, task) => {
    const button = document.createElement(`button`);
    button.innerHTML = btn.btnText;
    button.addEventListener(`click`, () => btn.action(task));

    return button;
}
// createTaskBtn

// renderTask
const renderTask = task => {
    let taskBlock = document.createElement(`div`);
    taskBlock.className = `task`;
    taskBlock.dataset.id = task.id;

    taskBlock.innerHTML = `<p>Title: ${task.title}</p>
    <p>Reporter: ${task.reporter}</p>
    <p>Assignee: ${task.assignee}</p>`;

    let taskStatus = TASK_STATUS[task.status];
    
    taskStatus.actions.forEach(btn => {
        let button = createTaskBtn(btn, task);
        taskBlock.append(button);
    });

    taskStatus.td.append(taskBlock);
}
// renderTask

// renderStorageTasks
const renderStorageTasks = async () => {
    let tasks = await getList(`/tasks`);
    tasks.forEach(task => renderTask(task));
}
// renderStorageTasks

renderSelects();
renderStorageTasks();