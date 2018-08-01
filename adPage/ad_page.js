$('#srchbtn').on('click', function () {
    var sssh = $('#srch').val();
    location.replace('../ads/ads.html?q=' + sssh);
});
var nlink = location.hash.replace('#', '');
var ad_data = globalpostad.filter(function (value, index) {
    if (globalpostad[index].id == nlink) {
        return true;
    }
})[0];
if (nlink == '' || nlink == ' ' || !ad_data) {
    $('#dethead').html('ERROR 404 NO AD FOUND!');
    $('#dettext').html('Please Try Again!');
    $('#detprice').html('');
    $('#detpricehead').html('');
    $('#detconthead').html('');
    $('#detnumber').html('');
} else {
    $('head title').html(ad_data.title);
    $('#dethead').html(ad_data.title);
    $('#detname').html(' '+ad_data.name);
    $('#detprice').html('Rs. ' + (ad_data.price || 'Free'));
    $('#detnumber').html(ad_data.number);
    $('#dettext').html(ad_data.description).split('<br>');
}