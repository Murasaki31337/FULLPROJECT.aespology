let currentStep = 1;

function nextStep() {
    const currentFormStep = document.getElementById(`step-${currentStep}`);
    if (!validateFormStep(currentFormStep)) return;

    currentFormStep.style.display = 'none';
    currentStep++;
    document.getElementById(`step-${currentStep}`).style.display = 'block';
}

function prevStep() {
    document.getElementById(`step-${currentStep}`).style.display = 'none';
    currentStep--;
    document.getElementById(`step-${currentStep}`).style.display = 'block';
}

function validateFormStep(step) {
    const inputs = step.getElementsByTagName('input');
    for (const input of inputs) {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
            return false;
        } else {
            input.classList.remove('is-invalid');
        }
    }
    return true;
}

function resetForm() {
    document.querySelectorAll('input').forEach(input => input.value = '');
    currentStep = 1;
    document.querySelectorAll('.step').forEach(step => step.style.display = 'none');
    document.getElementById('step-1').style.display = 'block';
}

document.getElementById('multi-step-form').onsubmit = function (event) {
    event.preventDefault();
    alert('Форма успешно отправлена!');
};
