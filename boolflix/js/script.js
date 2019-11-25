//ESERCIZIO BOOLFLIX:
/*Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
Titolo
Titolo Originale
Lingua
Voto
*/

// eseguo chiamata api per la ricerca film
function ricercaFilm() {

 $.ajax({
  url:"https://api.themoviedb.org/3/search/movie?api_key=7aa608e30656e9fec4f2ce271a198fc4&language=it-IT&query",
  method: "GET",
  success: function (film) {
   for (var i = 0; i < film.results.length; i++) {
    console.log(film.results[i]);
   }
  }
 });

};




//funzione generale jquery
$( document ).ready(function() {
 ricercaFilm();
});
