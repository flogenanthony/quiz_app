const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true},
            { text: "High-level Text Management Language", correct: false},
            { text: "Hyperlink and Text Markup Language", correct: false},
            { text: "Hyper Transfer Markup Language", correct: false},
        ]
    },
    {
        question: "Which of the following is used to style the presentation of a web page?",
        answers: [
            { text: "HTML", correct: false},
            { text: "CSS", correct: true},
            { text: "JavaScript", correct: false},
            { text: "Python", correct: false},
        ]
    },
    {
        question: "What is the purpose of JavaScript in web development?",
        answers: [
            { text: "Database management", correct: false},
            { text: "Server-side scripting", correct: false},
            { text: "Adding interactivity to web pages", correct: true},
            { text: "Styling web pages", correct: false},
        ]
    },
    {
        question: "What technique is used to make web pages adapt to different screen sizes?",
        answers: [
            { text: "CSS Flexbox", correct: false},
            { text: "JavaScript", correct: false},
            { text: "Media Queries", correct: true},
            { text: "HTML5", correct: false},
        ]
    },
    {
        question: "Which of the following is a popular JavaScript framework/library for building user interfaces?",
        answers: [
            { text: "Django", correct: false},
            { text: "Angular", correct: true},
            { text: "Flask", correct: false},
            { text: "Express.js", correct: false},
        ]
    },
    {
        question: "What is the purpose of a server-side language like PHP or Node.js in web development?",
        answers: [
            { text: "Styling web pages", correct: false},
            { text: "Handling client-side interactivity", correct: false},
            { text: "Managing server resources", correct: false},
            { text: "Database interaction and server logic", correct: true},
        ]
    },
    {
        question: "Which HTTP method is used when a browser requests a web page from a server?",
        answers: [
            { text: "GET", correct: true},
            { text: "POST", correct: false},
            { text: "PUT", correct: false},
            { text: "DELETE", correct: false},
        ]
    },
    {
        question: "What is the purpose of Git in web development?",
        answers: [
            { text: "Styling web pages", correct: false},
            { text: "Version control and collaboration", correct: true},
            { text: "Server-side scripting", correct: false},
            { text: "Database management", correct: false},
        ]
    },
    {
        question: "Which of the following helps prevent Cross-Site Scripting (XSS) attacks in web applications?",
        answers: [
            { text: "HTTPS", correct: false},
            { text: "SQL Injection", correct: false},
            { text: "Content Security Policy (CSP)", correct: true},
            { text: " OAuth", correct: false},
        ]
    },
    {
        question: "Which of the following is not a commonly used web browser?",
        answers: [
            { text: "Google Chrome", correct: false},
            { text: "Firefox", correct: false},
            { text: "Safari", correct: false},
            { text: "Python Browser", correct: true},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();