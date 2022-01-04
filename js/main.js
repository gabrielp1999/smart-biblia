let listaLivros = [];
const opcoesAPI = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBKYW4gMDMgMjAyMiAyMjoyMDo1MCBHTVQrMDAwMC5mbGlwZ2dzQGdtYWlsLmNvbSIsImlhdCI6MTY0MTI0ODQ1MH0.pUjeniyc77c0NC8z3uKsj0AmggL-i_voe10kVhDZu84"
    }
};

const linkApi = "https://www.abibliadigital.com.br/api";
let versaoSelecionada = "nvi";

 async function encontrarLivros(){
    let resultado = await axios.get(`${linkApi}/books`, opcoesAPI);

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
    const resultado = await axios.get(`${linkApi}/verses/${versaoSelecionada}/random`, opcoesAPI);
    const api = resultado.data;

    const versiculoAleatorio = document.getElementById('versiculoAleatorio');
    const livroAleatorio = document.getElementById('livroAleatorio');

    let conteudoLivro = `${api.book.name} ${api.chapter}:${api.number} `

    livroAleatorio.innerHTML = conteudoLivro;
    versiculoAleatorio.innerHTML = api.text;
}

function onClickVersao(sigla) {
    versaoSelecionada = sigla;
    buscarVersiculoAleatorio();
}

async function buscarVersoes() {
    const resultado = await axios.get(`${linkApi}/versions`, opcoesAPI);

    const ulVersoes = document.getElementById('ulVersoes');

    let conteudoVersao = ``;

    for(let versao of resultado.data) {
        conteudoVersao += `<li><button onclick="onClickVersao('${versao.version}')">${versao.version.toUpperCase()}</button></li>`
    }

    ulVersoes.innerHTML = conteudoVersao;

}

async function buscarLivrosVelhoTestamento() {
    const livrosAntigoTestamento = document.querySelector('.livrosAntigoTestamento');

    let filtrarLivrosVT = listaLivros.filter(function(el){
        return el.testament === "VT";
    })

    const conteudo = fazerForLista(filtrarLivrosVT);

    livrosAntigoTestamento.innerHTML = conteudo;
}

async function buscarLivrosNovoTestamento() {
    const livrosNovoTestamento = document.querySelector('.livrosNovoTestamento');

    let filtrarLivrosNT = listaLivros.filter(function(el){
        return el.testament === "NT";
    })

    const conteudo = fazerForLista(filtrarLivrosNT);

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

    const filtrarNT = fazerFiltro(filtrarLivro,"NT");
    const filtrarVT = fazerFiltro(filtrarLivro, "VT");

    const conteudoNT = fazerForLista(filtrarNT);
    const conteudoVT = fazerForLista(filtrarVT);

    livrosNovoTestamento.innerHTML = conteudoNT;
    livrosVelhoTestamento.innerHTML = conteudoVT;
}

function fazerFiltro(filtrarLivro, livro){
    let filtrar = filtrarLivro.filter(function(el){
        let resultado = el.testament === livro;
        return resultado;
    });

    return filtrar;
}

function fazerForLista(testamentos) {
    let conteudo = "";
    for(let livro of testamentos){
       conteudo += `<li><a href="">${livro.name}</a></li>`
    }
    return conteudo;
}

encontrarLivros();
buscarVersoes();
buscarVersiculoAleatorio();