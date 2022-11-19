const adicionaRefeicao = document.querySelector('[data-refeicao]');

let numRef = 1;

adicionaRefeicao.addEventListener('click', (e) => {
    criaTabela(e.target.parentNode)
    numRef++;
})


function criaTabela(main) {
    let section = document.createElement('section');
    section.classList.add('container__refeicao');

    let div = document.createElement('div');

    let input = document.createElement('input');
    input.setAttribute('placeholder', 'Adicionar Alimento!')
    input.classList.add('container__input')

    let buttonOk = document.createElement('button');
    buttonOk.innerText = 'OK';
    buttonOk.classList.add('btn__input')

    let div2 = document.createElement('div');

    let ul = document.createElement('ul');
    ul.innerText = `Refeição ${numRef}`;
    ul.classList.add('container__ul');

    let h2 = document.createElement('h2');
    h2.innerText = 'Total\n0 Kcal'

    buttonOk.addEventListener('click', () => {   
        adicionarAlimento(input, ul);
        editarAlimento();
        excluirAlimento();
    })

    section.appendChild(div);
    div.appendChild(input);
    div.appendChild(buttonOk);
    section.appendChild(div2);
    ul.appendChild(h2);
    div2.appendChild(ul);
    
    main.appendChild(section)
}

function adicionarAlimento(input, ul) {
    if (input.value != ''){
        let li = document.createElement('li');
        li.classList.add('container__li')
        li.innerText = input.value;        
        
        let divBtn = document.createElement('div');

        let btnEditar = document.createElement('button');
        btnEditar.classList.add('btn__editar');

        let btnExcluir = document.createElement('button');
        btnExcluir.classList.add('btn__editar');

        let iEditar = document.createElement('i');
        iEditar.classList.add('fa-sharp');
        iEditar.classList.add('fa-solid');
        iEditar.classList.add('fa-pen');
        iEditar.setAttribute('data-btnEditar', '')

        let iExcluir = document.createElement('i');
        iExcluir.classList.add('fa-solid');
        iExcluir.classList.add('fa-sharp');
        iExcluir.classList.add('fa-trash');
        iExcluir.setAttribute('data-btnExcluir', '')


        btnExcluir.appendChild(iExcluir);
        btnEditar.appendChild(iEditar);

        criaModalEditar(btnEditar, li);

        divBtn.appendChild(btnEditar);
        divBtn.appendChild(btnExcluir);
        li.appendChild(divBtn);
        li.appendChild(adicionaMacro());
        ul.appendChild(li);
        
        input.value = '';
    } 
}

function editarAlimento() {
    const capturaEditar = document.querySelectorAll('[data-btnEditar]')

        capturaEditar.forEach( (elemento) => {
            elemento.addEventListener('click', (e) => {
                const capturaPai = e.target.parentNode;
                const capturaDialog = capturaPai.querySelector('dialog');
                capturaDialog.showModal();
            })
        })
}

function excluirAlimento() {
    const capturaExcluir = document.querySelectorAll('[data-btnExcluir]');

    capturaExcluir.forEach( (elemento) => {
        elemento.addEventListener('click', (e) => {
            const capturaLi = e.target.parentNode.parentNode.parentNode;
            const capturaUl = capturaLi.parentNode;

            capturaLi.remove();
            
            somaValores(capturaUl);
        })
    })
}

function criaModalEditar(pai, li) {
    let dialog = document.createElement('dialog');
    dialog.classList.add('container__modal');

    let labelNome = document.createElement('label');
    labelNome.innerText = 'Nome:'
    labelNome.setAttribute('for', 'Nome');
    let inputNome = document.createElement('input');
    inputNome.setAttribute('id', 'Nome');
    inputNome.setAttribute('type', 'text');
    inputNome.setAttribute('placeholder', 'Arroz, Frango...');

    let labelQuantidade = document.createElement('label');
    labelQuantidade.innerText = 'Quantidade:'
    labelQuantidade.setAttribute('for', 'Quantidade');
    let inputQuantidade = document.createElement('input');
    inputQuantidade.setAttribute('id', 'Quantidade');
    inputQuantidade.setAttribute('type', 'number');
    inputQuantidade.value = 0;

    let labelCarboidrato = document.createElement('label');
    labelCarboidrato.innerText = 'Carboidratos:';
    labelCarboidrato.setAttribute('for', 'Carboidrato');
    let inputCarboidrato = document.createElement('input');
    inputCarboidrato.setAttribute('id', 'Carboidrato');
    inputCarboidrato.setAttribute('type', 'number');
    inputCarboidrato.value = 0;

    let labelProteina = document.createElement('label');
    labelProteina.setAttribute('for', 'Proteina');
    labelProteina.innerText = 'Proteinas:';
    let inputProteina = document.createElement('input');
    inputProteina.setAttribute('id', 'Proteina');
    inputProteina.setAttribute('type', 'number');
    inputProteina.value = 0;

    let labelGordura = document.createElement('label');
    labelGordura.setAttribute('for', 'Gordura');
    labelGordura.innerText = 'Gorduras:';
    let inputGordura = document.createElement('input');
    inputGordura.setAttribute('id', 'Gordura');
    inputGordura.setAttribute('type', 'number');
    inputGordura.value = 0;

    let div = document.createElement('div');
    div.classList.add('container__modal-div')

    let divNome = document.createElement('div');
    divNome.classList.add('container__modal-divMacro');

    let divQuantidade = document.createElement('div');
    divQuantidade.classList.add('container__modal-divMacro');

    let divCarbo = document.createElement('div');
    divCarbo.classList.add('container__modal-divMacro');

    let divProt = document.createElement('div');
    divProt.classList.add('container__modal-divMacro');

    let divGord = document.createElement('div');
    divGord.classList.add('container__modal-divMacro');

    let btn = document.createElement('button');
    btn.innerText = 'Confirmar'

    divNome.appendChild(labelNome);
    divNome.appendChild(inputNome);

    divQuantidade.appendChild(labelQuantidade);
    divQuantidade.appendChild(inputQuantidade);

    divCarbo.appendChild(labelCarboidrato);
    divCarbo.appendChild(inputCarboidrato);

    divProt.appendChild(labelProteina);
    divProt.appendChild(inputProteina);
    
    divGord.appendChild(labelGordura);
    divGord.appendChild(inputGordura);

    div.appendChild(divNome);
    div.appendChild(divQuantidade);
    div.appendChild(divCarbo);
    div.appendChild(divProt);
    div.appendChild(divGord);
    div.appendChild(btn);

    dialog.appendChild(div);

    pai.appendChild(dialog);

    eventoClickConfirmar(btn, inputQuantidade, inputCarboidrato, inputProteina, inputGordura, li, inputNome);

}

