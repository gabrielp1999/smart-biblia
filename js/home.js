async function buscarVersiculoAleatorio() {
    const resultado = await axios.get(`${linkApi}/verses/${versaoSelecionada}/random`, opcoesAPI);
    const api = resultado.data;

    const versiculoAleatorio = document.getElementById('versiculoAleatorio');
    const livroAleatorio = document.getElementById('livroAleatorio');

    let conteudoLivro = `${api.book.name} ${api.chapter}:${api.number} `

    livroAleatorio.innerHTML = conteudoLivro;
    versiculoAleatorio.innerHTML = api.text;
}

buscarVersiculoAleatorio()