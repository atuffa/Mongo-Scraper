// for scraping NYTimes
$(document).on("click", "#scrape", function(){

    // alert("hey")
    // Now the ajax call for the article to scrape 
    $.ajax({
        method: "GET",
        url: "/scrape" 
    }).then(function(data) {
          console.log(data)
    });

    // // relaod the page
    // location.reload()

})

// When save article button is clicked
$(document).on("click", "#saveArticle", function(){
    
    // get the data-attr of the clicked articles button
    let thisId = $(this).attr("data-id");
    // console.log(thisId)

    // Now the ajax call for the article to get the specific id
    // and changes the boolean to true
    $.ajax({
        method: "GET",
        url: "/article/" + thisId
    }).then(function(data) {
        console.log(data)
       
    });

    // relaod the page
    location.reload()
});

// To add note on the saved article
$(document).on("click", "#addNote", function(){

    // get the data-attr of the clicked articles button
    let thisId = $(this).attr("data-id");

    // get the text for the note title
    let inputBody = $("#inputBody").val()
    console.log(thisId);

    let renderedNote = $("#renderedNote").text
    console.log(renderedNote)
// if ()
    // Run the POST to change/add a note 
    $.ajax({
        method: "POST",
        url: "/article/" + thisId,
        data:{

            // value from input box
            body: inputBody
        }
    })
    .then(function(data){
        console.log(data);

        // hide the note area
        $("#noArticle").hide()
    })


    // empty the input field
    $("#inputBody").val("")

     // relaod the page
     location.reload()

});

// Add note for saved article
$(document).on("click", "#addedNote", function(){
    
    // get the data-attr of the clicked articles button
    let thisId = $(this).attr("data-id");
    // console.log(thisId)
    
    $("#noArticle").hide()

    // // relaod the page
    location.reload()
});


// delete from saved article
$(document).on("click", "#deleteFromNote", function(){
    
    // get the data-attr of the clicked articles button
    let thisId = $(this).attr("data-id");
    // console.log(thisId)

    // Now the ajax call for the article to get the specific id
    // and changes the boolean to true
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    }).then(function(data) {
        console.log(data)
    });

    // relaod the page
    location.reload()
});

// delete note from the specific articles
$(document).on("click", "#deleteNote", function (){

    // get the data-attr of the clicked articles button
    let thisId = $(this).attr("data-id");
    console.log(thisId)
    $.ajax({
        method: "GET",
        url: "/note/" + thisId
    }).then(function(data) {
        console.log(data)
    });

})

// scrape modal buttons
$("#scrapeModal").on("click", function(){

    // relaod the page
    location.reload()
});




