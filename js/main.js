let listaLivros = [];
const opcoesAPI = {
    headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1vbiBKYW4gMDMgMjAyMiAyMjoyMDo1MCBHTVQrMDAwMC5mbGlwZ2dzQGdtYWlsLmNvbSIsImlhdCI6MTY0MTI0ODQ1MH0.pUjeniyc77c0NC8z3uKsj0AmggL-i_voe10kVhDZu84"
    }
};

const linkApi = "https://www.abibliadigital.com.br/api";
let versaoSelecionada = "nvi";
const prefixURL = "smart-biblia";

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

function onClickVersao(sigla) {
    versaoSelecionada = sigla;
    buscarVersiculoAleatorio();
}

async function buscarLivrosVelhoTestamento() {
    const livrosAntigoTestamento = document.querySelector('.livrosAntigoTestamento');

    let livrosVTFiltrados = fazerFiltro(listaLivros, "VT");


    const conteudo = fazerForLista(livrosVTFiltrados);

    livrosAntigoTestamento.innerHTML = conteudo;
}

async function buscarLivrosNovoTestamento() {
    const livrosNovoTestamento = document.querySelector('.livrosNovoTestamento');

    let livrosNTFiltrados = fazerFiltro(listaLivros, "NT");

    const conteudo = fazerForLista(livrosNTFiltrados);

    livrosNovoTestamento.innerHTML = conteudo;
}

async function buscarLivro(elemento){

    const livrosVelhoTestamento = document.querySelector('.livrosAntigoTestamento');
    const livrosNovoTestamento = document.querySelector('.livrosNovoTestamento');

    let livrosFiltrados = listaLivros.filter(function(el){
        let resultado = el.name.toUpperCase().indexOf(elemento.value.toUpperCase());
        const resposta = resultado < 0 ?  false : true;
        return resposta;
    })

    const filtrarNT = fazerFiltro(livrosFiltrados,"NT");
    const filtrarVT = fazerFiltro(livrosFiltrados, "VT");

    const conteudoNT = fazerForLista(filtrarNT);
    const conteudoVT = fazerForLista(filtrarVT);

    livrosNovoTestamento.innerHTML = conteudoNT;
    livrosVelhoTestamento.innerHTML = conteudoVT;
}

function fazerFiltro(listaLivros, testamento){
    let filtrar = listaLivros.filter(function(el){
        let resultado = el.testament === testamento;
        return resultado;
    });

    return filtrar;
}

function fazerForLista(testamentos) {
    let conteudo = "";

    const siglaLivro = getParameterByName("sigla");

    for(let livro of testamentos){
        let href = `/livro.html?sigla=${livro.abbrev.pt}`;
        if (window.location.href.indexOf(prefixURL) >= 0) {
            href = `/${prefixURL}${href}`;
        }

        let className = "";

        if (siglaLivro === livro.abbrev.pt) {
            className = "selecionado";
        }
        
        conteudo += `<li class="${className}"><a href="${href}">${livro.name}</a></li>`
    }
    return conteudo;
}

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

encontrarLivros();