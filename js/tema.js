// Carregado no head para aplicar o tema salvo antes da página aparecer
try {
    if (localStorage.getItem("tema") === "claro") {
        document.documentElement.classList.add("tema-claro");
    }
} catch (e) {
}
