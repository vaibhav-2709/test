const express = require('express');
const EventEmitter = require('events');

const app = express();
const port = 3000;

const mathEmitter = new EventEmitter();

app.use(express.static('public'));
app.use(express.json());

mathEmitter.on('calculate', (operation, num1, num2, res) => {
    console.log(`Operation: ${operation}, Numbers: ${num1}, ${num2}, Result: ${res}`);
});

app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    switch (operation) {
        case 'add': result = num1 + num2; break;
        case 'subtract': result = num1 - num2; break;
        case 'multiply': result = num1 * num2; break;
        case 'divide': 
            result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
            break;
        default: result = 'Invalid operation';
    }

    mathEmitter.emit('calculate', operation, num1, num2, result);
    
    res.json({ result });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
