function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('light-mode');
    
    // Toggle button text based on current mode
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (body.classList.contains('light-mode')) {
      darkModeToggle.textContent = 'Switch to Dark Mode';
    } else {
      darkModeToggle.textContent = 'Switch to Light Mode';
    }
  }
  
  
  var input = document.getElementById('input'),
    number = document.querySelectorAll('.number'),
    operator = document.querySelectorAll('.operator'),
    result = document.getElementById('result'),
    clear = document.querySelector('.clear'),
    resultDisplayed = false;
  
  number.forEach(function(num) {
    num.addEventListener("click", function(e) {
      var currentString = input.innerHTML;
      var lastChar = currentString[currentString.length - 1];
      
      if (resultDisplayed === false) {
        input.innerHTML += e.target.innerHTML;
      } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        resultDisplayed = false;
        input.innerHTML += e.target.innerHTML;
      } else {
        resultDisplayed = false;
        input.innerHTML = "";
        input.innerHTML += e.target.innerHTML;
      }
    });
  });
  
  operator.forEach(function(op) {
    op.addEventListener("click", function(e) {
      var currentString = input.innerHTML;
      var lastChar = currentString[currentString.length - 1];
      
      if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
        var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
        input.innerHTML = newString;
      } else if (currentString.length == 0) {
        console.log("enter a number first");
      } else {
        input.innerHTML += e.target.innerHTML;
      }
    });
  });
  
  result.addEventListener("click", function() {
    var inputString = input.innerHTML;
    var numbers = inputString.split(/\+|\-|\×|\÷/g);
    var operators = inputString.replace(/[0-9]|\./g, "").split("");
  
    var divide = operators.indexOf("÷");
    while (divide != -1) {
      numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
      operators.splice(divide, 1);
      divide = operators.indexOf("÷");
    }
  
    var multiply = operators.indexOf("×");
    while (multiply != -1) {
      numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
      operators.splice(multiply, 1);
      multiply = operators.indexOf("×");
    }
  
    var subtract = operators.indexOf("-");
    while (subtract != -1) {
      numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
      operators.splice(subtract, 1);
      subtract = operators.indexOf("-");
    }
  
    var add = operators.indexOf("+");
    while (add != -1) {
      numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
      operators.splice(add, 1);
      add = operators.indexOf("+");
    }
  
    input.innerHTML = numbers[0];
    resultDisplayed = true;
  });
  
  clear.addEventListener("click", function() {
    input.innerHTML = "";
  });
  