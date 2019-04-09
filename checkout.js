$(document).ready(function(){
     //Cache
     $main = $('.main');
     $table = $('#table');
     $total = $('#total');
     $submit = $('.btn');

   //   $submit.click('click', function(e){
   //      e.preventDefault();
   //   });
     (function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        let forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        let validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();

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