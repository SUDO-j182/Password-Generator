// Get the password length input element
const lengthInput = document.getElementById('length');

// Get the checkbox elements
const checkboxes = {
    uppercase: document.getElementById('chk-uppercase'), // Get the uppercase checkbox element
    lowercase: document.getElementById('chk-lowercase'), // Get the lowercase checkbox element
    numbers: document.getElementById('chk-numbers'), // Get the numbers checkbox element
    symbols: document.getElementById('chk-symbols') // Get the symbols checkbox element
};

// Get the generate button element
const generateButton = document.getElementById('generate');

// Get the password output element
const passwordOutput = document.getElementById('password');

// Get the copy password button element
const copyButton = document.getElementById('copy-password');

// Get the copy message element
const copyMessage = document.getElementById('copy-message');

// Define character sets
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'; // Define lowercase characters
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Define uppercase characters
const numberChars = '0123456789'; // Define number characters
const symbolChars = '!@#$%&*()_-[]{}¦;:,.<>?'; // Define symbol characters

// Get the terminal body element
const terminalBody = document.querySelector(".terminal-body");

// Create the CLI container
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

// Get the CLI output and input elements
const cliOutput = document.getElementById("cli-output");
const cliInput = document.getElementById("cli-input");

// Add event listener for CLI input
cliInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const command = sanitizeInput(cliInput.value.trim());
        executeCommand(command);
        cliInput.value = "";
    }
});

// Function to animate password reveal
function animatePasswordReveal(password, outputElement) {
    outputElement.value = "";
    let index = 0;
    let cursor = "█";
    function typeNextChar() {
        if (index < password.length) {
            outputElement.value = password.substring(0, index + 1) + cursor;
            index++;
            setTimeout(typeNextChar, 50);
        } else {
            outputElement.value = password;
        }
    }
    typeNextChar();
}

// Toggle `[X]` and `[ ]` on click
Object.values(checkboxes).forEach(checkbox => {
    checkbox.addEventListener("click", () => {
        const isChecked = checkbox.getAttribute("data-checked") === "true"; // Check if the checkbox is checked
        checkbox.setAttribute("data-checked", !isChecked); // Toggle the checked attribute
        checkbox.textContent = isChecked ? "[ ]" : "[X]"; // Toggle the checkbox text
    });
});

// Function to generate password
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
    animatePasswordReveal(password, passwordOutput);
    return password; // Return the generated password
}

// Add event listener for generate button
generateButton.addEventListener('click', () => {
    const newPassword = generatePassword(); // Generate a new password
    passwordOutput.value = newPassword; // Set the password output value
    animatePasswordReveal(newPassword, passwordOutput);
    document.getElementById("strength-indicator").textContent = "Strength: " + calculateStrength(newPassword);
});

// Add event listener for copy button
copyButton.addEventListener('click', () => {
    passwordOutput.select(); // Select the password output text
    document.execCommand('copy'); // Copy the selected text to the clipboard
    copyMessage.classList.add('show'); // Show the copy message
    setTimeout(() => {
        copyMessage.classList.remove('show'); // Hide the copy message after 2 seconds
    }, 2000);
});

// Add event listener for DOMContentLoaded
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
                bootBattleTerminal(); // Boot the battle terminal after the generator
            }, 800); // Wait 800ms before showing the generator container
        }
    }

    typeBootText(); // Start the boot sequence
});

// Function to boot the battle terminal
function bootBattleTerminal() {
    const battleTerminal = document.createElement("div");
    battleTerminal.id = "battle-terminal";
    battleTerminal.classList.add("terminal-frame");
    battleTerminal.innerHTML = `
        <div id="attack-bar" class="ascii-effect"></div>
        <div id="countermeasures-animation" class="ascii-effect"></div>
        <div id="firewall-effect" class="ascii-effect"></div>
        <div id="alert-symbols" class="ascii-effect"></div>
    `;
    document.body.appendChild(battleTerminal);

    // Make the battle terminal draggable
    battleTerminal.addEventListener('mousedown', function(e) {
        let shiftX = e.clientX - battleTerminal.getBoundingClientRect().left;
        let shiftY = e.clientY - battleTerminal.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            battleTerminal.style.left = pageX - shiftX + 'px';
            battleTerminal.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        battleTerminal.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', onMouseMove);
            battleTerminal.onmouseup = null;
        });

        battleTerminal.ondragstart = function() {
            return false;
        };
    });

    // ASCII graphical effects for the security battle simulation
    function updateAttackBar() {
        const progress = Math.floor(Math.random() * 10) + 1;
        document.getElementById("attack-bar").textContent = `[${'▓'.repeat(progress)}${'░'.repeat(10 - progress)}]`;
    }

    function updateCountermeasuresAnimation() {
        document.getElementById("countermeasures-animation").textContent = `~~~~~~~~`;
    }

    function updateFirewallEffect() {
        document.getElementById("firewall-effect").textContent = `█████`;
    }

    function updateAlertSymbols() {
        const alertSymbols = document.getElementById("alert-symbols");
        alertSymbols.textContent = `⚠⚠⚠ WARNING! ⚠⚠⚠`;
        setTimeout(() => {
            alertSymbols.textContent = '';
        }, 500);
    }

    setInterval(updateAttackBar, 1000);
    setInterval(updateCountermeasuresAnimation, 1000);
    setInterval(updateFirewallEffect, 1000);
    setInterval(updateAlertSymbols, 2000);
}

