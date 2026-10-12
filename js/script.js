// Ano atual no rodapé
const anoAtual = document.getElementById("ano-atual");
if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
}

// Menu responsivo: abre e fecha a lista de links no celular
const botaoMenu = document.getElementById("botao-menu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botaoMenu.classList.toggle("aberto", aberto);
    botaoMenu.setAttribute("aria-expanded", aberto);
    botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});

// Alternância entre tema claro e escuro, salvando a escolha no localStorage
const botaoTema = document.getElementById("botao-tema");
const textoTema = botaoTema.querySelector(".texto-tema");

function atualizarTextoTema() {
    const claro = document.documentElement.classList.contains("tema-claro");
    textoTema.textContent = claro ? "Tema escuro" : "Tema claro";
}

botaoTema.addEventListener("click", function () {
    const claro = document.documentElement.classList.toggle("tema-claro");
    try {
        localStorage.setItem("tema", claro ? "claro" : "escuro");
    } catch (e) {
    }
    atualizarTextoTema();
});

atualizarTextoTema();

// Filtro de projetos da página Portfólio
const filtros = document.querySelectorAll(".filtro");
const projetos = document.querySelectorAll(".projeto");

filtros.forEach(function (filtro) {
    filtro.addEventListener("click", function () {
        const categoria = filtro.dataset.filtro;

        filtros.forEach(function (f) {
            f.classList.remove("ativo");
        });
        filtro.classList.add("ativo");

        // Mostra só os projetos que possuem a categoria escolhida
        projetos.forEach(function (projeto) {
            const categorias = projeto.dataset.categoria.split(" ");
            const mostrar = categoria === "todos" || categorias.includes(categoria);
            projeto.classList.toggle("escondido", !mostrar);
        });
    });
});
