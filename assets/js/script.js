
function validaCampos(param) {
    if (
        document.getElementById('form-combobox--itens').value == '' ||
        document.getElementById('form-input--nome-mercadoria').value == '' ||
        document.getElementById('form-input--valor').value == ''
    ) {
        document.getElementById('form--mensagem-erro').innerHTML = 'Todos os campos devem ser preenchidos!';
        return false;
    } else if (
        document.getElementById('form-input--valor').value == '0.00' ||
        document.getElementById('form-input--valor').value == '0,00' ||
        document.getElementById('form-input--valor').value <= '0'
    ) {
        document.getElementById('form--mensagem-erro').innerHTML = 'Preencha um valor valido!';
        return false;
    } else
        submitForm(param);
        return false;
}


function mascaraValor(param) {
    let valor = document.getElementById('form-input--valor').addEventListener('input', (e) => {
        e.target.value = document.getElementById('form-input--valor').value;
        e.target.value = e.target.value.replace(/\D/g, ""); //remove todos caracteres nao numeros
        e.target.value = e.target.value.replace(/\B(?=(\d{,2})+(?!\d))/, ".");//.replace(/^(\d{2})(\d)/,"$1.$2");
        console.log(e.target.value);
    });

}

function submitForm(param) {
    let selecionar = document.getElementById('form-combobox--itens').value;
    let mercadoria = document.getElementById('form-input--nome-mercadoria').value;
    let valor = document.getElementById('form-input--valor').value;
    console.log(selecionar + mercadoria + valor);
    console.log(param);
    if (selecionar == 'Compra') {
        selecionar = '+';
    } else {
        selecionar = '-';
    }

        adicionaNaLista(selecionar, mercadoria, valor);
        return false;

}

function adicionaNaLista(selecionar, mercadoria, valor) {
        let oldItens = JSON.parse(localStorage.getItem('itensLista')) || [];
        let newItem = {
            'selecionar': selecionar,
            'mercadoria': mercadoria,
            'valor': valor
        };
        oldItens.push(newItem);
        localStorage.setItem('itensLista', JSON.stringify(oldItens));
        console.log(JSON.parse(localStorage.getItem('itensLista')));   
}

 function limpaLocalStorage(){
     window.localStorage.clear();
     return true;
 }

window.addEventListener('load', (e) => {
    let listaCompleta = JSON.parse(localStorage.getItem('itensLista'));
    console.log('listaCompleta', listaCompleta);
    let linhaHTML = '';

    if ( typeof listaCompleta === 'undefined' ||   listaCompleta === null) {
        linhaHTML += '<div class="list-insert"><div class="list-insert-div"><span class="list-insert--simbolo">' +
        '</span><span class="list-insert--mercadoria">Nenhuma transação cadastrada</span></div>' +
        '<div class="list-insert-div"><span class="list-insert--valor"></span></div></div>';
    document.getElementById("list-todas-divs").innerHTML = linhaHTML;
    } else {
      
    for (let key in listaCompleta) {
        console.log('key ', key);
        console.log('listaCompleta ', listaCompleta);
        console.log(typeof(selecionar));
        let linha = listaCompleta[key];
        console.log('linha ', linha);


        linhaHTML += '<div class="list-insert" id="list-insert"><div class="list-insert-div"><span class="list-insert--simbolo">' +
             linha['selecionar'] + '</span><span class="list-insert--mercadoria">' + linha['mercadoria'] +
            '</span></div><div class="list-insert-div"><span class="list-insert--valor"> R$ ' +
            linha['valor'] + '</span></div></div>';

    }
    linhaHTML += '</div>';

    document.getElementById("list-todas-divs").innerHTML = linhaHTML;
}
})
    ;
