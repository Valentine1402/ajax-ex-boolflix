//ESERCIZIO BOOLFLIX:
//milestone 1
/*Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
Titolo
Titolo Originale
Lingua
Voto
MILESTONE 2 :
Trasformiamo il numero da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome).
Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)
Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili
MILESTONE 3:
In questa milestone aggiungiamo la copertina del film o della serie al nostro elenco.

*/

// eseguo chiamata api per la ricerca film
function ricercaFilm(stampa) {
 $.ajax({
  url:"https://api.themoviedb.org/3/search/movie",
  method: "GET",
  data: {
   api_key: "7aa608e30656e9fec4f2ce271a198fc4",
   language: "it-IT",
   query: stampa
  },
  success: function (film) {
   //creo una variabile in cui faccio un clone per la successiva stampa
   var primaBozza = $("#hb-template").html();
   // creo una variabile in cui trasferisco i dati da qui all'html
   var trasferisciDati = Handlebars.compile(primaBozza);
   //utilizzo il ciclo for per attraversare gli oggetti
   for (var i = 0; i < film.results.length; i++) {
    // creo una variabile contenente un oggetto dove inserirò i dati recuperati da Ajax
    var contenitoreOggetti = {
     poster:film.results[i].poster_path,
     titolo: film.results[i].title,
     titoloOriginale:film.results[i].original_title,
     lingua:flagGenerator(film.results[i].original_language),
     voto:film.results[i].vote_average,
     stars: generaStelle(film.results[i].vote_average)};
    // creo una variabile per stampare in pagina il tutto
    var stampaDati = trasferisciDati(contenitoreOggetti);
    // appendo la copia dell'oggetto per l'output in pagina
    $(".movies").append(stampaDati);
   }
  //azzero la searchbar dopo che l'utente ha cliccato
  $(".search-bar").val("");
  },
  error : function () {
  alert("Errore");
 }
 });
}

// eseguo chiamata api per la ricerca serieTv
function ricercaSerieTv(stampa) {
 $.ajax({
  url:"https://api.themoviedb.org/3/search/tv",
  method: "GET",
  data: {
   api_key: "7aa608e30656e9fec4f2ce271a198fc4",
   language: "it-IT",
   query: stampa
  },
  success: function (film) {
   //creo una variabile in cui faccio un clone per la successiva stampa
   var primaBozza = $("#hb-template").html();
   // creo una variabile in cui trasferisco i dati da qui all'html
   var trasferisciDati = Handlebars.compile(primaBozza);
   //utilizzo il ciclo for per attraversare gli oggetti
   for (var i = 0; i < film.results.length; i++) {
    // creo una variabile contenente un oggetto dove inserirò i dati recuperati da Ajax
    var contenitoreOggetti = {
     poster:film.results[i].poster_path,
     titolo: film.results[i].name,
     titoloOriginale:film.results[i].original_name,
     lingua:flagGenerator(film.results[i].original_language),
     voto:film.results[i].vote_average,
     stars: generaStelle(film.results[i].vote_average)};
    // creo una variabile per stampare in pagina il tutto
    var stampaDati = trasferisciDati(contenitoreOggetti);
    // appendo la copia dell'oggetto per l'output in pagina
    $(".tv").append(stampaDati);
   }

  //azzero la searchbar dopo che l'utente ha cliccato
  $(".search-bar").val("");
  },
  error : function () {
  alert("Errore");
 }
 });
}


//funzione legata al bottone per cercare il film
$("#go").click(function(){
 $(".main").html("");
 var inPagina = $(".search-bar").val();
 ricercaFilm(inPagina);
 ricercaSerieTv(inPagina);
});

// Funzione per generare le stelle
function generaStelle(rating) {
 rating = Math.floor(rating / 2);
 var res = '';
 for (var i = 1; i <= 5; i++) {
  res += (i <= rating )
   ?'<i class="fas fa-star"></i>'
   :'<i class="far fa-star"></i>';
 }
 return res;
};

//funzione per aggiungere le badiere
function flagGenerator(lang) {
 var bandieraDaAggiungere = ["it","en","spa","usa","de","fr"];
  if (bandieraDaAggiungere.includes(lang)) {
   return "<img src='img/"+ lang + ".png'>";
  }
return "<img src='img/pirate.png' alt=''>";
};

//funzione generale jquery
$( document ).ready(function() {
 ricercaFilm("horror");
 ricercaSerieTv("tv");
 //$('.film').click(function(){
 $(document).on('mouseenter mouseleave', '.film', function() {
  var foto=$(this).find(".foto-copertina").attr('src');
  console.log(foto);
  $('.anteprima img').attr('src',foto);

 });
});
