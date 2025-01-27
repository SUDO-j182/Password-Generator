const lengthInput = document.getElementById('length');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');
const generatebutton = document.getElementById('generate');
const passwordOutput = document.getElementById('password');
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numberChars = '0123456789';
const symbolChars = '!@#$%&*()_-[]{}¦;:,.<>?';

function generatePassword() {
    const length = parseInt(lengthInput.value);
    let charPool='';

    if (uppercaseCheckbox.checked) charPool += uppercaseChars;
    if (lowercaseCheckbox.checked) charPool += lowercaseChars;
    if (numbersCheckbox.checked) charPool += numberChars;
    if (symbolsCheckbox.checked) charPool +=symbolChars;

    if (charPool === '') {
        alert('Please select at least one character type!');
        return '';
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charPool.length);
        password += charPool[randomIndex];
    }

    return password;
}

generatebutton.addEventListener('click', () => {
    const newPassword = generatePassword();
    passwordOutput.value = newPassword;
});