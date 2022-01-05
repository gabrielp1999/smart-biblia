async function buscarNomeLivro(){    
    const siglaLivro = getParameterByName("sigla");

    let capitulo = getParameterByName('capitulo');

    if(capitulo === null || capitulo === undefined){
        capitulo = 1;
    }

    const resultado = await axios.get(`${linkApi}/books/${siglaLivro}/`, opcoesAPI);
    const livro = resultado.data;    

    const nomeLivro = document.getElementById('nomeLivro');
    const grupoCapitulos = document.querySelector('.grupoCapitulos');

    nomeLivro.innerHTML = `${livro.name}:${capitulo}`;

    let conteudo = "";

    for (let i = 0; i < livro.chapters; i++) {
        let href = `/livro.html?sigla=${siglaLivro}&capitulo=${numeroCapitulo}`;
        if (window.location.href.indexOf(prefixURL) >= 0) {
            href = `/${prefixURL}${href}`;
        }
        const numeroCapitulo = i+1;
       conteudo += `<a class="capitulo" href="${href}">${numeroCapitulo}</a>`
    }

    grupoCapitulos.innerHTML = conteudo;
}

async function buscarVersiculos() {
    const siglaLivro = getParameterByName("sigla");
    let capitulo = getParameterByName('capitulo');

    if(capitulo === null || capitulo === undefined){
        capitulo = 1;
    }
    
    const resultado = await axios.get(`${linkApi}/verses/${versaoSelecionada}/${siglaLivro}/${capitulo}`, opcoesAPI);
    const livro = resultado.data;

    const listaversiculos = document.getElementById('listaversiculos');

    let conteudo = "";

    for(let versiculo of livro.verses){
        conteudo += `<li>${versiculo.text}</li>`
    }

    listaversiculos.innerHTML = conteudo;
    
}


function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

buscarNomeLivro()
buscarVersiculos()