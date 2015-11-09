var tableData = {};
var collection = {};
var tableSize = {};

(function($) { 
	$(document).ready(function() {
        
        stepControls();
        singlePedSizeController();
        setTableObject();
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
    
    if($('#single-pedestal-table').data('edit') === '') {
               
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
                    if(stepId != 'choose-a-pedestal-style' ) {
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
                        
                        $tablePricing = $selected.siblings('.option-settings').find('.single-ped-pricing');
                        
                        tableData[stepId] = {
                            'name'      : $step.find('.step-header h2').html(),
                            'selected'  : [$selected.data('option-id'),$selected.find('.title').text()],
                            'skip'      : skipArray,
                            'model'     : $tablePricing.data('model'),
                            'type'      : $step.data('step-types'),
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

    
    if(!tableData.dimensions) {
        tableData.dimensions = {};
    }
    
    // Setup our image parts
    tableName = tableData['choose-a-pedestal-style'].selected[0];
    $selectedTable = $('[data-option-id="' + tableName + '"]').siblings('.option-settings');
    
    console.log(tableName);
    
    baseRender = $selectedTable.find('.base-render').data('render');
    baseMasks  = $selectedTable.find('.base-render').data('masks').split(',');
    
    // Find our default top for the table
    edgeName = tableData['choose-an-edge-profile'].selected[0];
    $selectedEdge = $('[data-option-id="' + edgeName + '"]').siblings('.option-settings');
    
    if("diameter" in tableData.dimensions) {
    
        diam        = tableData.dimensions.diameter;
        
        console.log(diam);
        
        topRender   = $selectedEdge.find('.render-object[data-render-type="' + diam + '-round-top"]').data('render-image');
        topMasks    = $selectedEdge.find('.render-object[data-render-type="' + diam + '-round-top"]').data('render-masks').split(',');
        apronRender = $selectedEdge.find('.render-object[data-render-type="' + diam + '-apron"]').data('render-image');
        apronMasks  = $selectedEdge.find('.render-object[data-render-type="' + diam + '-apron"]').data('render-masks').split(',');

        ttop = {
            'image' : topRender,
            'masks' : topMasks
        }
        
        tbase = {
            'image' : baseRender,
            'masks' : baseMasks
        }
        
        apron = {
            'image' : apronRender,
            'masks' : apronMasks
        }
        
        chain = createTableChain(ttop,tbase,apron,tableData.imageParts['top-color'],tableData.imageParts['bottom-color']);
        console.log(chain);

        tableData.imageParts['chain'] = chain;
        $('.render .render-image').attr('src',chain);
    }
    configureReview();
    monitorImage();
    console.log(tableData);
}

function reviewButtonController() {
    $('.review-jump').click(function(e) {
        e.preventDefault();
        
        $('.step.active').removeClass('active');
        $('.step[data-step-id="single-pedestal-review"]').addClass('active');
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

function stepControls() {

    optionSelectControls();
    stepMovementControls();
    stepPricingControls();
    optionNotificationControls();
    setRenderControls();

}

function loadCompletedTable() {
    
    getBuilds();
    
    tableData = collection[$('#single-pedestal-table').data('edit')];
    
    console.log('running');
    
    for(step in tableData) {
        if( step != 'dimensions' && 
            step != 'imageParts' && 
            step != 'selectedReference' &&
            step != 'skips' &&
            step != 'amount' &&
            step != 'totalLength' &&
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
    
    tableSize.diameter = tableData.dimensions.diameter;
    tableSize.leaves   = tableData.dimensions.leaves;
    
    $('.diameter-control .count').html(tableData.dimensions.diameter);
    $('.leaf-control .count').html(tableData.dimensions.leaves);
    
    $('#single-pedestal-table').data('edit','');
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

function setTableSizeRules(resetLeaves) {    

    $selected   = $('[data-step-id="choose-a-pedestal-style"]').find('.selected').siblings('.option-settings');
    
    var constraints = new Array();
    
    $selected.find('.size-available').each(function() {
        $this = $(this);
        constraints.push({
            diameter : $this.data('size-available'),
            leaves   : $this.data('leaves-available'),
        });
    });
    
    // If the table object is not set yet
    if(tableSize.length == undefined) {
        tableSize.diameter    = constraints[0].diameter;
        tableSize.leaves      = 1;
    }
    
    // Make sure our diameter is within constraints
    if(tableSize.diameter < constraints[0].diameter) {
        tableSize.diameter = constraints[0].diameter;
    }
    if(tableSize.diameter > constraints[constraints.length - 1].diameter) {
        tableSize.diameter = constraints[constraints.length - 1].diameter;
    }
    
    // Make sure leaves is within constraints
    if(tableSize.leaves > constraints[0].leaves) {
        tableSize.leaves = constraints[0].leaves;
    }
    if(tableSize.leaves > constraints[constraints.length - 1]) {
        tableSize.leaves = constraints[constraints.length - 1];
    }
    
    $('.diameter-control .count').html(tableSize.diameter);
    if(resetLeaves) {
        $('.leaf-control .count').html(1);
    }


    if( ! ("dimensions" in tableData) ) {
        tableData.dimensions = {};
    }
    
    tableData.dimensions.diameter   = tableSize.diameter;
    tableData.dimensions.leaves     = tableSize.leaves;
    ts = constraints;

}

var ts;

function singlePedSizeController() {
	
    setTableSizeRules();    
	
	$('i[data-table-action]').click(function(e) {
		e.preventDefault();
		
		$button = $(this);
		
		var target = $button.data('table-target');
		var action = $button.data('table-action');
		
		updateSinglePedTableData($button, target, action);
		setSinglePedTableSize();
        setTablePricing();
        setTableObject();		
	});
    
    tableData.dimensions            = {};
    tableData.dimensions.diameter   = tableSize.diameter;
    tableData.dimensions.leaves     = 1;
    tableData.dimensions.seats      = 4;
    
    setSinglePedTableSize();
}

function updateSinglePedTableData(button, target, action) {
	// Handle the diameter
    
	if(action == 'table-increase' && target == 'diameter') {   
        console.log(ts.length);
        var key = 0;
        for(var i = 0; i < ts.length; i++) {
            if(ts[i].diameter == tableSize.diameter) {
                key = i;
            }
        }   
        // Ensure that we can advance
        if(key < ts.length- 1) {
            // Set it to the next value in the width array
            tableSize.diameter = ts[key + 1].diameter;
            if(ts[key+1].leaves < tableSize.leaves) {
                tableSize.leaves = ts[key+1].leaves;
            }
        }
    } else if (action == 'table-decrease' && target == 'diameter') {
        var key = 0;
        for(var i = 0; i < ts.length; i++) {
            if(ts[i].diameter == tableSize.diameter) {
                key = i;
            }
        }   
        // Ensure that we can advance
        if(key > 0) {
            // Set it to the next value in the width array
            tableSize.diameter = ts[key - 1].diameter;
            if(ts[key-1].leaves < tableSize.leaves) {
                tableSize.leaves = ts[key-1].leaves;
            }
        }
    }
    
	// Handle the leaves
	if(action == 'table-increase' && target == 'leaves') {       
        // Ensure that we can advance
        var key = 0;
        for(var i = 0; i < ts.length; i++) {
            if(ts[i].diameter == tableSize.diameter) {
                key = i;
            }
        }   
        if(parseInt(tableSize.leaves) + 1 <= ts[key].leaves) {
            // Set it to the next value in the width array
            tableSize.leaves = parseInt(tableSize.leaves) + 1;
            console.log('Increasing leaves');
        }
    } else if (action == 'table-decrease' && target == 'leaves') {
        var key = 0;
        for(var i = 0; i < ts.length; i++) {
            if(ts[i].diameter == tableSize.diameter) {
                key = i;
            }
        }   
        if(parseInt(tableSize.leaves) - 1 >= 0) {
            // Set it to the next value in the width array
            tableSize.leaves = parseInt(tableSize.leaves) - 1;
            console.log('Decreasing leaves');
        }
    }

    // Visually update our contols
    $('.diameter-control .count').html(tableSize.diameter);
    $('.leaf-control .count').html(tableSize.leaves);
    
    tableData.dimensions.diameter   = tableSize.diameter;
    tableData.dimensions.leaves     = tableSize.leaves;
    
}

function setSinglePedTableSize() {
    var diameter    = tableData.dimensions.diameter;
    var leaves      = tableData.dimensions.leaves;
    var $top        = $('#single-top');
    var $leaves     = $('#single-leaves');
    var $chairs     = $("#single-chairs");
    var topWidth    = (diameter * 6.5) + (leaves * 72);
    var topHeight   = (diameter * 6.5);
    var chairCount  = 0;
    
    if(diameter <= 48) {
        chairCount = 4;
        if(leaves >= 2) {
            chairCount += 2;
        }
        console.log(leaves);
        console.log(chairCount);
    } else {
        chairCount = 6;
        if(leaves >= 1) {
            chairCount += 2;
        }
    }
    
    tableData.dimensions.seats = chairCount;
    
    totalLength = diameter + leaves * 12;
    $('.length-measurement-calc').html(totalLength);
    tableData.totalLength = totalLength;
    
    $top.css({
        'width'         : topWidth,
        'height'        : topHeight,
        'border-radius' : topHeight
    });
    
    $leaves.empty();
    for(var i = 0; i < leaves; i++) {
        $leaves.append('<div class="leaf">');
    }
    
    $chairs.empty();
    for(var i = 0; i < chairCount; i++) {
        $chairs.append('<div class="chair">');
    }
    
    $chairs.attr('class','');
    $chairs.addClass('chair-count-' + chairCount);
    $chairs.addClass('leaf-count-' + leaves);
    $chairs.addClass('diameter-' + diameter);
}

function configureReview() {
    
    $review = $('.review-table');    
    
    // Varibles used in testing
    wood = tableData['choose-a-wood-type'].selected[0];
    woodCost = tableData['choose-a-pedestal-style'].pricing.cherry - tableData['choose-a-pedestal-style'].pricing.oak;

    oakCost = tableData['choose-a-pedestal-style'].pricing.oak * ($('.retailer-meta').data('price-mod') / 100).toFixed(2);
    
    // Table Style
    $('.dp-table-style').html(tableData['choose-a-pedestal-style'].selected[1]);   
    $('.dp-table-style-cost').html('$' + oakCost.toFixed(2));

    
        // Model
    $('.model').html(tableData['choose-a-pedestal-style'].model);

    $('.dp-table-style-edit')
        .html('<a href="#" class="edit" data-edit-step="choose-a-pedestal-style">Edit</a>');
    
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
    $('.dp-dimensions').html(tableData.dimensions.diameter + '" diameter');
    if(tableData.dimensions.sizePrice > 0) {
        $('.dp-dimensions-cost').html('$' + tableData.dimensions.sizePrice * ($('.retailer-meta').data('price-mod') / 100).toFixed(2));
    }
    $('.dp-dimensions-edit')
        .html('<a href="#" class="edit" data-edit-step="set-your-single-pedestal-size">Edit</a>');
        
    // Dimensions with leaves
    $('.dp-dimensions-leaves').html(tableData.dimensions.diameter + '" wide, ' + tableData.totalLength + '" long with leaves');
    $('.dp-dimensions-leaves-cost').html();

    $('.dp-table-style-edit')
        .html('<a href="#" class="edit" data-edit-step="choose-a-pedestal-style">Edit</a>');
        
    // Leaves
    $('.dp-leaves').html(tableData.dimensions.leaves);
    if(tableData.dimensions.leafPrice > 0) {
        $('.dp-leaves-cost').html('$' + tableData.dimensions.leafPrice * ($('.retailer-meta').data('price-mod') / 100).toFixed(2));
    }
    $('.dp-leaves-edit')
        .html('<a href="#" class="edit" data-edit-step="set-your-single-pedestal-size">Edit</a>');
    
    
    for(step in tableData) {
        
        if( step != 'dimensions' && 
            step != 'imageParts' && 
            step != 'selectedReference' &&
            step != 'skips' &&
            step != 'amount' &&
            step != 'totalLength' &&
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

function setTablePricing() {
    
    $price = $('.price .total');
    
    var wood        = tableData['choose-a-wood-type'].selected[0];
    var table       = tableData['choose-a-pedestal-style'];
    var addons      = new Array();
    var percents    = new Array();
    var amount      = 0;
    
    for (var step in tableData) {
        
        if(step != 'amount' && 
           step != 'skips' && 
           step != 'selectedReference' && 
           step != 'furnitureType' &&
           step != 'dimensions' &&
           step != 'imageParts' && 
           step != 'totalLength' &&
           step != 'choose-a-wood-type') {
        
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
                                console.log(step);
                                console.log(option);
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
        }
    }

    var dAddon  = 0;
    var diameter        = tableData.dimensions.diameter;
    
    if(diameter >= 48 && diameter < 54) {
        dAddon = 75;
    } else if (diameter >= 54 && diameter < 60) {
        dAddon = 125;
    } else if (diameter >= 60) {
        dAddon = 175;
    }
    
    $selected = $('[data-step-id="choose-a-pedestal-style"]').find('.selected').siblings('.option-settings');
    $selectedSize = $selected.find('[data-size-available="' + diameter + '"]');

    tableData.dimensions.sizePrice = dAddon;
    
    var leafAddon = 0;
    if(parseInt(tableSize.leaves) > 1) {
        leafAddon = (parseInt(tableSize.leaves) - 1) * 80;
    }
    
    tableData.dimensions.leafPrice = leafAddon;

    if(wood == 'oak' || wood == 'maple') {
        amount      = table.pricing.oak;
    } else {
        amount      = table.pricing.cherry;  
    }
    
    
    var addonTotal = 0;
    for (var x = 0; x < addons.length; x++) {
        addonTotal += addons[x];
    }
    
    for (var y = 0; y < percents.length; y++) {
        amount      = amount * (1 + percents[y]/100);
    }
    
    var final = amount + addonTotal + dAddon + leafAddon;
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
        

        if($box.data('option-type') == 'single-pedestal-base') {
            setTableSizeRules(true);
        }
        setTableObject();
        monitorImage();
        setSinglePedTableSize();
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

function createTableChain(tabletop, tablebase, tableapron, topColor, bottomColor) {

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
    output += 'source=name[apron],url[file:' + tableapron.image + ']&';
	
	// Configure our top/base color JPEG urls
	output += 'source=url[file:' + topColor + '],name[textureOne]&';
	output += 'source=url[file:' + bottomColor + '],name[textureTwo]&';
	
	// Setup and texture our canvas for the top of the table
	output += 'blank=width[top.width],height[top.height],name[bg]&';
	output += 'tile=image[textureOne]&';
	output += 'select=image[top]&';
	for(i = 0; i < tabletop.masks.length; i++ ) {
		output += 'drape=texture[bg],grid[file:' + tabletop.masks[i] + ']&';
	}

	// Setup and texture our canvas for the apron of the table
	output += 'blank=width[apron.width],height[apron.height],name[apronbg]&'
	output += 'tile=image[textureTwo]&';
	output += 'select=image[apron]&';
	for(i = 0; i < tableapron.masks.length; i++ ) {
		output += 'drape=texture[apronbg],grid[file:' + tableapron.masks[i] + ']&';
	}
    
	// Setup and texture our canvas for the bottom of the table
	output += 'blank=width[base.width],height[base.height],name[basebg]&'
	output += 'tile=image[textureTwo]&';
	output += 'select=image[base]&';
	for(i = 0; i < tablebase.masks.length; i++ ) {
		output += 'drape=texture[basebg],grid[file:' + tablebase.masks[i] + ']&';
	}



    output += 'select=image[base]&';
    output += 'composite=compose[over],image[apron],x[0],y[0]&';
    
    output += 'select=image[base]&';
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