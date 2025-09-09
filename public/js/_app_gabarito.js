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

    // Cria a opção padrão "Selecione"
    const defaultOptionElement = document.createElement("option");
    defaultOptionElement.value = "";
    defaultOptionElement.innerText = "Selecione";

    // Adiciona a opção padrão ao select
    selectUsersElement.append(defaultOptionElement);

    // Extrai as linhas (usuários) retornadas da API
    const userRows = response.rows;

    // Para cada usuário retornado, cria uma opção no select
    userRows.forEach((row) => {
        const optionElement = document.createElement("option");
        optionElement.value = row.id;     // Define o valor da opção como o ID do usuário
        optionElement.innerText = row.name; // Define o texto visível como o nome do usuário
        selectUsersElement.append(optionElement); // Adiciona a opção ao select
    });

    // Adiciona um listener para o evento de "submit" do formulário
    formAddElement.addEventListener("submit", async (event) => {
        // Impede que o formulário recarregue a página
        event.preventDefault();

        // Objeto que armazenará os dados do novo "todo"
        const data = {};

        // Array para guardar mensagens de erro de validação
        const errors = [];

        // Valida se o título foi preenchido
        if (inputTitleElement.value == "") {
            inputTitleElement.focus(); // Dá foco no campo
            errors.push("Campo Título não pode ser vazio."); // Adiciona mensagem de erro
        }

        // Valida se um usuário foi selecionado
        if (selectUsersElement.value == "") {
            errors.push("Escolha um usuário.");
        }

        // Limpa mensagens anteriores de erro
        errorsElement.innerHTML = "";
        errorsElement.classList.add("d-none"); // Esconde a área de erros

        // Se houver erros de validação, mostra-os e encerra
        if (errors.length > 0) {
            errorsElement.classList.remove("d-none");
            errors.forEach((errorText) => {
                const divElement = document.createElement("div");
                divElement.innerText = errorText; // Adiciona o texto do erro
                errorsElement.append(divElement); // Exibe no container de erros
            });
            return; // Interrompe a execução
        }

        // Preenche o objeto de dados com título e usuário
        data.title = inputTitleElement.value;
        data.id_user = selectUsersElement.value;

        // Apenas loga no console os dados que serão enviados
        console.log(data);

        // Limpa o campo de título e reseta o select de usuário
        inputTitleElement.value = "";
        selectUsersElement.value = "";

        // Faz a chamada à API para inserir o novo "todo"
        const response = await callTodosInsertApi(data);

        // Atualiza a lista de "todos" renderizados
        renderAll();
    })

});