function adicionaMacro() {
    let divMacros = document.createElement('div');
    divMacros.classList.add('div__macro');

    let pQuantidade = document.createElement('p');
    pQuantidade.setAttribute('data-macro', 'quantidade');

    let pCarbo = document.createElement('p');
    pCarbo.setAttribute('data-macro', 'carbo');

    let pProte = document.createElement('p');
    pProte.setAttribute('data-macro', 'proteina');

    let pGord = document.createElement('p');
    pGord.setAttribute('data-macro', 'gordura');

    pQuantidade.innerText = 'Quantidade: 0';
    pCarbo.innerText = 'C: 0'
    pProte.innerText = 'P: 0';
    pGord.innerText = 'G: 0';

    divMacros.appendChild(pQuantidade);
    divMacros.appendChild(pCarbo);
    divMacros.appendChild(pProte);
    divMacros.appendChild(pGord);

    return divMacros;
}

function salvaInfoMacros(Q, C, P, G, btn, pai) {
    Q = btn.querySelector('#Quantidade');
    C = btn.querySelector('#Carboidrato');
    P = btn.querySelector('#Proteina');
    G = btn.querySelector('#Gordura');

    const pegaDivMacro = pai.parentNode.parentNode.parentNode;
    const pegaQuantidade = pegaDivMacro.querySelector('[data-macro=quantidade]');
    const pegaCarbo = pegaDivMacro.querySelector('[data-macro=carbo]');
    const pegaProteina = pegaDivMacro.querySelector('[data-macro=proteina]');
    const pegaGordura = pegaDivMacro.querySelector('[data-macro=gordura]');

    pegaQuantidade.innerText = `Quantidade(g): ${Q.value}`
    pegaCarbo.innerText = `C: ${C.value}`;
    pegaProteina.innerText = `P: ${P.value}`;
    pegaGordura.innerText = `G: ${G.value}`;

  somaValores(pegaDivMacro)
}

function eventoClickConfirmar(btn, inputQuantidade, inputCarboidrato, inputProteina, inputGordura, li, inputNome) {
    btn.addEventListener('click', (e) => {
        const pegaDivPai = e.target.parentNode;
        const pegaDialog = pegaDivPai.parentNode;

        salvaInfoMacros(inputQuantidade, inputCarboidrato, inputProteina, inputGordura, pegaDivPai, pegaDialog)
        
        if (inputNome.value != '') {
            const pegaNomeAlimento = li.childNodes[0];
            pegaNomeAlimento.nodeValue = inputNome.value;
        } 

        pegaDialog.close();
    })
}

function somaValores(pai) {
    const carbo = pai.parentNode.querySelectorAll('#Carboidrato');
    const proteina = pai.parentNode.querySelectorAll('#Proteina');
    const gordura = pai.parentNode.querySelectorAll('#Gordura');
    const pegaTotal = pai.parentNode.querySelector('h2');

    let somaCarbo = 0;
    let somaProteina = 0;
    let somaGordura = 0;
    let somaTotal = 0

    for (i = 0; i < carbo.length; i++) {

        somaCarbo += parseInt(carbo[i].value);
    }

    for (i = 0; i < proteina.length; i++) {

        somaProteina += parseInt(proteina[i].value);
    }

    for (i = 0; i < gordura.length; i++) {

        somaGordura += parseInt(gordura[i].value);
    }

    somaTotal = (somaCarbo * 4) + (somaProteina * 4) + (somaGordura * 9);

    pegaTotal.innerText = `Total\n ${somaTotal} Kcal`;
}