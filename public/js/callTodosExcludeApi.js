// Exporta a função assíncrona como padrão, recebendo o parâmetro "id"
export default async function (id) {
    try {

        // Faz uma requisição HTTP DELETE para a API, removendo o "todo" com o ID passado
        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: "DELETE"
        });

        // Se der tudo certo, retorna apenas uma string vazia (indicando sucesso sem dados extras)
        return "";

    } catch (error) {
        // Caso ocorra algum erro na requisição, retorna um objeto com a mensagem de erro
        return {
            error: error.message
        }
    }
}
