$(document).ready(function(){
     //Cache
     $main = $('.main');
     $table = $('#table');
     $total = $('#total');
     $submit = $('.btn');
     $form = $('.needs-validation');
     $message = $('.message');


    
      $form.submit(function (e) {
        e.preventDefault();
        let $name = $('#name').val();
        let $number = $('#number').val();
        let $email = $('#email').val();
        let $adress = $('#adress').val();
        //Email validering
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  
         if($name === '' || $name.length < 3 || $.isNumeric($name)){
          $('#name').siblings('.invalid-feedback').show();
          e.preventDefault();
         }
         else{
          $('#name').siblings('.invalid-feedback').hide();
          $('a').attr('href', 'kvitto.html');
         }
         if ($number === '' || $number.length < 10 || isNaN($number)){
          $('#number').siblings('.invalid-feedback').show();
          e.preventDefault();
         }
         else{
          $('#number').siblings('.invalid-feedback').hide();
          $('a').attr('href', 'kvitto.html');
         }
         if(!reg.test($email) || $email.length < 5) {
          $('#email').siblings('.invalid-feedback').show();
          e.preventDefault();
         }
         else{
          $('#email').siblings('.invalid-feedback').hide();
          $('a').attr('href', 'kvitto.html');
         }
         if($adress === ''){
          $('#adress').siblings('.invalid-feedback').show();
          e.preventDefault();
         }
         else{
          $('#adress').siblings('.invalid-feedback').hide();
          $('a').attr('href', 'kvitto.html');
         }

        });

   

  
    
   //Fyller på tabellen
    function fillList() {
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
    $total.text(`Totalsumma: ${total} kr`);
    }
   fillList()
  

});