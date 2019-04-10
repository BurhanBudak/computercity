$(document).ready(function(){
     //Cache
     $main = $('.main');
     $table = $('#table');
     $total = $('#total');
     $submit = $('.btn');
     $form = $('.needs-validation');
    let $name = $('#name');
    let $number = $('#number');
    let $email = $('#email');
    let $adress = $('#adress');

    function validate(){
      //Email validering
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       ($name.val() === '' || $name.val().length < 3 || $.isNumeric($name.val())) ?
         $name.siblings('.invalid-feedback').show() :
         $name.siblings('.invalid-feedback').hide();
         ($number.val() === '' || $number.val().length < 10 || isNaN($number.val())) ?
         $number.siblings('.invalid-feedback').show() :
         $number.siblings('.invalid-feedback').hide();
         (!reg.test($email.val())) ?
         $email.siblings('.invalid-feedback').show() :
         $email.siblings('.invalid-feedback').hide();
         ($adress.val() ==='') ?
         $adress.siblings('.invalid-feedback').show() :
         $adress.siblings('.invalid-feedback').hide();
      
  };
  $submit.click('click', function (e) {
    validate();
    e.preventDefault();
  })

   

  
    
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