// Exporta a função assíncrona como padrão, recebendo o objeto "data" como parâmetro
export default async function (id, data) {
    try {

        // Faz uma requisição HTTP POST para a API de "todos"
        const request = await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: "PUT", // Define o método como POST (criação de recurso)
            headers: {
                "Content-Type": "application/json" // Informa que o corpo será em JSON
            },
            body: JSON.stringify(data) // Converte o objeto "data" em uma string JSON para enviar no corpo
        });

        // Aguarda e converte a resposta da requisição para JSON
        const response = await request.json();

        // Retorna a resposta da API já convertida em objeto
        return response;

    } catch (error) {
        // Caso ocorra algum erro na requisição, retorna um objeto com a mensagem do erro
        return {
            error: error.message
        }
    }
}
