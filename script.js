document.addEventListener('DOMContentLoaded', function() {
    const catalogo = document.querySelector('.grid-produtos');
    const carrinhoItems = document.getElementById('carrinho-items');
    const novoProdutoForm = document.getElementById('novo-produto-form');
    const modal = document.getElementById('modal');
    const abrirModal = document.getElementById('abrir-modal');
    const fecharModal = document.getElementsByClassName('close')[0];
    const carrinhoLink = document.getElementById('carrinho-link');
    const catalogoLink = document.getElementById('catalogo-link');
    const carrinhoSection = document.querySelector('.carrinho');

    abrirModal.onclick = function() {
        modal.style.display = 'block';
    }

    fecharModal.onclick = function() {
        modal.style.display = 'none';
    }

    carrinhoLink.onclick = function() {
        carrinhoSection.style.display = 'block';
        catalogo.style.display = 'none';
    }

    catalogoLink.onclick = function() {
        carrinhoSection.style.display = 'none';
        catalogo.style.display = 'grid';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Array para armazenar os itens do carrinho
    let carrinho = [];

    // Função para adicionar um item ao carrinho
    function adicionarAoCarrinho(nome, preco) {
        const item = { nome, preco };
        carrinho.push(item);
        renderizarCarrinho();
    }

    // Função para renderizar os itens do carrinho na página
    function renderizarCarrinho() {
        carrinhoItems.innerHTML = '';
        carrinho.forEach(item => {
            const itemHTML = `
                <div class="carrinho-item">
                    <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
                </div>
            `;
            carrinhoItems.innerHTML += itemHTML;
        });
    }

    // Função para renderizar os produtos na página
    function renderizarProdutos() {
        catalogo.innerHTML = '';
        produtos.forEach(produto => {
            const produtoHTML = `
                <div class="produto">
                    <img src="${produto.imagem}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>R$ ${produto.preco.toFixed(2)}</p>
                    <button class="add-carrinho">Adicionar ao Carrinho</button>
                </div>
            `;
            catalogo.innerHTML += produtoHTML;
        });
    }

    // Adicionar cada produto ao catálogo inicialmente
    renderizarProdutos();

    // Exemplo de manipulação de eventos para adicionar produtos ao carrinho
    catalogo.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-carrinho')) {
            const produto = event.target.closest('.produto');
            const nome = produto.querySelector('h3').textContent;
            const preco = parseFloat(produto.querySelector('p').textContent.replace('R$ ', ''));
            adicionarAoCarrinho(nome, preco);
        }
    });

    // Manipular o envio do formulário para adicionar novo produto
    novoProdutoForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nome = document.getElementById('nome-produto').value;
        const preco = parseFloat(document.getElementById('preco-produto').value);
        const imagem = document.getElementById('imagem-produto').value;

        adicionarNovoItemAoCatalogo(nome, preco, imagem);

        // Limpar o formulário
        novoProdutoForm.reset();
    });
});

// Exemplo de dados de produtos (pode ser substituído por dados reais obtidos de um servidor)
let produtos = [
    { nome: 'Vinho Tinto', preco: 50, imagem: 'img/vinho-tinto.jpg' },
    { nome: 'Vinho Branco', preco: 40, imagem: 'img/vinho-branco.jpg' },
    { nome: 'Champagne', preco: 60, imagem: 'img/champagne.jpg' },
    { nome: 'JackDaniels', preco: 60, imagem: 'img/jackdaniels.jpg' },
    { nome: 'Old Par', preco: 60, imagem: 'img/oldpar.jpg' },
    { nome: 'Skol', preco: 60, imagem: 'img/skol.jpg' }
    // Adicione mais produtos conforme necessário
];

// Função para adicionar um novo item ao catálogo
function adicionarNovoItemAoCatalogo(nome, preco, imagem) {
    const novoItem = { nome, preco, imagem };
    produtos.push(novoItem);
    renderizarProdutos();
}
