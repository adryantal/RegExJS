

//segédfüggvények
function ID(nev) {
    return document.getElementById(nev);
}

function $(nev) {
    return document.querySelectorAll(nev);
}







function validalas() {

//változók deklarációja  
    var urlapAdatok = "";
    var hiba = "";
    var nevInput = ID("nev").value;
    var emailInput = ID("email").value;
    var email_ujraInput = ID("email_ujra").value;
    var telszInput = ID("telsz").value;
    var prioInput = ID("prio").value;
    var urlInput = ID("weboldal").value;
    var megjInput = ID("megj").value;



    //név szűrése
    var nev_helyes = false;
    if (nevInput.length < 2) {
        hiba = "2 karakternél rövidebb név vagy kitöltetlen mező.";
        ID("nev").style.border = "1px solid red";
    } else {
        var szuro = /^([A-Z][a-z]{1,} ?){2,}$/;
        if (!szuro.test(nevInput)) {
            hiba += "Nem megfelelő formátumú név!<br>Minimum vezetéknév és keresztnév megadása szükséges úgy, hogy mindegyik nagybetűvel kezdődjön, majd kisbetűvel folytatódjon!";
            ID("nev").style.border = "1px solid red";
        } else {
            urlapAdatok += "<b>Név</b>: " + nevInput + "<br>";
            ID("nev").style.border = "1px solid khaki";
            nev_helyes = true;
        }
    }


//e-mail cím szűrése
    var email_helyes = false;
    if (nev_helyes) {
        if (emailInput.length < 6) { // min.: a@b.hu        
            hiba = "Túl rövid e-mail cím vagy kitöltetlen mező.";
            ID("email").style.border = "1px solid red";
        } else {
            var szuro = /^[a-zA-Z]([a-zA-Z0-9_-]?)+@[a-zA-Z0-9]([a-zA-Z0-9_-]+)?\.[a-zA-Z]{2,3}\.?([a-zA-Z]{2,3})?$/;
            if (!szuro.test(emailInput)) {
                hiba += "Nem megfelelő formátumú e-mail cím!<br>A helyes formátum pl.: abc@xy.hu ";
                ID("email").style.border = "1px solid red";
            } else {
                urlapAdatok += "<b>E-mail cím</b>: " + emailInput + "<br>";
                ID("email").style.border = "1px solid khaki";
                email_helyes = true;
            }
        }

    }
//e-mail cím szűrése
    var emailujra_helyes = false;
    if (nev_helyes && email_helyes) {
        if (email_ujraInput.length === 0) { // min.: a@b.hu        
            hiba = "Kitöltetlen mező!<br>Az e-mail cím megerősítése kötelező!";
            ID("email_ujra").style.border = "1px solid red";
        } else if (email_ujraInput.length>0 && !(email_ujraInput === emailInput)) { // min.: a@b.hu        
            hiba = "A két e-mail cím nem egyezik meg! Kérem, javítsa!";
            ID("email_ujra").style.border = "1px solid red";
            ID("email").style.border = "1px solid red";
        } else {
                urlapAdatok += "<b>E-mail cím</b>: " + email_ujraInput + "<br>";
                ID("email_ujra").style.border = "1px solid khaki";
                ID("email").style.border = "1px solid khaki";
                emailujra_helyes = true;
            }
        }
    


//telefonszám szűrése
    var telsz_helyes = false;
    if (nev_helyes && email_helyes && emailujra_helyes) {
        if (telszInput.length < 13) { //min. hosszúság: pl. +36-1-123-4567 --> 13
            hiba = "Túl rövid telefonszám vagy kitöltetlen mező.";
            ID("telsz").style.border = "1px solid red";
        } else {
            var szuro = /^[+][1-9]\d-[1-9]\d?-\d{3}-\d{4}$/;
            if (!szuro.test(telszInput)) {
                hiba += "Nem megfelelő formátumú telefonszám!<br>A helyes formátum pl.: +36-1-1234567 vagy +36-30-1234567 ";
                ID("telsz").style.border = "1px solid red";
            } else {
                urlapAdatok += "<b>Telefonszám</b>: " + telszInput + "<br>";
                ID("telsz").style.border = "1px solid khaki";
                telsz_helyes = true;
            }
        }

    }

//weboldal link szűrése
    var weboldal_helyes = false;
    if (nev_helyes && email_helyes && emailujra_helyes && telsz_helyes) {
        if (urlInput.length < 11) { //min. hosszúság: pl. http://x.hu
            hiba = "Túl rövid URL vagy kitöltetlen mező.<br>A link a http:// vagy https:// prefixszel kezdődjön!";
            ID("weboldal").style.border = "1px solid red";
        } else {
            var szuro = /^https?:\/\/[a-zA-Z0-9][a-zA-Z0-9_-]+\.[a-zA-Z]{2,3}\.?([a-zA-Z]{2,3})?$/;
            if (!szuro.test(urlInput)) {
                hiba += "Nem megfelelő formátumú URL!<br>A helyes formátum pl.: http://xyz.hu ";
                ID("weboldal").style.border = "1px solid red";
            } else {
                urlapAdatok += "<b>Weboldal</b>: " + urlInput + "<br>";
                ID("weboldal").style.border = "1px solid khaki";
                weboldal_helyes = true;
            }
        }

    }

//prioritás link szűrése
    var prio_helyes = false;
    if (nev_helyes && email_helyes && emailujra_helyes && telsz_helyes && weboldal_helyes) {
        if (prioInput === "") {
            hiba += "Jelöljön ki egy prioritásértéket!";
            ID("prio").style.border = "1px solid red";
        } else {
            urlapAdatok += "<b>Prioritás</b>: " + prioInput + "<br>";
            ID("prio").style.border = "1px solid khaki";
            prio_helyes = true;
        }
    }

//megjegyzés szűrése

    if (nev_helyes && email_helyes && emailujra_helyes && telsz_helyes && prio_helyes) {
        if (megjInput.length > 100) {
            hiba += "Túl hosszú szöveg! (Max. 100 karakter megengedett!) ";
            ID("megj").style.border = "1px solid red";
        } else if (megjInput.length < 5) {
            hiba = "Írjon egy rövid megjegyzést! (Min. 5 karakter)";
            ID("megj").style.border = "1px solid red";
        }  else {
            urlapAdatok += "<b>Megjegyzés</b>: " + megjInput + "<br>";
            ID("megj").style.border = "1px solid khaki";
            hiba = "Gratulálunk! Az űrlap kitöltése sikeres, nem találtunk hibát!";
            $("section p")[0].style.color = "brown";
        }
    }






    $("section p")[0].innerHTML = hiba;
    $("section p")[1].innerHTML = urlapAdatok;
}



function torol() {
    $("section p")[0].innerHTML = "Itt jelenik majd meg, hogy van-e hiba az űrlap kitöltésekor. Például üres mező vagy nem megfelelő formátumú e-mail cím, weboldal, telefonszám.";
    $("section p")[1].innerHTML = "Itt jelennek majd meg az űrlapon megadott adatok.";

    ID("nev").value = "";
    ID("email").value = ""; 
    ID("email_ujra").value = "";
    ID("telsz").value = "";
    ID("prio").value = "";
    ID("weboldal").value = "";
    ID("megj").value = "";
    
    $("section p")[0].style.color = "purple";
}




function init() {

    torol();

    ID("kuld").addEventListener("click", validalas);
    ID("torol").addEventListener("click", init);

}

window.addEventListener("load", init);