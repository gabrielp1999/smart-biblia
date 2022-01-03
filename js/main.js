function onClickBtnFiltros() {
    let filtros = document.getElementById('filtrosLivros');
    let setaFiltros = document.getElementById('imgSetaFiltros');

    if(filtros.style.display === "block") {
        filtros.style.display = "none";
        setaFiltros.src = "./img/down.png";
    }else{
        filtros.style.display = "block";
        setaFiltros.src = "./img/up.png";
    }

}

async function buscarVersiculoAleatorio() {

    const resultado = await axios ("https://www.abibliadigital.com.br/api/verses/nvi/random");

    const versiculoAleatorio = document.getElementById('versiculoAleatorio');
    const livroAleatorio = document.getElementById('livroAleatorio');

    let conteudoLivro = `${resultado.data.book.name} ${resultado.data.chapter}:${resultado.data.number} `

    livroAleatorio.innerHTML = conteudoLivro;
    versiculoAleatorio.innerHTML = resultado.data.text;
}


async function buscarVersoes() {
    const resultado = await axios ("https://www.abibliadigital.com.br/api/versions");

    const ulVersoes = document.getElementById('ulVersoes');

    let conteudoVersao = ``

    for(let versao of resultado.data) {
        conteudoVersao += `<li><button href="">${versao.version.toUpperCase()}</button></li>`
    }

    ulVersoes.innerHTML = conteudoVersao;

}

buscarVersoes()
buscarVersiculoAleatorio()




