// Exporta a função assíncrona como padrão, recebendo "limit" e "page" (com valor padrão 0)
export default async function (limit, page = 0) {
    try {

        // Cria o objeto com os parâmetros da query string
        const queries = {
            limit: limit,              // quantidade de registros por página
            offset: limit * page,      // deslocamento (skip) calculado pelo limite x página
            orderBy: "id,desc"         // ordenação decrescente pelo campo "id"
        };

        // Converte o objeto de queries em string no formato de URL (ex: limit=10&offset=20&orderBy=id,desc)
        const params = new URLSearchParams(queries).toString();

        // Faz uma requisição HTTP GET para a API de "todos" com os parâmetros de paginação e ordenação
        const request = await fetch("http://localhost:8080/api/todos?" + params);

        // Converte a resposta da requisição para JSON
        const response = await request.json();

        // Retorna o objeto JSON recebido da API
        return response;

    } catch (error) {
        // Caso ocorra algum erro na requisição, retorna um objeto com a mensagem do erro
        return {
            error: error.message
        }
    }
}
