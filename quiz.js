/* =========================================================
   QUIZ MASTER - QUIZ JAVASCRIPT
   ========================================================= */


/* =========================================================
   1. QUIZ DATA
   ========================================================= */

const questions = [

    {
        question: "Which of the following is used to define a function in Python?",
        options: [
            "function",
            "def",
            "define",
            "func"
        ],
        correctAnswer: 1
    },

    {
        question: "Which symbol is used for comments in Python?",
        options: [
            "//",
            "/* */",
            "#",
            "<!-- -->"
        ],
        correctAnswer: 2
    },

    {
        question: "Which of the following is a valid Python variable name?",
        options: [
            "2name",
            "my-name",
            "my_name",
            "class"
        ],
        correctAnswer: 2
    },

    {
        question: "Which data type is used to store True or False?",
        options: [
            "String",
            "Boolean",
            "Integer",
            "Float"
        ],
        correctAnswer: 1
    },

    {
        question: "Which function is used to display output in Python?",
        options: [
            "display()",
            "echo()",
            "print()",
            "show()"
        ],
        correctAnswer: 2
    },

    {
        question: "Which operator is used for exponentiation in Python?",
        options: [
            "^",
            "**",
            "//",
            "%%"
        ],
        correctAnswer: 1
    },

    {
        question: "Which of the following is an immutable data type?",
        options: [
            "List",
            "Dictionary",
            "Set",
            "Tuple"
        ],
        correctAnswer: 3
    },

    {
        question: "Which keyword is used to create a class in Python?",
        options: [
            "class",
            "Class",
            "object",
            "define"
        ],
        correctAnswer: 0
    },

    {
        question: "Which method adds an item to the end of a list?",
        options: [
            "add()",
            "append()",
            "insertEnd()",
            "push()"
        ],
        correctAnswer: 1
    },

    {
        question: "Which keyword is used to create a loop over a sequence?",
        options: [
            "repeat",
            "loop",
            "for",
            "iterate"
        ],
        correctAnswer: 2
    },

    {
        question: "What is the output type of input() in Python?",
        options: [
            "Integer",
            "String",
            "Float",
            "Boolean"
        ],
        correctAnswer: 1
    },

    {
        question: "Which keyword is used when a condition is not satisfied?",
        options: [
            "else",
            "otherwise",
            "except",
            "none"
        ],
        correctAnswer: 0
    },

    {
        question: "Which function returns the length of a list?",
        options: [
            "length()",
            "size()",
            "len()",
            "count()"
        ],
        correctAnswer: 2
    },

    {
        question: "Which of the following represents a list in Python?",
        options: [
            "(1, 2, 3)",
            "{1, 2, 3}",
            "[1, 2, 3]",
            "<1, 2, 3>"
        ],
        correctAnswer: 2
    },

    {
        question: "Which keyword is used to return a value from a function?",
        options: [
            "send",
            "return",
            "output",
            "value"
        ],
        correctAnswer: 1
    },

    {
        question: "Which statement is used to handle exceptions?",
        options: [
            "try-except",
            "check-error",
            "error-handle",
            "catch-error"
        ],
        correctAnswer: 0
    },

    {
        question: "Which operator checks equality in Python?",
        options: [
            "=",
            "==",
            "===",
            "!="
        ],
        correctAnswer: 1
    },

    {
        question: "Which keyword is used to stop a loop?",
        options: [
            "stop",
            "exit",
            "break",
            "end"
        ],
        correctAnswer: 2
    },

    {
        question: "Which keyword skips the current iteration of a loop?",
        options: [
            "skip",
            "continue",
            "next",
            "pass"
        ],
        correctAnswer: 1
    },

    {
        question: "Which function converts a value into an integer?",
        options: [
            "integer()",
            "number()",
            "int()",
            "convert()"
        ],
        correctAnswer: 2
    }

];


/* =========================================================
   2. QUIZ VARIABLES
   ========================================================= */

let currentQuestion = 0;

let userAnswers = new Array(questions.length).fill(null);

let timeLeft = 30 * 60;

let timerInterval;


/* =========================================================
   3. GET HTML ELEMENTS
   ========================================================= */

const timerElement = document.getElementById("timer");

const nextButton = document.querySelector(".next-button");

const previousButton = document.querySelector(".previous-button");

const submitButton = document.querySelector(".submit-quiz-button");

const questionNumbers = document.querySelectorAll(
    ".question-number-button"
);


/* =========================================================
   4. START QUIZ
   ========================================================= */

function startQuiz() {

    displayQuestion();

    startTimer();

}


/* =========================================================
   5. DISPLAY QUESTION
   ========================================================= */

function displayQuestion() {

    const question = questions[currentQuestion];


    /* Find question heading */

    const questionHeading =
        document.querySelector(".question-card h2");


    questionHeading.textContent =
        question.question;


    /* Update question number */

    const questionNumber =
        document.querySelector(".question-number");


    questionNumber.innerHTML =
        `Question ${currentQuestion + 1}
        <span>2 Marks</span>`;


    /* Get options container */

    const optionsContainer =
        document.querySelector(".options");


    optionsContainer.innerHTML = "";


    /* Create options */

    question.options.forEach(
        (optionText, index) => {


            const label =
                document.createElement("label");


            label.className = "option";


            const radio =
                document.createElement("input");


            radio.type = "radio";

            radio.name = "question";

            radio.value = index;


            /* Restore previous answer */

            if (
                userAnswers[currentQuestion] === index
            ) {

                radio.checked = true;

            }


            /* Save answer */

            radio.addEventListener(
                "change",
                function () {

                    userAnswers[currentQuestion] =
                        parseInt(this.value);

                    updateQuestionStatus();

                    updateSummary();

                }
            );


            const letter =
                document.createElement("span");


            letter.className =
                "option-letter";


            letter.textContent =
                String.fromCharCode(65 + index);


            const text =
                document.createElement("span");


            text.className =
                "option-text";


            text.textContent =
                optionText;


            label.appendChild(radio);

            label.appendChild(letter);

            label.appendChild(text);


            optionsContainer.appendChild(label);

        }
    );


    updateProgress();

    updateNavigationButtons();

    updateQuestionStatus();

}


