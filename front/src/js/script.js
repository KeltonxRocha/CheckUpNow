document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const emailInput = document.getElementById("emailInput");
  const passwordInput = document.getElementById("passwordInput");
  const aviso = document.getElementById("mensagemAviso");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

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

    // Conectando ao backend
    fetch("http://localhost:8080/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, senha })
    })
      .then(async response => {
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("usuarioId", data.id);
          aviso.textContent = "Login bem-sucedido!";
          aviso.style.color = "green";
          aviso.style.display = "block";
          window.location.href = "menu.html";
        } else {
          const erro = await response.text();
          aviso.textContent = erro;
          aviso.style.color = "red";
          aviso.style.display = "block";
        }
      })
      .catch(error => {
        console.error("Erro ao fazer login:", error);
        aviso.textContent = "Erro ao conectar ao servidor.";
        aviso.style.color = "red";
        aviso.style.display = "block";
      });
  });
});