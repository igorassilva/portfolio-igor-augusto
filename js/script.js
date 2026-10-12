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

function atualizarTextoTema() {
    const claro = document.documentElement.classList.contains("tema-claro");
    const texto = claro ? "Ativar tema escuro" : "Ativar tema claro";
    botaoTema.setAttribute("aria-label", texto);
    botaoTema.title = texto;
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

// Validação do formulário de contato
const formulario = document.getElementById("formulario-contato");

function mostrarErro(campo, mensagem) {
    document.getElementById("erro-" + campo.id).textContent = mensagem;
    campo.parentElement.classList.toggle("invalido", mensagem !== "");
}

function emailValido(email) {
    // Formato usuario@dominio.com
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarCampo(campo) {
    const valor = campo.value.trim();

    if (valor === "") {
        mostrarErro(campo, "Preencha este campo.");
        return false;
    }

    if (campo.id === "email" && !emailValido(valor)) {
        mostrarErro(campo, "Informe um e-mail válido, ex: usuario@dominio.com");
        return false;
    }

    mostrarErro(campo, "");
    return true;
}

if (formulario) {
    const campos = formulario.querySelectorAll("input, textarea");
    const modal = document.getElementById("modal");
    const fecharModal = document.getElementById("fechar-modal");

    // Remove o erro enquanto o usuário corrige o campo
    campos.forEach(function (campo) {
        campo.addEventListener("input", function () {
            if (campo.parentElement.classList.contains("invalido")) {
                validarCampo(campo);
            }
        });
    });

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let valido = true;
        campos.forEach(function (campo) {
            if (!validarCampo(campo)) {
                valido = false;
            }
        });

        if (!valido) {
            formulario.querySelector(".invalido input, .invalido textarea").focus();
            return;
        }

        // Simulação do envio: não manda para nenhum servidor, só limpa e confirma
        const nome = document.getElementById("nome").value.trim();
        document.getElementById("modal-texto").textContent =
            "Obrigado pelo contato, " + nome + "! Responderei assim que possível.";
        formulario.reset();
        modal.hidden = false;
        fecharModal.focus();
    });

    function esconderModal() {
        modal.hidden = true;
    }

    fecharModal.addEventListener("click", esconderModal);

    // Fecha o modal clicando fora da caixa ou apertando Esc
    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            esconderModal();
        }
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && !modal.hidden) {
            esconderModal();
        }
    });
}
