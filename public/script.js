function calculate() {
    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operation").value;

    fetch('/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ num1, num2, operation })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").textContent = data.result;
    })
    .catch(error => console.error("Error:", error));
}
