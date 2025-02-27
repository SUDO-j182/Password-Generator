const lengthInput = document.getElementById('length'); // Get the password length input element
const checkboxes = {
    uppercase: document.getElementById('chk-uppercase'), // Get the uppercase checkbox element
    lowercase: document.getElementById('chk-lowercase'), // Get the lowercase checkbox element
    numbers: document.getElementById('chk-numbers'), // Get the numbers checkbox element
    symbols: document.getElementById('chk-symbols') // Get the symbols checkbox element
};
const generateButton = document.getElementById('generate'); // Get the generate button element
const passwordOutput = document.getElementById('password'); // Get the password output element

const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'; // Define lowercase characters
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Define uppercase characters
const numberChars = '0123456789'; // Define number characters
const symbolChars = '!@#$%&*()_-[]{}¦;:,.<>?'; // Define symbol characters

const terminalBody = document.querySelector(".terminal-body");
const cliContainer = document.createElement("div");
cliContainer.id = "cli-container";
cliContainer.innerHTML = `
    <div id="cli-output"></div>
    <div id="cli-input-line">
        <span class="cli-prefix">&gt;</span>
        <input type="text" id="cli-input" autofocus>
    </div>
`;
terminalBody.appendChild(cliContainer);

const cliOutput = document.getElementById("cli-output");
const cliInput = document.getElementById("cli-input");

cliInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const command = sanitizeInput(cliInput.value.trim());
        executeCommand(command);
        cliInput.value = "";
    }
});

// Toggle `[X]` and `[ ]` on click
Object.values(checkboxes).forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        const isChecked = checkbox.getAttribute("data-checked") === "true"; // Check if the checkbox is checked
        checkbox.setAttribute("data-checked", !isChecked); // Toggle the checked attribute
        checkbox.textContent = isChecked ? "[ ]" : "[X]"; // Toggle the checkbox text
    });
});

function generatePassword(length = parseInt(lengthInput.value)) {
    const lengthValue = length || parseInt(lengthInput.value); // Get the password length
    let charPool = ''; // Initialize the character pool

    if (checkboxes.uppercase.getAttribute("data-checked") === "true") charPool += uppercaseChars; // Add uppercase characters if checked
    if (checkboxes.lowercase.getAttribute("data-checked") === "true") charPool += lowercaseChars; // Add lowercase characters if checked
    if (checkboxes.numbers.getAttribute("data-checked") === "true") charPool += numberChars; // Add number characters if checked
    if (checkboxes.symbols.getAttribute("data-checked") === "true") charPool += symbolChars; // Add symbol characters if checked

    if (charPool === '') {
        alert('⚠ Please select at least one character type!'); // Alert if no character type is selected
        return '';
    }

    let password = ''; // Initialize the password
    for (let i = 0; i < lengthValue; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length); // Get a random index from the character pool
        password += charPool[randomIndex]; // Add the character to the password
    }

    return password; // Return the generated password
}

generateButton.addEventListener('click', () => {
    const newPassword = generatePassword(); // Generate a new password
    passwordOutput.value = newPassword; // Set the password output value
});

document.addEventListener("DOMContentLoaded", function () {
    const bootMessages = [
        "Password Generator-OS v1.0", // Boot message 1
        "Loading Mi6 Encryption...", // Boot message 2
        "Calling Devine Randomness...", // Boot message 3
        "Applying cryptographic functions...", // Boot message 4
        "Ready for input." // Boot message 5
    ];
    const bootSequenceElement = document.getElementById("boot-sequence"); // Get the boot sequence element
    const generatorContainer = document.getElementById("generator-container"); // Get the generator container element
    
    function typeBootText(index = 0) {
        if (index < bootMessages.length) {
            bootSequenceElement.innerHTML += bootMessages[index] + "<br>"; // Add the boot message to the boot sequence element
            setTimeout(() => typeBootText(index + 1), 600); // Call the function again after 600ms
        } else {
            setTimeout(() => {
                bootSequenceElement.style.display = "none"; // Hide the boot sequence element
                generatorContainer.style.display = "block"; // Show the generator container
            }, 800); // Wait 800ms before showing the generator container
        }
    }

    typeBootText(); // Start the boot sequence
});

function appendOutput(text) {
    const outputLine = document.createElement("div"); // Create a new div element for the output line
    outputLine.innerHTML = text; // Set the inner HTML of the output line
    cliOutput.appendChild(outputLine); // Append the output line to the CLI output
    cliOutput.scrollTop = cliOutput.scrollHeight; // Scroll to the bottom of the CLI output
}

function executeCommand(command) {
    if (!command) return;
    appendOutput(`> ${command}`);
    const parts = command.split(" ");
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];
    switch (cmd) {
        case "generate":
            const length = parseInt(arg);
            if (!isNaN(length) && length >= 4 && length <= 20) {
                const password = generatePassword(length);
                appendOutput(`█ Generated Password: ${password}`);
            } else {
                appendOutput("⚠ Invalid length. Use: generate <4-20>");
            }
            break;
        case "help":
            appendOutput("Available commands:");
            appendOutput("- generate <length>: Generate a password");
            appendOutput("- clear: Clear the terminal");
            appendOutput("- help: Show this message");
            break;
        case "clear":
            cliOutput.innerHTML = "";
            break;
        default:
            appendOutput("⚠ Unknown command. Type 'help' for options.");
    }
}

function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}