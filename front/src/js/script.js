document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('dragover', e => e.preventDefault());
  document.body.addEventListener('drop', e => e.preventDefault());
});

function mostrarAviso() {
  const email = document.getElementById('emailInput').value.trim();
  const aviso = document.getElementById('mensagemAviso');

  if (email === "") {
    aviso.textContent = "Por favor, insira um e-mail válido.";
    aviso.style.color = "red";
    aviso.style.display = "block";
  } else {
    aviso.textContent = `Um e-mail foi enviado para ${email} com instruções para redefinir sua senha.`;
    aviso.style.color = "green";
    aviso.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const aviso = document.getElementById("mensagemAviso");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede envio real

    const email = emailInput.value.trim();
    const senha = passwordInput.value.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      aviso.textContent = "Por favor, insira um e-mail válido.";
      aviso.style.color = "red";
      aviso.style.display = "block";
      return;
    }

    if (!senha) {
      aviso.textContent = "Por favor, preencha a senha.";
      aviso.style.color = "red";
      aviso.style.display = "block";
      return;
    }

    aviso.textContent = "Login enviado com sucesso.";
    aviso.style.color = "green";
    aviso.style.display = "block";

    setTimeout(() => {
  aviso.style.display = "none";
}, 5000); // 5 segundos
  });
});