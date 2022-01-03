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