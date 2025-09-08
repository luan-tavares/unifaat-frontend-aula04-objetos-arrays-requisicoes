
export default async function (id) {
    try {

        await fetch(`http://localhost:8080/api/todos/${id}`, {
            method: "DELETE"
        });

        return "";

    } catch (error) {
        return {
            error: error.message
        }
    }
}