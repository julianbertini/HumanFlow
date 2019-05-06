$(document).ready ( function() {

    initializeNavigationEventHandlers();
    scrollAboutPage();

    $( ".get_all_button" ).click(function() {
        if ($(".nav-about").attr("class").indexOf("active") > -1) {
            getAboutData();
        }
        if ($(".nav-map").attr("class").indexOf("active") > -1) {
            getMapsData();
        } 
        if ($(".nav-tourney").attr("class").indexOf("active") > -1) {
            getTourneyData();
        }
      });

})

initializeNavigationEventHandlers = function () {
    $(".get-maps-data").click(function (event) {
        event.preventDefault();
        $(".nav-item").removeClass("active");
        $(".nav-map").addClass("active");
        getMapsData();
    })
    $(".get-about-data").click(function (event) {
        event.preventDefault();
        $(".nav-item").removeClass("active");
        $(".nav-about").addClass("active");
        getAboutData();
    })
    $(".get-tourney-data").click(function (event) {
        event.preventDefault();
        $(".nav-item").removeClass("active");
        $(".nav-tourney").addClass("active");
        // getTourneyData();
    })
}

getMapsData = function () {

    // disable custom search button
    $(".search_button").prop("disabled", true);

    console.log("Getting map data...");
    var search_url = "maps.html"
    $.ajax({
        url: search_url,
        context: document.body
      }).done(function(data) {
          console.log(data)
        $("#page-container").html(data); // remember to call event hanlders again after reloading html
        
    });
}

scrollAboutPage = () => {
    
    $(".about-learn-more-btn").click((event) => {
        event.preventDefault();
        var yPosNextSection = $(".about-title.one")[0].getBoundingClientRect().y;
        window.scrollBy(0,yPosNextSection);
    });
    $(".about-section1-more-btn").click((event) => {
        event.preventDefault();
        var yPosNextSection = $(".about-title.two")[0].getBoundingClientRect().y;
        window.scrollBy(0,yPosNextSection);
    });
    $(".about-section2-more-btn").click((event) => {
        event.preventDefault();
        var yPosNextSection = $(".about-title.three")[0].getBoundingClientRect().y;
        window.scrollBy(0,yPosNextSection);
    });
    $(".about-section3-more-btn").click((event) => {
        event.preventDefault();
        var yPosNextSection = $(".navbar")[0].getBoundingClientRect().y;
        window.scrollBy(0,yPosNextSection);
    });
}


getAboutData = () => {

    // enable custom search button
    $(".search_button").prop("disabled", false);

    console.log("Getting about data...");
    var search_url = "about.html"
    $.ajax({
        url: search_url,
        context: document.body
      }).done(function(data) {
        $("#page-container").html(data); // remember to call event hanlders again after reloading html
        scrollAboutPage();
    });
}