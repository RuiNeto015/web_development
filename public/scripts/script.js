function currentPage(){
    if (document.title == "Clientes") {
        document.getElementById("navClients").classList.add("active");
        return
    }
    if (document.title == "Livros") {
        document.getElementById("navBooks").classList.add("active");
        return
    }
    if (document.title == "Funcionários") {
        document.getElementById("navEmployees").classList.add("active");
        return
    }
}

window.onload = currentPage();