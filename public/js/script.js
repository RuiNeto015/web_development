function currentPage(){
    switch (document.title){
        case "Clientes":
            document.getElementById("navCustomers").classList.add("active");
            break;
        case "Histórico de Compras":
            document.getElementById("navPurchases").classList.add("active");
            break;
        case "Livros":
            document.getElementById("navBooks").classList.add("active");
            break;
        case "Funcionários":
            document.getElementById("navEmployees").classList.add("active");
            break;
    }
}
window.onload = currentPage();

function loadModal(id, name){
    document.getElementById('deleteModal').style.display='block';
    document.getElementById('modalName').textContent = name;
    document.getElementById('deletebtn').setAttribute( "onclick", "location.href=window.location.href+'/delete/"+id+"';" );
}

function closeModal(){
    document.getElementById('deleteModal').style.display='none';
}
