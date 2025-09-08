import callTodosInsertApi from "./callTodosInsertApi.js";
import callUsersSelectListApi from "./callUsersSelectListApi.js";
import renderAll from "./renderAll.js";


document.addEventListener("DOMContentLoaded", async (event) => {

    renderAll();

    const response = await callUsersSelectListApi();

    if (response.error) {
        return;
    }

    const formAddElement = document.getElementById("form-add-todo");
    const selectUsersElement = document.getElementById("select-user");
    const inputTitleElement = document.getElementById("todo-title");
    const errorsElement = document.getElementById("add-errors");


    selectUsersElement.innerHTML = "";

    const defaultOptionElement = document.createElement("option");
    defaultOptionElement.value = "";
    defaultOptionElement.innerText = "Selecione";
    selectUsersElement.append(defaultOptionElement);

    const userRows = response.rows;

    userRows.forEach((row) => {
        const optionElement = document.createElement("option");
        optionElement.value = row.id;
        optionElement.innerText = row.name;
        selectUsersElement.append(optionElement);
    });

    formAddElement.addEventListener("submit", async (event) => {
        event.preventDefault();
        const data = {};
        const errors = [];

        if (inputTitleElement.value == "") {
            inputTitleElement.focus();
            errors.push("Campo Título não pode ser vazio.");
        }

        if (selectUsersElement.value == "") {
            errors.push("Escolha um usuário.");
        }

        errorsElement.innerHTML = "";
        errorsElement.classList.add("d-none");

        if (errors.length > 0) {
            errorsElement.classList.remove("d-none");
            errors.forEach((errorText) => {
                const divElement = document.createElement("div");
                divElement.innerText = errorText;

                errorsElement.append(divElement);
            });
            return;
        }


        data.title = inputTitleElement.value;
        data.id_user = selectUsersElement.value;

        console.log(data);

        const response = await callTodosInsertApi(data);

        renderAll();
    })

});