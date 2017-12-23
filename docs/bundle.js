var s = document.querySelectorAll("pre");
s.forEach(element => {
    var button = document.createElement("button");
    button.innerHTML = "Copy to clipboard";
    element.parentElement.appendChild(button);

    button.addEventListener ("click", function() {
        console.log(element.textContent);
      });
});