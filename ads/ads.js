$('[href="#all"]').on('click', function () {
    location.reload();
});
$('[href="#mobile"]').on('click', function () {
    location.reload();
});
$('[href="#job"]').on('click', function () {
    location.reload();
});
$('[href="#car"]').on('click', function () {
    location.reload();
});

$('#srchbtn').on('click', function () {
    var ssh = $('#srch').val();
    location.replace('?q=' + ssh);
});