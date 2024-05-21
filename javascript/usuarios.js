// Cria a funcionalidade dos botões adicionar e cancelar da página que controlam o formulário. funcao adicionada para esconder
let botaoAdicionar = document.querySelector('.adicionar');
let botaoCancelar = document.querySelector('.cancelar');
let form = document.querySelector('form');

// Ao clicar no botão Adicionar, remove a classe que esconde o formulário.
botaoAdicionar.addEventListener('click', (event) => {
    form.classList.remove('inativo');
    botaoAdicionar.classList.add('esconder');
    event.preventDefault();
});


// Ao clicar no botão Cancelar, adiciona a classe que esconde o formulário e o reseta. foi adicionado um variavel botaoEsconder2.classList.remove('.esconder');
botaoCancelar.addEventListener('click', (event) => {
    form.classList.add('inativo');
    form.reset();
    botaoAdicionar.classList.remove('esconder');
    event.preventDefault();
});

// Adiciona funcionalidade ao botão Enviar e envia os dados do formulário para a tabela
let idTabela = document.querySelector('table');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Cria um objeto com os dados do usuário
    let usuario = {
        id: idTabela.tBodies[0].rows.length + 1,
        ativo: true,
        nome_completo: form.nomeCompleto.value,
        nome_usuario: form.nomeUsuario.value,
        papel: form.funcao.options[form.funcao.selectedIndex].text,
        senha: form.senha.value
    };
    // Insere o usuário na tabela
    inserirUsuario(usuario);
    form.reset();
    form.classList.add('inativo');
    botaoAdicionar.classList.remove('esconder');
});

// Adiciona as informações na tabela
const inserirUsuario = (item) => {
    let tabela = document.querySelector('table');

    // Cria elementos de célula para cada informação do profissional
    let linha = document.createElement('tr');
    let id = document.createElement('td');
    let ativo = document.createElement('td');
    let nome = document.createElement('td');
    let usuario = document.createElement('td');
    let funcao = document.createElement('td');
    let senha = document.createElement('td');
    let acoes = document.createElement('td');

    // Define o texto de cada célula com as informações do profissional
    id.textContent = item.id;
    ativo.textContent = item.ativo
    nome.textContent = item.nome_completo;
    usuario.textContent = item.nome_usuario;
    funcao.textContent = item.papel;
    senha.textContent = item.senha;

    // Adiciona os botões de ação na célula de ações
    acoes.innerHTML = ` <a class="editar">Editar</a>
                        <a class="excluir">Excluir</a>`;

    // Adiciona as células à linha da tabela
    linha.appendChild(id);
    linha.appendChild(ativo);
    linha.appendChild(nome);
    linha.appendChild(usuario);
    linha.appendChild(funcao);
    linha.appendChild(senha);
    linha.appendChild(acoes)

    // Adiciona a linha à tabela
    tabela.tBodies[0].appendChild(linha)

    // Adiciona a funcionalidade de exclusão ao botão "Excluir"
    let botaoExcluir = linha.querySelector('.excluir');
    botaoExcluir.addEventListener('click', () => {
        linha.remove();
        rodapeTabela();// chamaa  funçao para reduzir
    })
    rodapeTabela();//chama a funçao para adicionar 
};

// Carrega as Informações do JSON na tabela
const carregaTabela = () => {
    // Define a URL do arquivo JSON
    let url = 'https://my-json-server.typicode.com/juniorlimeiras/json2/usuarios'
    // Realiza uma solicitação fetch para obter os dados do JSON
    fetch(url).then(resposta => {
        return resposta.json();
    }).then(dados => {
        // Para cada item no JSON, insere o profissional na tabela
        for(const item of dados) {
            inserirUsuario(item);
        }
    }).catch(erro => (
        console.error(erro)
    ));
}
// Chama a função para carregar a tabela quando a página é carregada
carregaTabela();

// Atualiza o rodapé para a quantidade de linha da tabela.
const rodapeTabela = () => {
    const totalSpan = document.getElementById('total');
    const totalRegistros = idTabela.tBodies[0].rows.length;
    totalSpan.textContent = totalRegistros;
};