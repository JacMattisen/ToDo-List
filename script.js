let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function adicionarTarefa() {
  const input = document.getElementById("todoText");
  const valor = input.value.trim();

  if (valor === "") {
    alert("Por favor, digite uma tarefa!");
    return;
  }

  const tarefa = {
    id: Date.now(),
    texto: valor,
    concluida: false,
  };

  tarefas.push(tarefa);
  salvarTarefas();
  input.value = "";
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("list-items");
  lista.innerHTML = "";

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.innerHTML = `
                    <div>
                        <span class="${tarefa.concluida ? "completed" : ""}">
                            ${tarefa.texto}
                        </span>
                    </div>
                    <div>
                        <button onclick="alternarTarefa(${tarefa.id})" 
                                class="complete-btn">
                            ✓
                        </button>
                        <button onclick="deletarTarefa(${tarefa.id})" 
                                class="delete-btn">
                            ×
                        </button>
                    </div>
                `;
    lista.appendChild(li);
  });
}

function alternarTarefa(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    salvarTarefas();
    atualizarLista();
  }
}

function deletarTarefa(id) {
  if (confirm("Tem certeza que deseja deletar esta tarefa?")) {
    tarefas = tarefas.filter((t) => t.id !== id);
    salvarTarefas();
    atualizarLista();
  }
}

function salvarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

document.addEventListener("DOMContentLoaded", atualizarLista);
document.getElementById("todoText").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    adicionarTarefa();
  }
});
