// Função para realçar a página atual na navbar
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

// Função para fechar o alerta (fade)
function closeAlert() {
    var fade= document.getElementById("alertMessage");
      
    var intervalID = setInterval(function () {
        if (!fade.style.opacity) {
            fade.style.opacity = 1;
        }
            
        if (fade.style.opacity > 0) {
            fade.style.opacity -= 0.25;
        }else {
            clearInterval(intervalID);
        }        
    }, 200);
}

// Funções MODAL
function loadModal(id, name){
    document.getElementById('deleteModal').style.display='block';
    document.getElementById('modalName').textContent = name;
    document.getElementById('deletebtn').setAttribute( "onclick", "location.href=window.location.href+'/delete/"+id+"';" );
}

function closeModal(){
    document.getElementById('deleteModal').style.display='none';
}

// Função para procurar um cliente pelo NIF e preencher automaticamente os campos da compra
function searchNIF(){
    var NIF = document.getElementById('inputNIF').value;
    var url = window.location.origin+'/customers/searchbyNIF/'+NIF;
    var request = new XMLHttpRequest();
    request.open('get', url, true);
    
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status){
            customer = JSON.parse(request.responseText);
            
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerEmail').value = customer.email;
            document.getElementById('customerPhone').value = customer.phoneNumber;
            document.getElementById('customerAddress').value = customer.address;
        }
    }
    
    request.send();
}

// Função para procurar um livro pelo ISBN e preencher automaticamente os campos da compra
function searchISBN(){
    var isbn = document.getElementById('inputSearchISBN').value;
    var url = window.location.origin+'/books/searchbyISBN/'+isbn;
    var request = new XMLHttpRequest();
    request.open('get', url, true);

    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status){
            books = JSON.parse(request.responseText);
            
            table = document.getElementById('bookList');
            tableLength = table.rows.length;

            var row = table.insertRow(-1);

            lastId = Number(table.rows[tableLength-1].id.split("row")[1])+1;
            row.id = 'row'+lastId;


            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var cell5 = row.insertCell(4);
            var cell6 = row.insertCell(5);

            cell1.insertAdjacentHTML('beforeend','<input type="text" class="form-control" placeholder="ISBN" id="inputISBN'+lastId+'" name="isbn" value="'+books[0].isbn+'" readonly>');
            cell2.insertAdjacentHTML('beforeend', '<input type="text" class="form-control" placeholder="Titulo" id="inputTitle'+lastId+'" name="title" value="'+books[0].title+'" readonly>');
            if (books.length>1)
                cell3.insertAdjacentHTML('beforeend', '<select class="form-control" id="conditionInput'+lastId+'" name="condition" onchange="getPriceByCondition(this)"><option value="" selected disabled hidden>Insira o estado</option><option value="'+books[0].condition+'">'+books[0].condition+'</option><option value="'+books[1].condition+'">'+books[1].condition+'</option></select>');
            else
                cell3.insertAdjacentHTML('beforeend', '<select class="form-control" id="conditionInput'+lastId+'" name="condition" onchange="getPriceByCondition(this)" required><option value="" selected disabled hidden>Insira o estado</option><option value="'+books[0].condition+'">'+books[0].condition+'</option>');
            cell4.insertAdjacentHTML('beforeend', '<input type="number" class="form-control" placeholder="Quantidade" id="inputQuantidade'+lastId+'" min="1" name="quantity" required>');
            cell5.insertAdjacentHTML('beforeend', '<input type="text" class="form-control" placeholder="Preço" id="inputPrice'+lastId+'" name="price"  readonly>');
            cell6.insertAdjacentHTML('beforeend', '<i class="fa-solid fa-trash-can icons" onclick="removeItem(this)">');
        }
    }

    request.send();
}

// Função para mostrar o preco de acordo com a condição do livro
function getPriceByCondition(element){
    var condition = element.options[element.selectedIndex].value;
    id = element.id.split("conditionInput")[1];
    
    var isbn = document.getElementById('inputISBN'+id).value;
    var url = window.location.origin+'/books/searchbyISBN/'+isbn+'/'+condition;
    
    var request = new XMLHttpRequest();
    request.open('get', url, true);
    
    request.onreadystatechange = function(){
        if (this.readyState == 4 && this.status){
            book = JSON.parse(request.responseText);
            document.getElementById('inputPrice'+id).value = book.price;

        }
    }

    request.send();
}

// Função para remover livro da lista de compras
function removeItem(btn){
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Função para mostrar e esconder palavra-passe no editar dos funcionários
function myFunction() {
    var x = document.getElementById("passwordInput");
    
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
