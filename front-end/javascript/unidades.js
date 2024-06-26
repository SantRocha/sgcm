// Adiciona funcionalidade ao botão Enviar e envia os dados do formulário para a tabela
let idTabela = document.querySelector('table');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Cria um objeto com os dados das unidades
    let unidade = {
        id: idTabela.tBodies[0].rows.length + 1,
        nome: form.nome.value,
        endereco: form.endereco.value
    };
    // Insere a unidade na tabela
    inserirUnidade(unidade);
    form.reset();
    form.classList.add('inativo');
    botaoAdicionar.classList.remove('inativo');
});

// Adiciona as informações na tabela
const inserirUnidade = (item) => {
    let tabela = document.querySelector('table');

    // Cria elementos de célula para cada informação da unidade
    let linha = document.createElement('tr');
    let id = document.createElement('td');
    let nome = document.createElement('td');
    let endereco = document.createElement('td');
    let acoes = document.createElement('td');

    // Define o texto de cada célula com as informações da unidade
    id.textContent = item.id;
    nome.textContent = item.nome;
    endereco.textContent = item.endereco;

    // Adiciona os botões de ação na célula de ações
    acoes.innerHTML = ` <a class="editar">Editar</a>
                        <a class="excluir">Excluir</a>`;

    // Adiciona as células à linha da tabela
    linha.appendChild(id);
    linha.appendChild(nome);
    linha.appendChild(endereco);
    linha.appendChild(acoes);

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
    let url = 'https://my-json-server.typicode.com/juniorlimeiras/json/unidades'
    // Realiza uma solicitação fetch para obter os dados do JSON
    fetch(url).then(resposta => {
        return resposta.json();
    }).then(dados => {
        // Para cada item no JSON, insere a unidade na tabela
        for(const item of dados) {
            inserirUnidade(item);
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