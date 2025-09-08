// Importa a função que faz a chamada à API para excluir um todo
import callTodosExcludeApi from "./callTodosExcludeApi.js";
import callTodosUpdateApi from "./callTodosUpdateApi.js";
// Importa a função que renderiza novamente a lista de todos
import renderAll from "./renderAll.js";

// Exporta a função que renderiza a lista de todos na tela
export default function (response, currentPage) {
    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group", "shadow-sm", "rounded-3");

    const rows = response.rows;

    rows.forEach((row) => {
        // <li>
        const liElement = document.createElement("li");
        liElement.dataset.id = row.id;
        liElement.classList.add(
            "list-group-item",
            "list-group-item-action",
            "d-flex",
            "align-items-center",
            "justify-content-between",
            "gap-3",
            "py-3",
            "px-3",
            "border-secondary-subtle",
            "cursor-pointer"
        );
        liElement.setAttribute("role", "button");
        liElement.dataId = row.id;

        // estado concluído
        if (row.is_checked) {
            liElement.classList.add("bg-success-subtle");
        }

        // clique na linha → alterna concluído
        liElement.addEventListener("click", async (event) => {
            const currentElement = event.currentTarget;
            const id = currentElement.dataset.id;
            const checkboxElement = currentElement.querySelector('input[type="checkbox"]');

            const newIsChecked = !checkboxElement.checked;
            checkboxElement.checked = newIsChecked;

            await callTodosUpdateApi(id, { is_checked: newIsChecked });
            renderAll(currentPage);
        });

        // checkbox (oculto, apenas controle de estado)
        const checkboxElement = document.createElement("input");
        checkboxElement.type = "checkbox";
        checkboxElement.classList.add("d-none");
        checkboxElement.checked = row.is_checked;

        // conteúdo (meio): badge + título (com truncamento)
        const content = document.createElement("div");
        content.classList.add(
            "flex-grow-1",
            "d-flex",
            "align-items-center",
            "gap-2",
        );

        const userBadge = document.createElement("span");
        userBadge.classList.add("badge", "text-bg-primary");
        userBadge.textContent = row.user.name;

        const title = document.createElement("span");
        title.textContent = row.title;

        if (row.is_checked) {
            title.classList.add("text-decoration-line-through");
        }

        content.append(userBadge, title);

        // botão excluir (direita)
        const buttonElement = document.createElement("button");
        buttonElement.classList.add("btn", "btn-outline-danger", "btn-sm");
        buttonElement.innerText = "Excluir";

        buttonElement.addEventListener("click", async (event) => {
            event.stopPropagation();
            const liElement = event.currentTarget.parentElement;
            const id = liElement.dataset.id;
            await callTodosExcludeApi(id);
            renderAll(currentPage);
        });

        // monta a <li>
        liElement.append(checkboxElement, content, buttonElement);
        ulElement.append(liElement);
    });

    return ulElement;
}
