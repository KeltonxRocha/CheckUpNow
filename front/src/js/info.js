document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("info-form");
    const message = document.getElementById("form-message");
    const checkmark = document.getElementById("checkmark");
    const successAnimation = document.getElementById("success-animation");
    const uploadIcon = document.querySelector(".upload-icon");
    const fotoInput = document.getElementById("foto");
    
    document.addEventListener('dragover', e => e.preventDefault());
    document.addEventListener('drop', e => e.preventDefault());

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Resetando mensagens e animações
        message.textContent = "";
        message.style.color = "red";
        successAnimation.style.display = "none";
        checkmark.src = "/front/src/images/checkmark.gif"; // Reset do GIF

        const data = {
            nascimento: document.getElementById("data-nascimento").value.trim(),
            endereco: document.getElementById("endereco").value.trim(),
            sexo: document.getElementById("sexo").value,
            telefone: document.getElementById("telefone").value.trim()
        };

        if (!data.nascimento) return message.textContent = "Por favor, preencha a data de nascimento.";
        if (!data.endereco) return message.textContent = "Por favor, preencha o endereço.";
        if (!data.sexo) return message.textContent = "Por favor, selecione o sexo.";
        if (!data.telefone) return message.textContent = "Por favor, preencha o telefone.";

        // Tudo ok
        message.textContent = "";
        successAnimation.style.display = "block";
        // Sucesso
    message.style.color = "green";
    message.textContent = "Informações salvas com sucesso!";
    successAnimation.style.display = "flex";
    });

    // Mostra o check de upload
    fotoInput.addEventListener("change", function () {
        if (fotoInput.files.length > 0) {
            uploadIcon.textContent = "✓";
            uploadIcon.style.color = "#4cd137";
        } else {
            uploadIcon.textContent = "+";
            uploadIcon.style.color = "#999";
        }
    });
});