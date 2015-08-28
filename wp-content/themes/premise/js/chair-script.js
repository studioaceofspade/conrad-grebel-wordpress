var chairData = {};
var collection = {};
(function($) { 
	$(document).ready(function() {
        
        stepControls();
        setChairObject();
        monitorImage();
        chairQuantityHandler();
        configureReview();
        reviewButtonController();
        editButtonController();
        setChairPricing();
	});	

function reviewButtonController() {
    $('.review-jump').click(function(e) {
        e.preventDefault();
        
        $('.step.active').removeClass('active');
        $('.step[data-step-id="chair-review"]').addClass('active');
        $('.render.chair').show();
        
        if(chairData.skips) {
            delete chairData.skips;
        }
        
        setChairObject();
        setChairPricing();
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
        
        if(chairData.skips) {
            delete chairData.skips;
        }
        setChairObject();
        setChairPricing();
        setRenderControls();
        configureReview();
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

function setChairPricing() {
    
    $price = $('.price .total');
    
    var wood        = chairData['choose-a-wood-type'].selected[0];
    var seat        = chairData['choose-a-seat-type'].selected[0];
    var chair       = chairData['choose-chair-style'];
    var quantity    = $('[data-option-id="chairs-without-arms"]').find('.count').html();
    var armQuantity = $('[data-option-id="chairs-with-arms"]').find('.count').html();    
    
    var addons      = new Array();
    var percents    = new Array();
    var amount      = 0;
    var amountArms  = 0;
    
    for (var step in chairData) {
        
        if( step != 'amount' &&
            step != 'armAmount' &&
            step != 'sideAmount' && 
            step != 'skips' && 
            step != 'selectedReference' && 
            step != 'furnitureType') {
        
            if("pricing" in chairData[step]) {
                
                if("type" in chairData[step].pricing) {
                    
                    if(chairData[step].pricing.type == 'flat') {
                        addons.push(chairData[step].pricing.rate);
                    } else if (chairData[step].pricing.type == 'percentage') {
                        percents.push(chairData[step].pricing.percent);
                    }
                }
                
                if("options" in chairData[step].pricing) {
                    
                    for ( option in chairData[step].pricing.options ) {
                        
                        if(chairData[step].pricing.options[option].type == 'flat') {
                            if(chairData['selectedReference'].indexOf(option) != -1) {
                                addons.push(chairData[step].pricing.options[option].rate);
                            }
                        } else if(chairData[step].pricing.options[option].type == 'percentage') {
                            if(chairData['selectedReference'].indexOf(option) != -1) {
                                percents.push(chairData[step].pricing.options[option].percent);
                            }
                        }                    
                    }
                }
                
            } 
        }
    }

    if(wood == 'oak' || wood == 'maple') {
        amount      = chair.pricing.oak;
        amountArms  = chair.pricing['oak-arms'];
    } else {
        amount      = chair.pricing.cherry;
        amountArms  = chair.pricing['cherry-arms'];  
    }
    
    if(seat == 'fabric-seat') {
        amount      += chair.pricing.fabric;
        amountArms  += chair.pricing.fabric
    }
    
    if(seat == 'leather-seat') {
        amount      += chair.pricing.leather;
        amountArms  += chair.pricing.leather
    }
    
    var addonTotal = 0;
    for (var x = 0; x < addons.length; x++) {
        addonTotal += addons[x];
    }
    
    var amount      = addonTotal + amount;
    var amountArms  = addonTotal + amountArms;
    
    for (var y = 0; y < percents.length; y++) {
        amount      = amount * (1 + percents[y]/100);
        amountArms  = amount * (1 + percents[y]/100);
    }
    
    amountSide = amount;
    amountArm  = amountArms;
    
    amountNoArms      = amount * quantity;
    amountArms  = amountArms * armQuantity;
    
    var final = 0;
    final = amountNoArms + amountArms;
   
    var cgPrice = final;
    
    // Set the pricing by retailer rules
    var markup = 100;
    if($('.retailer-meta').data('membership-level') == 'one') {
        markup = 100;
    } else if ($('.retailer-meta').data('membership-level') == 'two') {
        markup = 105;
    } else if ($('.retailer-meta').data('membership-level') == 'three') {
        markup = 110;
    }
    var retailerBase    = cgPrice * (markup/100);
    var amountSide    = amountSide * (markup/100);
    var amountArm     = amountArm * (markup/100);
    
    // Add in the freight charges
    var strTest = $('.retailer-meta').data('freight-mod').toString();
    var retailerWithFreight = retailerBase;
    if($('.retailer-meta').data('freight-mod') > 0 && strTest.length > 0) {
        retailerWithFreight = retailerBase * (($('.retailer-meta').data('freight-mod') + 100)/100);
        amountSide = amountSide * (($('.retailer-meta').data('freight-mod') + 100)/100);
        amountArm = amountArm * (($('.retailer-meta').data('freight-mod') + 100)/100);
    }
    
    // Calculate the price without rounding rules
    var retailerFinalBeforeRounding = ($('.retailer-meta').data('price-mod') / 100) * retailerWithFreight;
    amountSide = amountSide * ($('.retailer-meta').data('price-mod') / 100);
    amountArm = amountArm * ($('.retailer-meta').data('price-mod') / 100);

    var retailerFinal = 0;
    var roundingRule = $('.retailer-meta').data('rounding-rule');
    
    switch(roundingRule) {
        
        case 'normal' : 
            retailerFinal = retailerFinalBeforeRounding;
            break;
            
        case 'round_cents' : 
            retailerFinal = Math.ceil(retailerFinalBeforeRounding) - .01;
            
            var difference = retailerFinal - retailerFinalBeforeRounding;
            var quantityDifference = difference / (parseInt(quantity) + parseInt(armQuantity));
            
            amountArm = amountArm + quantityDifference;
            amountSide = amountSide + quantityDifference;
            
            
            break;
            
        
        case 'round_cents_elementary' :
            retailerFinal = (100 * Math.floor((retailerFinalBeforeRounding + 50) / 100)) - .01;
            
            var difference = retailerFinal - retailerFinalBeforeRounding;
            var quantityDifference = difference / (parseInt(quantity) + parseInt(armQuantity));
            
            amountArm = amountArm + quantityDifference;
            amountSide = amountSide + quantityDifference;
            
            break;
            
        
        case 'round_cents_ceiling' :
            retailerFinal = (100 * Math.ceil(retailerFinalBeforeRounding / 100)) - .01;
            
            var difference = retailerFinal - retailerFinalBeforeRounding;
            var quantityDifference = difference / (parseInt(quantity) + parseInt(armQuantity));
            
            amountArm = amountArm + quantityDifference;
            amountSide = amountSide + quantityDifference;
            
            break;
            
            
        default :
            retailerFinal = retailerFinalBeforeRounding;
            break;
    }

    chairData.amount        = retailerFinal.toFixed(2);
    chairData.armAmount     = amountArm.toFixed(2);
    chairData.sideAmount    = amountSide.toFixed(2);
    
    $price.html(chairData.amount);  
    
}

function stepControls() {
    optionSelectControls();
    stepMovementControls();
    stepPricingControls();
    optionNotificationControls();
    setRenderControls();
}

function configureReview() {
    $review = $('.review-table');
    $('.chair-no-arm-quantity').html(chairData.dimensions.quantity);
    $('.chair-no-arm-edit').html('<a href="#" class="edit" data-edit-step="choose-arms">Edit</a>');
    $('.chair-arm-edit').html('<a href="#" class="edit" data-edit-step="choose-arms">Edit</a>');
    
    if(chairData['choose-chair-style'].pricing['oak-arms']) {
        $('.arm-row').show();
        $('.chair-arm-quantity').html(chairData.dimensions.armQuantity);
        if(chairData['choose-a-wood-type'].selected[0] == 'cherry' || chairData['choose-a-wood-type'].selected[0] == 'quarter-sawn-white-oak') {
            $('.chair-arm-cost').html('$' + (chairData['choose-chair-style'].pricing['cherry-arms'] - chairData['choose-chair-style'].pricing['cherry']) + ' per chair' );
        } else {
            $('.chair-arm-cost').html('$' + (chairData['choose-chair-style'].pricing['oak-arms'] - chairData['choose-chair-style'].pricing['oak']) + ' per chair' );
        }
    } else {
        $('.arm-row').hide();
    }
    
    if(chairData.dimensions.armQuantity == '0') {
        $('.arm-row').hide();
    }
    
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
                    
                    $review.find('.chair-seat-color').html(chairData[step].selected[1]);
                    
                    if('pricing' in chairData[step]) {
                        if('type' in chairData[step].pricing) {
                            if(chairData[step].pricing.type == 'flat') {
                                $review.find('.chair-seat-color-cost').html("$" + (chairData[step].pricing.flat * ($('.retailer-meta').data('price-mod') / 100)).toFixed(2));   
                            } else if (chairData[step].pricing.type == 'percentage') {
                                $review.find('.chair-seat-color-cost').html(chairData[step].pricing.percent + "%");  
                            } else { // we have a fabric or leather
                                
                                if(step == 'choose-seat-fabric') {
                                    $review.find('.chair-seat-color-cost').html('$'+(chairData['choose-chair-style'].pricing['fabric'] * ($('.retailer-meta').data('price-mod') / 100)).toFixed(2));
                                } else if (step == 'choose-seat-leather') {
                                    $review.find('.chair-seat-color-cost').html('$'+(chairData['choose-chair-style'].pricing['leather'] * ($('.retailer-meta').data('price-mod') / 100)).toFixed(2));
                                }
                                
                            }
                        }
                    }
                    
                    $review.find('.chair-seat-color-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
      
                }
                
                if(chairData[step].type == 'top-color') { // chair base
                
                    $review.find('.chair-base-color').html(chairData[step].selected[1]);
                    
                    if('pricing' in chairData[step]) {
                        if('type' in chairData[step].pricing) {
                            if(chairData[step].pricing.type == 'flat') {
                                $review.find('.chair-base-color-cost').html("$" + (chairData[step].pricing.flat* ($('.retailer-meta').data('price-mod') / 100)).toFixed(2));   
                            } else if (chairData[step].pricing.type == 'percentage') {
                                $review.find('.chair-base-color-cost').html(chairData[step].pricing.percent + "%");  
                            }
                        }
                    }
                    
                    $review.find('.chair-base-color-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                
                }
            }
            
            if(step == 'choose-a-wood-type') {
                $review.find('.chair-wood-type').html(chairData[step].selected[1]);
                $review.find('.chair-wood-type-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                
                if(chairData[step].selected[0] == 'cherry' || chairData[step].selected[0] == 'quarter-sawn-white-oak') {
                    $review
                        .find('.chair-wood-type-cost')
                        .html('$' + ((chairData['choose-chair-style'].pricing['cherry'] - chairData['choose-chair-style'].pricing['oak']) * ($('.retailer-meta').data('price-mod') / 100)).toFixed(2));
                } 

            }
            
            if(step == 'choose-a-seat-type') {
                $review.find('.chair-seat-type').html(chairData[step].selected[1]);
                $review.find('.chair-seat-type-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
            }
            
            if(step == 'choose-chair-style') {
                $review.find('.chair-style').html(chairData[step].selected[1]);
                $review.find('.chair-style-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                $review.find('.chair-style-cost').html('$' + (chairData[step].pricing.oak * ($('.retailer-meta').data('price-mod') / 100)).toFixed(2));
                $('.chair-model').html(chairData[step].model);

            }
            if(step == 'chair-distressing') {
                $review.find('.chair-distressing').html(chairData[step].selected[1]);
                $review.find('.chair-distressing-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                if('pricing' in chairData[step]) {
                    if('type' in chairData[step].pricing) {
                        if(chairData[step].pricing.type == 'percentage') {
                            $review.find('.chair-distressing-cost').html(chairData[step].pricing.percent + '%');
                        }
                    }
                }
            }
            if(step == 'chair-rub-through') {
                $review.find('.chair-rub').html(chairData[step].selected[1]);
                $review.find('.chair-rub-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                if('pricing' in chairData[step]) {
                    if('type' in chairData[step].pricing) {
                        if(chairData[step].pricing.type == 'percentage') {
                            $review.find('.chair-rub-cost').html(chairData[step].pricing.percent + '%');
                        }
                    }
                }
            }
        } 
    }
    editButtonController();
}

function stepPricingControls() {
    $('.step[data-display-price="1"]').find('.price').show();
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
 
        if(chairData.skips) {
            delete chairData.skips;
        }
        
        setChairObject();
        monitorImage();
        setChairPricing();
        configureReview();

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

function setChairObject() { 
    
    // Loop through each step to find the selected default option
    var selected    = new Array;
    var imageParts  = {};
    if($('#chair').data('edit') === '') {
               
        $chair = $('[data-step-id="choose-chair-style"]').find('.selected').siblings('.option-settings');
        // check to see if we need to change selected seat
        if($chair.find('.wooden-seat-render').length == 0 && $('[data-option-id="wooden-seat"]').hasClass('selected')) {
            if($('[data-option-id="wooden-seat"]').parent('.col-md-4').css('display') != 'none') {
                $('[data-option-id="wooden-seat"]').removeClass('selected').parent('.col-md-4').hide();
                $('[data-option-id="fabric-seat"]').addClass('selected');
            }
        }       
        
        $('.step').each(function(index) {
            
            // Setup our variables
            $step = $(this);
            var name = $step.find('.step-header h2').html();
            var stepId = $step.data('step-id');
            
            var canProgress = false;
            try {
                if(chairData.skips.indexOf(stepId) < 0) {
                   canProgress = true;
                }
            } catch (e) {
                canProgress = true;
            }
                
            if(canProgress) {      
                                
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
                    if(stepId != 'choose-chair-style' ) {
                        chairData[stepId] = {
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
                    } else {
                        
                        $chairPricing = $selected.siblings('.option-settings').find('.chair-pricing');
                        
                        chairData[stepId] = {
                            'name'      : $step.find('.step-header h2').html(),
                            'selected'  : [$selected.data('option-id'),$selected.find('.title').text()],
                            'skip'      : skipArray,
                            'type'      : $step.data('step-types'),
                            'model'     : $chairPricing.data('model-number'),
                            'pricing'   : {
                                'leather'       : $chairPricing.data('leather-addon'),
                                'fabric'        : $chairPricing.data('fabric-addon'),
                                'cherry'        : $chairPricing.data('cherry-qswo-no-arms'),
                                'cherry-arms'   : $chairPricing.data('cherry-qswo-arms'),
                                'oak'           : $chairPricing.data('oak-maple-no-arms'),
                                'oak-arms'      : $chairPricing.data('oak-maple-arms')
                            }
                        }
                        
                    }
                    
                    // See if we have any skips yet, if not add them in
                    if(!chairData.hasOwnProperty('skips')) {
                        chairData['skips'] = skipArray;
                    } else { // If we already have skips, fold in ones that do not exist yet
         
                        // Make sure that we even have any we may need to add in
                        if(skipArray) {
                            var previousSkips = chairData['skips'];
                            
                            newSkips = arrayUnique(previousSkips.concat(skipArray));
                            
                            chairData['skips'] = newSkips;
                        }
                    }            
                }
            } else {
                
                // If we are skipping it, remove it from our object
                delete chairData[stepId];          
            }
        });  
        
        chairData['selectedReference'] = selected;
        chairData['imageParts']        = imageParts; 
        chairData['furnitureType']     = [$('.furniture-container').attr('id'), $('.furniture-container').data('type-title')];
    } else {
        loadCompletedTable();  
    }
    
    configureChairChains(false);
    

    if(chairData['choose-a-seat-type'].selected[0] == 'wooden-seat') {
        setChairRender(false, false, false);
    } else {
        setChairRender(false, true, false);
    }
    
    chairData.dimensions = {};
    chairData.dimensions.quantity = $('[data-option-id="chairs-without-arms"]').find('.count').html();
    chairData.dimensions.armQuantity = $('[data-option-id="chairs-with-arms"]').find('.count').html();
    
    if(!chairData['choose-chair-style'].pricing['cherry-arms']) {
        $('.arm-quantity').hide();
        $('.armless-quantity').addClass('col-md-offset-3');
    } else {
        $('.arm-quantity').show();
        $('.armless-quantity').removeClass('col-md-offset-3');
    }
    
    configureReview();
    console.log(chairData);
}

function chairQuantityHandler() {
    $('.arm-control .fa').click(function() {
        
        armCount = parseInt($('[data-option-id="chairs-with-arms"]').find('.count').html());
        armlessCount = currentCount = parseInt($('[data-option-id="chairs-without-arms"]').find('.count').html());
        
        $button = $(this);
        
        if((armCount + armlessCount) > 1 || $button.data('table-action') == 'increase') {
            
            if($button.data('table-action') == 'increase') {
                var currentCount = parseInt($button.parents('.measurement-controls').find('.count').html());
                $button.parents('.measurement-controls').find('.count').html(currentCount + 1);
            } else {
                var currentCount = parseInt($button.parents('.measurement-controls').find('.count').html());
                if(currentCount > 0) {
                    $button.parents('.measurement-controls').find('.count').html(currentCount - 1);
                }
            }
            
            setChairObject();
            setChairPricing();
            
        } else {
            alert('You must have at least one chair in your build');
        }
    });
}

function loadCompletedTable() {
    
    getBuilds();
    
    chairData = collection[$('#chair').data('edit')];
    
    for(step in chairData) {
        if( step != 'dimensions' && 
            step != 'imageParts' && 
            step != 'selectedReference' &&
            step != 'skips' &&
            step != 'amount' &&
            step != 'furnitureType' &&
            step != 'armAmount' &&
            step != 'sideAmount') {
            
            console.log(step);
            
            $('[data-step-id="' + step + '"]')
                .find('.selected')
                .removeClass('selected');
             $('[data-step-id="' + step + '"]')   
                .find('[data-option-id="' + chairData[step].selected[0] + '"]')
                .addClass('selected');
        
        }
    }
    
    if(chairData.dimensions.quantity) {
        $('.armless-quantity').find('.count').html(chairData.dimensions.quantity);
    } else {
        $('.armless-quantity').find('.count').html(0);
    }
    
    if(chairData.dimensions.armQuantity) {
        $('.arm-quantity').find('.count').html(chairData.dimensions.quantity);
    } else {
        $('.arm-quantity').find('.count').html(0);
    }

    
    $('#chair').data('edit','');
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

    if(chairData.skips.indexOf(stepId) < 0) {
        return true;
    } else {
        return false;
    }  
}

function moveForward(amount, steps, step) {
    var next = steps.get(step.index() + amount+1);  
    var stepId = $(next).data('step-id');

    if(chairData.skips.indexOf(stepId) < 0) {
        return true;
    } else {
        return false;
    }  
}

function writeToLocalStorage() {
    
    if(localStorage.getItem('builds')) {
        builds = JSON.parse(localStorage.getItem('builds'));
        if($('.furniture-container').attr('data-edit') === '') {
            builds.push(chairData);
            console.log('we are not editing');
        } else {
            builds[$('.furniture-container').attr('data-edit')] = chairData;
            console.log('we are editing');
        }
        localStorage.setItem('builds', JSON.stringify(builds));
    } else {
        var builds = [chairData];
        console.log('we are pushing into a brand new build');
        localStorage.setItem('builds', JSON.stringify(builds));
    }
    
}

function getBuilds() {
    collection = JSON.parse(localStorage.getItem('builds'));
}

function setChairRender(hasArms, hasCushion, hasWide) {
    
    if(!hasArms && !hasCushion && !hasWide) {
        $('.render-image').attr('src', chairData.imageParts.seatChair);
        $('.render-image.arms-render').attr('src', chairData.imageParts.seatArmChair);
        $('.render-image.no-arms-render').attr('src', chairData.imageParts.seatChair);
    } else if (hasArms && !hasCushion && !hasWide) {
        $('.render-image').attr('src', chairData.imageParts.seatArmChair);
        $('.render-image.arms-render').attr('src', chairData.imageParts.seatArmChair);
        $('.render-image.no-arms-render').attr('src', chairData.imageParts.seatChair);
    } else if (hasArms && hasCushion && !hasWide) {
        $('.render-image').attr('src', chairData.imageParts.cushionArmChair);
        $('.render-image.arms-render').attr('src', chairData.imageParts.cushionArmChair);
        $('.render-image.no-arms-render').attr('src', chairData.imageParts.cushionChair);
    } else if (!hasArms && hasCushion && !hasWide) {
        $('.render-image').attr('src', chairData.imageParts.cushionChair);
        $('.render-image.arms-render').attr('src', chairData.imageParts.cushionArmChair);
        $('.render-image.no-arms-render').attr('src', chairData.imageParts.cushionChair);
    } else if (!hasCushion && hasWide) {
        $('.render-image').attr('src', chairData.imageParts.wideSeatArmChair);
        $('.render-image.arms-render').attr('src', chairData.imageParts.wideSeatArmChair);
        $('.render-image.no-arms-render').attr('src', chairData.imageParts.seatChair);
    } else if (hasCushion && hasWide) {
        $('.render-image').attr('src', chairData.imageParts.wideCushionArmChair);
        $('.render-image.arms-render').attr('src', chairData.imageParts.wideCushionArmChair);
        $('.render-image.no-arms-render').attr('src', chairData.imageParts.cushionChair);
    }
    
    
}

function configureChairChains(isWide) {
    
    $selectedChair = $('[data-option-id="' + chairData['choose-chair-style'].selected[0] + '"]').siblings('.option-settings');

    chair           = $selectedChair.find('.base-render').data('render-image');
    chairMasks      = $selectedChair.find('.base-render').data('render-masks').split(',');

    if($selectedChair.find('.front-arm-render').length > 0) {
        frontArm        = $selectedChair.find('.front-arm-render').data('render-image');
        frontArmMasks   = $selectedChair.find('.front-arm-render').data('render-masks').split(',');
    }
    
    if($selectedChair.find('.back-arm-render').length > 0) {
        backArm         = $selectedChair.find('.back-arm-render').data('render-image');
        backArmMasks    = $selectedChair.find('.back-arm-render').data('render-masks').split(',');
    }
    
    if($selectedChair.find('.wooden-seat-render').length > 0) {
        seat            = $selectedChair.find('.wooden-seat-render').data('render-image');
        seatMasks       = $selectedChair.find('.wooden-seat-render').data('render-masks').split(',');
    }
    
    cushion         = $selectedChair.find('.cushion-seat-render').data('render-image');
    cushionMasks    = $selectedChair.find('.cushion-seat-render').data('render-masks').split(',');
    
    topColor        = chairData.imageParts['top-color'];
    
    if(chairData.imageParts['bottom-color']) {
        bottomColor     = chairData.imageParts['bottom-color'];
    } else {
        bottomColor     = topColor;
    }
    
    if($selectedChair.find('.wooden-seat-render').length > 0) {
        chairData.imageParts['seatChair'] = getChairChain(
                                            chair, 
                                            seat, 
                                            false, 
                                            false, 
                                            chairMasks, 
                                            seatMasks, 
                                            false, 
                                            false, 
                                            topColor, 
                                            bottomColor);
    }
                                        
    chairData.imageParts['cushionChair'] = getChairChain(
                                        chair, 
                                        cushion, 
                                        false, 
                                        false, 
                                        chairMasks, 
                                        cushionMasks, 
                                        false, 
                                        false, 
                                        topColor, 
                                        bottomColor);
                                        
    if($selectedChair.find('.front-arm-render').length > 0) {                                
        chairData.imageParts['cushionArmChair'] = getChairChain(
                                            chair, 
                                            cushion, 
                                            frontArm, 
                                            backArm, 
                                            chairMasks, 
                                            cushionMasks, 
                                            frontArmMasks, 
                                            backArmMasks, 
                                            topColor, 
                                            bottomColor);
    }
    
    if($selectedChair.find('.front-arm-render').length > 0 && $selectedChair.find('.wooden-seat-render').length > 0) {
        chairData.imageParts['seatArmChair'] = getChairChain(
                                            chair, 
                                            seat, 
                                            frontArm, 
                                            backArm, 
                                            chairMasks, 
                                            seatMasks, 
                                            frontArmMasks, 
                                            backArmMasks, 
                                            topColor, 
                                            bottomColor);
    }
      
    if(!isWide) {
        chairData.imageParts['wideCushionArmChair'] = false;
        chairData.imageParts['wideSeatArmChair']    = false;
        
    } else {
        chair           = $selectedChair.find('.wide-base-render').data('render-image');
        chairMasks      = $selectedChair.find('.wide-base-render').data('render-masks').split(',');
    
        frontArm        = $selectedChair.find('.wide-front-arm-render').data('render-image');
        frontArmMasks   = $selectedChair.find('.wide-front-arm-render').data('render-masks').split(',');
        
        backArm         = $selectedChair.find('.wide-back-arm-render').data('render-image');
        backArmMasks    = $selectedChair.find('.wideback-arm-render').data('render-masks').split(',');
        
        seat            = $selectedChair.find('.wide-seat-render').data('render-image');
        seatMasks       = $selectedChair.find('.wide-seat-render').data('render-masks').split(',');
        
        cushion         = $selectedChair.find('.wide-seat-render').data('render-image');
        cushionMasks    = $selectedChair.find('.wide-seat-render').data('render-masks').split(',');
        
        chairData.imageParts['wideCushionArmChair'] = getChairChain(
                                                        chair, 
                                                        cushion, 
                                                        frontArm, 
                                                        backArm, 
                                                        chairMasks, 
                                                        cushionMasks, 
                                                        frontArmMasks, 
                                                        backArmMasks, 
                                                        topColor, 
                                                        bottomColor);
        chairData.imageParts['wideSeatArmChair']    = getChairChain(
                                                        chair, 
                                                        seat, 
                                                        frontArm, 
                                                        backArm, 
                                                        chairMasks, 
                                                        seatMasks, 
                                                        frontArmMasks, 
                                                        backArmMasks, 
                                                        topColor, 
                                                        bottomColor);
    }
}

function getChairChain(chair, seat, frontArm, backArm, chairMasks, seatMasks, frontArmMasks, backArmMasks, topColor, bottomColor) {
	
    var hasArms         = false;
    var frontArmChain   = '';
    var backArmChain    = '';
    var seatChain       = '';
    var frameChain      = '';
    var chairParts      = [];
    var color           = '';
    
	// Configure our default URLs if nothing has been chosen yet
	if(topColor == '') {
		topColor = 'training/wood2.jpg';
	}
	
	if(bottomColor == '') {
		bottomColor = 'training/wood2.jpg';
	}	
    
    if (frontArmMasks != false) {
        hasArms = true;
    }
	
    if(hasArms) {
        
        color           = 'top';
        frontArmChain   = constructFrontArmChain(frontArm, frontArmMasks, color);
        backArmChain    = constructBackArmChain(backArm, backArmMasks, color);
        frameChain      = constructFrameChain(chair, chairMasks, color);
        
        color           = 'bottom';
        seatChain       = constructSeatChain(seat, seatMasks, color);
        
        chairParts = [frontArmChain, seatChain, frameChain, backArmChain];
        
    } else {
        
        color           = 'bottom';
        seatChain       = constructSeatChain(seat, seatMasks, color);
        
        color           = 'top';
        frameChain      = constructFrameChain(chair, chairMasks, color);
        
        chairParts = [seatChain, frameChain];
        
    }
        
	return constructChair(chairParts, topColor, bottomColor, hasArms);
}

function constructSeatChain(seat, seatMasks, color) {
    
    var chain = '';
    
    chain += 'source=name[seat],url[file:' + seat + ']&';
    chain += 'blank=width[seat.width],height[seat.height],name[seatbg]&';
    chain += 'tile=image[' + color + ']&';
    chain += 'select=image[seat]&';

    for(var i = 0; i < seatMasks.length; i++) {
        chain += 'drape=texture[seatbg],grid[file:' + seatMasks[i] + ']&';
    }
    
    return chain;
    
}

function constructFrameChain(chair, chairMasks, color) {

    var chain = '';
    
    chain += 'source=name[chair],url[file:' + chair + ']&';
    chain += 'blank=width[chair.width],height[chair.height],name[chairbg]&';
    chain += 'tile=image[' + color + ']&';
    chain += 'select=image[chair]&';

    for(var i = 0; i < chairMasks.length; i++) {
        chain += 'drape=texture[chairbg],grid[file:' + chairMasks[i] + ']&';
    }
    
    return chain;
    
}

function constructFrontArmChain(frontArm, frontArmMasks, color) {

    var chain = '';
    
    chain += 'source=name[arms_front],url[file:' + frontArm + ']&';
    chain += 'blank=width[arms_front.width],height[arms_front.height],name[arms_frontbg]&';
    chain += 'tile=image[' + color + ']&';
    chain += 'select=image[arms_front]&';

    for(var i = 0; i < frontArmMasks.length; i++) {
        chain += 'drape=texture[arms_frontbg],grid[file:' + frontArmMasks[i] + ']&';
    }
    
    return chain;    

}

function constructBackArmChain(backArm, backArmMasks, color) {
    
    var chain = '';
    
    chain += 'source=name[arms_back],url[file:' + backArm + ']&';
    chain += 'blank=width[arms_back.width],height[arms_back.height],name[arms_backbg]&';
    chain += 'tile=image[' + color + ']&';
    chain += 'select=image[arms_back]&';

    for(var i = 0; i < backArmMasks.length; i++) {
        chain += 'drape=texture[arms_backbg],grid[file:' + backArmMasks[i] + ']&';
    }
    
    return chain;  

}

function constructChair(chairParts, topColor, bottomColor, hasArms) {
    
    // Set the start of our string to the hosting location
	var baseURL = 'http://conradgrebel.ma.liquifire.com/conradgrebel?';
    var output  = '';

    // Configure our colors
    output += 'source=url[file:' + bottomColor +'],name[bottom]&';
    output += 'source=url[file:' + topColor    +'],name[top]&';
    
	// Loop over our parts and build the chair
	for(i = 0; i < chairParts.length; i++ ) {
		output += chairParts[i];
	}
    
    // Compose our image
    if(hasArms) {
        output += 'select=image[seat]&composite=compose[over],image[arms_front],x[0],y[0]&select=image[chair]&composite=compose[over],image[seat],x[0],y[0]&select=image[arms_back]&composite=compose[over],image[chair],x[0],y[0]';
    } else {
        output += 'select=image[chair]&composite=compose[over],image[seat],x[0],y[0]';
    }
	
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
