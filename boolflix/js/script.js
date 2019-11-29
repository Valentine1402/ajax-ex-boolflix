//ESERCIZIO BOOLFLIX:
/*In questo esercizio iniziamo a replicare la logica che sta dietro a tantissimi siti che permettono la visione di film e telefilm.
Per fare questo, come fanno siti molto più rinomati, utilizzeremo un API che ci permette di avere un insieme di risultati congrui alla nostra ricerca.
Trasformiamo quello che abbiamo fatto fino ad ora in una vera e propria webapp, creando un layout completo simil-Netflix.
Milestone 1 v
Milestone 2 v
Milestone 3 v
Milestone 4 v
*/

//funzione generale jquery
$( document ).ready(function() {

 $(".but-anteprima, .query").on({
  click: function(){
   $("body").css("background-color","#220f19");
   $(".invisible, body > div > img").css("display","none");
   $(".film").show();
  }
 });
 $("#go").click(search);

 $(document).on('mouseenter', '.film', function() {
  var foto=$(this).find(".foto-copertina").attr('src');
  $('.anteprima img').attr('src',foto);
  var miniatura=$(this).find('.ms-didascalia');
  $(miniatura).css('visibility' , 'visible');
  var nome=$(this).find(".ms-didascalia").html();
  $('.didascalia').html(nome);
  $(".anteprima").css("display","flex");
  $("#selezione-film, #selezione-tv").show()

 });

 $(document).on('mouseleave', '.film', function(){
  var miniatura=$(this).find('.ms-didascalia');
  $('.ms-didascalia').css('visibility' , 'hidden');
 });
});

function reset() {
 $(".main").html('');
}

//function cerca
function search() {
 reset();
 var urlMovie = 'https://api.themoviedb.org/3/search/movie';
 var urlTv = 'https://api.themoviedb.org/3/search/tv';
 var q = $(".query").val();
 getData(urlMovie, q, 'movie');
	getData(urlTv, q, 'tv');
}

//chiamata api
function getData(url, query, type ) {
 var apiKey = '7aa608e30656e9fec4f2ce271a198fc4';
 $.ajax({
   url: url,
   method: "GET",
   data: {
    api_key: apiKey,
    query: query,
    language: "it-IT"
   },
   success: function(data) {
    var elements = data.results;
    print(type, elements);
    console.log(elements);
   },
   error: function(err) {
    alert("Errore", err);
  }
 });
}

//funzione per ciclare e stampare elementi
function print(type, elems) {

 var targetMovie = $('body > div > div.main.movies');
 var targetTv = $('body > div > div.main.tv');
 var source = $("#hb-template").html();
	var template = Handlebars.compile(source);

 for (var i = 0; i < elems.length; i++) {
  var elem = elems[i];
  var title = (type == "movie" ? elem.title : elem.name );
  var originalTitle = (type == "movie" ? elem.original_title : elem.original_name);
  var poster = '';
   if (elem.poster_path) {
    poster = 'https://image.tmdb.org/t/p/w342' + elem.poster_path;
   }else {
     '<img src="img/pirate.png">'
   }

   var context = {
    title: title,
    originalTitle: originalTitle,
    lan: flagGenerator(elem.original_language),
    stars: generaStelle(elem.vote_average),
    vote: elem.vote_average,
    poster: poster,
    type: type,
    trama: elem.overview
   };

   var html = template(context);
    if (type == "movie")
     targetMovie.append(html);
    else
     targetTv.append(html);

     $(".query").val('');

 }


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
 }

 //funzione per aggiungere le badiere
 function flagGenerator(lang) {
  var bandieraDaAggiungere = ["it","en","spa","usa","de","fr", "ja", "ar"];
   if (bandieraDaAggiungere.includes(lang)) {
    return "<img src='img/"+ lang + ".png'>";
   }
  return "<img src='img/euro.png' alt=''>";
 };
};
