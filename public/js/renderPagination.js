import renderAll from "./renderAll.js";

export default function (response, currentPage = 0) {
    const ulElement = document.createElement("ul");
    ulElement.classList.add("pagination");


    const total = response.count;

    const limit = response.limit;

    const pages = (total % limit === 0) ? (total / limit) : (Math.floor(total / limit) + 1);

    for (let i = 0; i < pages; i++) {

        const liElement = document.createElement("li");
        if (currentPage == i) {
            liElement.classList.add(
                "active"
            );
        }
        liElement.classList.add(
            "page-item"
        );

        const aElement = document.createElement("a");
        aElement.dataset.page = i;
        aElement.textContent = i + 1;
        aElement.classList.add(
            "page-link"
        );


        aElement.href = "#";
        aElement.addEventListener("click", (event) => {
            event.preventDefault();
            const page = event.currentTarget.dataset.page;

            renderAll(page);
        });
        liElement.append(aElement);


        ulElement.append(liElement);
    }

    return ulElement;
}
