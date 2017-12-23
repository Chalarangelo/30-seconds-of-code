var s = document.querySelectorAll("pre");
s.forEach(element => {
    var button = document.createElement("button");
    button.innerHTML = "Copy to clipboard";
    element.parentElement.appendChild(button);

    button.addEventListener ("click", function() {
        var text = element.textContent.replace(/\/\*(.|[\r\n])*?\*\//g, '').replace(/\/\/.*/gm, '');
        console.log(text);
    });
});