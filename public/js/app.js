// Importa a função que chama a API para inserir um novo "todo"
import callTodosInsertApi from "./callTodosInsertApi.js";

// Importa a função que chama a API para buscar a lista de usuários
import callUsersSelectListApi from "./callUsersSelectListApi.js";

// Importa a função que renderiza todos os itens de "todos" na tela
import renderAll from "./renderAll.js";


// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", async (event) => {

    // Renderiza todos os "todos" existentes na tela
    renderAll();

    // Faz a chamada para buscar a lista de usuários
    const response = await callUsersSelectListApi();

    // Se houve erro na resposta, interrompe a execução
    if (response.error) {
        return;
    }

    // Pega o elemento do formulário de adicionar novo "todo"
    const formAddElement = document.getElementById("form-add-todo");

    // Pega o elemento <select> que lista os usuários
    const selectUsersElement = document.getElementById("select-user");

    // Pega o campo de input para o título do "todo"
    const inputTitleElement = document.getElementById("todo-title");

    // Pega o elemento onde serão exibidos os erros de validação
    const errorsElement = document.getElementById("add-errors");


    // Limpa as opções existentes no select de usuários
    selectUsersElement.innerHTML = "";

    /** lOGICA OPTIONS */

    // Adiciona um listener para o evento de "submit" do formulário
    formAddElement.addEventListener("submit", async (event) => {
        // Impede que o formulário recarregue a página
        event.preventDefault();

        // Objeto que armazenará os dados do novo "todo"
        const data = {};

        // Array para guardar mensagens de erro de validação
        const errors = [];

        /** LOGICA INSERT */
    })

});
