/* MATOPELI HTML5 */

const canvas = document.getElementById('kentta');
const ctx = canvas.getContext('2d');

var pisteet = 0;
var suunta = 'oikea';

const kentan_sivu = 400;

class Pizza {
    constructor(koko, x, y, pituus) {
        this.koko = 20;
        this.pituus = 2;

        this.x = Math.floor(Math.random() * Math.floor(kentan_sivu));
        this.y = Math.floor(Math.random() * Math.floor(kentan_sivu));

        this.x = this.x - (this.x % 20);
        this.y = this.y - (this.y % 20);
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(pizza.x, pizza.y, pizza.koko, pizza.koko);
    }

    clear() {
        ctx.clearRect(this.x, this.y, this.koko, this.koko);
    }
}

class Mato {
    constructor(koko, x, y, pituus) {
        this.koko = 20;

        this.x = [100, 80, 60, 40];
        this.y = [kentan_sivu/2, kentan_sivu/2, kentan_sivu/2, kentan_sivu/2];

        this.pituus = this.x.length;
        console.log("Pituus: " + this.x.length);
    }

    pos() {
        return this.getPaaX() + ", " + this.getPaaY();
    }

    clear(ctx) {
        for (var i = 0; i < mato.pituus; i++)
            ctx.clearRect(mato.x[i], mato.y[i], mato.koko, mato.koko);
    }

    draw(ctx) {
        this.clear(ctx);
        ctx.fillStyle = "black";
        for (var i = 0; i < mato.pituus; i++) {
            ctx.fillRect(mato.x[i], mato.y[i], mato.koko, mato.koko);
        }
    }

    hanta() {
        for (var i = mato.pituus - 2; i >= 0; i--) {
                mato.x[i + 1] = mato.x[i];
                mato.y[i + 1] = mato.y[i];
        }
    }

    kasva() {
        mato.x[mato.pituus] = mato.x[mato.pituus - 1];
        mato.y[mato.pituus] = mato.y[mato.pituus - 1];
        mato.pituus++;
    }

    getPaaX() {
        return this.x[0];
    }

    getPaaY() {
        return this.y[0];
    }

    setPaaX(x) {
        this.x[0] = x;
    }

    setPaaY(y) {
        this.y[0] = y;
    }
}

var mato;
var pizza;
var peli;

aloitaPeli();

function aloitaPeli() {

    mato = new Mato();
    mato.draw(ctx);

    pizza = new Pizza();

    // Jos osuvat samaan, tehdään uusi pizza
    while (päällekkäisyys(mato, pizza)) {
        pizza = new Pizza();
        console.log(pizza.x + ", " + pizza.y);
    }
    pizza.draw(ctx);

    document.onkeydown = checkKey;
    peli = setInterval(matoautomaatti, 100);
}

// Madon pään liikkeet
function checkKey(e) {

    e = e || window.event;

    mato.clear(ctx);
    mato.hanta();

    // vasen, ylös, oikea, alas
    if (e.keyCode == '37' && (suunta !== 'oikea' && suunta !== 'vasen') ) {
        mato.setPaaX(mato.getPaaX() - mato.koko);
        suunta = 'vasen';
    }
    else if (e.keyCode == '38' && (suunta !== 'alas' && suunta !== 'ylös') ) {
        mato.setPaaY(mato.getPaaY() - mato.koko);
        suunta = 'ylös';
    }
    else if (e.keyCode == '39' && (suunta !== 'vasen' && suunta !== 'oikea') ) {
        mato.setPaaX(mato.getPaaX() + mato.koko);
        suunta = 'oikea';
    }
    else if (e.keyCode == '40' && (suunta !== 'ylös' && suunta !== 'alas') ) {
        mato.setPaaY(mato.getPaaY() + mato.koko);
        suunta = 'alas';
    }
    else {
        suunnistus();
    }
    console.log(mato.pos());
    varmistukset();
}

// Tarkistetaan ettei mato mene reunojen yli
function reunat(x, y) {
    if (x >= kentan_sivu || x < 0 || y >= kentan_sivu || y < 0) {
        alert("Osuit reunaan! Sait " + pisteet + " pistettä.");
        return true;
    }
}

// Tarkistetaan syökö mato pizzan
function osuma(mato, pizza) {
    if (mato.getPaaX() == pizza.x && mato.getPaaY() == pizza.y)
        return true;
    else
        return false;
}

// Tarkistetaan törmääkö mato itseensä
function tormays() {
    var x = mato.getPaaX();
    var y = mato.getPaaY();

    for (var i = 1; i < mato.pituus; i++) {
        if (x == mato.x[i] && y == mato.y[i]) {
            alert("Mato törmäsi! Sait " + pisteet + " pistettä.");
            return true;
        }
    }
}

// Tarkistetaan ettei pizzaa luoda madon päälle
function päällekkäisyys(mato, pizza) {
    if (osuma(mato, pizza)) {
        return true;
    }
    for (var i = 1; i < mato.pituus; i++) {
        if (mato.x[i] == pizza.x && mato.y[i] == pizza.y)
            return true;
    }
    return false;
}

// Pitää kirjaa madon liikkeistä
function matoautomaatti() {

    mato.clear(ctx);
    mato.hanta();

    suunnistus();

    varmistukset();
}

function suunnistus() {
    if (suunta == 'vasen') {
        mato.setPaaX(mato.getPaaX() - mato.koko);
    }
    else if (suunta == 'ylös') {
        mato.setPaaY(mato.getPaaY() - mato.koko);
    }
    else if (suunta == 'oikea') {
        mato.setPaaX(mato.getPaaX() + mato.koko);
    }
    else if (suunta == 'alas') {
        mato.setPaaY(mato.getPaaY() + mato.koko);
    }
}

// Varmistaa, että mato liikkuu sääntöjen mukaisesti ja luo tarvittaessa uuden pizzan
function varmistukset() {
    if (reunat(mato.getPaaX(), mato.getPaaY()) || tormays()) {
        lopeta();
    }
    else if (osuma(mato, pizza)) {
        pisteet += 9;
        document.querySelector('.piste').innerHTML = pisteet;
        mato.kasva();
        pizza = new Pizza();
        while (päällekkäisyys(mato, pizza)) {
            pizza = new Pizza();
            console.log(pizza.x + ", " + pizza.y);
        }
        mato.draw(ctx);
        pizza.draw(ctx);      
    }
    else
        mato.draw(ctx);
}

// Lopettaa pelin
function lopeta() {
    clearInterval(peli);
    pizza.clear(ctx);

    var u = confirm("Uusi peli?")

    if (u) {
        pisteet = 0;
        document.querySelector('.piste').innerHTML = pisteet;
        suunta = 'oikea';       
        aloitaPeli();
    }
    else {
        var fonttikoko = kentan_sivu/8;
        ctx.font = "small-caps bold " + fonttikoko + "px Arial";
        ctx.textAlign = "center"
        ctx.fillText("GAME OVER", kentan_sivu/2, kentan_sivu/2);
    }
}
