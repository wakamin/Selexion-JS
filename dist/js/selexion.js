document.querySelectorAll(".selexion-select").forEach((select) => {
    /** Build the html */
    const wrapper_html = document.createElement("div");
    wrapper_html.className = "selexion";
    select.parentNode.insertBefore(wrapper_html, select);
    wrapper_html.appendChild(select);

    const selected_text = select.options[select.selectedIndex].text;
    const wrapper = select.parentElement;

    const selected_text_html = document.createElement("div");
    selected_text_html.className = "selexion__selected-text";
    selected_text_html.textContent = selected_text;
    select.parentNode.insertBefore(selected_text_html, select);

    const options_wrapper_html = document.createElement("div");
    options_wrapper_html.className = "selexion__options";
    let options_html = "";
    select.querySelectorAll("option").forEach((option) => {
        options_html += `
            <div class="selexion__option${
                option.getAttribute("value") == select.value ? " selected" : ""
            }" data-value="${option.getAttribute("value")}">${
            option.textContent
        }</div>
        `;
    });
    options_wrapper_html.innerHTML = options_html;
    select.parentNode.insertBefore(options_wrapper_html, select);
    /** End build the html */

    /** New element vars */
    const selected_text_el = wrapper.querySelector(".selexion__selected-text");
    const options_el = wrapper.querySelector(".selexion__options");
    const option_els = options_el.querySelectorAll(".selexion__option");
    /** End new element vars */

    /** On click selected text */
    selected_text_el.addEventListener("click", function () {
        options_el.style.display = "block";
        options_el.style.position = "absolute";
        options_el.style.visibility = "hidden";

        if (
            window.innerHeight -
                wrapper.offsetHeight -
                options_el.offsetHeight <
            this.getBoundingClientRect().top
        ) {
            options_el.classList.add("selexion__options--up");
        } else {
            options_el.classList.remove("selexion__options--up");
        }

        options_el.removeAttribute("style");

        if (!options_el.classList.contains("dropdown-active")) {
            options_el.classList.add("dropdown-active");
            this.classList.add("dropdown-active");
        } else {
            options_el.classList.remove("dropdown-active");
            this.classList.remove("dropdown-active");
        }
    });
    // /** End on click selected text */

    /** On click option */
    option_els.forEach((option_el) => {
        option_el.addEventListener("click", function () {
            selected_text_el.textContent = this.textContent;
            select.value = this.getAttribute("value");
            select.dispatchEvent(new Event("change"));
            options_el.classList.remove("dropdown-active");
            selected_text_el.classList.remove("dropdown-active");
            option_els.forEach((option) => {
                option.classList.remove("selected");
            });
            this.classList.add("selected");
        });
    });
    /** End on click option */

    /** Hide options element on click outside */
    document.addEventListener("click", function (event) {
        const isClickInsideWrapper = wrapper.contains(event.target);
        if (!isClickInsideWrapper) {
            options_el.classList.remove("dropdown-active");
            selected_text_el.classList.remove("dropdown-active");
        }
    });
    /** End hide options element on click outside */
});
