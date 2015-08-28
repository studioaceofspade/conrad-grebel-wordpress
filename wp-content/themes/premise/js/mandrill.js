collection = {};
(function($) { 
	$(document).ready(function() {
        
        mandrillGetBuilds();
        loadCollection();
        
        restrictOptions();
        
        if(hasBuilds()) {
            buildUserEmail();
            buildAdminEmail();
        } else {
            $('.about-collections').hide();
            $('.add-some').show();
        }
        finalizeCollection();
        handlePrint();
        $('#normal-print').click(function(e) {
            e.preventDefault();
            window.print();
        });
    });
    
})( jQuery )

function handlePrint() {
    $('#print').click(function(e) {
        e.preventDefault();
        if(!$(this).hasClass('sent')) {
            sendMandrillPrintMail();
            $(this).attr('value', 'Print job created. Wait 60 seconds before attempting to print again.');
            
            startPrintTimer(60);
            
            $(this).parents('.remodal').append('<a id="final-killer" class="button" href="#">I\'m all done!</a>');
            $('#final-killer').click(function(e) {
                e.preventDefault();
                handleSuccess();
            });
        }
        $(this).addClass('sent');   
    });
}

function startPrintTimer(time) {
    
    if(time > 0) {
        var timeLeft        = time;
        var messageStart    = 'Print job created. Wait ';
        
        if(time === 1) {
            var messageEnd      =  ' second before attempting to print again.';
        } else {
            var messageEnd      =  ' seconds before attempting to print again.';
        }
        
        setTimeout(function() {
            
            $('#print').attr('value', messageStart + timeLeft + messageEnd);
            startPrintTimer(--timeLeft);
            
        }, 1000);
    } else {
        $('#print').removeClass('sent');
        $('#print').attr('value', 'Print');
    }
    
}

function restrictOptions() {
    
    hideChairs = false;
    hideTables = false;
    
    for(var n = 0; n < collection.length; n++) {
        if(collection[n].furnitureType[0] == 'leg-table') {
            hideTables = true;
        } else if(collection[n].furnitureType[0] == 'double-pedestal-table') {
            hideTables = true;
        } else if(collection[n].furnitureType[0] == 'single-pedestal-table') {
            hideTables = true;
        } else if(collection[n].furnitureType[0] == 'trestle-table') {
            hideTables = true;
        } else if(collection[n].furnitureType[0] == 'chair') {
            hideChairs = true;
        }
    }
    
    if(hideChairs == true) {
        $('[data-hide-when="chairs"]').hide();
    }
    
    if(hideTables == true) {
        $('[data-hide-when="tables"]').hide();
    }
    
    
}

function createBuilds() {
    var total = 0;
    for(var n = 0; n < collection.length; n++) {

        if(collection[n].furnitureType[0] == 'leg-table') {
            baseurl = $('.site-meta').data('site-url');
            editurl = baseurl + '/' + collection[n].furnitureType[0] + '/' + '?edit-collection=' + n;
            
            price       = parseFloat(collection[n].amount);
            
            total += price;
            
            $column = $('<div class="col-md-6">');
            $box    = $('<div class="box">');
            
            $imageBox  = $('<div class="image">');
            $image     = $('<img src="' + collection[n].imageParts.url + '">');
            $price     = $('<span class="build-total">$' + price.toFixed(2) + '</span>');
            
            $printPrice = $('<li>' + collection[n].furnitureType[1] + ': $' + price.toFixed(2) + '</li>');
            $priceLines = $('.print-line-price').find('ul');
            $printPrice.appendTo($priceLines);
            
            $delete    = $('<a href="#" class="delete-object" data-delete="' + n  + '">Remove This</a>');
            $imageBox.append($delete);
            $imageBox.append($price);
            $imageBox.append($image);
            
            $bar = $('<div class="bar">');
            $title = $('<h2 class="title">' + collection[n].furnitureType[1] +'</h2>');
    
            $editLink = $('<a href="' + editurl + '" class="button">');
            $editSpan = $('<span>edit</span>');
            $editIcon = $('<i class="fa fa-chevron-right"></i>');
            $editLink.append($editSpan);
            $editLink.append($editIcon);
            
            $bar.append($title);
            $bar.append($editLink);
            
            $box.append($imageBox);
            $box.append($bar);
            $column.append($box);
            
            $stage.append($column);
        } else if(collection[n].furnitureType[0] == 'chair') {
            baseurl = $('.site-meta').data('site-url');
            editurl = baseurl + '/' + collection[n].furnitureType[0] + '/' + '?edit-collection=' + n;
            
            price       = parseFloat(collection[n].amount);
            
            total += price;
            
            $column = $('<div class="col-md-6">');
            $box    = $('<div class="box">');
            
            $imageBox  = $('<div class="image">');
            if(collection[n]['choose-a-seat-type'].selected[0] == 'wooden-seat') {
                $image     = $('<img src="' + collection[n].imageParts.seatChair + '">');
            } else {
                $image     = $('<img src="' + collection[n].imageParts.cushionChair + '">');
            }
            $price     = $('<span class="build-total">$' + price.toFixed(2) + '</span>');
            
            $printPrice = $('<li>' + collection[n].furnitureType[1] + ': $' + price.toFixed(2) + '</li>');
            $priceLines = $('.print-line-price').find('ul');
            $printPrice.appendTo($priceLines);            
            
            $delete    = $('<a href="#" class="delete-object" data-delete="' + n  + '">Remove This</a>');
            $imageBox.append($delete);
            $imageBox.append($price);
            $imageBox.append($image);
            
            $bar = $('<div class="bar">');
            $title = $('<h2 class="title">' + collection[n].furnitureType[1] +'</h2>');
    
            $editLink = $('<a href="' + editurl + '" class="button">');
            $editSpan = $('<span>edit</span>');
            $editIcon = $('<i class="fa fa-chevron-right"></i>');
            $editLink.append($editSpan);
            $editLink.append($editIcon);
            
            $bar.append($title);
            $bar.append($editLink);
            
            $box.append($imageBox);
            $box.append($bar);
            $column.append($box);
            
            $stage.append($column);

        } else if(collection[n].furnitureType[0] == 'double-pedestal-table') {
            baseurl = $('.site-meta').data('site-url');
            editurl = baseurl + '/' + collection[n].furnitureType[0] + '/' + '?edit-collection=' + n;
            
            price       = parseFloat(collection[n].amount);
            
            total += price;
            
            $column = $('<div class="col-md-6">');
            $box    = $('<div class="box">');
            
            $imageBox  = $('<div class="image">');
            $image     = $('<img src="' + collection[n].imageParts.chain + '">');

            $price     = $('<span class="build-total">$' + price.toFixed(2) + '</span>');

            $printPrice = $('<li>' + collection[n].furnitureType[1] + ': $' + price.toFixed(2) + '</li>');
            $priceLines = $('.print-line-price').find('ul');
            $printPrice.appendTo($priceLines);            
            
            $delete    = $('<a href="#" class="delete-object" data-delete="' + n  + '">Remove This</a>');
            $imageBox.append($delete);
            $imageBox.append($price);
            $imageBox.append($image);
            
            $bar = $('<div class="bar">');
            $title = $('<h2 class="title">' + collection[n].furnitureType[1] +'</h2>');
    
            $editLink = $('<a href="' + editurl + '" class="button">');
            $editSpan = $('<span>edit</span>');
            $editIcon = $('<i class="fa fa-chevron-right"></i>');
            $editLink.append($editSpan);
            $editLink.append($editIcon);
            
            $bar.append($title);
            $bar.append($editLink);
            
            $box.append($imageBox);
            $box.append($bar);
            $column.append($box);
            
            $stage.append($column);
        } else if(collection[n].furnitureType[0] == 'single-pedestal-table') {
            baseurl = $('.site-meta').data('site-url');
            editurl = baseurl + '/' + collection[n].furnitureType[0] + '/' + '?edit-collection=' + n;
            
            price       = parseFloat(collection[n].amount);
            
            total += price;
            
            $column = $('<div class="col-md-6">');
            $box    = $('<div class="box">');
            
            $imageBox  = $('<div class="image">');
            $image     = $('<img src="' + collection[n].imageParts.chain + '">');

            $price     = $('<span class="build-total">$' + price.toFixed(2) + '</span>');
            
            $printPrice = $('<li>' + collection[n].furnitureType[1] + ': $' + price.toFixed(2) + '</li>');
            $priceLines = $('.print-line-price').find('ul');
            $printPrice.appendTo($priceLines);
            
            $delete    = $('<a href="#" class="delete-object" data-delete="' + n  + '">Remove This</a>');
            $imageBox.append($delete);
            $imageBox.append($price);
            $imageBox.append($image);
            
            $bar = $('<div class="bar">');
            $title = $('<h2 class="title">' + collection[n].furnitureType[1] +'</h2>');
    
            $editLink = $('<a href="' + editurl + '" class="button">');
            $editSpan = $('<span>edit</span>');
            $editIcon = $('<i class="fa fa-chevron-right"></i>');
            $editLink.append($editSpan);
            $editLink.append($editIcon);
            
            $bar.append($title);
            $bar.append($editLink);
            
            $box.append($imageBox);
            $box.append($bar);
            $column.append($box);
            
            $stage.append($column);

        } else if(collection[n].furnitureType[0] == 'trestle-table') {
            baseurl = $('.site-meta').data('site-url');
            editurl = baseurl + '/' + collection[n].furnitureType[0] + '/' + '?edit-collection=' + n;
            
            price       = parseFloat(collection[n].amount);
            
            total += price;
            
            $column = $('<div class="col-md-6">');
            $box    = $('<div class="box">');
            
            $imageBox  = $('<div class="image">');
            $image     = $('<img src="' + collection[n].imageParts.chain + '">');

            $price     = $('<span class="build-total">$' + price.toFixed(2) + '</span>');
            
            $printPrice = $('<li>' + collection[n].furnitureType[1] + ': $' + price.toFixed(2) + '</li>');
            $priceLines = $('.print-line-price').find('ul');
            $printPrice.appendTo($priceLines);
            
            $delete    = $('<a href="#" class="delete-object" data-delete="' + n  + '">Remove This</a>');
            $imageBox.append($delete);
            $imageBox.append($price);
            $imageBox.append($image);
            
            $bar = $('<div class="bar">');
            $title = $('<h2 class="title">' + collection[n].furnitureType[1] +'</h2>');
    
            $editLink = $('<a href="' + editurl + '" class="button">');
            $editSpan = $('<span>edit</span>');
            $editIcon = $('<i class="fa fa-chevron-right"></i>');
            $editLink.append($editSpan);
            $editLink.append($editIcon);
            
            $bar.append($title);
            $bar.append($editLink);
            
            $box.append($imageBox);
            $box.append($bar);
            $column.append($box);
            
            $stage.append($column);

        }
    }
    
    $('.price').show().find('.total').html(total.toFixed(2));
    $('.total-print-cost').html(total.toFixed(2));
    console.log(total);
}

