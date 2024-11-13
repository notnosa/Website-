// makes other content visble


function toggleDetails() {
    const details = document.getElementById("extraDetails");
    const button = document.getElementById("toggleButton");

    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block";
        button.textContent = "Show Less";
    } else {
        details.style.display = "none";
        button.textContent = "More Options";
    }
}