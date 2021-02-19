fetch('http://localhost:3000/api/questions', {
    method: 'POST',
    body: JSON.stringify({
        "question": "Melyik a kis-duna partszakaszának legszebb városa",
        "answers": [
            {
                "answer": "Szigetszentmiklós",
                "is_correct": false
            },
            {
                "answer": "Ráckeve",
                "is_correct": true
            },
            {
                "answer": "Dunaharaszti",
                "is_correct": false
            },
            {
                "answer": "Dömsöd",
                "is_correct": false
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