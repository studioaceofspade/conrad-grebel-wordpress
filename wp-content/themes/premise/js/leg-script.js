var legData = {};
var collection = {};
(function($) { 

$(document).ready(function() {
        // menuDropdown();      
        if($('#furniture-type').length > 0) {
            stepControls();
        }
        tabletopLegSizeController();
        setLegTableObject();
        setLegTablePricing();
        setLegTableRender();
        configureReview();
        reviewButtonController();
        editButtonController();
        monitorImage(); 
	});	

function reviewButtonController() {
    $('.review-jump').click(function(e) {
        e.preventDefault();
        
        $('.step.active').removeClass('active');
        $('.step[data-step-id="leg-review"]').addClass('active');
        
        if(legData.skips) {
            delete legData.skips;
        }
        setLegTableObject();
        setLegTablePricing();
        setLegTableRender();
        setRenderControls();
        configureReview();
        editButtonController();
    });
}

function editButtonController() {
    $('.edit').click(function(e) {
        e.preventDefault();
        
        $('.step.active').removeClass('active');
        $('.step[data-step-id="' + $(this).data('edit-step') + '"]').addClass('active');
        
        console.log($('.step[data-step-id="' + $(this).data('edit-step') + '"]'));
        
        if(legData.skips) {
            delete legData.skips;
        }
        
        setLegTableObject();
        setLegTablePricing();
        setLegTableRender();
        setRenderControls();
        configureReview();
    });
}

function menuDropdown() {
    $('.menu').click(function() {
        
        $trigger = $(this);
        $nav     = $('#main-nav');
        
        $nav.slideToggle('fast');
        
        if($trigger.hasClass('open')) {
            $trigger.removeClass('open');
        } else {
            $trigger.addClass('open');
        }
    });
}

function setRenderControls() {
    if($('.step.active').attr('data-display-render') == '1') {
        $('.render').show();
    } else {
        $('.render').hide();
    }   
}

function monitorImage() {
    $('.render .render-image').hide();
    $('.pgloading').show();
    imagesLoaded('.render' , function( instance ) {
        
        $('.pgloading').stop().fadeOut('fast',function() {
            $('.render .render-image').fadeIn('fast');
        });
        
    });
}

function stepControls() {
    optionSelectControls();
    stepMovementControls();
    stepPricingControls();
    optionNotificationControls();
    setRenderControls();
}

function configureReview() {
    
    $('.dynamic').empty();
    
    var output = '';
    
    $modelNumber = $('<tr>');
    $modelNumber
        .append('<td>Model Number</td>')
        .append('<td>custom100</td>');
    
    $dimensions = $('<tr>').append('<td>Table Dimensions</td>');
    $dimensions.append('<td>' + legData.dimensions.width + '" wide, ' + legData.dimensions.length + '" long');
    $dimensions.append('<td>');
    $dimensions.append('<td><a href="#" class="edit" data-edit-step="set-your-leg-table-size">Edit</a></td>');
    
    $dimensions2 = $('<tr>').append('<td></td>');
    $dimensions2.append('<td>' + legData.dimensions.width + '" wide, ' + legData.totalLength + '" long with leaves');
    $dimensions2.append('<td>');
    $dimensions2.append('<td><a href="#" class="edit" data-edit-step="set-your-leg-table-size">Edit</a></td>');
    
    $leaves = $('<tr>').append('<td>Number of Leaves</td>');
    $leaves.append('<td>' + legData.dimensions.leaves + '</td>');
    $leaves.append('<td>');
    $leaves.append('<td><a href="#" class="edit" data-edit-step="set-your-leg-table-size">Edit</a></td>');
    
    $('.dynamic').append($modelNumber);
    $('.dynamic').append($dimensions);
    $('.dynamic').append($dimensions2);
    $('.dynamic').append($leaves);
    
    for(step in legData) {
        
        if( step != 'dimensions' && 
            step != 'imageParts' && 
            step != 'selectedReference' &&
            step != 'skips' &&
            step != 'amount' &&
            step != 'totalLength' &&
            step != 'furnitureType') {
            
            var stepName    = legData[step].name;
            var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
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
            $edit   = $('<td><a href="#" class="edit" data-edit-step="' + step + '">Edit</a></td>');
            
            $row.append($name);
            $row.append($choice);
            $row.append($price);
            $row.append($edit);
            
            $('.dynamic').append($row);
        } 
    }   
}

function stepPricingControls() {
    $('.step[data-display-price="1"]').find('.price').show();
}

function setLegTablePricing() {
    $price = $('.price .total');
    
    var addons      = new Array();
    var percents    = new Array();
    
    for (var step in legData) {
        
        if(step != 'amount' && step != 'skips' && step != 'selectedReference' && step != 'furnitureType' && step != 'totalLength') {
        
            if("pricing" in legData[step]) {
                
                if("type" in legData[step].pricing) {
                    
                    if(legData[step].pricing.type == 'flat') {
                        addons.push(legData[step].pricing.rate);
                    } else if (legData[step].pricing.type == 'percentage') {
                        percents.push(legData[step].pricing.percent);
                    }
                }
                
                if("options" in legData[step].pricing) {
                    
                    for ( option in legData[step].pricing.options ) {
                        
                        if(legData[step].pricing.options[option].type == 'flat') {
                            if(legData['selectedReference'].indexOf(option) != -1) {
                                addons.push(legData[step].pricing.options[option].rate);
                            }
                        } else if(legData[step].pricing.options[option].type == 'percentage') {
                            if(legData['selectedReference'].indexOf(option) != -1) {
                                percents.push(legData[step].pricing.options[option].percent);
                            }
                        }                    
                    }
                    
                    // console.log(percents);
                    // console.log(addons);
                }
                
            } 
        }
    }
    
    var addonTotal = 0;
    for (var x = 0; x < addons.length; x++) {
        addonTotal += addons[x];
    }
    
    var prePercentagePrice = addonTotal + legData.dimensions.price;
    legData.dimensions.seats = seats;
    
    for (var y = 0; y < percents.length; y++) {
        prePercentagePrice = prePercentagePrice * (1 + percents[y]/100);
        
    }
    
    // Configure our base price based on the catalog
    // var cgPrice = (prePercentagePrice * ($('.retailer-meta').data('price-mod') / 100)).toFixed(2);
    
    var cgPrice = prePercentagePrice;
    
    // Set the pricing by retailer rules
    var markup = 100;
    if($('.retailer-meta').data('membership-level') == 'one') {
        markup = 100;
    } else if ($('.retailer-meta').data('membership-level') == 'two') {
        markup = 105;
    } else if ($('.retailer-meta').data('membership-level') == 'three') {
        markup = 110;
    }
    var retailerBase = cgPrice * (markup/100);
    
    // Add in the freight charges
    var strTest = $('.retailer-meta').data('freight-mod').toString();
    var retailerWithFreight = retailerBase;
    if($('.retailer-meta').data('freight-mod') > 0 && strTest.length > 0) {
        retailerWithFreight = retailerBase * (($('.retailer-meta').data('freight-mod') + 100)/100);
    }
    
    
    // Calculate the price without rounding rules
    var retailerFinalBeforeRounding = ($('.retailer-meta').data('price-mod') / 100) * retailerWithFreight;
    var retailerFinal = 0;
    var roundingRule = $('.retailer-meta').data('rounding-rule');
    
    
    switch(roundingRule) {
        
        case 'normal' : 
            retailerFinal = retailerFinalBeforeRounding;
            break;
            
        case 'round_cents' : 
            retailerFinal = Math.ceil(retailerFinalBeforeRounding) - .01;
            break;
            
        
        case 'round_cents_elementary' :
            retailerFinal = (100 * Math.floor((retailerFinalBeforeRounding + 50) / 100)) - .01;
            break;
            
        
        case 'round_cents_ceiling' :
            retailerFinal = (100 * Math.ceil(retailerFinalBeforeRounding / 100)) - .01;
            break;
            
            
        default :
            retailerFinal = retailerFinalBeforeRounding;
            break;
    }
    
    legData['amount'] = retailerFinal.toFixed(2);
    
    //legData['amount'] = (prePercentagePrice * ($('.retailer-meta').data('price-mod') / 100)).toFixed(2);
    
    $price.html(legData.amount);    
    
}

function optionNotificationControls() {
    $('.options .box').click(function(e) {
        e.preventDefault();
        
        if($(this).find('.notification-icon').length > 0) {
            $(this).find('[data-remodal-id]').remodal().open();
        }
        
    });
}

function optionSelectControls() {
    $('img').on('dragstart', function(event) { event.preventDefault(); });
    $('.options .box').click(function(e) {
        e.preventDefault();
        $box = $(this);
        
        if(!$box.hasClass('selected')) {
            $box.parents('.options').find('.selected').removeClass('selected');
            $box.addClass('selected');
        } 
        
        if($('.furniture-container').attr('id') == "leg-table") {
            
            if(legData.skips) {
                delete legData.skips;
            }
            setLegTableObject();
            setLegTablePricing();
            setLegTableRender();
            configureReview();
        }
    });
}

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

function setLegTableRender() {
    var tabletop    = legData.imageParts['edge-profile'];
    var tablebase   = legData.imageParts['leg-base'];
    var topColor    = legData.imageParts['top-color'];
    var bottomColor = legData.imageParts['bottom-color'];
    
    var chain = createLegTableChain(tabletop, tablebase, topColor, bottomColor);
    
    $('.render img').attr('src', chain);
    legData['imageParts'].url = chain;
    monitorImage();
        

}

function pricingByDimensions() {
    
    var dimensions  = {};
    
    // Check out the size of the table
    var tableLength = $('[data-option-id="leg-table-length"]').find('.count').html();
    var tableWidth  = $('[data-option-id="leg-table-width"]').find('.count').html();
    var tableLeaves = $('[data-option-id="leg-table-leaves"]').find('.count').html();
    
    dimensions['length'] = tableLength;
    dimensions['width']  = tableWidth;
    dimensions['leaves'] = tableLeaves;
    
    var tableArea = tableLength * tableWidth;
    var calculatedPrice = 0;
    
    if(tableArea <= 2520) {
        calculatedPrice = 729;
    } else if (tableArea <= 3024) {
        calculatedPrice = 829;
    } else if (tableArea <= 3432) {
        calculatedPrice = 1029;
    } else {
        calculatedPrice = 1099;
    }
    
    if('choose-a-leg-style' in legData) {
        if(legData['choose-a-leg-style'].selected[0] == 'adams') {
            calculatedPrice = calculatedPrice - 50;
        }
    }
    
    if(tableLength > 72 || tableWidth > 72 && tableLength <= 77 && tableLength <= 77) {
        calculatedPrice += 200
    } else if (tableLength > 78 || tableWidth > 78) {
        calculatedPrice += 400
    }
    

    
    if('choose-a-thickness' in legData) {
        if(legData['choose-a-thickness'].selected[0] == '1-thick') {
            if(tableLeaves > 1) {
                calculatedPrice += (tableLeaves-1)*80;
            }
        } else {
            if(tableLeaves > 1) {
                calculatedPrice += ((tableLeaves-1)*80)*1.3;
            }

        }
    }
    
    dimensions['price'] = calculatedPrice;
    
    legData['dimensions'] = dimensions;
    
    setLegTablePricing();
}

function setLegTableObject() {
    
    // Loop through each step to find the selected default option
    var selected    = new Array;
    var imageParts  = {};
    if($('#leg-table').data('edit') === '') {
        $('.step').each(function(index) {
            
            // Setup our variables
            $step = $(this);
            var name = $step.find('.step-header h2').html();
            var stepId = $step.data('step-id');
            
            var canProgress = false;
            try {
                if(legData.skips.indexOf(stepId) < 0) {
                   canProgress = true;
                }
            } catch (e) {
                canProgress = true;
            }
                
            if(canProgress) {
                
                pricingByDimensions();            
                
                // If this step contains something to be selected
                if($step.find('.selected').length > 0 ) {
                    
                    $selected = $step.find('.selected');
                    
                    // Figure out what we need to skip here
                    var skipString = $selected.siblings('.option-settings').find('.skips').data('steps');            
                    var skipArray;
                    
                    // If we have things we need to skip
                    if(skipString) {
                        skipArray = skipString.split(',');      
                    }
                    
                    // Handle pricing data on the object
                    $pricing        = $selected.siblings('.option-settings').find('.step-pricing');
                    
                    $relatedPricing = $selected.siblings('.option-settings').find('.option-pricing');
                    
                    var relatedPrices = {}
                    $relatedPricing.each(function(index) {
                        $optionPrice = $(this);
                        relatedPrices[$optionPrice.data('related-option')] = {
                            'type'      : $optionPrice.data('option-price-type'),
                            'rate'      : $optionPrice.data('option-flat-rate'),
                            'percent'   : $optionPrice.data('option-percentage')
                        }
                    });
                    
                    // Create a selected reference object
                    selected.push($selected.data('option-id'));        
                    
                    // Grab our renders
                    $renders        = $selected.siblings('.option-settings').find('.render-object');
                    
                    // Test to see if this is a normal render or one controlled by other options
                    var relatedRenderOption = $renders.first().attr('data-render-related');
                    if(typeof relatedRenderOption !== typeof undefined && relatedRenderOption !== false) {
    
                        var matched     = false;
                        var renderData  = {}
                        $renders.each(function() {
                            var $renderObject        = $(this);
                            var relatedRenderOption = $renderObject.data('render-related');
                            
                            if($('[data-option-id="' + relatedRenderOption + '"]').hasClass('selected') && matched == false) {
                            
                                renderData['related']   = $renderObject.data('render-related');
                                renderData['type']      = $renderObject.data('render-type');
                                renderData['image']     = $renderObject.data('render-image');
                                
                                var masks   = $renderObject.data('render-masks');
                                masks       = masks.split(',');
                                
                                renderData['masks'] = masks;
                                
                                matched = true;
                            } 
                            
                        });
                        
                        imageParts[renderData['type']] = renderData;
                        
                    } else {
                        // to-do: handle non-related render options   
                    }
                    
                    if($step.data('step-types') != '') {
                        var typeString = $step.data('step-types');
                        var typeArray = typeString.split(',');
                        
                        var $textureData = $selected.siblings('.option-settings').find('.texture-data');
                        
                        if(typeArray.indexOf('top-color') >= 0) {
                            imageParts['top-color'] = $textureData.data('texture-url');
                        }
                        
                        if(typeArray.indexOf('bottom-color') >= 0) {
                            imageParts['bottom-color'] = $textureData.data('texture-url');
                        }
                        
                    }
                    
                    
                    // Configure the object for the current step
                    legData[stepId] = {
                        'name'      : $step.find('.step-header h2').html(),
                        'selected'  : [$selected.data('option-id'),$selected.find('.title').text()],
                        'skip'      : skipArray,
                        'type'      : $step.data('step-types'),
                        'pricing'   : {
                            'type'      : $pricing.data('price-type'),
                            'rate'      : $pricing.data('flat-rate'),
                            'percent'   : $pricing.data('percentage'),
                            'options'   : relatedPrices
                        }
                    }
                    
                    console.log(stepId);
                    
                    
                    // See if we have any skips yet, if not add them in
                    if(!legData.hasOwnProperty('skips')) {
                        legData['skips'] = skipArray;
                    } else { // If we already have skips, fold in ones that do not exist yet
         
                        // Make sure that we even have any we may need to add in
                        if(skipArray) {
                            var previousSkips = legData['skips'];
                            
                            newSkips = arrayUnique(previousSkips.concat(skipArray));
                            
                            legData['skips'] = newSkips;
                        }
                    }            
                }
            } else {
                
                // If we are skipping it, remove it from our object
                delete legData[stepId];          
            }
        });
        legData['selectedReference'] = selected;
        legData['imageParts']        = imageParts; 
        legData['furnitureType']     = [$('.furniture-container').attr('id'), $('.furniture-container').data('type-title')];
    } else {
        console.log('Loading a table to be edited');
        loadCompletedTable();  
    }
    
    monitorImage();
    
    console.log(legData);
}

function loadCompletedTable() {
    
    getBuilds();
    
    legData = collection[$('#leg-table').data('edit')];
    
    console.log('running');
    
    for(step in legData) {
        if( step != 'dimensions' && 
            step != 'imageParts' && 
            step != 'selectedReference' &&
            step != 'skips' &&
            step != 'amount' &&
            step != 'furnitureType' &&
            step != 'totalWidth') {
                
            $('[data-step-id="' + step + '"]')
                .find('.selected')
                .removeClass('selected');
             $('[data-step-id="' + step + '"]')   
                .find('[data-option-id="' + legData[step].selected[0] + '"]')
                .addClass('selected');
                
            console.log('[data-option-id="' + legData[step].selected[0] + '"]');
        
        }
    }
    
    $('#leg-table').data('edit','');
}

function stepMovementControls() {
    
    $('.step-footer a.back').click(function(e) {
        
        var $button      = $(this);
        var $steps       = $('.step');
        var $activeStep  = $('.step.active');
        
        e.preventDefault();
        
        if($activeStep.index() == 0) {
            window.location.href = $button.attr('href');
        } else {
            
            $activeStep.removeClass('active');
            var halt = false;
            
            for(var n = 0; n < $('.step').length; n++) {
                if(moveBack(n, $steps, $activeStep) && !halt) {
                    var previous = $steps.get($activeStep.index() - (n + 1));
                    $(previous).addClass('active');
                    setRenderControls();
                    halt = true;
                    break;
                }
                    
            }
        }
        
    });
    
    $('.step-footer a.next').click(function(e) {
        
        var $button      = $(this);
        var $steps       = $('.step');
        var $activeStep  = $('.step.active');
        var totalSteps   = $('.step').length;
        
        e.preventDefault();
        
        if($activeStep.index() == totalSteps-1) {

            writeToLocalStorage();
            window.location.href = $button.attr('href');
            
        } else {
            $activeStep.removeClass('active');
            
            var halt = false;
            for(var n = 0; n < $('.step').length; n++) {
                if(moveForward(n, $steps, $activeStep) && !halt) {
                    var next = $steps.get($activeStep.index() + (n + 1));
                    console.log($activeStep.index() + (n + 1));
                    $(next).addClass('active');
                    setRenderControls();                    
                    halt = true;
                    break;
                }    
            }
        }
    });
}

function moveBack(amount, steps, step) { 
    var previous    = steps.get(step.index() - (amount+1));    
    var stepId      = $(previous).data('step-id');    

    if(legData.skips.indexOf(stepId) < 0) {
        return true;
    } else {
        return false;
    }  
}

function moveForward(amount, steps, step) {
    var next = steps.get(step.index() + amount+1);  
    var stepId = $(next).data('step-id');

    if(legData.skips.indexOf(stepId) < 0) {
        return true;
    } else {
        return false;
    }  
}

function writeToLocalStorage() {
    
    if(localStorage.getItem('builds')) {
        builds = JSON.parse(localStorage.getItem('builds'));
        if($('.furniture-container').attr('data-edit') === '') {
            builds.push(legData);
            console.log('we are not editing');
        } else {
            builds[$('.furniture-container').attr('data-edit')] = legData;
            console.log('we are editing');
        }
        localStorage.setItem('builds', JSON.stringify(builds));
    } else {
        var builds = [legData];
        console.log('we are pushing into a brand new build');
        localStorage.setItem('builds', JSON.stringify(builds));
    }
    
}

function getBuilds() {
    collection = JSON.parse(localStorage.getItem('builds'));
}

var maxLegLength 	= $('.length-control').data('maximum');
var minLegLength    = $('.length-control').data('minimum');

var maxLegWidth  	= $('.width-control').data('maximum');;
var minLegWidth     = $('.width-control').data('minimum');

var minLegLeaves    = $('.leaf-control').data('minimum');;
var maxLegLeaves    = $('.leaf-control').data('maximum');;

var legTable = {
	'length' 	: $('.length-control').data('default'),
    'width'     : $('.width-control').data('default'),
	'leaves'	: $('.leaf-control').data('default')
}

function tabletopLegSizeController() {
	
	setLegTableSize();
	setLegChairs();
	
	$('.measurement-controls .fa').click(function(e) {
		e.preventDefault();
		
		console.log('A control was clicked for leg table sizing.');
		
		$button = $(this);
		
		var target = $button.data('table-target');
		var action = $button.data('table-action');
		
		updateLegTableData($button, target, action);
        
		setLegTableSize();
		setLegChairs();
        pricingByDimensions();
        configureReview();
	});
	
}

function updateLegTableData(button, target, action) {
	// Determine how much we want to increase or decrease the selected property
	var adjustAmount = 0;
	if(action == 'increase') {
		adjustAmount = -1;
	} else {
		adjustAmount = 1;
	}
	
	if(target == 'length') {
		if(legTable[target] + adjustAmount <= maxLegLength && legTable[target] + adjustAmount >= minLegLength) {
            legTable[target] = legTable[target] + adjustAmount;
            
			button
                .parents('.measurement-controls')
                .find('.count')
                .html(legTable[target]);
            
			console.log('Adjusting table length by ' + adjustAmount + '".');
            console.log('Table length is now: '+legTable.length);
		}
	} else if(target == 'width') {
		
		if(legTable[target] + adjustAmount <= maxLegWidth && legTable[target] + adjustAmount >= minLegWidth) {
            legTable[target] = legTable[target] + adjustAmount;
            
			button
                .parents('.measurement-controls')
                .find('.count')
                .html(legTable[target]);
            
            
			if(legTable[target] < 42) {
                maxLegLeaves = 1;
                if(legTable['leaves'] > 1) {
                    legTable['leaves'] = 1;
                    $('.leaf-control .count').html('1');
                }
            } else {
                maxLegLeaves = 7;
            }
		}
	} else {

        if(legTable[target] + adjustAmount <= maxLegLeaves && legTable[target] + adjustAmount >= minLegLeaves) {
            console.log('attempting to evaluate leaves on a round table.');
            
            legTable[target] = legTable[target] + adjustAmount;
            
			button
                .parents('.measurement-controls')
                .find('.count')
                .html(legTable[target]);

        }
	}

}

function setLegTableSize() {

	$tablePane 	= $('#tabletop');
	$table      = $('#top-render');
	$leaves     = $('#leaves');

	
	var paneWidth 	= $tablePane.width();
	var paneHeight 	= $tablePane.height();
	
	$table.height(legTable.width*5);
	$table.width(legTable.length*5 + legTable.leaves*72);
	$leaves.height($table.height());	
    
    $leaves.empty();        
    for(var i = 0; i < legTable.leaves; i++) {
        $leaves.append('<div class="leaf"></div>');
    }
}

var seats = 0;

function setLegChairs() {

	var tbChairs = 0; // chairs on the top and bottom of the table
	var lrChairs = 0; // chairs on the left and right of the table
	
	tbChairs = Math.floor((legTable.length + legTable.leaves * 12) / 18) - 1;
	lrChairs = Math.floor((legTable.width - 12) / 18);
	
    // Display total size
    totalLength = legTable.length + legTable.leaves * 18;
    $('.length-measurement-calc').html(totalLength);
    
    legData.totalLength = totalLength;

    
	$('#top-chairs').empty();
	$('#bottom-chairs').empty();
	$('#left-chairs').empty();
	$('#right-chairs').empty();
	
	for( var i = 0; i < tbChairs; i++) {
		$('#top-chairs').append('<div class="chair-horizontal count-'+tbChairs+'"><div class="chair"></div></div>');
		$('#bottom-chairs').append('<div class="chair-horizontal count-'+tbChairs+'"><div class="chair"></div></div>');
	}
	
	for( var i = 0; i < lrChairs; i++) {
		$('#left-chairs').append('<div class="chair-vertical count-'+lrChairs+'"><div class="vct"><div class="vctr"><div class="vctd"><div class="chair"></div></div></div></div></div>');
		$('#right-chairs').append('<div class="chair-vertical count-'+lrChairs+'"><div class="vct"><div class="vctr"><div class="vctd"><div class="chair"></div></div></div></div></div>');
	}

    seats = tbChairs*2 + lrChairs*2;
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
    
})( jQuery )
