$(document).ready(function() {
    var i = laskeIka();
    $('#ika').append(i + "-vuotias");
});

function laskeIka() {
    console.log("huutia");
    var ds = new Date();
    var sp = new Date(1993, 1, 28);
    var ika = ds - sp;
    ika = parseInt(ika/1000/60/60/24/365);
    return ika;
}

