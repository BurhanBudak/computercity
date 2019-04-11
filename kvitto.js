$(document).ready(function(){
    $main = $('.main');
     $table = $('#table');
     $total = $('#total');
     $ref = $('#ref');
     fillList();
    //Fyller på tabellen
    function fillList() {
        let number = 1 + Math.floor(Math.random() * 100000);
        let total = 0;
        for (let i = 0; i < localStorage.length; i++) {      
        let key = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(key))
        let subtotal = item.val * item.price;
        total += subtotal;
        $('#table').append(
            `<tr id="${item.id}">
            <td> <img id="icon" src="${item.url}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${item.val} st</td>
            <td>${subtotal} kr</td> 
            </tr>`);
    }
    $ref.text(`Beställningsreference: ${number}`);
    $total.text(`Totalsumma: ${total} kr`);
    localStorage.clear();
    }
   
  
});