/* =========================================================
   6. UPDATE PROGRESS
   ========================================================= */

function updateProgress() {

    const progress =
        ((currentQuestion + 1) /
        questions.length) * 100;


    const progressBar =
        document.querySelector(
            ".quiz-progress-bar"
        );


    progressBar.style.width =
        progress + "%";


    const progressText =
        document.querySelector(
            ".quiz-progress-header strong"
        );


    progressText.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

}


/* =========================================================
   7. NEXT BUTTON
   ========================================================= */

nextButton.addEventListener(
    "click",
    function () {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            displayQuestion();

        }

    }
);


/* =========================================================
   8. PREVIOUS BUTTON
   ========================================================= */

previousButton.addEventListener(
    "click",
    function () {

        if (currentQuestion > 0) {

            currentQuestion--;

            displayQuestion();

        }

    }
);


/* =========================================================
   9. UPDATE NAVIGATION BUTTONS
   ========================================================= */

function updateNavigationButtons() {

    if (currentQuestion === 0) {

        previousButton.disabled = true;

    } else {

        previousButton.disabled = false;

    }


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Finish →";

    } else {

        nextButton.textContent =
            "Next →";

    }

}


/* =========================================================
   10. QUESTION NUMBER NAVIGATION
   ========================================================= */

questionNumbers.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            function () {

                currentQuestion = index;

                displayQuestion();

            }
        );

    }
);


/* =========================================================
   11. UPDATE QUESTION STATUS
   ========================================================= */

function updateQuestionStatus() {

    questionNumbers.forEach(
        (button, index) => {

            button.classList.remove(
                "active"
            );

            button.classList.remove(
                "answered"
            );


            if (
                userAnswers[index] !== null
            ) {

                button.classList.add(
                    "answered"
                );

            }

        }
    );


    questionNumbers[
        currentQuestion
    ].classList.add("active");

}


/* =========================================================
   12. UPDATE SUMMARY
   ========================================================= */

function updateSummary() {

    let answeredCount = 0;


    userAnswers.forEach(
        answer => {

            if (answer !== null) {

                answeredCount++;

            }

        }
    );


    const unansweredCount =
        questions.length -
        answeredCount;


    const summaryRows =
        document.querySelectorAll(
            ".summary-row strong"
        );


    if (summaryRows.length >= 3) {

        summaryRows[1].textContent =
            answeredCount;

        summaryRows[2].textContent =
            unansweredCount;

    }

}


/* =========================================================
   13. TIMER
   ========================================================= */

function startTimer() {

    timerInterval =
        setInterval(
            function () {

                timeLeft--;


                updateTimerDisplay();


                if (timeLeft <= 0) {

                    clearInterval(
                        timerInterval
                    );


                    alert(
                        "Time is over! Your quiz will be submitted automatically."
                    );


                    submitQuiz();

                }

            },
            1000
        );

}


/* =========================================================
   14. UPDATE TIMER DISPLAY
   ========================================================= */

function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timeLeft / 60
        );


    const seconds =
        timeLeft % 60;


    const formattedMinutes =
        minutes
            .toString()
            .padStart(2, "0");


    const formattedSeconds =
        seconds
            .toString()
            .padStart(2, "0");


    timerElement.textContent =
        `${formattedMinutes}:${formattedSeconds}`;


    /* Change timer appearance */

    if (timeLeft <= 5 * 60) {

        timerElement.style.color =
            "#dc2626";

    }

}


/* =========================================================
   15. SUBMIT QUIZ
   ========================================================= */

submitButton.addEventListener(
    "click",
    function () {

        const confirmSubmit =
            confirm(
                "Are you sure you want to submit the quiz?"
            );


        if (confirmSubmit) {

            submitQuiz();

        }

    }
);


/* =========================================================
   16. CALCULATE RESULT
   ========================================================= */

function submitQuiz() {

    clearInterval(
        timerInterval
    );


    let correct = 0;

    let wrong = 0;

    let unanswered = 0;


    userAnswers.forEach(
        (answer, index) => {

            if (answer === null) {

                unanswered++;

            } else if (
                answer ===
                questions[index].correctAnswer
            ) {

                correct++;

            } else {

                wrong++;

            }

        }
    );


    /* Mark calculation */

    const positiveMarks =
        correct * 2;


    const negativeMarks =
        wrong * 0.5;


    const finalScore =
        positiveMarks -
        negativeMarks;


    /* Store result */

    localStorage.setItem(
        "quizCorrect",
        correct
    );


    localStorage.setItem(
        "quizWrong",
        wrong
    );


    localStorage.setItem(
        "quizUnanswered",
        unanswered
    );


    localStorage.setItem(
        "quizScore",
        finalScore
    );


    localStorage.setItem(
        "quizTotalMarks",
        40
    );


    /* Move to result page */

    window.location.href =
        "quiz_result.html";

}


/* =========================================================
   17. INITIALIZE QUIZ
   ========================================================= */

startQuiz();