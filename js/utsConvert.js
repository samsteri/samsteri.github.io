function utsConvert(uts) {
    /* Kuukaudet (jos halutaan kirjoittaa ne kirjaimin)
    var months_arr = ['Tammi', 'Helmi', 'Maalis', 'Huhti', 'Touko', 'Kesä', 'Heinä', 'Elo', 'Syys', 'Loka', 'Marras', 'Joulu'];
    */

    // UTS-aika millisekunneiksi
    var date = new Date(uts*1000);

    // Päivämäärä
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    // Kellonaika
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // päivä.kuukausi.vuosi tunnit:minuutit:sekunnit
    var time = day+'.'+month+'.'+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return time;
}