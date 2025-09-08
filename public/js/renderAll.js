import callTodosListApi from "./callTodosListApi.js";
import renderPagination from "./renderPagination.js";
import renderTodos from "./renderTodos.js";

export default async function (currentPage = 0) {
    const limit = 10;

    const todosDivElement = document.getElementById("todos");
    todosDivElement.dataset.currentPage = currentPage;

    const todosPaginationElement = document.getElementById("pagination");

    const response = await callTodosListApi(limit, currentPage);

    console.log(response);

    todosDivElement.innerHTML = "";
    todosPaginationElement.innerHTML = "";

    if (response.error) {
        todosDivElement.innerHTML = "Erro ao carregar";
        return;
    }

    todosDivElement.append(renderTodos(response, currentPage));

    todosPaginationElement.append(renderPagination(response, currentPage));
}