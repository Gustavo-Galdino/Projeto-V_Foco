const adicionaRefeicao = document.querySelector('[data-refeicao]');

let i = 1;

adicionaRefeicao.addEventListener('click', (e) => {
    criaTabela(e.target.parentNode)
    i++;
})


function criaTabela(main) {
    let section = document.createElement('section');
    section.classList.add('container');

    let div = document.createElement('div');

    let input = document.createElement('input');
    input.setAttribute('placeholder', 'Adicionar Alimento!')
    input.classList.add('container__input')

    let buttonOk = document.createElement('button');
    buttonOk.innerText = 'OK';
    buttonOk.classList.add('btn__input')

    buttonOk.addEventListener('click', () => {   
        adicionarAlimento(input, ul);
        editarAlimento();
    })

    let div2 = document.createElement('div');

    let ul = document.createElement('ul');
    ul.innerText = `Refeição ${i}`;

    section.appendChild(div);
    div.appendChild(input);
    div.appendChild(buttonOk);
    section.appendChild(div2);
    div2.appendChild(ul);
    
    main.appendChild(section)
}

function adicionarAlimento(input, ul) {
    if (input.value != ''){
        let li = document.createElement('li');
        li.classList.add('container__li')
        li.innerText = input.value;        
        
        let btnEditar = document.createElement('button');
        btnEditar.classList.add('btn__editar');

        let i = document.createElement('i');
        i.classList.add('fa-sharp');
        i.classList.add('fa-solid');
        i.classList.add('fa-pen');
        i.setAttribute('data-btnEditar', '')

        btnEditar.appendChild(i);

        criaModalEditar(btnEditar);

        li.appendChild(btnEditar);
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

function criaModalEditar(pai) {
    let dialog = document.createElement('dialog');

    let labelCarboidrato = document.createElement('label');
    labelCarboidrato.innerText = 'Carboidratos';
    let inputCarboidrato = document.createElement('input');

    let labelProteina = document.createElement('label');
    labelProteina.innerText = 'Proteinas';
    let inputProteina = document.createElement('input');

    let labelGordura = document.createElement('label');
    labelGordura.innerText = 'Gorduras';
    let inputGordura = document.createElement('input');

    labelCarboidrato.appendChild(inputCarboidrato);
    labelProteina.appendChild(inputProteina);
    labelGordura.appendChild(inputGordura);

    dialog.appendChild(labelCarboidrato);
    dialog.appendChild(labelProteina);
    dialog.appendChild(labelGordura);

    pai.appendChild(dialog);
}

function adicionaMacro() {
    let divMacros = document.createElement('div');
    divMacros.classList.add('div__macro');
    let pCarbo = document.createElement('p');
    let pProte = document.createElement('p');
    let pGord = document.createElement('p');

    pCarbo.innerText = 'C: 0';
    pProte.innerText = 'P: 0';
    pGord.innerText = 'G: 0';

    divMacros.appendChild(pCarbo);
    divMacros.appendChild(pProte);
    divMacros.appendChild(pGord);

    return divMacros;
}