function loadCollection() {
    
    $stage = $('.collection-arena').empty();
    
    if(collection) { 
        if(collection.length > 0) {
    
            createBuilds();
            
            $('.delete-object').click(function(e) {
                e.preventDefault();
                collection.splice($(this).data('delete'), 1);
                $(this).parents('.box').remove();
                
                if(collection.length > 0) {
                    localStorage.setItem('builds', JSON.stringify(collection));
                } else {
                    localStorage.clear();
                }
                
                $('.collection-arena').empty();
                createBuilds();
                if( collection.length == 0 )  {
                    $('.send-mail').hide();
                }
                
                
            });
        } else {
            $('.add-some').show();
        }
    }
}

function hasBuilds() {
    for(var prop in collection) {
        if (collection.hasOwnProperty(prop)) {
            return true;
        }
    }
    return false;
}

function sendMandrillMail() {
    $.ajax({
        type: 'POST',
        url: $('.ajax-url').data('ajax-url'),
        
        data: {
            action      : 'saos_build',
            to          : $('.retailer-meta').attr('data-email-users'),
            from_email  : 'noreply@conradgrebel.com',
            from_name   : 'Conrad Grebel Furniture',
            subject     : 'Your quote from Conrad Grebel',
            content     : $('.admin-email').find('.col-md-12').html(),
            template    : '',
        },

        beforeSend: function ()
        {
    
        },
        success: function(html)
        {
        
            console.log('Admin email sent');
            
        },
        error: function()
        {
    
        }
    
    });
}

function sendMandrillPrintMail() {
    
    var content = $('.user-email').find('.col-md-12').html() + $('.print-price').html();
    
    $.ajax({
        type: 'POST',
        url: $('.ajax-url').data('ajax-url'),
        
        data: {
            action      : 'saos_build',
            to          : $('.retailer-meta').attr('data-print-email'),
            from_email  : 'noreply@conradgrebel.com',
            from_name   : 'Conrad Grebel Furniture',
            subject     : 'A finalized order has been placed',
            content     : content,
            template    : '',
        },

        beforeSend: function ()
        {
    
        },
        success: function(html)
        {
        
            console.log('Print email sent');
            
        },
        error: function()
        {
    
        }
    
    });
}

function handleSuccess() {
    localStorage.clear();
    window.location.href = $('.ajax-url').attr('data-site-url') + '/thanks/';
}

function handleFailure() {
      displayMailError();
}

