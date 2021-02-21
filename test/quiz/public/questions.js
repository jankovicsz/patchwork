const endPoint = 'http://localhost:3000/api/questions';

const questionForm = document.getElementById('new-question-form');

questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    return addQuestion();
})

function addQuestion() {
    const question = document.querySelector('#new-question').value;
    const answer1 = document.querySelector('#answer1').value;
    const radio1 = document.querySelector('#answerRadio1');
    const answer2 = document.querySelector('#answer2').value;
    const radio2 = document.querySelector('#answerRadio2');
    const answer3 = document.querySelector('#answer3').value;
    const radio3 = document.querySelector('#answerRadio3');
    const answer4 = document.querySelector('#answer4').value;
    const radio4 = document.querySelector('#answerRadio4');
    fetch(endPoint, {
        method: 'POST',
        body: JSON.stringify({
            "question": question,
            "answers": [
                {
                    "answer": answer1,
                    "is_correct": radio1.checked
                },
                {
                    "answer": answer2,
                    "is_correct": radio2.checked
                },
                {
                    "answer": answer3,
                    "is_correct": radio3.checked
                },
                {
                    "answer": answer4,
                    "is_correct": radio4.checked
                }
            ]
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((err) => console.error(err))
    onloadQuestion();
    questionForm.reset();
}

onloadQuestion();

function onloadQuestion() {
    fetch(endPoint)
        .then((response) => response.json())
        .then((data) => {
            const questionList = document.querySelector('.all-questions');
            questionList.innerHTML = '';
            data.forEach(element => {
                const question = document.createElement('div');
                question.textContent = element.question;
                const button = document.createElement('button');
                button.textContent = 'törlés'
                button.dataset.id = element.id;
                const hr = document.createElement('hr');
                questionList.appendChild(question);
                questionList.appendChild(button);
                questionList.appendChild(hr);
            });
        })
        .catch((error) => console.error(error));
}


document.querySelector('.all-questions').addEventListener('click', (e) => {
    const selectedDiv = e.target;
    const idToDelete = selectedDiv.getAttribute('data-id');
    const url = endPoint + '/' + idToDelete;
    fetch(url, {
        method: 'DELETE'
    }).then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    setTimeout(onloadQuestion, 500);
})

/* const example = document.querySelector('.example');
example.dataset.test = 'Hahóóó';
example.textContent = 'Valami';

let result = Boolean(example.dataset.test);
console.log(example.getAttribute('data-test') === 'Hahóó'); // false
console.log(example.getAttribute('data-test') === 'Hahóóó'); // true */
