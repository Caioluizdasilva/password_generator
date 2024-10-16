function getChartTypes() {
    const uppercase = document.querySelector('#include_uppercase').checked;
    const lowercase = document.querySelector('#include_lowercase').checked;
    const number = document.querySelector('#include_number').checked;
    const specialCharacter = document.querySelector('#include_special_character').checked;

    const charType = [];

    if (uppercase) {
        charType.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    if (lowercase) {
        charType.push('abcdefghijklmnopqrstuvwxyz');
    }

    if (number) {
        charType.push('0123456789');
    }

    if (specialCharacter) {
        charType.push('!@#$%^&*()_-+={}[]|\\/?><:;"\'.,~`');
    }

    return charType;
}

function getPasswordSize() {
    const size = document.querySelector('#size').value;

    if (isNaN(size) || size < 4 || size > 128) {
        message('Tamanho Inválido, digite um número entre 4 e 128!', 'danger');
        return null; // Adicionado return para evitar continuar com valor inválido.
    }

    return size;
}

function generatePassword(size, charTypes) {
    let passwordGenerated = ''; // Corrigido de "passawordGenerated"
    const selectedChars = charTypes.join('');

    charTypes.forEach(type => { // Corrigido para usar "type" corretamente.
        passwordGenerated += type[Math.floor(Math.random() * type.length)];
    });

    while (passwordGenerated.length < size) {
        passwordGenerated += selectedChars[Math.floor(Math.random() * selectedChars.length)];
    }

    passwordGenerated = passwordGenerated.split('').sort(() => Math.random() - 0.5).join('');

    return passwordGenerated;
}

function message(text, status = 'success') {
    Toastify({
        text: text,
        duration: 2000,
        style: {
            background: status === 'success' ? '#84cc16' : '#dc2626',
            boxShadow: 'none'
        }
    }).showToast();
}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    const charTypes = getChartTypes();

    if (!size) {
        return;
    }
    if (!charTypes.length) {
        message('Selecione pelo menos um tipo de caractere!', 'danger');
        return;
    }

    const passwordGenerated = generatePassword(size, charTypes);

    document.querySelector('#password_container').classList.add('show');
    document.querySelector('#password').textContent = passwordGenerated;
});

document.querySelector('#copy').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso!', 'success');
});
