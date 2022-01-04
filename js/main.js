let listaLivros = [];

 async function encontrarLivros(){
    let resultado = await axios.get("https://www.abibliadigital.com.br/api/books", {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBKYW4gMDMgMjAyMiAyMjoyMDo1MCBHTVQrMDAwMC5mbGlwZ2dzQGdtYWlsLmNvbSIsImlhdCI6MTY0MTI0ODQ1MH0.pUjeniyc77c0NC8z3uKsj0AmggL-i_voe10kVhDZu84"
        }
    });

    listaLivros = resultado.data;
    buscarLivrosVelhoTestamento();
    buscarLivrosNovoTestamento();
}

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

async function buscarLivrosVelhoTestamento() {
    // let resultado = await axios.get("https://www.abibliadigital.com.br/api/books", {
    //     headers: {
    //         Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBKYW4gMDMgMjAyMiAyMjoyMDo1MCBHTVQrMDAwMC5mbGlwZ2dzQGdtYWlsLmNvbSIsImlhdCI6MTY0MTI0ODQ1MH0.pUjeniyc77c0NC8z3uKsj0AmggL-i_voe10kVhDZu84"
    //     }
    // });
    // let biblia = resultado.data;

    const livrosAntigoTestamento = document.querySelector('.livrosAntigoTestamento');

    let filtrarLivrosVT = listaLivros.filter(function(el){
        return el.testament === "VT";
    })


    let conteudo = "";
    for(let livro of filtrarLivrosVT){
        conteudo += `<li><a href="">${livro.name}</a></li>`
    }


    livrosAntigoTestamento.innerHTML = conteudo;
}

async function buscarLivrosNovoTestamento() {
    const livrosNovoTestamento = document.querySelector('.livrosNovoTestamento');

    let filtrarLivrosNT = listaLivros.filter(function(el){
        return el.testament === "NT";
    })


    let conteudo = "";
    for(let livro of filtrarLivrosNT){
        conteudo += `<li><a href="">${livro.name}</a></li>`
    }


    livrosNovoTestamento.innerHTML = conteudo;
}

async function buscarLivro(elemento){

    const livrosVelhoTestamento = document.querySelector('.livrosAntigoTestamento');
    const livrosNovoTestamento = document.querySelector('.livrosNovoTestamento');

    let filtrarLivro = listaLivros.filter(function(el){
        let resultado = el.name.toUpperCase().indexOf(elemento.value.toUpperCase());

        const resposta = resultado < 0 ?  false : true;
        return resposta;
    })

    let filtrarNT = filtrarLivro.filter(function(el){
        let resultado = el.testament === "NT";
        return resultado;
    });

    let filtrarVT = filtrarLivro.filter(function(el){
        let resultado = el.testament === "VT";
        return resultado;
    });

    
    let conteudoNT = "";
    let conteudoVT = "";

    for(let livro of filtrarNT){
        conteudoNT += `<li><a href="">${livro.name}</a></li>`
    }

    for(let livro of filtrarVT){
        conteudoVT += `<li><a href="">${livro.name}</a></li>`
    }

    livrosNovoTestamento.innerHTML = conteudoNT;
    livrosVelhoTestamento.innerHTML = conteudoVT;
}

encontrarLivros()
buscarVersoes();
buscarVersiculoAleatorio();





