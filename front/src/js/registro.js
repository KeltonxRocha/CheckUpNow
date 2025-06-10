document.addEventListener('DOMContentLoaded', () => {
  const nomeInput = document.querySelector('input[placeholder="Nome completo"]');
  const emailInput = document.querySelector('input[placeholder="E-mail"]');
  const senhaInput = document.querySelector('input[placeholder="Senha"]');
  const confirmarSenhaInput = document.querySelector('input[placeholder="Confirmar senha"]');
  const checkbox = document.querySelector('input[type="checkbox"]');
  const botaoRegistrar = document.querySelector('button');
  const aviso = document.getElementById('mensagemAviso');

  // Mostrar/ocultar senha
  checkbox.addEventListener('change', () => {
    const tipo = checkbox.checked ? 'text' : 'password';
    senhaInput.type = tipo;
    confirmarSenhaInput.type = tipo;
  });

  // Registro com validação
  botaoRegistrar.addEventListener('click', (e) => {
    e.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmarSenha = confirmarSenhaInput.value;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!nome || !email || !senha || !confirmarSenha) {
      aviso.textContent = "Por favor, preencha todos os campos.";
      aviso.style.color = "red";
      aviso.style.display = "block";
      return;
    }

    if (!emailValido) {
      aviso.textContent = "Por favor, insira um e-mail válido.";
      aviso.style.color = "red";
      aviso.style.display = "block";
      return;
    }

    if (senha.length < 6) {
      aviso.textContent = "A senha deve ter pelo menos 6 caracteres.";
      aviso.style.color = "red";
      aviso.style.display = "block";
      return;
    }

    if (senha !== confirmarSenha) {
      aviso.textContent = "As senhas não coincidem.";
      aviso.style.color = "red";
      aviso.style.display = "block";
      return;
    }

    aviso.textContent = `Registro de ${nome} realizado com sucesso!`;
    aviso.style.color = "green";
    aviso.style.display = "block";

    // Aqui você pode limpar o formulário ou enviar para backend
  });
});
