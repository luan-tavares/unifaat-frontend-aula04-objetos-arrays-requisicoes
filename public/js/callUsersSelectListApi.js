// Exporta a função assíncrona como padrão, sem receber parâmetros
export default async function () {
    try {

        // Cria o objeto com os parâmetros da query string
        const queries = {
            limit: 100,          // define que no máximo 100 usuários serão retornados
            offset: 0,           // sem deslocamento (traz a partir do primeiro registro)
            orderBy: "name,asc"  // ordena pelo campo "name" em ordem crescente
        };

        // Converte o objeto "queries" em uma string no formato de query string
        // Exemplo: "limit=100&offset=0&orderBy=name%2Casc"
        const params = new URLSearchParams(queries).toString();

        // Faz a requisição HTTP GET para a API de usuários com os parâmetros acima
        const request = await fetch(`http://localhost:8080/api/users?${params}`);

        // Converte a resposta da API para JSON
        const response = await request.json();

        // Retorna a resposta convertida
        return response;

    } catch (error) {
        // Caso ocorra algum erro na requisição, retorna um objeto com a mensagem do erro
        return {
            error: error.message
        }
    }
}
