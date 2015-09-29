var serverData = {};
var collection = {};

(function($) { 
    alert($(window).width());
	$(document).ready(function() {
        stepControls();
        setHardwareDefault();
        setServerObject();
        monitorImage();
        // configureReview();
        reviewButtonController();
        editButtonController();
        setServerPricing();
	});	

function setHardwareDefault() {
    var hardware    = $('[data-step-id="choose-a-server-style"]')
                        .find('.selected')
                        .siblings('.option-settings')
                        .find('.default-hardware')
                        .data('default-hardware');
          
    $('[data-step-id="choose-your-hardware"]').find('.selected').removeClass('selected');
    $('[data-step-id="choose-your-hardware"]').find('[data-option-id="'+hardware+'"]').addClass('selected');   
    
}

function setServerObject() { 
    
    // Loop through each step to find the selected default option
    var selected    = new Array;
    var imageParts  = {};
    
    if($('#servers').data('edit') === '') {
               
        $('.step').each(function(index) {
            
            // Setup our variables
            $step = $(this);
            var name = $step.find('.step-header h2').html();
            var stepId = $step.data('step-id');
            
            var canProgress = false;
            try {
                if(serverData.skips.indexOf(stepId) < 0) {
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
                    if(stepId != 'choose-a-server-style' ) {
                        serverData[stepId] = {
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
                        
                        $serverPricing = $selected.siblings('.option-settings').find('.server-pricing');
                        $hutchPricing  = $selected.siblings('.option-settings').find('.hutch-pricing');
                        
                        serverData[stepId] = {
                            'name'      : $step.find('.step-header h2').html(),
                            'selected'  : [$selected.data('option-id'),$selected.find('.title').text()],
                            'skip'      : skipArray,
                            'type'      : $step.data('step-types'),
                            'model'     : $serverPricing.data('model'),
                            'pricing'   : {
                                'cherry'        : $serverPricing.data('premium-price'),
                                'oak'           : $serverPricing.data('base-price'),
                                'hutch-cherry'  : $hutchPricing.data('hutch-premium-price'),
                                'hutch-oak'     : $hutchPricing.data('hutch-base-price'),
                                'drawers'       : $serverPricing.data('drawers'),
                            }
                        }
                        
                    }
                    
                    // See if we have any skips yet, if not add them in
                    if(!serverData.hasOwnProperty('skips')) {
                        serverData['skips'] = new Array();
                        serverData['skips'] = skipArray;
                    } else { // If we already have skips, fold in ones that do not exist yet
         
                        // Make sure that we even have any we may need to add in
                        if(skipArray) {
                            var previousSkips = serverData['skips'];
                            
                            newSkips = arrayUnique(previousSkips.concat(skipArray));
                            
                            serverData['skips'] = newSkips;
                        }
                    }            
                }
            } else {
                
                // If we are skipping it, remove it from our object
                delete serverData[stepId];          
            }
        });    
        
        serverData['selectedReference'] = selected;
        serverData['imageParts']        = imageParts; 
        serverData['furnitureType']     = [$('.furniture-container').attr('id'), $('.furniture-container').data('type-title')];

    } else {
        console.log('Loading a table to be edited');
        loadCompletedServer();  
    }

    // Find our selected server, hardware, and hutch
    server      = serverData['choose-a-server-style'].selected[0];
    hardware    = serverData['choose-your-hardware'].selected[0];
    
    $selectedServer = $('[data-option-id="' + server + '"]').siblings('.option-settings');
    $selectedHardware = $('[data-option-id="' + hardware + '"]').siblings('.option-settings');
    
    // Grab our base information
    baseRender = $selectedServer.find('.base-render').data('render-image');
    baseMasks  = $selectedServer.find('.base-render').data('render-masks').split(',');
    baseColor  = serverData.imageParts['top-color'];
    
    // Grab our door and drawer information
    doorDrawerRender = $selectedServer.find('.door-drawer-render').data('render-image');
    doorDrawerMasks  = $selectedServer.find('.door-drawer-render').data('render-masks').split(',');
    console.log(doorDrawerMasks);
    doorDrawerColor  = serverData.imageParts['bottom-color'];
    
    // Grab our hardware information
    hardwareRender = $selectedServer.find('.hardware-render[data-related-option="' + hardware + '"]').data('render-image');
    hardwareMasks  = $selectedServer.find('.hardware-render[data-related-option="' + hardware + '"]').data('render-masks').split(',');
    if($selectedHardware.find('.hardware-color').hasClass('controlled-by-color')) {
        hardwareColor = doorDrawerColor;
    } else {
        hardwareColor = $selectedHardware.find('.hardware-color').data('color');
    }
    
    // Grab our hutch information
    if(serverData.skips.indexOf('do-you-want-a-hutch') < 0) {
        hutchRender = $selectedServer.find('.hutch-base-render').data('render-image');
        hutchMasks  = $selectedServer.find('.hutch-base-render').data('render-masks');
        hutchColor  = baseColor;
    }
    
    // Grab our hutch door and drawer information
    if(serverData.skips.indexOf('do-you-want-a-hutch') < 0) {
        hutchDoorDrawerRender = $selectedServer.find('.hutch-doordrawer-render').data('render-image');
        hutchDoorDrawerMasks  = $selectedServer.find('.hutch-doordrawer-render').data('render-masks');
        hutchDoorDrawerColor  = doorDrawerColor;
    }
    
    // Grab our hutch hardware information
    if(serverData.skips.indexOf('do-you-want-a-hutch')  < 0) {
        hutchHardwareRender = $selectedServer.find('.hutch-hardware-render[data-related-option="' + hardware + '"]').data('render-image');
        hutchHardwareMasks  = $selectedServer.find('.hutch-hardware-render[data-related-option="' + hardware + '"]').data('render-masks');
    }
    
    // Setup our objects/vars to pass to the chain function
    serverBase = {
        'image' : baseRender,
        'masks' : baseMasks,
        'color' : baseColor
    };
    doorDrawer = {
        'image' : doorDrawerRender,
        'masks' : doorDrawerMasks,
        'color' : doorDrawerColor
    };
    hardware = {
        'image' : hardwareRender,
        'masks' : hardwareMasks,
        'color' : hardwareColor
    };    
    if(serverData.skips.indexOf('do-you-want-a-hutch') > 0) {
        hutch = false;
    } else {
        hutch = {
            'image' : hutchRender,
            'masks' : hutchMasks,
            'color' : hutchColor  
        };
    }
    if(serverData.skips.indexOf('do-you-want-a-hutch') > 0) {
        hutchDoorDrawer = false;
    } else {
        hutchDoorDrawer = {
            'image' : hutchDoorDrawerRender,
            'masks' : hutchDoorDrawerMasks,
            'color' : hutchDoorDrawerColor  
        };        
    }
    if(serverData.skips.indexOf('do-you-want-a-hutch') > 0) {
        hutchHardware = false;
    } else {
        var hutchHardware = {
            'image' : hutchHardwareRender,
            'masks' : hutchHardwareMasks,
            'color' : hardwareColor  
        };
        
    }
    
    // Get our chain
    chain = createServerChain(serverBase, doorDrawer, hardware, hutch, hutchDoorDrawer, hutchHardware);
    
    // Store the chain on our object to pass to collections
    serverData.imageParts['chain'] = chain;
    
    // Update the render on the current page
    $('.render .render-image').attr('src',chain);
    
    // Ensure that the review page is updated correctly
    configureReview();
    
    // Log our data so we know we're updated and can develop quickly
    console.log(serverData);
}

function reviewButtonController() {

    $('.review-jump').click(function(e) {
        e.preventDefault();
        
        $('.step.active').removeClass('active');
        $('.step[data-step-id="server-review"]').addClass('active');
        $('.render.table').show();
        
        if(serverData.skips) {
            delete serverData.skips;
        }
        
        setServerObject();
        setServerPricing();
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
        
        if(serverData.skips) {
            delete serverData.skips;
        }
        setServerObject();
        setServerPricing();
        setRenderControls();
        configureReview();
    });
}

function setServerPricing() {
    
    $price = $('.price .total');
    
    var wood        = serverData['choose-a-wood-type'].selected[0];
    var server      = serverData['choose-a-server-style'];
    var addons      = new Array();
    var percents    = new Array();
    var amount      = 0;
    
    for (var step in serverData) {
        
        if(step != 'amount' && 
           step != 'skips' && 
           step != 'selectedReference' && 
           step != 'furnitureType' &&
           step != 'dimensions' &&
           step != 'imageParts') {
        
            if("pricing" in serverData[step]) {
                
                if("type" in serverData[step].pricing) {
                    
                    if(serverData[step].pricing.type == 'flat') {
                        addons.push(serverData[step].pricing.rate);
                    } else if (serverData[step].pricing.type == 'percentage') {
                        percents.push(serverData[step].pricing.percent);
                    }
                }
                
                if("options" in serverData[step].pricing) {
                    
                    for ( option in serverData[step].pricing.options ) {
                        
                        if(serverData[step].pricing.options[option].type == 'flat') {
                            if(serverData['selectedReference'].indexOf(option) != -1) {
                                addons.push(serverData[step].pricing.options[option].rate);
                            }
                        } else if(serverData[step].pricing.options[option].type == 'percentage') {
                            if(serverData['selectedReference'].indexOf(option) != -1) {
                                percents.push(serverData[step].pricing.options[option].percent);
                            }
                        }                    
                    }
                }
                
            } 
        }
    }

    if(wood == 'oak' || wood == 'maple') {
        amount      = server.pricing.oak;
    } else {
        amount      = server.pricing.cherry;  
    }

    var addonTotal = 0;
    for (var x = 0; x < addons.length; x++) {
        addonTotal += addons[x];
    }
    
    for (var y = 0; y < percents.length; y++) {
        amount      = amount * (1 + percents[y]/100);
    }

    var final = amount + addonTotal;
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

    serverData['amount'] = retailerFinal.toFixed(2);
    
    $price.html(serverData.amount);
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

    wood        = serverData['choose-a-wood-type'].selected[0];
    hutchTest   = serverData['choose-a-server-style'].pricing['hutch-oak'];
    
    server = serverData['choose-a-server-style'];
    
    // Server Style
    $('.server-style').html(serverData['choose-a-server-style'].selected[1]);
    $('.server-style-cost').html('Total: $' + serverData.amount);
    $('.server-style-edit').html('<a href="#" class="edit" data-edit-step="choose-a-server-style">Edit</a>'); 
        
    // Model
    if("do-you-want-a-hutch" in serverData) {      
        $('.model').html(serverData['choose-a-server-style'].model);
        $('.simple-server').hide();
        $('.complex-server').show();
    } else {
        $('.model').html(serverData['choose-a-server-style'].model);
        $('.simple-server').show();
        $('.complex-server').hide();
    }
    
    // Wood Type
    $('.server-wood-type').html(serverData['choose-a-wood-type'].selected[1]);
    $('.server-wood-type-edit').html('<a href="#" class="edit" data-edit-step="choose-a-wood-type">Edit</a>');
    
    // Hardware
    $('.server-hardware').html(serverData['choose-your-hardware'].selected[1]);
    $('.server-hardware-edit').html('<a href="#" class="edit" data-edit-step="choose-your-hardware">Edit</a>');
    
    // Glass
    if('choose-your-glass' in serverData) {
        $('.glass-server').show();
        $('.server-glass').html(serverData['choose-your-glass'].selected[1]);
        $('.server-glass-edit').html('<a href="#" class="edit" data-edit-step="choose-your-glass">Edit</a>');
    } else {
        $('.glass-server').hide();
    }
    
    // Drawers
    if(server.pricing.drawers > 0) {
        $('.drawer-server').show();
        $('.server-drawer').html(serverData['choose-your-drawer-type'].selected[1]);
        $('.server-drawer-edit').html('<a href="#" class="edit" data-edit-step="choose-your-drawer-type">Edit</a>');
    } else {
        $('.drawer-server').hide();
    }
    
    for(var step in serverData) {
        
        if( step != 'dimensions' && 
            step != 'imageParts' && 
            step != 'selectedReference' &&
            step != 'skips' &&
            step != 'amount' &&
            step != 'furnitureType') {
            
            var stepName    = serverData[step].name;
            var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
            var stepID      = step;
           
            if("type" in serverData[step]) {
                
                // Base Color
                if(serverData[step].type == 'bottom-color') {                  
                    $('.server-base-color').html(serverData[step].selected[1]);
                    $('.server-base-color-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                }
                
                // Top Color
                if(serverData[step].type == 'top-color') {
                    $('.server-top-color').html(serverData[step].selected[1]);
                    $('.server-top-color-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                }
            }
            if(step == 'choose-your-server-distressing') {
                $('.server-distressing').html(serverData[step].selected[1]);
                $('.server-distressing-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
            }
            if(step == 'choose-your-server-rub-through') {
                $('.server-rub').html(serverData[step].selected[1]);
                $('.server-rub-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
            }
        } 
    }

    editButtonController();
}

function loadCompletedServer() {
    
    getBuilds();
    
    serverData = collection[$('#server').data('edit')];
    
    for(step in serverData) {
        if( step != 'dimensions' && 
            step != 'imageParts' && 
            step != 'selectedReference' &&
            step != 'skips' &&
            step != 'amount' &&
            step != 'furnitureType') {
                
            $('[data-step-id="' + step + '"]')
                .find('.selected')
                .removeClass('selected');
             $('[data-step-id="' + step + '"]')   
                .find('[data-option-id="' + serverData[step].selected[0] + '"]')
                .addClass('selected');
        }
    }
    
    $('#server').data('edit','');
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
    if (serverData['choose-a-server-style'].pricing.drawers > 0) {
        var drawers = true;
    } else {
        var drawers = false;
    }

    if(!drawers) {
        if(stepId == 'choose-your-drawer-type') {
            return false;
        } else {
            if(serverData.skips.indexOf(stepId) < 0) {
                return true;
            } else {
                return false;
            }  
        }
    } else {
        if(serverData.skips.indexOf(stepId) < 0) {
            return true;
        } else {
            return false;
        }  
    }
    
}

function moveForward(amount, steps, step) {
    var next = steps.get(step.index() + amount+1);  
    var stepId = $(next).data('step-id');

    if (serverData['choose-a-server-style'].pricing.drawers > 0) {
        var drawers = true;
    } else {
        var drawers = false;
    }

    if(!drawers) {
        if(stepId == 'choose-your-drawer-type') {
            return false;
        } else {
            if(serverData.skips.indexOf(stepId) < 0) {
                return true;
            } else {
                return false;
            }  
        }
    } else {
        if(serverData.skips.indexOf(stepId) < 0) {
            return true;
        } else {
            return false;
        }  
    }
}

function writeToLocalStorage() {  
    if(localStorage.getItem('builds')) {
        builds = JSON.parse(localStorage.getItem('builds'));
        if($('.furniture-container').attr('data-edit') === '') {
            builds.push(serverData);
        } else {
            builds[$('.furniture-container').attr('data-edit')] = serverData;
        }
        localStorage.setItem('builds', JSON.stringify(builds));
    } else {
        var builds = [serverData];
        localStorage.setItem('builds', JSON.stringify(builds));
    }  
}

function getBuilds() {
    collection = JSON.parse(localStorage.getItem('builds'));
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
 
        if(serverData.skips) {
            delete serverData.skips;
        }
        
        if($box.parents('.step').attr('data-step-id') == 'choose-a-server-style') {
            setHardwareDefault();
        }
        
        setServerObject();
        monitorImage();
        setServerPricing();
        configureReview();
    });
}

function stepPricingControls() {
    $('.step[data-display-price="1"]').find('.price').show();
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

function setRenderControls() {
    if($('.step.active').attr('data-display-render') == '1') {
        $('.render').show();
    } else {
        $('.render').hide();
    }
}

function createServerChain(serverBase, doorDrawer, hardware, hutch, hutchDoorDrawer, hutchHardware) {
    // Log our data that we're passing along to double check it all
    //console.log('Server Base:');
    //console.log(serverBase);
    //console.log('Doors and Drawers: ' + doorDrawer);
    //console.log(doorDrawer);
    //console.log('Hardware:');
    //console.log(hardware);
    //console.log('Hutch Base:');
    console.log(hutch);
    //console.log('Hutch Doors and Drawers:');
    //console.log(hutchDoorDrawer);
    //console.log('Hutch Hardware:');
    //console.log(hutchHardware);
    
    console.log(doorDrawer.masks);
    console.log(hardware.masks);
    console.log(doorDrawer.masks.length);
    
	// Set the start of our string to the hosting location
	var baseURL = 'http://conradgrebel.ma.liquifire.com/conradgrebel?';
	var output = '';
    
    if(hutch != false) { // hutch and server chain
        console.log("This has a hutch");
    } else { // standard server chain
        console.log("This does not have a hutch");
        
        // Configure our image PNG urls
        output += 'source=name[server],url[file:' + serverBase.image +']&';
        output += 'source=name[doorDrawer],url[file:' + doorDrawer.image +']&';
        output += 'source=name[hardware],url[file:' + hardware.image + ']&';
        
        // Configure our color JPEG urls
        output += 'source=url[file:' + serverBase.color + '],name[serverBaseTexture]&';
        output += 'source=url[file:' + doorDrawer.color + '],name[doorDrawerTexture]&';
        output += 'source=url[file:' + hardware.color + '],name[hardwareTexture]&';
        
        // Setup and texture our canvas for the base of the server
        output += 'blank=width[server.width],height[server.height],name[serverbg]&'; // 1. background made in LP
        output += 'tile=image[serverBaseTexture]&'; // 2. texture/color
        output += 'select=image[server]&'; // 3. png image
        
        // Iterate over the server masks for applying the texture
        for(i = 0; i < serverBase.masks.length; i++ ) {
            output += 'drape=texture[serverbg],grid[file:' + serverBase.masks[i] + ']&';
        }
        
        // Setup and texture our canvas for the doors and drawers of the server
        output += 'blank=width[doorDrawer.width],height[doorDrawer.height],name[doorDrawerBg]&'; // 1. background made in LP
        output += 'tile=image[doorDrawerTexture]&'; // 2. texture/color
        output += 'select=image[doorDrawer]&'; // 3. png image
        
        // Iterate over the doors and drawers masks for applying the texture
        for(i = 0; i < doorDrawer.masks.length; i++ ) {
            output += 'drape=texture[doorDrawerBg],grid[file:' + doorDrawer.masks[i] + ']&';
        }
        
        // Setup and texture our canvas for the hardware of the server
        output += 'blank=width[hardware.width],height[hardware.height],name[hardwareBg]&'; // 1. background made in LP
        output += 'tile=image[hardwareTexture]&'; // 2. texture/color
        output += 'select=image[hardware]&'; // 3. png image
        
        // Iterate over the hardware masks for applying the texture
        for(i = 0; i < hardware.masks.length; i++ ) {
            output += 'drape=texture[hardwareBg],grid[file:' + hardware.masks[i] + ']&';
        }
        
        // Combine the top and base canvas
        output += 'select=image[doorDrawer]&';
        output += 'composite=compose[over],image[hardware],x[0],y[0]&';
        
        // Combine the top and base canvas
        output += 'select=image[server]&';
        output += 'composite=compose[over],image[doorDrawer],x[0],y[0]&';
        
        // Output image settings
        output += 'trim&';
        output += 'scale=size[1080x460]&';
        output += 'sink=format[png]';
    
        // Encode the string as a usable URL
        var uri = encodeURI(output);
        var uri = baseURL + uri;        
    }
    return uri;

/*	



# replace this with the pngs
source=name[server],url[file:server/ashboro/ashboro_base]
source=name[hardware],url[file:server/ashboro/ashboro_1920_handle_render.png]

# replace this for the texture
source=url[file:training/wood2.jpg],name[texture]
source=url[file:server/_old/metal-texture-7.jpg],name[metal]

######### Seat setup #################################################################

blank=width[server.width],height[server.height],name[serverbg]
tile=image[texture]

select=image[server]

# use these for your base grids
drape=texture[serverbg],grid[file:server/ashboro/ashboro_base_1]
drape=texture[serverbg],grid[file:server/ashboro/ashboro_base_2]
drape=texture[serverbg],grid[file:server/ashboro/ashboro_base_3]

######### Chair setup #################################################################

# don't bother with these lines
blank=width[hardware.width],height[hardware.height],name[hardwarebg]
tile=image[metal]
select=image[hardware]

# use these for your top grids
drape=texture[hardwarebg],grid[file:server/ashboro/ashboro_1920_handle_mask]

select=image[server]
composite=compose[over],image[hardware],x[0],y[0]
# leave this alone, too
trim
scale=size[1080x460]
sink=format[png]

    
	// Configure our top/base PNG urls
	output += 'source=name[top],url[file:' + doorsDrawers.image +']&';
	output += 'source=name[base],url[file:' + serverBase.image + ']&';
	
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
	
    */
    
}

})( jQuery )