// Add event listener for DOMContentLoaded to create preset buttons
document.addEventListener("DOMContentLoaded", function() {
    const presetLengths = [8, 12, 16, 32];
    const presetContainer = document.createElement("div");
    presetContainer.id = "preset-buttons";
    presetContainer.innerHTML = "<p>Quick Lengths:</p>";

    presetLengths.forEach(length => {
        const button = document.createElement("button");
        button.classList.add("preset-btn");
        button.textContent = length;
        button.addEventListener("click", () => {
            lengthInput.value = length;
            generateButton.click();
        });
        presetContainer.appendChild(button);
    });
    document.querySelector(".password-controls").appendChild(presetContainer);
});

// Add event listener for DOMContentLoaded to create copy message
document.addEventListener("DOMContentLoaded", function () {
    const copyMessage = document.createElement("div");
    copyMessage.id = "copy-message";
    copyMessage.textContent = "Copied!";
    document.querySelector(".password-output").appendChild(copyMessage);
});

// Add event listener for DOMContentLoaded to create info section
document.addEventListener("DOMContentLoaded", function () {
    const infoContainer = document.createElement("div");
    infoContainer.id = "info-section";
    infoContainer.innerHTML =  `
    <div class="terminal-frame">
        <p class="terminal-text">🔐 <strong>Why Strong Passwords Matter</strong></p>
        <p>Using weak passwords makes accounts vulnerable to attacks. A strong password:
        <ul>
            <li>Is at least 12-16 characters long</li>
            <li>Contains uppercase & lowercase letters</li>
            <li>Includes numbers & special symbols</li>
            <li>Avoids common words & phrases</li>
        </ul>
        </p>
        <p class="terminal-text">🛡 <strong>Password Best Practices</strong></p>
        <ul>
            <li>Use a unique password for each account</li>
            <li>Enable two-factor authentication (2FA)</li>
            <li>Never share passwords</li>
            <li>Use a password manager to store credentials securely</li>
        </ul>
        <p class="terminal-text">💻 <strong>How to Use the Generator</strong></p>
        <ul>
            <li>Use the buttons or CLI to generate a password</li>
            <li>Check the strength indicator to ensure security</li>
            <li>Click the copy button (or press CTRL + C) to save your password</li>
        </ul>
    </div>
`;
    document.body.appendChild(infoContainer);
});

// Add event listener for password output click to copy password
passwordOutput.addEventListener("click", function () {
    if (passwordOutput.value) {
        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            const copyMessage = document.getElementById("copy-message");
            copyMessage.classList.add('show');
            setTimeout(() => copyMessage.classList.remove('show'), 1500);
        });
    }
});s
// Add event listener for DOMContentLoaded to create strength indicator
document.addEventListener("DOMContentLoaded", function () {
    const strengthIndicator = document.createElement("div");
    strengthIndicator.id = "strength-indicator";
    document.querySelector(".password-output").appendChild(strengthIndicator);
});

// Function to calculate password strength
function calculateStrength(password) {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const strengthLevels = ["░ ░ ░", "░ ░ ░", "█ ░ ░", "█ █ ░", "█ █ █"];
    return strengthLevels[Math.min(score, strengthLevels.length - 1)];
}

// Function to append output to CLI
function appendOutput(text) {
    const outputLine = document.createElement("div"); // Create a new div element for the output line
    outputLine.innerHTML = text; // Set the inner HTML of the output line
    cliOutput.appendChild(outputLine); // Append the output line to the CLI output
    cliOutput.scrollTop = cliOutput.scrollHeight; // Scroll to the bottom of the CLI output
}

// Function to execute CLI command
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
                animatePasswordReveal(password, cliOutput);
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

// Function to sanitize input
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;
}