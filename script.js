document.getElementById("user-input").addEventListener("input", function() {
    const userInput = this.value;
  
    // Check if the input contains Hebrew characters
    const hasHebrew = /[א-ת]/.test(userInput);
  
    // Apply the appropriate class based on the language detected
    const outputElement = document.getElementById("output");
    outputElement.textContent = userInput;
  
    if (hasHebrew) {
      outputElement.classList.add("hebrew");
    } else {
      outputElement.classList.remove("hebrew");
    }
  });
  