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

    const resultado = await axios.get("https://www.abibliadigital.com.br/api/verses/nvi/random", {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBKYW4gMDMgMjAyMiAyMjoyMDo1MCBHTVQrMDAwMC5mbGlwZ2dzQGdtYWlsLmNvbSIsImlhdCI6MTY0MTI0ODQ1MH0.pUjeniyc77c0NC8z3uKsj0AmggL-i_voe10kVhDZu84"
        }
    });

    const versiculoAleatorio = document.getElementById('versiculoAleatorio');
    const livroAleatorio = document.getElementById('livroAleatorio');

    let conteudoLivro = `${resultado.data.book.name} ${resultado.data.chapter}:${resultado.data.number} `

    livroAleatorio.innerHTML = conteudoLivro;
    versiculoAleatorio.innerHTML = resultado.data.text;
}


async function buscarVersoes() {
    const resultado = await axios.get("https://www.abibliadigital.com.br/api/versions", {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBKYW4gMDMgMjAyMiAyMjoyMDo1MCBHTVQrMDAwMC5mbGlwZ2dzQGdtYWlsLmNvbSIsImlhdCI6MTY0MTI0ODQ1MH0.pUjeniyc77c0NC8z3uKsj0AmggL-i_voe10kVhDZu84"
        }
    });

    const ulVersoes = document.getElementById('ulVersoes');

    let conteudoVersao = ``

    for(let versao of resultado.data) {
        conteudoVersao += `<li><button href="">${versao.version.toUpperCase()}</button></li>`
    }

    ulVersoes.innerHTML = conteudoVersao;

}

buscarVersoes();
buscarVersiculoAleatorio();




