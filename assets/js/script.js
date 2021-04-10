
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






//formata campo de valor
function formataValor(param){
    document.getElementById('form-input--valor').addEventListener('input',function(event) {
    if (this.value.length === 1) {this.value = '0'+this.value;}
    this.value = parseFloat(this.value.replace(/[^\d]/g,'').replace(/(\d\d?)$/,'.$1')).toFixed(2);
});

}








//formata campo de valor



function submitForm(param) {
    let selecionar = document.getElementById('form-combobox--itens').value;
    let mercadoria = document.getElementById('form-input--nome-mercadoria').value;
    let valor = document.getElementById('form-input--valor').value;
    console.log(selecionar + mercadoria + valor);
    console.log(param);
    if (selecionar == 'Compra') {
        selecionar = '-';
    } else {
        selecionar = '+';
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

function limpaLocalStorage() {
    window.localStorage.clear();
    return true;
}

window.addEventListener('load', (e) => {
    let listaCompleta = JSON.parse(localStorage.getItem('itensLista'));
    console.log('listaCompleta', listaCompleta);
    let linhaHTML = '';
    let soma = '0.00'
    if (typeof listaCompleta === 'undefined' || listaCompleta === null) {
        linhaHTML += '<div class="list-insert"><div class="list-insert-div"><span class="list-insert--simbolo">' +
            '</span><span class="list-insert--mercadoria">Nenhuma transação cadastrada</span></div>' +
            '<div class="list-insert-div"><span class="list-insert--valor"></span></div></div>';
        document.getElementById("list-todas-divs").innerHTML = linhaHTML;
    } else {

        for (let key in listaCompleta) {
            console.log('key ', key);
            console.log('listaCompleta ', listaCompleta);
            console.log(typeof (selecionar));
            let linha = listaCompleta[key];
            console.log('linha ', linha);

            if (linha['selecionar'] == '+') {
                soma += parseFloat(linha['valor']);
            } else {
                soma -= parseFloat(linha['valor']);
            }
            document.getElementById("list-insert--valor").innerHTML = 'R$ ' + soma;
            if (soma > 0) {
                document.getElementById("list-insert--valor-label").innerHTML = '[Lucro]';
            } else if (soma > 0) {
                document.getElementById("list-insert--valor-label").innerHTML = '';
            } else {
                document.getElementById("list-insert--valor-label").innerHTML = '[Prejuízo]';
            }


            linhaHTML += '<div class="list-insert" id="list-insert"><div class="list-insert-div"><span class="list-insert--simbolo">' +
                linha['selecionar'] + '</span><span class="list-insert--mercadoria">' + linha['mercadoria'] +
                '</span></div><div class="list-insert-div"><span class="list-insert--valor"> R$ ' +
                linha['valor'] + '</span></div></div>';

        }
        linhaHTML += '</div>';
        console.log('soma ' + soma);

        document.getElementById("list-todas-divs").innerHTML = linhaHTML;
    }
})
    ;
