//Initial array of movies	
$(document).ready(function() {

  var topics = ["Yojimbo", "Ip Man", "Enter the Dragon", "Lone Wolf and Cub: Shogun Assassin", "The Matrix", "The Five Deadly Venoms", "13 Assassins", "John Wick", "The Legend of Drunken Master", "Game of Death", "The Raid: Redemption", "The Grandmaster", "Bloodsport", "Kung Fu Hustle", "Unleashed", "Kill Bill: Volume 1 & 2", "House of Flying Daggers"];	

  //  create topics array buttons
  function renderButtons(){
    $('#buttons-view').empty();

    for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('kung-fu');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttons-view').append(a);
          }
        }    
        renderButtons();

//on button click
$(document).on('click', '.kung-fu', function() {

    //new variable will log the text data from each button
    var martialArts = $(this).html(); 
    // console.log(martialArts);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + martialArts + "&api_key=dc6zaTOxFJmzC&limit=10";
    // console.log(queryURL);

    // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      var results = response.data;
        //console.log(results);
        //empties the div before adding more gifs
        $('#movies-view').empty();
        for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  

        var gifImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    gifImage.attr('data-state', 'still');
                    $('#movies-view').prepend(gifImage);
                    gifImage.on('click', playGif);

        // Pulling ratings for each movie
        var rating = results[j].rating;
            // console.log(rating);
        var displayRated= $('<p>').text("Rating: " + rating);
        $('#movies-view').prepend(displayRated);
  } // end for loop

}); // done response

        //function to stop and animate gifs
        function playGif() { 
                    var state = $(this).attr('data-state');
                    // console.log(state);
                 if (state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //end of on click function

      }); //end of document on click 

          //adding new button to array
        $(document).on('click', '#add-movie', function(){
            if ($('#movie-input').val().trim() == ''){
              alert('Input can not be left blank');
           }
           else {
            var movies = $('#movie-input').val().trim();
            topics.push(movies);
            $('#movie-input').val('');
            renderButtons();
            return false;

            }

        });
                      

        }); // end click function
