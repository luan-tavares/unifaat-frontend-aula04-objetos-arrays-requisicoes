
export default async function (limit, page = 0) {
    try {

        const queries = {
            limit: limit,
            offset: limit * page,
            orderBy: "id,desc"
        };

        const params = new URLSearchParams(queries).toString();

        const request = await fetch("http://localhost:8080/api/todos?" + params);

        const response = await request.json();

        return response;

    } catch (error) {
        return {
            error: error.message
        }
    }
}