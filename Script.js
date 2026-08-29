const display = document.getElementById("display");
let memoryValue = 0;
 
// Add value to display
function appendValue(value) {
  display.value += value;
}
 
// Clear everything
function clearDisplay() {
  display.value = "";
}
 
// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}
 
// Percentage
function percentage() {
  if (display.value === "") return;
  try {
    const expression = display.value;
    const match = expression.match(/(\d+\.?\d*)$/);
    if (!match) return;
    const number = parseFloat(match[0]);
    const result = number / 100;
    display.value = expression.slice(0, match.index) + result;
  } catch {
    display.value = "Error";
  }
}
 
// Round away floating point noise (e.g. 0.1 + 0.2)
function cleanNumber(num) {
  if (typeof num !== "number" || !isFinite(num)) return num;
  return Math.round(num * 1e10) / 1e10;
}
 
// Calculate result
function calculate() {
  if (display.value === "") return;
  try {
    let result = eval(display.value);
    result = cleanNumber(result);
    addHistory(display.value, result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}
 
// Memory functions
function memoryClear() { memoryValue = 0; }
function memoryRecall() { appendValue(memoryValue.toString()); }
function memoryAdd() { memoryValue += Number(display.value) || 0; }
function memorySubtract() { memoryValue -= Number(display.value) || 0; }
 
// History
function addHistory(expr, res) {
  const history = document.getElementById("history");
  const item = document.createElement("div");
  item.textContent = `${expr} = ${res}`;
  history.prepend(item);
}
 
// Keyboard support
document.addEventListener("keydown", function(event) {
  const key = event.key;
  if (!isNaN(key) || ["+", "-", "*", "/", ".", "(", ")"].includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Escape") {
    clearDisplay();
  } else if (key === "%") {
    percentage();
  }
});
 
// Dark mode toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
 
