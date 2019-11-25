//ESERCIZIO BOOLFLIX:
/*Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
Titolo
Titolo Originale
Lingua
Voto
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
   console.log(film);
   for (var i = 0; i < film.results.length; i++) {
    console.log(film.results[i]);
    var primaBozza = $("#hb-template").html();
    var trasferisciDati = Handlebars.compile(primaBozza);
    var contenitoreOggetti = {
     titolo: film.results[i].title,
     titoloOriginale:film.results[i].original_title,
     lingua:film.results[i].original_language,
     voto:film.results[i].vote_average};
    var stampaDati = trasferisciDati(contenitoreOggetti);
    $(".main").append(stampaDati);
   }
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
});


//funzione generale jquery
$( document ).ready(function() {
 ricercaFilm("horror");
});
