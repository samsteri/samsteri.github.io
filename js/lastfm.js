$(document).ready(function() {
    // Haetaan äskettäiset kappaleet last.fm-palvelusta laajennetuilla artisti-infoilla
    var tracks = "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=zampha&extended=1&api_key=599e68ee43a3505a3bcdc098f7c06f2a&format=json";
    
    var es, kpl, pvm = new String();

    // Edelliset 10 kappaletta
    $.getJSON(tracks, function(json) {
        for (i = 0; i < 10; i++) {
            if (json.recenttracks.track[i].date == undefined) {
                $('#aika').append("juuri nyt <br>");
            }
            else {
                $('#aika').append(aikaero(json.recenttracks.track[i].date.uts) + "<br>");
            }
            $('#kappale').append(json.recenttracks.track[i].name + " / " + json.recenttracks.track[i].artist.name + "<br>");
        }
    });
});

function aikaero(kuunneltu) {
    // aika viime päivityksestä millisekunteina
    var nyt = new Date();
    // last.fm apin antama lukema * 1000
    var silloin = new Date(parseInt(kuunneltu)*1000);
    var ms = nyt - silloin;

    // muutetaan millisekunnit järkevämmäksi ajanmitaksi
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    //sekunnit
    s = s % 60;
    h = Math.floor(m / 60);
    // minuutit
    m = m % 60;
    d = Math.floor(h / 24);
    // tunnit
    h = h % 24;

    // esitetään sopivalla tavalla
    if (d < 1) {
      if (h == 0)
        return(m + " min sitten");
      else
        return(h + " h sitten");
    }
    else
      return(d + " pv sitten");
}