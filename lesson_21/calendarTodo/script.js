// 🥵👨🏻‍💻🥳

const ROOMS = [
    {
        title: `Orange`,
        days: [`Monday`, `Wednesday`, `Friday`],
        hours: {
            start: 9,
            end: 15
        }
    },
    {
        title: `Red`,
        days: [`Wednesday`, `Thursday`, `Friday`],
        hours: {
            start: 12,
            end: 19
        }
    },
    {
        title: `Green`,
        days: [`Monday`, `Tuesday`, `Wednesday`],
        hours: {
            start: 10,
            end: 18
        }
    }
];

const PARTICIPANTS = [`Jack`, `Taras`, `Volodymyr`, `Olena`];

const meetingForm = document.querySelector(`#meetingForm`);
const meetingFormTitle = document.querySelector(`#meetingFormTitle`);
const meetingFormRoom = document.querySelector(`#meetingFormRoom`);
const meetingFormDay = document.querySelector(`#meetingFormDay`);
const meetingFormHour = document.querySelector(`#meetingFormHour`);
const meetingFormParticipants = document.querySelector(`#meetingFormParticipants`);

const roomsTables = document.querySelector(`#roomsTables`);

const renderFormRoom = () => {
    meetingFormRoom.innerHTML = ROOMS
        .map(item => item.title)
        .map(item => `<option value="${item}">${item}</option>`)
        .join('');
}


const getDayByRoom = (room) => {
    const currentRoom = ROOMS
        .find(item => item.title === room);
    return currentRoom.days;

}

const renderFormDay = (room) => {
    meetingFormDay.innerHTML = getDayByRoom(room)
        .map(item => `<option value="${item}">${item}</option>`)
        .join('');
}


const getHoursByRoom = room => {
    const currentRoom = ROOMS.find(item => item.title === room);
    let start = currentRoom.hours.start;
    const end = currentRoom.hours.end;
    const hours = [];
    for (; start <= end; start++) {
        hours.push(start);
    }
    return hours;

}
const renderFormHour = (room) => {
    meetingFormHour.innerHTML = getHoursByRoom(room)
        .map(item => `<option value="${item}">${item}:00</option>`)
        .join('');
}

const renderFormParticipants = () => {
    meetingFormParticipants.innerHTML = PARTICIPANTS
        .map(item => `<option value="${item}">${item}</option>`)
        .join('');
}
renderFormRoom();
renderFormDay(meetingFormRoom.value);
renderFormHour(meetingFormRoom.value);
renderFormParticipants();

meetingFormRoom.addEventListener('change', (e) => {
    renderFormDay(e.target.value);
    renderFormHour(e.target.value);
})

meetingFormRoom.addEventListener('submit', e => {
    e.preventDefault();

    //псевдо масив вибраних options, розгортаємо ...(spred) цей псевдомасив, щоб використати методи масивів
    let participants = [...meetingFormParticipants.selectedOptions]
        .map(item => item.value);
    if (!participants.length) {
        console.log(`🥵 Select at least one participant!`);
        return;
    }

    let newMeet = {
        title: meetingFormTitle.value,
        room: meetingFormRoom.value,
        day: meetingFormDay.value,
        hour: meetingFormHour.value,
        participants: participants,
    }

    let storageMeetings = localStorage.getItem('meetings');
    let meetingExist = storageMeetings.find(meeting => {
        return meeting.day === newMeet.day
            && meeting.hour === newMeet.hour
            && meeting.room === newMeet.room
    });
     if (meetingExist){
         console.log(`🥵 Meeting on ${newMeet.day} at ${newMeet.hour} on ${newMeet.room} already exist!`);
         return;
     }

    const meetingsDayHour = storageMeetings
        .filter(meet => meet.day === newMeet.day && meet.hour === newMeet.hour);


    let busyParticipants = [];
    newMeet.participants
        .forEach(participant => {
            meetingsDayHour.forEach(meet =>{
                let currentParticipantBusy = meet.participants.find(user => user===participant);
                if(currentParticipantBusy){
                    busyParticipants.push(participant)
                }
            })
        })
    if (busyParticipants.length) {
        busyParticipants.forEach(item => console.log(`👨🏻‍💻 ${item} already busy on ${newMeeting.day} at ${newMeeting.hour}!`));
        return;
    }

    storageMeetings = storageMeetings ? JSON.parse(storageMeetings) : [];
    storageMeetings.push(newMeet);
    localStorage.setItem(`meetings`, JSON.stringify(storageMeetings))
    console.log(`🥳 Meeting on ${newMeet.day} at ${newMeet.hour} on ${newMeet.room} successfully created!`)

})

