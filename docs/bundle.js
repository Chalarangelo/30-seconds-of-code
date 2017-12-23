var pres = document.querySelectorAll("pre");
pres.forEach(element => {
    const button = document.createElement("button");
    button.innerHTML = "Copy to clipboard";
    element.parentElement.appendChild(button);

    button.addEventListener ("click", function() {
        //The following regex removes all the comments from the snippet
        const text = element.textContent.replace(/\/\*(.|[\r\n])*?\*\//g, '').replace(/\/\/.*/gm, '');
        // Apparently you can copy variable to clipboard so you need to create text input element,
        // give it a value, copy it and then remove it
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        document.body.removeChild(textArea);
        console.log(`copied: ${text}`);
    });
});