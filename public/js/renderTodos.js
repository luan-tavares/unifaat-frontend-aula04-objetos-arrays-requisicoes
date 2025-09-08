import callTodosExcludeApi from "./callTodosExcludeApi.js";
import renderAll from "./renderAll.js";

export default function (response, currentPage) {
    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group", "shadow-sm");

    const rows = response.rows;

    rows.forEach((row) => {
        const liElement = document.createElement("li");

        liElement.dataset.id = row.id;

        liElement.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center"
        );

        const divElement = document.createElement("div");
        divElement.classList.add("flex-grow-1");
        divElement.innerHTML = `<div>${row.title}</div><div class=\"badge text-bg-primary\">${row.user.name}</div>`

        const buttonElement = document.createElement("button");
        buttonElement.classList.add("btn", "btn-danger");
        buttonElement.innerText = "Excluir";
        buttonElement.addEventListener("click", async (event) => {
            const liElement = event.currentTarget.parentElement;
            const id = liElement.dataset.id;

            await callTodosExcludeApi(id);

            renderAll(currentPage);
        });

        liElement.append(divElement, buttonElement)

        ulElement.append(liElement);
    });

    return ulElement;
}