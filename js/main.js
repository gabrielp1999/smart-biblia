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

    let resultado = await axios ("https://www.abibliadigital.com.br/api/verses/nvi/random");

    const versiculoAleatorio = document.getElementById('versiculoAleatorio');
    const livroAleatorio = document.getElementById('livroAleatorio');

    let conteudoLivro = `${resultado.data.book.name} ${resultado.data.chapter}.${resultado.data.number} `

    livroAleatorio.innerHTML = conteudoLivro;
    versiculoAleatorio.innerHTML = resultado.data.text;

    console.log(resultado.data)
}

buscarVersiculoAleatorio()




