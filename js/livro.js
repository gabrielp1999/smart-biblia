async function buscarNomeLivro(){    
    const siglaLivro = getParameterByName("sigla");

    let capitulo = getParameterByName('capitulo');

    if(capitulo === null || capitulo === undefined){
        capitulo = "1";
    }

    const resultado = await axios.get(`${linkApi}/books/${siglaLivro}/`, opcoesAPI);
    const livro = resultado.data;    

    const nomeLivro = document.getElementById('nomeLivro');
    const grupoCapitulos = document.querySelector('.grupoCapitulos');
    const ulCapitulos = document.querySelector('#ulCapitulos');
    const titulo = document.querySelector('#titulo');

    titulo.innerHTML = `${livro.name} ${capitulo} - Smart-Bíblia`;

    nomeLivro.innerHTML = `${livro.name}:${capitulo}`;

    let conteudo = "";
    let conteudoUl = "";

    
    for (let i = 0; i < livro.chapters; i++) {
        const numeroCapitulo = i+1;
        let href = `/livro.html?sigla=${siglaLivro}&capitulo=${numeroCapitulo}`;
        if (window.location.href.indexOf(prefixURL) >= 0) {
            href = `/${prefixURL}${href}`;
        }

        let className = "";
        if (capitulo === numeroCapitulo.toString()) {
            className = "selecionado";
        }

       conteudo += `<a class="${className}" href="${href}">${numeroCapitulo}</a>`
    }

    for (let i = 0; i < livro.chapters; i++) {
        const numeroCapitulo = i+1;
        let href = `/livro.html?sigla=${siglaLivro}&capitulo=${numeroCapitulo}`;
        if (window.location.href.indexOf(prefixURL) >= 0) {
            href = `/${prefixURL}${href}`;
        }

        let className = "";
        if (capitulo === numeroCapitulo.toString()) {
            className = "selecionado";
        }

       conteudoUl += `<li><a class="${className}" href="${href}">${numeroCapitulo}</a></li>`
    }

    ulCapitulos.innerHTML = conteudoUl;    
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

    let conteudoTexto = "";

    for(let versiculo of livro.verses){
        conteudoTexto += `<li>${versiculo.text}</li>`
    }

    listaversiculos.innerHTML = conteudoTexto;
    
}

buscarNomeLivro()
buscarVersiculos()