let users = [
    {
        name: "Jack Smith",
        age: 23,
        img: "JackSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 20
            },
            {
                "title": "Java Enterprise",
                "mark": 100
            }
        ]
    },
    {
        name: "Amal Smith",
        age: 20,
        img: "AmalSmith",
        role: "student"
    },
    {
        name: "Noah Smith",
        age: 43,
        img: "NoahSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 50
            }
        ]
    },
    {
        name: "Charlie Smith",
        age: 18,
        img: "CharlieSmith",
        role: "student",
        courses: [
            {
                "title": "Front-end Pro",
                "mark": 75
            },
            {
                "title": "Java Enterprise",
                "mark": 23
            }]
    },
    {
        name: "Emily Smith",
        age: 30,
        img: "EmilySmith",
        role: "admin",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 10,
                "lector": "Leo Smith"
            },
            {
                "title": "Java Enterprise",
                "score": 50,
                "lector": "David Smith"
            },
            {
                "title": "QA",
                "score": 75,
                "lector": "Emilie Smith"
            }]
    },
    {
        name: "Leo Smith",
        age: 253,
        img: "LeoSmith",
        role: "lector",
        courses: [
            {
                "title": "Front-end Pro",
                "score": 78,
                "studentsScore": 79
            },
            {
                "title": "Java Enterprise",
                "score": 85,
                "studentsScore": 85
            }
        ]
    }
];

class User {
    constructor(obj) {
        this.name = obj.name;
        this.age = obj.age;
        this.img = obj.img;
        this.role = obj.role;
        this.courses = obj.courses;
        // Object.assign(this, obj);
    }

    render() {
        const photo = `<img src="./images/users/${this.img}.png" alt="${this.name}" height="50">`;
        const userNaming = `<div class="user__naming">
            <p>Name: <b>${this.name}</b></p>
            <p>Age: <b>${this.age}</b></p></div>`;
        const userInfoRole = `<div class="user__info--role student">
        <img src="images/roles/${this.role}.png" alt="${this.role}" height="25">
            <p>${this.role}</p>
        </div>`;
        return `<div class="user__info"><div class="user__info--data">${photo + userNaming}</div>${userInfoRole}</div>`;
    }

    scoreGradation(obj, gradationKey) {
        if (!obj || !gradationKey) {
            return new Error('Obj and gradationKey are required fields');
            // throw 'Obj and gradationKey are required fields';
        }
        const gradation = {
            20: "satisfactory",
            55: "good",
            85: "very-good",
            100: "excellent"
        }

        let valueGradation = ``;
        for (const [key, value] of Object.entries(gradation)) {
            if (obj[gradationKey] <= key) {
                valueGradation = value;
                break;
            }
        }
        return valueGradation;
    }

    renderCourses(callBack, additionalClass = '') {
        if (!this.courses?.length) {
            return ``;
        }

        const userCourses = this.courses.reduce(callBack, ``)
        return `<div class="user__courses ${additionalClass}">${userCourses}</div>`;
    }
}

class Student extends User {
    constructor(obj) {
        super(obj);
    }

    renderCourses() {
        return super.renderCourses((result, current) => {
            const currentGradation = this.scoreGradation(current, 'mark');
            return result + `<p class="user__courses--course ${this.role}">${current.title}
                    <span class="${currentGradation}">${currentGradation}</span>
                 </p>`;
        })
    }
}

class Lector extends User {
    constructor(obj) {
        super(obj);
    }

    renderCourses() {
        return super.renderCourses((result, current) => {
            const currentGradationScore = this.scoreGradation(current, 'score');
            const currentGradationStudentsScore = this.scoreGradation(current, 'studentsScore');
            return result + `<div class="user__courses--course ${this.role}">
                <p>Title: <b>${current.title}</b></p>
                <p>Lector's score: <span class="${currentGradationScore}">${currentGradationScore}</span></p>
                <p>Average student's score: <span class="${currentGradationStudentsScore}">${currentGradationStudentsScore}</span></p>
            </div>`;
        }, `admin--info`);
    }
}

class Admin extends User {
    constructor(obj) {
        super(obj);
    }

    renderCourses() {
        return super.renderCourses((result, current) => {
            const currentGradation = this.scoreGradation(current, 'score');
            return result + `<div class="user__courses--course ${this.role}">
                <p>Title: <b>${current.title}</b></p>
                <p>Admin's score: <span class="${currentGradation}">${currentGradation}</span></p>
                <p>Lector: <b>${this.name}</b></p>
            </div>`;
        }, `admin--info`);
    }
}

const USER_ROLE = {
    student: objUser => new Student(objUser),
    lector: objUser => new Lector(objUser),
    admin: objUser => new Admin(objUser),
}

users = users.map(objUser => USER_ROLE[objUser.role]
    ? USER_ROLE[objUser.role](objUser)
    : new User(objUser)
);

const userTemplateList = users.map(el => (`<div class="user">${el.render() + el.renderCourses()}</div>`));
document.write(`<div class="users">${userTemplateList.join('')}</div>`);