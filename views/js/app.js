// for scraping NYTimes
$(document).on("click", "#scrape", function(){

    
    // Now the ajax call for the article to scrape 
    $.ajax({
        method: "GET",
        url: "/scrape" 
    }).then(function(data) {
          console.log(data)
    });

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

        
        
    })

    // hide the note area
    // $("li#noArticle").addClass("hide")

    // // show note
    // $("li#note").removeClass("hide")
    // empty the input field
    $("#inputBody").val("")

     // relaod the page
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

    // // show the modal
    // $("#note").hide()

    // // // hide no article
    // $("#noArticle").hide()

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
    console.log("iam her")
    $("#noArticle").hide()
    console.log("iamdone")
})

// scrape modal buttons
$("#scrapeModal").on("click", function(){

    // relaod the page
    location.reload()
});

$('body').on('hidden.bs.modal', '.modal', function () {
    $(this).removeData('bs.modal');
});




