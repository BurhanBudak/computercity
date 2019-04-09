$(document).ready(function(){
   
    
    //Cache
    $main = $('.main');
    $cartcount = $('#cartcount');
    $overlay = $('.overlay');
    $header = $('.header');
    $basket = $('.fas');
    $trash = $('.removeBtn');
    $table = $('#table');
    $select = $('#select');
    $footer = $('.footer');
    $qty = $('td input#qty');
    $tr = $('tr');
    $message = $('#message');
    $checkout = $('#checkout');
    $btncheckout = $('#btncheckout');
    
    let count = 0;

    //Hämtar från databasen
    $.ajax({
        url: "demo.json",
        dataType: "json",
        success: function(data) {
        createItems(data.computers);
        }
    });
    

    //Skapar innehållet
    function createItems(...items) {
        let data = items[0];
        $.each(data , function (i,item) {
        $footer.before(
            `<article  class="items" id="item${item.id}">
            <h3 id="title">${item.brand}</h3>
            <img src="${item.url}" alt="computer" class="rounded">
            <p id='${item.price}'>${item.price} kr</p>
            <ul id="specifikation">
            <li>CPU: ${item.cpu}</li>
            <li>Lagning: ${item.repair}</li>
            <li>Storlek: ${item.screen}</li>
            </ul>
            <div class="input-group">
                <select class="custom-select" id="select">
                        <option selected value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                </select>
            <div class="input-group-append">
                <button class="btn btn-primary" type="button">Lägg till</button>
            </div>
            </div>
            </article>`
        )
        });   
    }//createItems

    addBack();


    $main.on('click','button.btn',function(){
    $article = $(this).parents('.items');
    $id = $article.attr('id');
    $value = Number($(this).parents('.input-group').children('#select').val()); //Selector värde
    //Om nyceln inte finns
    if(localStorage.getItem(`${$id}`)=== null){
    $title= $article.find('#title').text(); //Titel
    $price = $article.find('p').attr('id');
    $url = $article.find('.rounded').attr('src');
    if ($value ==! '') {
            let item = {
                id : $id,
                name : $title,
                price: Number($price),
                url:   $url,
                val : Number($value),
            };
            //Spara i localStorage
            localStorage.setItem($id, JSON.stringify(item));
            $cartcount.text(count += Number($value));
            addItem($id);
        }
        else return;    
    }
    //Om den finns ändra antalet.
    else{
        let item = JSON.parse(localStorage.getItem(`${$id}`));
        item.val += Number($value);
        $tr = $(`tr#${$id}`);
        let total = call(item.val, item.price);
        $tr.find('#total').text(`${item.name}: ${total} kr`);
        $tr.find('input#qty').val(item.val);
        $cartcount.text(count += Number($value));
        localStorage.setItem($id, JSON.stringify(item));
    }//Om localstorage har den specifika nyckeln
    });//click


    //Lägger till vald vara i tabellen
    function addItem(key) {
        let item = JSON.parse(localStorage.getItem(`${key}`));
        let total = item.val * item.price;
        $('#message').hide();
            $table.append(
                `<tr id="${item.id}">
                <td><button class="btn btn-outline-danger btn-sm" type="button" id="removeBtn"><i class="far fa-trash-alt"></i></button></td>
                    <td><button class="btn btn-warning btn-sm" type="button" id="minus"><i class="fas fa-minus"></i></button></td>
                    <td><input type="text" size="1" min="0" value="${item.val}" name="qty" id="qty"></td>
                    <td><button class="btn btn-success btn-sm" type="button" id="plus"><i class="fas fa-plus"></i></button></td>
                    <td><figure><img id="icon" src="${item.url}" alt="${item.name}">
                <figcaption>
                    <p id="total">${item.name}: ${total} kr</p>
                </figcaption>
                </figure></td>
                </tr>`)
    }
        

    
    
    $basket.click('click', function () {
        $overlay.addClass('.open').slideToggle(300).css('display','grid');
        check();
    });
    //Tar bort vald rad
    $table.on('click', 'button#removeBtn', function () {
        $id = $(this).parents('tr').attr('id');
        $value = $('td input#qty').val();
        $cartcount.text(count -= Number($value));
        $(this).parents('tr').remove();
        localStorage.removeItem($id);
        check();
    });
    //Lägger till
    $table.on('click', 'button#plus', function(){
        $id = $(this).parents('tr').attr('id');
        let $qty = $(this).parents('tr').find('input#qty');
        let $total = $(this).parents('tr').find('#total');
        let item = JSON.parse(localStorage.getItem($id));
        item.val +=1;
        let total = call(item.val, item.price)
        $total.text(`${item.name}: ${total} kr`);
        $qty.val(item.val);
        $cartcount.text(count+=1);
        localStorage.setItem($id, JSON.stringify(item));
    });
    //Ta bort
    $table.on('click', 'button#minus', function(){
        $id = $(this).parents('tr').attr('id');
        let $qty = $(this).parents('tr').find('input#qty');
        let $total = $(this).parents('tr').find('#total');
        let item = JSON.parse(localStorage.getItem($id));
        item.val -= 1;
        let total = call(item.val, item.price)
        $total.text(`${item.name}: ${total} kr`);
        $qty.val(item.val);
        if($qty.val() <=0){
            $(this).parents('tr').remove();
            localStorage.removeItem($id);
            check();
        }
        $cartcount.text(count-=1);
        localStorage.setItem($id, JSON.stringify(item));
        
    });
    //Ta bort allt
    $overlay.on('click', 'button#delete',function () {
       $table.empty();
       localStorage.clear();
       $cartcount.text(count = 0);
       check();
    });
    //Kontroll av innehållet
    function check(){
        if ($table.children().length == 0) {
            $message.show();
            $checkout.attr("disabled",true);
            $btncheckout.prop('disabled', true);
        }
        else{
            $message.hide();
            $checkout.attr("disabled",false);
            $btncheckout.prop('disabled', false);
        }
    };

    //Räknar
    function call(amount, price) {
        return amount * price;
    }

    function addBack() {
        for (let i = 0; i < localStorage.length; i++)  {      
        let key = localStorage.key(i);
        let item = JSON.parse(localStorage.getItem(key))
        let total = item.val * item.price;
        $('#table').append(
            `<tr id="${item.id}">
            <td><button class="btn btn-outline-danger" type="button" id="removeBtn"><i class="far fa-trash-alt"></i></button></td>
                <td><button class="btn btn-warning btn-sm" type="button" id="minus"><i class="fas fa-minus"></i></button></td>
                <td><input type="text" size="1" min="0" value="${item.val}" name="qty" id="qty"></td>
                <td><button class="btn btn-success btn-sm" type="button" id="plus"><i class="fas fa-plus"></i></button></td>
                <td><figure><img id="icon" src="${item.url}" alt="${item.name}">
            <figcaption>
                <p id="total">${item.name}: ${total} kr</p>
            </figcaption>
            </figure></td>
            </tr>`);
            $('#cartcount').text(count += Number(item.val));
    }
    }
   




  
});//ready