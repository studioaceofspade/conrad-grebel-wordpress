var tableData = {};
var collection = {};
var tableSize           = {};
var tableConstraints    = {};
(function($) { 
	$(document).ready(function() {
        
        stepControls();
        setTableObject();
        doublePedSizeController();
        monitorImage();
        configureReview();
        reviewButtonController();
        editButtonController();
        setTablePricing();
	});	

function setTableObject() { 
    
    // Loop through each step to find the selected default option
    var selected    = new Array;
    var imageParts  = {};
    
    if($('[data-option-id="winchest"]').hasClass('selected')) {
        $('[data-step-id="choose-an-edge-profile"]').find('.selected').removeClass('selected');
        $('[data-step-id="choose-an-edge-profile"]').find('[data-option-id="natural"').addClass('selected');
    }
    
    if($('#trestle-table').data('edit') === '') {
               
        $('.step').each(function(index) {
            
            // Setup our variables
            $step = $(this);
            var name = $step.find('.step-header h2').html();
            var stepId = $step.data('step-id');
            
            var canProgress = false;
            try {
                if(tableData.skips.indexOf(stepId) < 0) {
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
                    if(stepId != 'choose-a-trestle-table' ) {
                        tableData[stepId] = {
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
                        
                        $tablePricing = $selected.siblings('.option-settings').find('.double-ped-pricing');
                        
                        tableData[stepId] = {
                            'name'      : $step.find('.step-header h2').html(),
                            'selected'  : [$selected.data('option-id'),$selected.find('.title').text()],
                            'skip'      : skipArray,
                            'type'      : $step.data('step-types'),
                            'model'     : $tablePricing.data('model'),
                            'pricing'   : {
                                'cherry'        : $tablePricing.data('cherry'),
                                'oak'           : $tablePricing.data('oak'),
                            }
                        }
                        
                    }
                    
                    // See if we have any skips yet, if not add them in
                    if(!tableData.hasOwnProperty('skips')) {
                        tableData['skips'] = new Array();
                        tableData['skips'] = skipArray;
                    } else { // If we already have skips, fold in ones that do not exist yet
         
                        // Make sure that we even have any we may need to add in
                        if(skipArray) {
                            var previousSkips = tableData['skips'];
                            
                            newSkips = arrayUnique(previousSkips.concat(skipArray));
                            
                            tableData['skips'] = newSkips;
                        }
                    }            
                }
            } else {
                
                // If we are skipping it, remove it from our object
                delete tableData[stepId];          
            }
        });    
        
        tableData['selectedReference'] = selected;
        tableData['imageParts']        = imageParts; 
        tableData['furnitureType']     = [$('.furniture-container').attr('id'), $('.furniture-container').data('type-title')];

    } else {
        console.log('Loading a table to be edited');
        loadCompletedTable();  
    }

    // Setup our image parts
    tableName = tableData['choose-a-trestle-table'].selected[0];
    $selectedTable = $('[data-option-id="' + tableName + '"]').siblings('.option-settings');
    baseRender = $selectedTable.find('.base-render').data('render');
    baseMasks  = $selectedTable.find('.base-render').data('masks').split(',');
    
    if($selectedTable.find('.top-render').length > 1) {
        edge       = $('[data-step-id="choose-an-edge-profile"]').find('.selected').data('option-id');
    } else {
        edge = 'natural';
    }
    
    topRender = $selectedTable.find('.top-render[data-edge="' + edge + '"]').data('render');
    topMasks  = $selectedTable.find('.top-render[data-edge="' + edge + '"]').data('masks').split(',');
    
    ttop = {
        'image' : topRender,
        'masks' : topMasks
    }
    
    tbase = {
        'image' : baseRender,
        'masks' : baseMasks
    }
    
    chain = createTableChain(ttop,tbase,tableData.imageParts['top-color'],tableData.imageParts['bottom-color']);
    tableData.imageParts['chain'] = chain;
    $('.render .render-image').attr('src',chain);
    
    if(!tableData.dimensions) {
        tableData.dimensions = {};
    }

    // configureReview();
    console.log(tableData);
}

function reviewButtonController() {
    $('.review-jump').click(function(e) {
        e.preventDefault();
        
        $('.step.active').removeClass('active');
        $('.step[data-step-id="trestle-table-review"]').addClass('active');
        $('.render.table').show();
        
        if(tableData.skips) {
            delete tableData.skips;
        }
        
        setTableObject();
        setTablePricing();
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
        
        if(tableData.skips) {
            delete tableData.skips;
        }
        setTableObject();
        setTablePricing();
        setRenderControls();
        configureReview();
    });
}

function setTablePricing() {
    
    $price = $('.price .total');
    
    var wood        = tableData['choose-a-wood-type'].selected[0];
    var table       = tableData['choose-a-trestle-table'];
    var addons      = new Array();
    var percents    = new Array();
    var amount      = 0;
    var retailerMod = 0;
    
    for (var step in tableData) {
        
        if(step != 'amount' && 
           step != 'skips' && 
           step != 'selectedReference' && 
           step != 'furnitureType' &&
           step != 'dimensions' &&
           step != 'imageParts') {
        
            if("pricing" in tableData[step]) {
                
                if("type" in tableData[step].pricing) {
                    
                    if(tableData[step].pricing.type == 'flat') {
                        addons.push(tableData[step].pricing.rate);
                    } else if (tableData[step].pricing.type == 'percentage') {
                        percents.push(tableData[step].pricing.percent);
                    }
                }
                
                if("options" in tableData[step].pricing) {
                    
                    for ( option in tableData[step].pricing.options ) {
                        
                        if(tableData[step].pricing.options[option].type == 'flat') {
                            if(tableData['selectedReference'].indexOf(option) != -1) {
                                addons.push(tableData[step].pricing.options[option].rate);
                            }
                        } else if(tableData[step].pricing.options[option].type == 'percentage') {
                            if(tableData['selectedReference'].indexOf(option) != -1) {
                                percents.push(tableData[step].pricing.options[option].percent);
                            }
                        }                    
                    }
                }
                
            }
            var $selected = $('[data-step-id="' + step + '"]').find('.selected');
            var $options = $selected.siblings('.option-settings');
            if($options.find('.retailer-price-mod').length > 0) {
                retailerMod += $options.find('.retailer-price-mod').data('mod-amount');
            } 
        }
    }

    var dimensionAddon  = 0;
    var sqin            = parseInt(tableSize.width) * parseInt(tableSize.tlength);
    
    if(sqin > 2552 && sqin < 2801) {
        dimensionAddon = 0;
    } else if (sqin >= 2801 && sqin < 3025) {
        dimensionAddon = 0;
    } else if (sqin >= 3073 && sqin < 3361) {
        dimensionAddon = 125;
    } else if (sqin >= 3361 && sqin < 3697) {
        dimensionAddon = 150;
    } else if (sqin >= 3697 && sqin < 3961) {
        dimensionAddon = 175;
    } else if (sqin >= 3961 && sqin < 4325) {
        dimensionAddon = 200;
    } else if (sqin >= 4326) {
        dimensionAddon = 225;
    }
    
    tableData.dimensions.sizePrice = dimensionAddon;
    
    var leafAddon = 0;
    if(parseInt(tableSize.leaves) > 2) {
        leafAddon = (parseInt(tableSize.leaves) - 2) * 80;
    }
    
    tableData.dimensions.leafPrice = leafAddon;

    if(wood == 'oak' || wood == 'maple') {
        amount      = table.pricing.oak;
    } else {
        amount      = table.pricing.cherry;  
    }

    amount += retailerMod;
    amount += dimensionAddon;
    amount += leafAddon;
    
    var addonTotal = 0;
    for (var x = 0; x < addons.length; x++) {
        addonTotal += addons[x];
    }
    
    var percentTotal = 1;
    
    for (var y = 0; y < percents.length; y++) {
        percentTotal += (percents[y]/100);     
    }
    
    var hasTwoPremium = false;
    
    if(typeof tableData['choose-a-bottom-color-'+wood].pricing.percent != 'undefined' && typeof tableData['choose-a-top-color-'+wood].pricing.percent != 'undefined' ) {
        hasTwoPremium = true;
    }    
    
    if(hasTwoPremium) {
        percentTotal -= .1;
    }

    amount = amount * percentTotal;

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

    tableData['amount'] = retailerFinal.toFixed(2);
    
    $price.html(tableData.amount);  
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
    
    // Varibles used in testing
    wood = tableData['choose-a-wood-type'].selected[0];
    woodCost = tableData['choose-a-trestle-table'].pricing.cherry - tableData['choose-a-trestle-table'].pricing.oak;

    oakCost = tableData['choose-a-trestle-table'].pricing.oak * ($('.retailer-meta').data('price-mod') / 100).toFixed(2);
    
    // Table Style
    $('.dp-table-style').html(tableData['choose-a-trestle-table'].selected[1]);
    if(wood == 'oak' || wood == 'maple') {
        $('.dp-table-style-cost').html('$' + oakCost);
    } else {
        $('.dp-table-style-cost').html('$' + tableData['choose-a-trestle-table'].pricing.cherry * ($('.retailer-meta').data('price-mod') / 100).toFixed(2));
    }    
    $('.dp-table-style-edit')
        .html('<a href="#" class="edit" data-edit-step="choose-a-trestle-table">Edit</a>');
        
        // Model
    $('.model').html(tableData['choose-a-trestle-table'].model);
    
    // Wood Type
    $('.dp-wood-type').html(tableData['choose-a-wood-type'].selected[1]);
    if(wood == 'cherry' || wood == 'quarter-sawn-white-oak') {
        $('.dp-wood-type-cost').html('$' + woodCost * ($('.retailer-meta').data('price-mod') / 100).toFixed(2));
    }
    $('.dp-wood-type-edit')
        .html('<a href="#" class="edit" data-edit-step="choose-a-wood-type">Edit</a>');

    // Edge Profile
    if("choose-an-edge-profile" in tableData) {
        $('.dp-edge-profile').html(tableData['choose-an-edge-profile'].selected[1]);
        $('.dp-edge-profile-edit')
            .html('<a href="#" class="edit" data-edit-step="choose-an-edge-profile">Edit</a>');
    } else {
        $('.dp-edge-profile').html('Natural');
        $('.dp-edge-profile-edit')
            .html('<a href="#" class="edit" data-edit-step="choose-an-edge-profile">Edit</a>');
    }

    // Dimensions
    $('.dp-dimensions').html(tableData.dimensions.width + '" wide, ' + tableData.dimensions.tlength + '" long');
    if(tableData.dimensions.sizePrice > 0) {
        $('.dp-dimensions-cost').html('$' + tableData.dimensions.sizePrice * ($('.retailer-meta').data('price-mod') / 100).toFixed(2));
    }
    $('.dp-dimensions-edit')
        .html('<a href="#" class="edit" data-edit-step="set-your-trestle-table-size">Edit</a>');    
    
    for(step in tableData) {
        
        if( step != 'dimensions' && 
            step != 'imageParts' && 
            step != 'selectedReference' &&
            step != 'skips' &&
            step != 'amount' &&
            step != 'furnitureType') {
            
            var stepName    = tableData[step].name;
            var optionName  = $('[data-step-id="'+step+'"]').find('.selected .title').html();
            var stepID      = step;
           
            if("type" in tableData[step]) {
                
                // Base Color
                if(tableData[step].type == 'bottom-color') {                  
                    $('.dp-base-color').html(tableData[step].selected[1]);
                    $('.dp-base-color-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                    
                    if('pricing' in tableData[step]) {
                        if('type' in tableData[step].pricing) {
                            if(tableData[step].pricing.type == 'flat') {
                                $('.dp-base-color-cost')
                                    .html("$" + 
                                         (tableData[step].pricing.flat * 
                                         ($('.retailer-meta').data('price-mod') / 100)).toFixed(2));   
                            } else if (tableData[step].pricing.type == 'percentage') {
                                $('.dp-base-color-cost').html(tableData[step].pricing.percent + "%");  
                            }
                        }
                    }
                }
                
                // Top Color
                if(tableData[step].type == 'top-color') {
                    $('.dp-top-color').html(tableData[step].selected[1]);
                    $('.dp-top-color-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                    if('pricing' in tableData[step]) {
                        if('type' in tableData[step].pricing) {
                            if(tableData[step].pricing.type == 'flat') {
                                $('.dp-top-color-cost')
                                    .html("$" + 
                                         (tableData[step].pricing.flat * 
                                         ($('.retailer-meta').data('price-mod') / 100)).toFixed(2));   
                            } else if (tableData[step].pricing.type == 'percentage') {
                                $('.dp-top-color-cost').html(tableData[step].pricing.percent + "%");  
                            }
                        }
                    }
                }
            }

            if(step == 'distressing-level') {
                $('.dp-distressing').html(tableData[step].selected[1]);
                $('.dp-distressing-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                if('pricing' in tableData[step]) {
                    if('type' in tableData[step].pricing) {
                        if(tableData[step].pricing.type == 'percentage') {
                            $('.dp-distressing-cost').html(tableData[step].pricing.percent + '%');
                        }
                    }
                }
            }
            if(step == 'rub-through') {
                $('.dp-rub').html(tableData[step].selected[1]);
                $('.dp-rub-edit').html('<a href="#" class="edit" data-edit-step="' + step + '">Edit</a>');
                if('pricing' in tableData[step]) {
                    if('type' in tableData[step].pricing) {
                        if(tableData[step].pricing.type == 'percentage') {
                            $('.dp-rub-cost').html(tableData[step].pricing.percent + '%');
                        }
                    }
                }
            }
        } 
    }
    editButtonController();
}

function loadCompletedTable() {
    
    getBuilds();
    
    tableData = collection[$('#trestle-table').data('edit')];
    
    console.log('running');
    
    for(step in tableData) {
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
                .find('[data-option-id="' + tableData[step].selected[0] + '"]')
                .addClass('selected');
                
            console.log('[data-option-id="' + tableData[step].selected[0] + '"]');
        
        }
    }
    
    $('.length-control .count').html(tableData.dimensions.tlength);
    $('.width-control .count').html(tableData.dimensions.width);
    
    $('#trestle-table').data('edit','');
}


function setTableSizeRules() {    

    $selected   = $('[data-step-id="choose-a-trestle-table"]').find('.selected').siblings('.option-settings');
    widthArray  = ['42','48','54'];
    lengthArray = ['60','66','72','76','80','84'];
    
    var tableConstraints = {
        minLeaves   : 0,
        maxLeaves   : 0,
        leafSize    : 0,
        widths      : widthArray,
        lengths     : lengthArray,
    };
    
    // If the table object is not set yet
    if(tableSize.length == undefined) {
        tableSize.tlength    = $('.length-control .count').html();
        tableSize.width     = $('.width-control .count').html();
    }
    
    // Make sure our width is within constraints
    if(tableSize.width < tableConstraints.widths[0]) {
        tableSize.width = tableConstraints.widths[0];
    }
    if(tableSize.width > tableConstraints.widths[tableConstraints.widths.length - 1]) {
        tableSize.width = tableConstraints.widths[tableConstraints.widths.length - 1];
    }
    
    // Make sure length is within constratins
    if(tableSize.tlength < tableConstraints.lengths[0]) {
        tableSize.tlength = tableConstraints.lengths[0];
    }
    if(tableSize.tlength > tableConstraints.lengths[tableConstraints.lengths.length - 1]) {
        tableSize.tlength = tableConstraints.lengths[tableConstraints.lengths.length - 1];
    }

    $('.width-control .count').html(tableSize.width);
    $('.length-control .count').html(tableSize.tlength);
	           
    ts = tableConstraints;

}

var ts;

function doublePedSizeController() {
	
    setTableSizeRules();    
	setDoublePedTableSize();
	setDoublePedChairs();
	
	$('i[data-table-action]').click(function(e) {
		e.preventDefault();
		console.log('A control was clicked');
		
		$button = $(this);
		
		var target = $button.data('table-target');
		var action = $button.data('table-action');
		
		updateDoublePedTableData($button, target, action);
		setDoublePedTableSize();
		setDoublePedChairs();
        setTablePricing();		
	});
    
    tableData.dimensions.width   = tableSize.width;
    tableData.dimensions.tlength = tableSize.tlength;
    tableData.dimensions.seats   = 8;
}

function updateDoublePedTableData(button, target, action) {

	// Handle the width
	if(action == 'table-increase' && target == 'width') {
        key = ts.widths.indexOf(tableSize.width);
        console.log(key);
        console.log(ts);
        console.log(tableSize.width);
        // Ensure that we can advance
        if(key < ts.widths.length - 1) {
            // Set it to the next value in the width array
            tableSize.width = ts.widths[key + 1];
            console.log(tableSize.width);
            console.log('Increasing width');
        }
    } else if (action == 'table-decrease' && target == 'width') {
        key = ts.widths.indexOf(tableSize.width);   
        // Ensure that we can advance
        if(key != 0) {
            // Set it to the next value in the width array
            tableSize.width = ts.widths[key - 1];
            console.log('Decreasing width');
        }
    }
    
	// Handle the length
	if(action == 'table-increase' && target == 'length') {
        key = ts.lengths.indexOf(tableSize.tlength);       
        // Ensure that we can advance
        if(key < ts.lengths.length - 1) {
            // Set it to the next value in the width array
            tableSize.tlength = ts.lengths[key + 1];
            console.log('Increasing length');
        }
    } else if (action == 'table-decrease' && target == 'length') {
        key = ts.lengths.indexOf(tableSize.tlength);    
        // Ensure that we can advance
        if(key != 0) {
            // Set it to the next value in the width array
            tableSize.tlength = ts.lengths[key - 1];
            console.log('Decreasing length');
        }
    }
    
    // Visually update our contols
    $('.width-control .count').html(tableSize.width);
    $('.length-control .count').html(tableSize.tlength);

    tableData.dimensions.width   = tableSize.width;
    tableData.dimensions.tlength = tableSize.tlength;
}

function setDoublePedTableSize() {

	$tablePane 		= $('#tabletop');
	$tableRender 	= $('#top-render');

	var paneWidth 	= $tablePane.width();
	var paneHeight 	= $tablePane.height();
	
	// Set our sizes, modify by a multiple of 6 so its not a tiny div
	$tableRender.height(tableSize.width*5.8);
	$tableRender.width(tableSize.tlength*5.8); // leaves are 12" wide
	
}

function setDoublePedChairs() {
	var tbChairs = 0; // chairs on the top and bottom of the table
	var lrChairs = 0; // chairs on the left and right of the table
	
	tbChairs = Math.floor(parseInt(tableSize.tlength)/18) - 1;
    
	lrChairs = Math.floor((tableSize.width - 12) / 18);
	
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
    
    tableData.dimensions.seats = tbChairs*2 + lrChairs*2;
	
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
    
    console.log(previous);
    console.log(stepId);
    
    if(tableData.skips.indexOf(stepId) < 0) {
        return true;
    } else {
        return false;
    }  
    
}

function moveForward(amount, steps, step) {
    var next = steps.get(step.index() + amount+1);  
    var stepId = $(next).data('step-id');

    if(tableData.skips.indexOf(stepId) < 0) {
        return true;
    } else {
        return false;
    }  
}

function writeToLocalStorage() {
    
    if(localStorage.getItem('builds')) {
        builds = JSON.parse(localStorage.getItem('builds'));
        if($('.furniture-container').attr('data-edit') === '') {
            builds.push(tableData);
            console.log('we are not editing');
        } else {
            builds[$('.furniture-container').attr('data-edit')] = tableData;
            console.log('we are editing');
        }
        localStorage.setItem('builds', JSON.stringify(builds));
    } else {
        var builds = [tableData];
        console.log('we are pushing into a brand new build');
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
 
        if(tableData.skips) {
            delete tableData.skips;
        }
        
        setTableObject();
        monitorImage();
        setTableSizeRules();
        setDoublePedTableSize();
        setDoublePedChairs();
        setTablePricing();
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

function createTableChain(tabletop, tablebase, topColor, bottomColor) {

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
