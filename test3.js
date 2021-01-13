/*
function openAFile(file1) {
    const fs = require('fs');
    if (!file1) throw Error('Unable to read file: ', file1)
    let fileContent = fs.readFileSync(file1, 'utf-8' );
    return console.log(fileContent);
}

openAFile(test_text.txt);
*/
const fs = require('fs');
    //if (!file1) throw Error('Unable to read file: ', file1)
    let fileContent = fs.readFileSync('test_text.txt', 'utf-8' );
    console.log(fileContent);
