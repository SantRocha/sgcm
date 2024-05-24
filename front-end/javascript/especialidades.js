// Adiciona funcionalidade ao botão Enviar e envia os dados do formulário para a tabela
let idTabela = document.querySelector('table');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Cria um objeto com os dados da especialidade
    let especialidade = {
        id: idTabela.tBodies[0].rows.length + 1,
        nome: form.especialidade.value
    };
    // Insere a especialidade na tabela
    inserirEspecialidade(especialidade);
    form.reset();
    form.classList.add('inativo');
    botaoAdicionar.classList.remove('inativo');
});

// Adiciona as informações na tabela
const inserirEspecialidade = (item) => {
    let tabela = document.querySelector('table');

    // Cria elementos de célula para cada informação da especialidade
    let linha = document.createElement('tr');
    let id = document.createElement('td');
    let especialidade = document.createElement('td');
    let acoes = document.createElement('td');

    // Define o texto de cada célula com as informações da especialidade89
    id.textContent = item.id;
    especialidade.textContent = item.nome;

    // Adiciona os botões de ação na célula de ações
    acoes.innerHTML = ` <a class="editar">Editar</a>
                        <a class="excluir">Excluir</a>`;

    // Adiciona as células à linha da tabela
    linha.appendChild(id);
    linha.appendChild(especialidade)
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
    let url = 'https://my-json-server.typicode.com/juniorlimeiras/json/especialidades'
    // Realiza uma solicitação fetch para obter os dados do JSON
    fetch(url).then(resposta => {
        return resposta.json();
    }).then(dados => {
        // Para cada item no JSON, insere a especialidade na tabela
        for(const item of dados) {
            inserirEspecialidade(item);
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