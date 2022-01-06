async function buscarVersiculoAleatorio() {
    const resultado = await axios.get(`${linkApi}/verses/${versaoSelecionada}/random`, opcoesAPI);
    const api = resultado.data;

    const versiculoAleatorio = document.getElementById('versiculoAleatorio');
    const livroAleatorio = document.getElementById('livroAleatorio');

    let conteudoLivro = `${api.book.name} ${api.chapter}:${api.number} `

    livroAleatorio.innerHTML = conteudoLivro;
    versiculoAleatorio.innerHTML = api.text;
}

async function buscarVersiculoAleatorio2() {
    const resultado = await axios.get(`${linkApi}/verses/${versaoSelecionada}/random`, opcoesAPI);
    const api = resultado.data;

    const versiculoAleatorio2 = document.getElementById('versiculoAleatorio2');
    const livroAleatorio2 = document.getElementById('livroAleatorio2');

    let conteudoLivro = `${api.book.name} ${api.chapter}:${api.number} `

    livroAleatorio2.innerHTML = conteudoLivro;
    versiculoAleatorio2.innerHTML = api.text;
}

buscarVersiculoAleatorio()
buscarVersiculoAleatorio2()