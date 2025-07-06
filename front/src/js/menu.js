// js/menu.js

document.addEventListener("DOMContentLoaded", () => {
  const btnAgendar = document.getElementById("btn-agendar");
  const btnHistorico = document.getElementById("btn-historico");
  const sectionAgendar = document.getElementById("agendar-section");
  const sectionHistorico = document.getElementById("historico-section");

  const especialidades = document.querySelectorAll(".especialidade");
  const etapas = document.getElementById("etapas-agendamento");
  const etapaDia = document.getElementById("etapa-dia");
  const etapaHorario = document.getElementById("etapa-horario");
  const etapaMedico = document.getElementById("etapa-medico");

  const diasDisponiveis = document.getElementById("dias-disponiveis");
  const horariosDisponiveis = document.getElementById("horarios-disponiveis");
  const medicosDisponiveis = document.getElementById("medicos-disponiveis");
  const listaConsultas = document.getElementById("lista-consultas");

  let especialidadeSelecionada = "";
  let diaSelecionado = "";
  let horarioSelecionado = "";

  const medicosPorEspecialidade = {
    "Clínica Geral": ["Dr. João Silva", "Dra. Ana Lima"],
    Psicologia: ["Dra. Carla Mendes", "Dr. Bruno Castro"],
    Pediatria: ["Dra. Lúcia Teixeira", "Dr. Rafael Sousa"],
    Ginecologia: ["Dra. Fernanda Rocha", "Dra. Camila Dias"],
    Dermatologia: ["Dr. Felipe Nunes", "Dra. Marina Azevedo"],
    Ortopedia: ["Dr. Diego Ramos", "Dr. André Costa"],
    Cardiologia: ["Dr. Leandro Vieira", "Dra. Helena Martins"],
    Oftalmologia: ["Dr. Igor Moreira", "Dra. Paula Sampaio"]
  };

  btnAgendar.addEventListener("click", () => {
    btnAgendar.classList.add("active");
    btnHistorico.classList.remove("active");
    sectionAgendar.classList.add("active");
    sectionHistorico.classList.remove("active");
  });

  btnHistorico.addEventListener("click", () => {
    btnHistorico.classList.add("active");
    btnAgendar.classList.remove("active");
    sectionHistorico.classList.add("active");
    sectionAgendar.classList.remove("active");
    carregarConsultas();
  });

  especialidades.forEach(btn => {
    btn.addEventListener("click", () => {
      especialidadeSelecionada = btn.dataset.especialidade;
      etapas.classList.remove("esconder");
      etapaDia.classList.remove("esconder");
      etapaHorario.classList.add("esconder");
      etapaMedico.classList.add("esconder");
      renderDias();
    });
  });

  function renderDias() {
    diasDisponiveis.innerHTML = "";
    const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];
    dias.forEach(dia => {
      const btn = document.createElement("button");
      btn.textContent = dia;
      btn.addEventListener("click", () => {
        diaSelecionado = dia;
        etapaHorario.classList.remove("esconder");
        etapaMedico.classList.add("esconder");
        renderHorarios();
      });
      diasDisponiveis.appendChild(btn);
    });
  }

  function renderHorarios() {
    horariosDisponiveis.innerHTML = "";
    const horarios = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
    horarios.forEach(hora => {
      const btn = document.createElement("button");
      btn.textContent = hora;
      btn.addEventListener("click", () => {
        horarioSelecionado = hora;
        etapaMedico.classList.remove("esconder");
        renderMedicos();
      });
      horariosDisponiveis.appendChild(btn);
    });
  }

  function renderMedicos() {
    medicosDisponiveis.innerHTML = "";
    const medicos = medicosPorEspecialidade[especialidadeSelecionada] || [];
    medicos.forEach(medico => {
      const btn = document.createElement("button");
      btn.textContent = medico;
      btn.addEventListener("click", () => {
        marcarConsulta(medico);
      });
      medicosDisponiveis.appendChild(btn);
    });
  }

  function formatarDataParaBR(isoDate) {
  const [ano, mes, dia] = isoDate.split("-");
  return `${dia}/${mes}/${ano}`;
}

  async function marcarConsulta(medico) {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) {
      alert("Usuário não logado.");
      return;
    }

    const body = {
      tipo: especialidadeSelecionada,
      dia: converterDiaSemanaParaData(diaSelecionado),
      horario: horarioSelecionado,
      medico: medico,
      local: "Unidade Central",
      usuario: { id: usuarioId }
    };

    await fetch("http://localhost:8080/api/consultas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    // Resetar interface
    etapas.classList.add("esconder");
    etapaDia.classList.add("esconder");
    etapaHorario.classList.add("esconder");
    etapaMedico.classList.add("esconder");

    btnHistorico.click();
  }

  async function carregarConsultas() {
    const usuarioId = localStorage.getItem("usuarioId");
    if (!usuarioId) return;

    const res = await fetch(`http://localhost:8080/api/consultas/usuario/${usuarioId}`);
    const consultas = await res.json();
    renderizarConsultas(consultas);
  }

  function renderizarConsultas(consultas) {
    listaConsultas.innerHTML = "";

    if (!consultas || consultas.length === 0) {
      listaConsultas.innerHTML = "<p>Você ainda não tem consultas agendadas.</p>";
      return;
    }

    consultas.forEach(consulta => {
      const card = document.createElement("div");
      card.classList.add("card-consulta");
      card.setAttribute("data-dia", consulta.dia);

      const status = consulta.ativo
        ? (new Date(consulta.dia) >= new Date() ? "futura" : "passada")
        : "cancelada";

      card.innerHTML = `
        <p><strong>${consulta.tipo}</strong></p>
        <p>📅 ${formatarDataParaBR(consulta.dia)} às ${consulta.horario}</p>
        <p>👨‍⚕️ ${consulta.medico}</p>
        <p>📍 ${consulta.local}</p>
        <div class="status ${status}">
          ${status === "futura" ? "⏱ Futuro" : status === "passada" ? "✅ Passada" : "🚫 Cancelada"}
          ${status === "futura" ? `<button class="cancelar-btn" data-id="${consulta.id}">Cancelar</button>` : ""}
        </div>
      `;

      if (status === "futura") {
        card.querySelector(".cancelar-btn").addEventListener("click", async () => {
          await fetch(`http://localhost:8080/api/consultas/${consulta.id}/cancelar`, {
            method: "PUT"
          });
          carregarConsultas(); // recarregar após cancelar
        });
      }

      listaConsultas.appendChild(card);
    });
    ordenarConsultasPorData();

  }

  function converterDiaSemanaParaData(diaSemana) {
    const hoje = new Date();
    const diasMap = {
      "Dom": 0, "Seg": 1, "Ter": 2, "Qua": 3, "Qui": 4, "Sex": 5, "Sáb": 6
    };
    const diaTarget = diasMap[diaSemana];
    const diff = (diaTarget + 7 - hoje.getDay()) % 7 || 7;
    const data = new Date();
    data.setDate(hoje.getDate() + diff);
    return data.toISOString().split("T")[0];
  }
  
  function ordenarConsultasPorData() {
  const cards = Array.from(listaConsultas.querySelectorAll(".card-consulta"));
  cards.sort((a, b) => {
    const dataA = new Date(a.getAttribute("data-dia"));
    const dataB = new Date(b.getAttribute("data-dia"));
    return dataB - dataA; // mais futuro primeiro
  });

  listaConsultas.innerHTML = "";
  cards.forEach(card => listaConsultas.appendChild(card));
}

});