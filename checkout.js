$(document).ready(function(){
     //Cache
     $main = $('.main');
     $table = $('#table');
     $total = $('#total');
     $submit = $('.btn');

     $submit.click('click', function(e){
        e.preventDefault();
     });

    function fillList() {
        let total = 0;
        for (let i = 0; i < localStorage.length; i++)  {      
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
            // $('#cartcount').text(count += Number(item.val));
    }
    $total.text(`Totalsumma: ${total} kr`);
    }
   fillList()
});