function sendMandrillUserMail() {
    $.ajax({
        type: 'POST',
        url: $('.ajax-url').data('ajax-url'),
        
        data: {
            action      : 'saos_user_build',
            from_email  : 'noreply@conradgrebel.com',
            from_name   : 'Conrad Grebel Furniture',
            template    : '',
            user_subject: 'Your quote from Conrad Grebel',
            user_email  : $('#user-email').val(),
            user_content: $('.user-email').find('.col-md-12').html(),
        },

        beforeSend: function ()
        {
    
        },
        success: function(html)
        {
            handleSuccess();
            console.log('User Email Sent');
            
        },
        error: function()
        {
            handleFailure();
        }
    
    });
   
}

function mandrillGetBuilds() {
    collection = JSON.parse(localStorage.getItem('builds'));
}

function buildAdminEmail() {    
    var output  = '';
    var total   = '';
    
    for(var i = 0; i<collection.length; i++) {
    
        if(collection[i].furnitureType[0] == 'leg-table') {
            legData = collection[i];
            
            var amount = '$' + legData.amount;
            
            $tableType = $('<h3>Your ' + legData.furnitureType[1] + ', Total cost of ' + amount + '</h3>');
            
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', legData.imageParts.url);
            
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($tableType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');
            
            $dimensions = $('<tr>').append('<td>Table Dimensions</td>');
            $dimensions.append('<td>' + legData.dimensions.width + '" wide, ' + legData.dimensions.length + '" long');
            
            $dimensions2 = $('<tr>').append('<td></td>');
            $dimensions2.append('<td>' + legData.dimensions.width + '" wide, ' + legData.totalLength + '" long with leaves');
            
            
            $leaves = $('<tr>').append('<td>Number of Leaves</td>');
            $leaves.append('<td>' + legData.dimensions.leaves + '</td>');
            
            $modelNumber = $('<tr>');
            $modelNumber
                .append('<td>Model Number</td>')
                .append('<td>custom100</td>');
            $dynamic.append($modelNumber);
            $dynamic.append($dimensions);
            $dynamic.append($dimensions2);
            $dynamic.append($leaves);
        
            for(var step in collection[i]) {
                if( step !== 'dimensions' && 
                    step !== 'imageParts' && 
                    step !== 'selectedReference' &&
                    step !== 'skips' &&
                    step !== 'amount' &&
                    step !== 'totalLength' &&
                    step !== 'furnitureType') {
                    
                    var stepName    = legData[step].name;
                    var optionName  = legData[step].selected[1];
                    var stepID      = step;
                    
                     if("pricing" in legData[step]) {
                        
                        if("type" in legData[step].pricing) {
                            
                            if(legData[step].pricing.type === 'flat') {
                                var price = '$' + (legData[step].pricing.rate * $('.retailer-meta').data('price-mod') / 100).toFixed(2);
                            } else if (legData[step].pricing.type === 'percentage') {
                                var price = legData[step].pricing.percent + '%';
                            } else {
                                var price = '';
                            }
                        }                    
                    } else {
                        var price = '';
                    }
                                
                    // Setup our HTML
                    $row    = $('<tr></tr>');
                    $name   = $('<td>' + stepName + '</td>');
                    $choice = $('<td>' + optionName + '</td>');
                    $price  = $('<td>' + price + '</td>');
                    
                    $row.append($name);
                    $row.append($choice);
                    // $row.append($price);
                    
                    $dynamic.append($row);
                }
            } 
            $furnitureTable.append($dynamic);
            $('.admin-furniture-objects').append($furnitureContainer);
        } else if(collection[i].furnitureType[0] == 'chair') {

            chairData = collection[i];
            
            var armAmount     = chairData.armAmount;
            var sideAmount    = chairData.sideAmount;

            $furnitureType = $('<br><h3>Your ' + chairData.furnitureType[1] + '(s), Total: $' + chairData.amount + '</h3>');
            
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', chairData['imageParts'].seatChair);
            
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($furnitureType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');    
            
            // chair style
            $chairStyle = $('<tr>');
            $('<td></td>').html('Chair Style').appendTo($chairStyle);
            $('<td></td>').html(chairData['choose-chair-style'].selected[1]).appendTo($chairStyle);
            $dynamic.append($chairStyle);
            
            // seat type
            $seatType = $('<tr>');
            $('<td></td>').html('Seat Type').appendTo($seatType);
            $('<td></td>').html(chairData['choose-a-seat-type'].selected[1]).appendTo($seatType);
            $dynamic.append($seatType);
            
            // wood type
            $woodType = $('<tr>');
            $('<td></td>').html('Wood Type').appendTo($woodType);
            $('<td></td>').html(chairData['choose-a-wood-type'].selected[1]).appendTo($woodType);
            $dynamic.append($woodType);
            
            $chairDistressing = $('<tr>');
            $('<td></td>').html('Chair Distressing').appendTo($chairDistressing);
            $('<td></td>').html(chairData['chair-distressing'].selected[1]).appendTo($chairDistressing);
            $dynamic.append($chairDistressing);
            
            $chairRub = $('<tr>');
            $('<td></td>').html('Chair Rub Through').appendTo($chairRub);
            if("chair-rub-through" in chairData) {
                $('<td></td>').html(chairData['chair-rub-through'].selected[1]).appendTo($chairRub);
            } else {
                   $('<td></td>').html('None').appendTo($chairRub);
            }
            $dynamic.append($chairRub);
            
            // Use a for loop to find our colors
            for(step in chairData) {
                
                if( step != 'dimensions' && 
                    step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'amount' &&
                    step != 'armAmount' &&
                    step != 'sideAmount' &&
                    step != 'furnitureType') {
                    
                    var stepName    = chairData[step].name;
                    var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
                    var stepID      = step;
                    
                    if("type" in chairData[step]) {
                        
                        if(chairData[step].type == 'bottom-color') { // seat
                            // base color
                            $seatColor = $('<tr>');
                            $('<td></td>').html('Seat Color/Fabric/Leather').appendTo($seatColor);
                            $('<td></td>').html(chairData[step].selected[1]).appendTo($seatColor);
                            $dynamic.append($seatColor);   
                        }
                        
                        if(chairData[step].type == 'top-color') { // chair base
                            $baseColor = $('<tr>');
                            $('<td></td>').html('Chair Base Color').appendTo($baseColor);
                            $('<td></td>').html(chairData[step].selected[1]).appendTo($baseColor);
                            $dynamic.append($baseColor);   
                        }
                        
                    }
                    

                    
                } 
            }
                        
            // armless quantity
            $armlessQuantity    = $('<tr>');
            $('<td></td>').html('Side Chairs, Model ' + chairData['choose-chair-style'].model + 'SC').appendTo($armlessQuantity);
            if(chairData.dimensions.quantity > 0) {
                $('<td></td>').html(chairData.dimensions.quantity + ' ($' + sideAmount + ' each)').appendTo($armlessQuantity);
            } else {
                $('<td></td>').html(chairData.dimensions.quantity).appendTo($armlessQuantity);
            }
            $dynamic.append($armlessQuantity);
            
            // arm quantity
            $armQuantity        = $('<tr>');
            $('<td></td>').html('Arm Chairs, Model ' + chairData['choose-chair-style'].model + 'AC').appendTo($armQuantity);
            if(chairData.dimensions.armQuantity > 0) {
                $('<td></td>').html(chairData.dimensions.armQuantity + ' ($' + armAmount + ' each)').appendTo($armQuantity);
            } else {
                $('<td></td>').html(chairData.dimensions.armQuantity).appendTo($armQuantity);
            }
            if(chairData.dimensions.armQuantity > 0) {
                $dynamic.append($armQuantity);
            }
            
            $furnitureTable.append($dynamic);
            $('.admin-furniture-objects').append($furnitureContainer);
        } else if(collection[i].furnitureType[0] == 'double-pedestal-table') {
            tableData = collection[i];
            
            var amount = '$' + tableData.amount;
            
            $tableType = $('<h3>' + tableData.furnitureType[1] + ', Total cost of ' + amount + '</h3>');
            
            // 2. Display the image
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', tableData.imageParts.chain);
            
            // 3. Setup the data table
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($furnitureType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');    
            
            // Variables for configuring the table output
            wood        = tableData['choose-a-wood-type'].selected[0];
           
            for(step in tableData) {
                console.log(step);
                if( step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'amount' &&
                    step != 'totalLength' &&
                    step != 'furnitureType') {
                    
                    var stepName    = tableData[step].name;
                    var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
                    var stepID      = step;
                    
                    // 3. Wood Type
                    if(step == 'choose-a-wood-type') {

                        $woodType = $('<tr>');
                        $('<td></td>').html('Wood Type').appendTo($woodType);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($woodType);
                        $dynamic.append($woodType);
                    }
                    
                    // 4. Table Choice
                    if(step == 'choose-a-double-pedestal-table') { 
                        $tableStyle = $('<tr>');
                        $('<td></td>').html('Table Style').appendTo($tableStyle);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($tableStyle);
                        $dynamic.append($tableStyle);
                        
                        $model = $('<tr>');
                        $model.append('<td>Model Number</td>');
                        $('<td>').html('Top: ' + tableData[step].model + 'T, Base: ' + tableData[step].model + 'B').appendTo($model);
                        $dynamic.append($model);
                       
                    }
                    
                    // 5. Edge Profile
                    if(step == 'choose-an-edge-profile') { 
                        $edgeProfile = $('<tr>');
                        $('<td></td>').html('Edge Profile').appendTo($edgeProfile);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($edgeProfile);
                        $dynamic.append($edgeProfile);
                    }
                    
                    // 6. Dimensions & leaves
                    if(step == 'dimensions') { 
                        $dimensions = $('<tr>');
                        $('<td></td>').html('Dimensions').appendTo($dimensions);
                        $('<td></td>').html(tableData.dimensions.width + 
                                            '" wide, ' + 
                                            tableData.dimensions.tlength +
                                            '" long').appendTo($dimensions);
                        $dynamic.append($dimensions);
                        
                        $dimensions2 = $('<tr>');
                        $('<td>').appendTo($dimensions2);
                        $('<td>').html(tableData.dimensions.width + '" wide, ' + tableData.totalLength + '" long with leaves').appendTo($dimensions2);
                        $dynamic.append($dimensions2);
                        
                        $leaves = $('<tr>');
                        $('<td></td>').html('Leaves').appendTo($leaves);
                        $('<td></td>').html(tableData.dimensions.leaves).appendTo($leaves);
                        $dynamic.append($leaves);
                    }

                    // 7. Thickness
                    /*
                    if(step == 'choose-a-thickness') { 
                        $thickness = $('<tr>');
                        $('<td></td>').html('Tabletop Thickness').appendTo($thickness);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($thickness);
                        $dynamic.append($thickness);
                    }
                    */
                    
                    // 8. Distressing
                    if(step == 'distressing-level') { 
                        $distressing = $('<tr>');
                        $('<td></td>').html('Distressing Level').appendTo($distressing);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($distressing);
                        $dynamic.append($distressing);
                    }
                    
                    // 9. Rub Though
                    if(step == 'rub-through') { 
                        $rub = $('<tr>');
                        $('<td></td>').html('Rub Through').appendTo($rub);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($rub);
                        $dynamic.append($rub);
                    }                
                    
                    // 10. & 11. Colors
                    if("type" in tableData[step]) {
                        
                        if(tableData[step].type == 'bottom-color' || tableData[step].type == 'top-color') {
                            $color = $('<tr>');
                            $('<td></td>').html('Table Base Color').appendTo($color);
                            $('<td></td>').html(tableData[step].selected[1]).appendTo($color);                            
                            $dynamic.append($color);
                        }
                    }
                    
                } 
            }

            $furnitureTable.append($dynamic);
            $('.admin-furniture-objects').append($furnitureContainer);
            
        } else if(collection[i].furnitureType[0] == 'single-pedestal-table') {

            tableData = collection[i];
            
            var amount = '$' + tableData.amount;
            
            $tableType = $('<h3>' + tableData.furnitureType[1] + ', Total: $' + tableData.amount + '</h3>');
            
            // 2. Display the image
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', tableData.imageParts.chain);
            
            // 3. Setup the data table
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($furnitureType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');    
            
            // Variables for configuring the table output
            wood        = tableData['choose-a-wood-type'].selected[0];
           
            for(step in tableData) {
                console.log(step);
                if( step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'amount' &&
                    step != 'totalLength' &&
                    step != 'furnitureType') {
                    
                    var stepName    = tableData[step].name;
                    var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
                    var stepID      = step;
                    
                    // 3. Wood Type
                    if(step == 'choose-a-wood-type') {

                        $woodType = $('<tr>');
                        $('<td></td>').html('Wood Type').appendTo($woodType);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($woodType);
                        $dynamic.append($woodType);
                    }
                    
                    // 4. Table Choice
                    if(step == 'choose-a-pedestal-style') { 
                        $tableStyle = $('<tr>');
                        $('<td></td>').html('Table Style').appendTo($tableStyle);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($tableStyle);
                        $dynamic.append($tableStyle);
                        $model = $('<tr>');
                        $model.append('<td>Model Number</td>');
                        $('<td>').html('Top: ' + tableData[step].model + 'T, Base: ' + tableData[step].model + 'B').appendTo($model);
                        $dynamic.append($model);
                    }
                    
                    // 5. Edge Profile
                    if(step == 'choose-an-edge-profile') { 
                        $edgeProfile = $('<tr>');
                        $('<td></td>').html('Edge Profile').appendTo($edgeProfile);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($edgeProfile);
                        $dynamic.append($edgeProfile);
                    }
                    
                    // 6. Dimensions & leaves
                    if(step == 'dimensions') { 
                        $dimensions = $('<tr>');
                        $('<td></td>').html('Dimensions').appendTo($dimensions);
                        $('<td></td>').html(tableData.dimensions.diameter + '" diameter').appendTo($dimensions);
                        $dynamic.append($dimensions);
                        
                        $dimensions2 = $('<tr>');
                        $('<td>').appendTo($dimensions2);
                        $('<td>').html(tableData.dimensions.diameter + '" wide, ' + tableData.totalLength + '" long with leaves').appendTo($dimensions2);
                        $dynamic.append($dimensions2);
                        
                        $leaves = $('<tr>');
                        $('<td></td>').html('Leaves').appendTo($leaves);
                        $('<td></td>').html(tableData.dimensions.leaves).appendTo($leaves);
                        $dynamic.append($leaves);
                    }

                    // 7. Thickness
                    /*
                    if(step == 'choose-a-thickness') { 
                        $thickness = $('<tr>');
                        $('<td></td>').html('Tabletop Thickness').appendTo($thickness);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($thickness);
                        $dynamic.append($thickness);
                    }
                    */
                    
                    // 8. Distressing
                    if(step == 'distressing-level') { 
                        $distressing = $('<tr>');
                        $('<td></td>').html('Distressing Level').appendTo($distressing);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($distressing);
                        $dynamic.append($distressing);
                    }
                    
                    // 9. Rub Though
                    if(step == 'rub-through') { 
                        $rub = $('<tr>');
                        $('<td></td>').html('Rub Through').appendTo($rub);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($rub);
                        $dynamic.append($rub);
                    }                
                    
                    // 10. & 11. Colors
                    if("type" in tableData[step]) {
                        
                        if(tableData[step].type == 'bottom-color' || tableData[step].type == 'top-color') {
                            $color = $('<tr>');
                            $('<td></td>').html('Table Base Color').appendTo($color);
                            $('<td></td>').html(tableData[step].selected[1]).appendTo($color);                            
                            $dynamic.append($color);
                        }
                    }
                    
                } 
            }

            $furnitureTable.append($dynamic);
            $('.admin-furniture-objects').append($furnitureContainer);
            
        } else if(collection[i].furnitureType[0] == 'trestle-table') {

            tableData = collection[i];
            
            var amount = '$' + tableData.amount;
            
            $tableType = $('<h3>Your ' + tableData.furnitureType[1] + ', Total cost of ' + amount + '</h3>');
            
            // 2. Display the image
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', tableData.imageParts.chain);
            
            // 3. Setup the data table
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($furnitureType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');    
            
            // Variables for configuring the table output
            wood        = tableData['choose-a-wood-type'].selected[0];
           
            for(step in tableData) {
                console.log(step);
                if( step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'amount' &&
                    step != 'furnitureType') {
                    
                    var stepName    = tableData[step].name;
                    var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
                    var stepID      = step;
                    
                    // 3. Wood Type
                    if(step == 'choose-a-wood-type') {

                        $woodType = $('<tr>');
                        $('<td></td>').html('Wood Type').appendTo($woodType);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($woodType);
                        $dynamic.append($woodType);
                    }
                    
                    // 4. Table Choice
                    if(step == 'choose-a-trestle-table') { 
                        $tableStyle = $('<tr>');
                        $('<td></td>').html('Table Style').appendTo($tableStyle);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($tableStyle);
                        $dynamic.append($tableStyle);
                        $model = $('<tr>');
                        $model.append('<td>Model Number</td>');
                        $('<td>').html('Top: ' + tableData[step].model + 'T, Base: ' + tableData[step].model + 'B').appendTo($model);
                        $dynamic.append($model);
                    }
                    
                    // 5. Edge Profile
                    if(step == 'choose-an-edge-profile') { 
                        $edgeProfile = $('<tr>');
                        $('<td></td>').html('Edge Profile').appendTo($edgeProfile);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($edgeProfile);
                        $dynamic.append($edgeProfile);
                    }
                    
                    // 6. Dimensions & leaves
                    if(step == 'dimensions') { 
                        $dimensions = $('<tr>');
                        $('<td></td>').html('Dimensions').appendTo($dimensions);
                        $('<td></td>').html(tableData.dimensions.width + 
                                            '" wide, ' + 
                                            tableData.dimensions.tlength +
                                            '" long').appendTo($dimensions);
                        $dynamic.append($dimensions);
                        
                    }
                                
                    // 7. Thickness
                    /*
                    if(step == 'choose-a-thickness') { 
                        $thickness = $('<tr>');
                        $('<td></td>').html('Tabletop Thickness').appendTo($thickness);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($thickness);
                        $dynamic.append($thickness);
                    }
                    */
                    
                    // 8. Distressing
                    if(step == 'distressing-level') { 
                        $distressing = $('<tr>');
                        $('<td></td>').html('Distressing Level').appendTo($distressing);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($distressing);
                        $dynamic.append($distressing);
                    }
                    
                    // 9. Rub Though
                    if(step == 'rub-through') { 
                        $rub = $('<tr>');
                        $('<td></td>').html('Rub Through').appendTo($rub);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($rub);
                        $dynamic.append($rub);
                    }                
                    
                    // 10. & 11. Colors
                    if("type" in tableData[step]) {
                        
                        if(tableData[step].type == 'bottom-color' || tableData[step].type == 'top-color') {
                            $color = $('<tr>');
                            $('<td></td>').html('Table Base Color').appendTo($color);
                            $('<td></td>').html(tableData[step].selected[1]).appendTo($color);                            
                            $dynamic.append($color);
                        }
                    }
                    
                } 
            }

            $furnitureTable.append($dynamic);
            $('.admin-furniture-objects').append($furnitureContainer);
        }
    }
}

function buildUserEmail() {
    var output = '';
    for(var i = 0; i<collection.length; i++) {
    
        if(collection[i].furnitureType[0] == 'leg-table') {
            $hr = $('<hr>');
            
            legData = collection[i];
            
            $tableType = $('<h3>Your ' + legData.furnitureType[1] + '</h3>');
            
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', legData['imageParts'].url);
            
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">')
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">')
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($tableType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');
            
            $dimensions = $('<tr>').append('<td>Table Dimensions</td>');
            $dimensions.append('<td>' + legData.dimensions.width + '" wide, ' + legData.dimensions.length + '" long');
            
            $dimensions2 = $('<tr>').append('<td></td>');
            $dimensions2.append('<td>' + legData.dimensions.width + '" wide, ' + legData.totalLength + '" long with leaves');
            
            $leaves = $('<tr>').append('<td>Number of Leaves</td>');
            $leaves.append('<td>' + legData.dimensions.leaves + '</td>');
            
            $modelNumber = $('<tr>');
            $modelNumber
                .append('<td>Model Number</td>')
                .append('<td>custom100</td>');
            $dynamic.append($modelNumber);
            $dynamic.append($dimensions);
            $dynamic.append($dimensions2);
            $dynamic.append($leaves);
        
            for(step in collection[i]) {
                if( step != 'dimensions' && 
                    step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'amount' &&
                    step != 'totalLength' &&
                    step != 'furnitureType') {
                    
                    var stepName    = legData[step].name;
                    var optionName  = legData[step].selected[1];
                    var stepID      = step;
                    
                     if("pricing" in legData[step]) {
                        
                        if("type" in legData[step].pricing) {
                            
                            if(legData[step].pricing.type == 'flat') {
                                var price = '$' + (legData[step].pricing.rate * $('.retailer-meta').data('price-mod') / 100).toFixed(2);
                            } else if (legData[step].pricing.type == 'percentage') {
                                var price = legData[step].pricing.percent + '%';
                            } else {
                                var price = '';
                            }
                        }                    
                    } else {
                        var price = '';
                    }
                                
                    // Setup our HTML
                    $row    = $('<tr></tr>');
                    $name   = $('<td>' + stepName + '</td>');
                    $choice = $('<td>' + optionName + '</td>');
                    $price  = $('<td>' + price + '</td>');
                    
                    $row.append($name);
                    $row.append($choice);
                    // $row.append($price);
                    
                    $dynamic.append($row);
                }
            } 
            $furnitureTable.append($dynamic);
            $('.user-furniture-objects').append($furnitureContainer);
        } else if(collection[i].furnitureType[0] == 'chair') {
            chairData = collection[i];
            
            $furnitureType = $('<h3>Your ' + chairData.furnitureType[1] + '(s)</h3>');
            
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', chairData['imageParts'].seatChair);
            
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($furnitureType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');    
            
            // chair style
            $chairStyle = $('<tr>');
            $('<td></td>').html('Chair Style').appendTo($chairStyle);
            $('<td></td>').html(chairData['choose-chair-style'].selected[1]).appendTo($chairStyle);
            $dynamic.append($chairStyle);
            
            // seat type
            $seatType = $('<tr>');
            $('<td></td>').html('Seat Type').appendTo($seatType);
            $('<td></td>').html(chairData['choose-a-seat-type'].selected[1]).appendTo($seatType);
            $dynamic.append($seatType);
            
            // wood type
            $woodType = $('<tr>');
            $('<td></td>').html('Wood Type').appendTo($woodType);
            $('<td></td>').html(chairData['choose-a-wood-type'].selected[1]).appendTo($woodType);
            $dynamic.append($woodType);
            
            $chairDistressing = $('<tr>');
            $('<td></td>').html('Chair Distressing').appendTo($chairDistressing);
            $('<td></td>').html(chairData['chair-distressing'].selected[1]).appendTo($chairDistressing);
            $dynamic.append($chairDistressing);
            
            $chairRub = $('<tr>');
            $('<td></td>').html('Chair Rub Through').appendTo($chairRub);
            if("chair-rub-through" in chairData) {
                $('<td></td>').html(chairData['chair-rub-through'].selected[1]).appendTo($chairRub);
            } else {
                   $('<td></td>').html('None').appendTo($chairRub);
            }
            $dynamic.append($chairRub);
            
            // Use a for loop to find our colors
            for(step in chairData) {
                
                if( step != 'dimensions' && 
                    step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'amount' &&
                    step != 'armAmount' &&
                    step != 'sideAmount' &&
                    step != 'furnitureType') {
                    
                    var stepName    = chairData[step].name;
                    var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
                    var stepID      = step;
                    
                    if("type" in chairData[step]) {
                        
                        if(chairData[step].type == 'bottom-color') { // seat
                            // base color
                            $seatColor = $('<tr>');
                            $('<td></td>').html('Seat Color/Fabric/Leather').appendTo($seatColor);
                            $('<td></td>').html(chairData[step].selected[1]).appendTo($seatColor);
                            $dynamic.append($seatColor);   
                        }
                        
                        if(chairData[step].type == 'top-color') { // chair base 
                            $baseColor = $('<tr>');
                            $('<td></td>').html('Chair Base Color').appendTo($baseColor);
                            $('<td></td>').html(chairData[step].selected[1]).appendTo($baseColor);
                            $dynamic.append($baseColor);   
                        }
                        
                    }
                    

                    
                } 
            }

            // armless quantity
            $armlessQuantity    = $('<tr>');
            $('<td></td>').html('Side Chairs, Model ' + chairData['choose-chair-style'].model + 'SC').appendTo($armlessQuantity);
            $('<td></td>').html(chairData.dimensions.quantity).appendTo($armlessQuantity);
            $dynamic.append($armlessQuantity);
            
            // arm quantity
            $armQuantity        = $('<tr>');
            $('<td></td>').html('Arm Chairs, Model ' + chairData['choose-chair-style'].model + 'AC').appendTo($armQuantity);
            $('<td></td>').html(chairData.dimensions.armQuantity).appendTo($armQuantity);
            if(chairData.dimensions.armQuantity > 0) {
                $dynamic.append($armQuantity);
            } 
            
            $furnitureTable.append($dynamic);
            $('.user-furniture-objects').append($furnitureContainer);
        } else if(collection[i].furnitureType[0] == 'double-pedestal-table') {
            tableData = collection[i];
            
            // 1. Set the furniture type            
            $furnitureType = $('<h3>' + tableData.furnitureType[1] + ', Total: $' + tableData.amount + '</h3>');
            
            // 2. Display the image
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', tableData.imageParts.chain);
            
            // 3. Setup the data table
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($furnitureType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic    = $('<tbody>');    
            
            // Variables for configuring the table output
            wood        = tableData['choose-a-wood-type'].selected[0];
           
            for(step in tableData) {
                console.log(step);
                if( step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'totalLength' &&
                    step != 'amount' &&
                    step != 'furnitureType') {
                    
                    var stepName    = tableData[step].name;
                    var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
                    var stepID      = step;
                    
                    // 3. Wood Type
                    if(step == 'choose-a-wood-type') {

                        $woodType = $('<tr>');
                        $('<td></td>').html('Wood Type').appendTo($woodType);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($woodType);
                        $dynamic.append($woodType);
                    }
                    
                    // 4. Table Choice
                    if(step == 'choose-a-double-pedestal-table') { 
                        $tableStyle = $('<tr>');
                        $('<td></td>').html('Table Style').appendTo($tableStyle);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($tableStyle);
                        $dynamic.append($tableStyle);
                        
                        $model = $('<tr>');
                        $model.append('<td>Model Number</td>');
                        $('<td>').html('Top: ' + tableData[step].model + 'T, Base: ' + tableData[step].model + 'B').appendTo($model);
                        $dynamic.append($model);
                    }
                    
                    // 5. Edge Profile
                    if(step == 'choose-an-edge-profile') { 
                        $edgeProfile = $('<tr>');
                        $('<td></td>').html('Edge Profile').appendTo($edgeProfile);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($edgeProfile);
                        $dynamic.append($edgeProfile);
                    }
                    
                    // 6. Dimensions & leaves
                    if(step == 'dimensions') { 
                        $dimensions = $('<tr>');
                        $('<td></td>').html('Dimensions').appendTo($dimensions);
                        $('<td></td>').html(tableData.dimensions.width + 
                                            '" wide, ' + 
                                            tableData.dimensions.tlength +
                                            '" long').appendTo($dimensions);
                        $dynamic.append($dimensions);
                        
                        $dimensions2 = $('<tr>');
                        $('<td></td>').appendTo($dimensions2);
                        $('<td></td>').html(tableData.dimensions.width + 
                                            '" wide, ' + 
                                            tableData.totalLength +
                                            '" long with leaves').appendTo($dimensions2);
                        $dynamic.append($dimensions2);
                        
                        $leaves = $('<tr>');
                        $('<td></td>').html('Leaves').appendTo($leaves);
                        $('<td></td>').html(tableData.dimensions.leaves).appendTo($leaves);
                        $dynamic.append($leaves);
                    }

                    // 7. Thickness
                    /*
                    if(step == 'choose-a-thickness') { 
                        $thickness = $('<tr>');
                        $('<td></td>').html('Tabletop Thickness').appendTo($thickness);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($thickness);
                        $dynamic.append($thickness);
                    }
                    */
                    
                    // 8. Distressing
                    if(step == 'distressing-level') { 
                        $distressing = $('<tr>');
                        $('<td></td>').html('Distressing Level').appendTo($distressing);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($distressing);
                        $dynamic.append($distressing);
                    }
                    
                    // 9. Rub Though
                    if(step == 'rub-through') { 
                        $rub = $('<tr>');
                        $('<td></td>').html('Rub Through').appendTo($rub);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($rub);
                        $dynamic.append($rub);
                    }                
                    
                    // 10. & 11. Colors
                    if("type" in tableData[step]) {
                        
                        if(tableData[step].type == 'bottom-color' || tableData[step].type == 'top-color') {
                            $color = $('<tr>');
                            $('<td></td>').html('Table Base Color').appendTo($color);
                            $('<td></td>').html(tableData[step].selected[1]).appendTo($color);                            
                            $dynamic.append($color);
                        }
                    }
                    
                } 
            }

            $furnitureTable.append($dynamic);
            $('.user-furniture-objects').append($furnitureContainer);
            
        } else if(collection[i].furnitureType[0] == 'single-pedestal-table') {            
            tableData = collection[i];
            
            // 1. Set the furniture type            
            $furnitureType = $('<h3>' + tableData.furnitureType[1] + ', Total: $' + tableData.amount + '</h3>');
            
            // 2. Display the image
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', tableData.imageParts.chain);
            
            // 3. Setup the data table
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($furnitureType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');    
            
            // Variables for configuring the table output
            wood        = tableData['choose-a-wood-type'].selected[0];
           
            for(step in tableData) {
                console.log(step);
                if( step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'amount' &&
                    step != 'totalLength' &&
                    step != 'furnitureType') {
                    
                    var stepName    = tableData[step].name;
                    var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
                    var stepID      = step;
                    
                    // 3. Wood Type
                    if(step == 'choose-a-wood-type') {

                        $woodType = $('<tr>');
                        $('<td></td>').html('Wood Type').appendTo($woodType);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($woodType);
                        $dynamic.append($woodType);
                    }
                    
                    // 4. Table Choice
                    if(step == 'choose-a-pedestal-style') { 
                        $tableStyle = $('<tr>');
                        $('<td></td>').html('Table Style').appendTo($tableStyle);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($tableStyle);
                        $dynamic.append($tableStyle);
                        
                        $model = $('<tr>');
                        $model.append('<td>Model Number</td>');
                        $('<td>').html('Top: ' + tableData[step].model + 'T, Base: ' + tableData[step].model + 'B').appendTo($model);
                        $dynamic.append($model);
                    }
                    
                    // 5. Edge Profile
                    if(step == 'choose-an-edge-profile') { 
                        $edgeProfile = $('<tr>');
                        $('<td></td>').html('Edge Profile').appendTo($edgeProfile);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($edgeProfile);
                        $dynamic.append($edgeProfile);
                    }
                    
                    // 6. Dimensions & leaves
                    if(step == 'dimensions') { 
                        $dimensions = $('<tr>');
                        $('<td></td>').html('Dimensions').appendTo($dimensions);
                        $('<td></td>').html(tableData.dimensions.diameter + '" diameter').appendTo($dimensions);
                        $dynamic.append($dimensions);
                        
                        $dimensions2 = $('<tr>');
                        $('<td></td>').appendTo($dimensions2);
                        $('<td></td>').html(tableData.dimensions.diameter + '" wide, ' + tableData.totalLength + '" long with leaves').appendTo($dimensions2);
                        $dynamic.append($dimensions2);                        
                        
                        $leaves = $('<tr>');
                        $('<td></td>').html('Leaves').appendTo($leaves);
                        $('<td></td>').html(tableData.dimensions.leaves).appendTo($leaves);
                        $dynamic.append($leaves);
                    }
                    

                    // 7. Thickness
                    /*
                    if(step == 'choose-a-thickness') { 
                        $thickness = $('<tr>');
                        $('<td></td>').html('Tabletop Thickness').appendTo($thickness);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($thickness);
                        $dynamic.append($thickness);
                    }
                    */
                    
                    // 8. Distressing
                    if(step == 'distressing-level') { 
                        $distressing = $('<tr>');
                        $('<td></td>').html('Distressing Level').appendTo($distressing);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($distressing);
                        $dynamic.append($distressing);
                    }
                    
                    // 9. Rub Though
                    if(step == 'rub-through') { 
                        $rub = $('<tr>');
                        $('<td></td>').html('Rub Through').appendTo($rub);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($rub);
                        $dynamic.append($rub);
                    }                
                    
                    // 10. & 11. Colors
                    if("type" in tableData[step]) {
                        
                        if(tableData[step].type == 'bottom-color' || tableData[step].type == 'top-color') {
                            $color = $('<tr>');
                            $('<td></td>').html('Table Base Color').appendTo($color);
                            $('<td></td>').html(tableData[step].selected[1]).appendTo($color);                            
                            $dynamic.append($color);
                        }
                    }
                    
                } 
            }

            $furnitureTable.append($dynamic);
            $('.user-furniture-objects').append($furnitureContainer);
            
        } else if(collection[i].furnitureType[0] == 'trestle-table') {
            
            tableData = collection[i];
            
            // 1. Set the furniture type            
            $furnitureType = $('<h3>' + tableData.furnitureType[1] + ', Total: $' + tableData.amount + '</h3>');
            
            // 2. Display the image
            $image = $('<img style="max-width:400px; margin: 20px 0 20px 0;">');
            $image.attr('src', tableData.imageParts.chain);
            
            // 3. Setup the data table
            $furnitureContainer = $('<div class="furniture-container">');
            $furnitureTable     = $('<table style=" width:100%;" class="review-table">');
            $tableHeader        = $('<thead>');
            
            $th1                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            $th2                = $('<th style="width: 33.33333%; text-align: left; border-bottom: 1px solid #ccc;">');
            
            $th1.html('Option Name');
            $th2.html('Your Choice');
            
            $tableHeader.append($th1);
            $tableHeader.append($th2);
            
            $furnitureTable.append($tableHeader);
            $furnitureContainer.append($furnitureType);
            $furnitureContainer.append($image);
            $furnitureContainer.append($furnitureTable);
            
            $dynamic = $('<tbody>');    
            
            // Variables for configuring the table output
            wood        = tableData['choose-a-wood-type'].selected[0];
           
            for(step in tableData) {
                console.log(step);
                if( step != 'imageParts' && 
                    step != 'selectedReference' &&
                    step != 'skips' &&
                    step != 'amount' &&
                    step != 'furnitureType') {
                    
                    var stepName    = tableData[step].name;
                    var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
                    var stepID      = step;
                    
                    // 3. Wood Type
                    if(step == 'choose-a-wood-type') {

                        $woodType = $('<tr>');
                        $('<td></td>').html('Wood Type').appendTo($woodType);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($woodType);
                        $dynamic.append($woodType);
                    }
                    
                    // 4. Table Choice
                    if(step == 'choose-a-trestle-table') { 
                        $tableStyle = $('<tr>');
                        $('<td></td>').html('Table Style').appendTo($tableStyle);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($tableStyle);
                        $dynamic.append($tableStyle);
                        $model = $('<tr>');
                        $model.append('<td>Model Number</td>');
                        $('<td>').html('Top: ' + tableData[step].model + 'T, Base: ' + tableData[step].model + 'B').appendTo($model);
                        $dynamic.append($model);
                    }
                    
                    // 5. Edge Profile
                    if(step == 'choose-an-edge-profile') { 
                        $edgeProfile = $('<tr>');
                        $('<td></td>').html('Edge Profile').appendTo($edgeProfile);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($edgeProfile);
                        $dynamic.append($edgeProfile);
                    }
                    
                    // 6. Dimensions & leaves
                    if(step == 'dimensions') { 
                        $dimensions = $('<tr>');
                        $('<td></td>').html('Dimensions').appendTo($dimensions);
                        $('<td></td>').html(tableData.dimensions.width + 
                                            '" wide, ' + 
                                            tableData.dimensions.tlength +
                                            '" long').appendTo($dimensions);
                        $dynamic.append($dimensions);
                        
                    }
                                
                    // 7. Thickness
                    /*
                    if(step == 'choose-a-thickness') { 
                        $thickness = $('<tr>');
                        $('<td></td>').html('Tabletop Thickness').appendTo($thickness);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($thickness);
                        $dynamic.append($thickness);
                    }
                    */
                    
                    // 8. Distressing
                    if(step == 'distressing-level') { 
                        $distressing = $('<tr>');
                        $('<td></td>').html('Distressing Level').appendTo($distressing);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($distressing);
                        $dynamic.append($distressing);
                    }
                    
                    // 9. Rub Though
                    if(step == 'rub-through') { 
                        $rub = $('<tr>');
                        $('<td></td>').html('Rub Through').appendTo($rub);
                        $('<td></td>').html(tableData[step].selected[1]).appendTo($rub);
                        $dynamic.append($rub);
                    }                
                    
                    // 10. & 11. Colors
                    if("type" in tableData[step]) {
                        
                        if(tableData[step].type == 'bottom-color' || tableData[step].type == 'top-color') {
                            $color = $('<tr>');
                            $('<td></td>').html('Table Base Color').appendTo($color);
                            $('<td></td>').html(tableData[step].selected[1]).appendTo($color);                            
                            $dynamic.append($color);
                        }
                    }
                    
                } 
            }

            $furnitureTable.append($dynamic);
            $('.user-furniture-objects').append($furnitureContainer);
        }
    }
}

function finalizeCollection() {
    
    if(!hasBuilds()) {
        $('.send-mail').hide();
    }
    
    $('#send-final-email').click(function(e) {
        e.preventDefault();
        $submit = $(this);
        
        var preparedFor = $('#user-name').val() + ', ' + $('#sales-name').val();
        var prepTrim    = preparedFor.replace(/(^,)|(,$)/g, "");
        
        var contactEmail = $('#user-email').val() + ', ' + $('#sales-email').val();
        var contactTrim    = contactEmail.replace(/(^,)|(,$)/g, "");
        
        $('.prepared-for').html(prepTrim);
        $('.contact-email').html(contactTrim);
        
        sendMandrillMail();
        sendMandrillUserMail();

    });
}

function displayMailError() {
    $('.sender .error').show();
}

function createLegTableChain(tabletop, tablebase, topColor, bottomColor) {
	
	// Configure our default URLs if nothing has been chosen yet
	if(topColor == '') {
		topColor = 'training/wood2.jpg';
	}
	
	if(bottomColor == '') {
		bottomColor = 'training/wood2.jpg';
	}	
	
	// Set the start of our string to the hosting location
	var baseURL = 'http://conradgrebel.ma.liquifire.com/conradgrebel?';
	var output = '';
    
	// Configure our top/base PNG urls
	output += 'source=name[top],url[file:' + tabletop.image +']&';
	output += 'source=name[base],url[file:' + tablebase.image + ']&';
	
	// Configure our top/base color JPEG urls
	output += 'source=url[file:' + topColor + '],name[textureOne]&';
	output += 'source=url[file:' + bottomColor + '],name[textureTwo]&';
	
	// Setup and texture our canvas for the top of the table
	output += 'blank=width[top.width],height[top.height],name[bg]&';
	output += 'tile=image[textureOne]&';
	output += 'select=image[top]&';
	
	// Iterate over the top masks for applying the texture

	for(i = 0; i < tabletop.masks.length; i++ ) {
		output += 'drape=texture[bg],grid[file:' + tabletop.masks[i] + ']&';
	}

	
	// Setup and texture our canvas for the bottom of the table
	output += 'blank=width[base.width],height[base.height],name[basebg]&'
	output += 'tile=image[textureTwo]&';
	output += 'select=image[base]&';
	
	
	// Iterate over the bottom  masks for applying the texture

	for(i = 0; i < tablebase.masks.length; i++ ) {
		output += 'drape=texture[basebg],grid[file:' + tablebase.masks[i] + ']&';
	}

	
	// Combine the top and base canvas
	output += 'composite=compose[over],image[top],x[0],y[0]&';
	
	// Output image settings
	output += 'trim&';
	output += 'scale=size[1080x460]&';
	output += 'sink=format[png]';

	// Encode the string as a usable URL
	var uri = encodeURI(output);
	var uri = baseURL + uri;
	return uri;
	
}

function printPricing() {
    
}