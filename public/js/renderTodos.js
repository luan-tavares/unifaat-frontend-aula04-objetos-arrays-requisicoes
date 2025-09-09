// Importa a função que chama a API para excluir um todo
import callTodosExcludeApi from "./callTodosExcludeApi.js";
// Importa a função que chama a API para atualizar um todo (ex.: marcar concluído)
import callTodosUpdateApi from "./callTodosUpdateApi.js";
// Importa a função que re-renderiza toda a lista/página
import renderAll from "./renderAll.js";

// Exporta como padrão uma função que recebe a resposta da API e a página atual
export default function (response, currentPage) {
    // Cria a <ul> que vai conter a lista de itens
    const ulElement = document.createElement("ul");
    // Adiciona classes de estilo (Bootstrap) à <ul>
    ulElement.classList.add("list-group", "shadow-sm", "rounded-3");

    // Obtém as linhas (itens) retornadas pela API
    const rows = response.rows;

    // Itera por cada linha (todo) para montar um <li>
    rows.forEach((row) => {
        // Cria o <li> para representar um todo
        const liElement = document.createElement("li");
        // Guarda o id do todo como data-attribute
        liElement.dataset.id = row.id;
        // Define classes de layout/estilo para o <li>
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
        // Torna o <li> “clicável” para acessibilidade
        liElement.setAttribute("role", "button");
        // (Opcional/legado) atribui o id também numa propriedade custom
        liElement.dataId = row.id;

        // Se o item já está concluído, aplica um fundo verde sutil
        if (row.is_checked) {
            liElement.classList.add("bg-success-subtle");
        }

        // Adiciona handler de clique no <li> para alternar concluído/não concluído
        liElement.addEventListener("click", async (event) => {
            // Pega o elemento <li> que recebeu o clique
            const currentElement = event.currentTarget;
            // Lê o id do todo salvo no data-attribute
            const id = currentElement.dataset.id;
            // Localiza o checkbox “oculto” que reflete o estado
            const checkboxElement = currentElement.querySelector('input[type="checkbox"]');

            // Calcula o novo estado (toggle do atual)
            const newIsChecked = !checkboxElement.checked;
            // Atualiza o checkbox visualmente
            checkboxElement.checked = newIsChecked;

            // Envia atualização para a API (marca/desmarca como concluído)
            await callTodosUpdateApi(id, { is_checked: newIsChecked });
            // Re-renderiza a lista (mantendo a página atual)
            renderAll(currentPage);
        });

        // Cria o checkbox (fica oculto; serve para manter o estado na UI)
        const checkboxElement = document.createElement("input");
        // Define o tipo como checkbox
        checkboxElement.type = "checkbox";
        // Esconde o checkbox (o clique é no <li>)
        checkboxElement.classList.add("d-none");
        // Ajusta o valor marcado conforme o estado vindo da API
        checkboxElement.checked = row.is_checked;

        // Cria o contêiner do conteúdo central (badge + título)
        const content = document.createElement("div");
        // Aplica classes utilitárias de layout (flex e espaçamentos)
        content.classList.add(
            "flex-grow-1",
            "d-flex",
            "align-items-center",
            "gap-2"
        );

        // Cria a “badge” com o nome do usuário
        const userBadge = document.createElement("span");
        // Define a aparência de badge (Bootstrap)
        userBadge.classList.add("badge", "text-bg-primary");
        // Insere o nome do usuário na badge
        userBadge.textContent = row.user.name;

        // Cria o elemento de título do todo
        const title = document.createElement("span");
        // Define o texto do título com o conteúdo do todo
        title.textContent = row.title;

        // Se estiver concluído, adiciona “tachado” ao título
        if (row.is_checked) {
            title.classList.add("text-decoration-line-through");
        }

        // Insere a badge e o título dentro do contêiner de conteúdo
        content.append(userBadge, title);

        // Cria o botão “Excluir” (lado direito)
        const buttonElement = document.createElement("button");
        // Define as classes de estilo do botão
        buttonElement.classList.add("btn", "btn-outline-danger", "btn-sm");
        // Define o texto do botão
        buttonElement.innerText = "Excluir";

        // Adiciona o handler de clique para excluir o item
        buttonElement.addEventListener("click", async (event) => {
            // Impede que o clique no botão também dispare o clique do <li>
            event.stopPropagation();
            // Pega o <li> pai do botão
            const liElement = event.currentTarget.parentElement;
            // Lê o id do todo no data-attribute
            const id = liElement.dataset.id;
            // Chama a API para excluir o todo
            await callTodosExcludeApi(id);
            // Re-renderiza a lista após exclusão
            renderAll(currentPage);
        });

        // Monta a estrutura final do <li>: checkbox oculto + conteúdo + botão
        liElement.append(checkboxElement, content, buttonElement);
        // Adiciona o <li> na <ul> principal
        ulElement.append(liElement);
    });

    // Retorna a <ul> totalmente montada para ser anexada ao DOM
    return ulElement;
}
