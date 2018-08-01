var globalpostad = [];
if (JSON.parse(window.localStorage.getItem("ad")) != null && JSON.parse(window.localStorage.getItem("ad")) != undefined) {
    globalpostad = JSON.parse(window.localStorage.getItem("ad"));
}

var search_value = deparam(location.search)['q'];

/*
TODO:
-> Add confirmation and success dialogs for deleting and placing ads successfully.
-> Show ad type on ALL ADS.

-> Image Upload (Possible with DB/NODEJS+)
-> UI OVERHAUL
-> Code Quality (Added in 2018/7/22)
*/

$(document).ready(function () {
    if (search_value && search_value != ' ') {
        $('#adhead').html('Results');
        $('#adtextd').html('These are the results for your search ' + "'" + search_value + "'");
        $('#cardapp').html("");
        // var key = 'title';
        globalpostad.forEach(function (item, index) {
            if (item.title.toLowerCase().indexOf(search_value.toLowerCase()) + 1) additem(item, index);
        })
    }
});


function deparam(querystring) {
    // remove any preceding url and split
    querystring = querystring.substring(querystring.indexOf('?') + 1).split('&');
    var params = {}, pair, d = decodeURIComponent, i;
    // search and parse
    for (i = querystring.length; i > 0;) {
        pair = querystring[--i].split('=');
        params[d(pair[0])] = d(pair[1]);
    }

    return params;
}

var link = location.hash.replace('#', '');

function set_() {
    window.localStorage.setItem('ad', JSON.stringify(globalpostad));
}

generator();

$('#srchbtn').on('click', function () {
    var sssh = $('#srch').val();
    location.replace('ads.html?q=' + sssh);
});

$('.exxc').on("click", function () {
    $('#mymodal').modal('show');
    $('#modform').on("submit", function (event) {
        event.preventDefault();
        var a = {
            title: $('#adtitle').val(),
            category: $('.custom-select').val(),
            description: $('#texta').val().replace(/\n/g,'<br>'),
            name: $('#postername').val(),
            number: $('#posternumber').val(),
            price: $('#price').val(),
            id: Math.round(Math.random()*10000)
        };
        $('#modform').trigger("reset");
        if ((a.title != null && a.title != undefined && a.title != "" && a.title != " ") && (a.description != null && a.description != undefined && a.description != "" && a.description != " ") && (a.name != null && a.name != undefined && a.name != "" && a.name != " ")) {
            globalpostad.push(a);
            set_();
            generator();
        }
        $('#mymodal').modal('hide');
    });
});

function additem(data, i) {
    var $card = $('<div class="card" id = "crd' + i + '" style="width: 18rem;"><div class="card-body"><button index = "' + i + '" type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button><h5 class="card-title">' + data.title + '</h5><p class="card-title pricetitle"> <b>Price:</b> Rs. ' + (data.price || 'Free') + '</p><button class="detbtn btn btn-primary">Click for More Details</button></div></div>');
    $('#cardapp').append($card);
    var glindex = '';
    $card.find('.close').on('click', function () {
        var index = parseInt($(this).attr('index'));
        globalpostad.splice(index, 1);
        set_();
        $card.remove();
        glindex = index;
    });
    $card.find('.detbtn').on('click', function () {
        location.replace('../adPage/ad_page.html#'+globalpostad[i].id);
    });
}

function generator() {
    $('#cardapp').html("");
    if (link == 'mobile') {
        $('.flex-column .active').removeClass('active');
        $('[href="#mobile"]').addClass('active');
        $('#adhead').html('Mobile Section');
        $('#adtextd').html('Here you will find the Ads listed for Phones!');
        for (let i = 0; i < globalpostad.length; i++) {
            if (globalpostad[i].category == '1') {
                additem(globalpostad[i], i);
            }
        }
        location.search = 'none';
    }
    else if (link == 'car') {
        $('.flex-column .active').removeClass('active');
        $('[href="#car"]').addClass('active');
        $('#adhead').html('Vehicles Section');
        $('#adtextd').html('Here you will find the Ads listed for Vehicles!');
        for (var i = 0; i < globalpostad.length; i++) {
            if (globalpostad[i].category == '3') {
                additem(globalpostad[i], i);
            }
        }
        location.search = 'none';
    }
    else if (link == 'job') {
        $('.flex-column .active').removeClass('active');
        $('[href="#job"]').addClass('active');
        $('#adhead').html('Jobs Section');
        $('#adtextd').html('Here you will find the Ads listed for Jobs!');
        for (let i = 0; i < globalpostad.length; i++) {
            if (globalpostad[i].category == '2') {
                additem(globalpostad[i], i);
            }
        }
        location.search = 'none';
    }
    else {
        for (let i = 0; i < globalpostad.length; i++) {
            additem(globalpostad[i], i);
        }
    }
}