
export default async function (data) {
    try {

        const request = await fetch("http://localhost:8080/api/todos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const response = await request.json();

        return response;

    } catch (error) {
        return {
            error: error.message
        }
    }
}