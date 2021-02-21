let points = 0;
const actualPoints = document.querySelector('.score span');
actualPoints.textContent = 0;

onloadGame();

function onloadGame() {
    fetch('http://localhost:3000/api/game')
    .then(response => response.json())
    .then(data => {
        const question = document.querySelector('.question');
        question.textContent = data.question;
        for (let i = 0; i < data.answers.length; i++) {
            const answer = document.querySelector(`.btn-game:nth-of-type(${i + 1})`);
            answer.textContent = data.answers[i].answer;
            answer.dataset.status = 'base';
            answer.classList.remove('btn-win'); // 
            answer.classList.remove('btn-lose'); //
            if (data.answers[i].is_correct) {
                answer.dataset.status = 'win';
            }
        }
    })
    .catch((error) => {
        console.error(error);
    })
}

document.querySelector('.buttons').addEventListener('click', (e) => {
    const selectedDiv = e.target;
    if (selectedDiv.getAttribute('data-status') === 'win') {
        points++;
        actualPoints.textContent = points;
    } else {
        selectedDiv.classList.add('btn-lose');
    }
    // const winDiv = document.getElementById('win');
    const winDiv = document.querySelector("[data-status='win']")
    winDiv.classList.add('btn-win');
    setTimeout(onloadGame,2000);
})