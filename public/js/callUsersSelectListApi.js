
export default async function (limit, page = 0) {
    try {

        const queries = {
            limit: 100,
            offset: 0,
            orderBy: "name,asc"
        };

        const params = new URLSearchParams(queries).toString();

        const request = await fetch("http://localhost:8080/api/users?" + params);

        const response = await request.json();

        return response;

    } catch (error) {
        return {
            error: error.message
        }
    }
}