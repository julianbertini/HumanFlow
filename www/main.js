var stats_results;
var track_results;

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
        if ($(".nav-summary-stats").attr("class").indexOf("active") > -1) {
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
    $(".get-summary-stats").click(function (event) {
        event.preventDefault();
        $(".nav-item").removeClass("active");
        $(".nav-summary-stats").addClass("active");
        getSummaryStats();
    })
}

getMapsData = () => {

    // disable custom search button
    $(".search_button").prop("disabled", true);

    console.log("Getting map data...");
    var search_url = "maps.html"
    $.ajax({
        url: search_url,
        context: document.body
      }).done(function(data) {
        $("#page-container").html(data); // remember to call event hanlders again after reloading html
        
    });
}

findMacBasedOnSSID = (ssid_name) => {
    for (var i = 0; i < stats_results.statResults.length; i++) {
        if (stats_results.statResults[i].ssid_name.localeCompare(ssid_name) == 0) {
            return stats_results.statResults[i].mac
        }
    }
}

findSSIDsBasedOnMac = (mac) => {
    ssid_tuples = new Array();
    for (var i = 0; i < stats_results.statResults.length; i++) {
        if (stats_results.statResults[i].mac.localeCompare(mac) == 0) {
            ssid_tuples.push(stats_results.statResults[i])
        }
    }
    return ssid_tuples;
}

queryBasedOnSSID = () => {
    
    $(".ssid-search-button").click( () => {
        var ssid_name = $(".ssid-input").val();
        var mac = findMacBasedOnSSID(ssid_name)
        var ssid_tuples = findSSIDsBasedOnMac(mac)
        $(".ssid-tuple").remove();
        for (var i = 0; i < ssid_tuples.length; i++) {
            $(".stats-table").append("<tr class='ssid-tuple'> <td class='ssid-td'>" + ssid_tuples[i].ssid_name + "</td> <td class='ssid-td'>" + ssid_tuples[i].mac + "</td> <td class='ssid-td'>" + ssid_tuples[i].loc_id + "</td> <td class='ssid-td'>" + ssid_tuples[i].time + "</td>  </tr>")
        }
    });
}

getSummaryStats = () => {
        // disable custom search button
        $(".search_button").prop("disabled", true);

        console.log("Getting summary stats data...");
        var search_url = "get_summary_stats.php"
        $.ajax({
            url: search_url,
            context: document.body
          }).done(function(data) {
              stats_results = JSON.parse(data);
        });

        var search_url = "summary_stats.html"
        $.ajax({
            url: search_url,
            context: document.body
          }).done(function(data) {
              $("#page-container").html(data); // remember to call event hanlders again after reloading html
              queryBasedOnSSID();
              getTrackingOnSSID();
              scrollSummaryStatPage();
        });
        
}

getTrackingOnSSID = () => {

    $(".ssid-track-button").click( () => {
        var ssid_name = $(".ssid-track-input").val();

        if (ssid_name.localeCompare("") != 0) { //non empty value
            console.log("Getting tracking stats data...");
            var search_url = "get_tracking_results.php/?ssid=" + ssid_name;
            $.ajax({
                url: search_url,
                context: document.body
                }).done(function(data) {
                    track_results = JSON.parse(data);
                    
                    $(".ssid-track-tuple").remove();
                    $("#empty").remove();

                    if (track_results.trackValues.length == 0) {
                    $(".track-table").append("<p id=\"empty\">This great void... so empty...</p>");
                    }

                    for (var i = 0; i < track_results.trackValues.length; i++) {
                        $(".track-table").append("<tr class='ssid-track-tuple'> <td class='ssid-td'>" + track_results.trackValues[i].building + "</td> <td class='ssid-td'>" + track_results.trackValues[i].distance + " m" + "</td> <td class='ssid-td'>" + track_results.trackValues[i].mac + "</td> <td class='ssid-td'>" + track_results.trackValues[i].time + "</td>  </tr>")
                    }
            });
        }
    });
}

scrollSummaryStatPage = () => {

    $(".summary-stat-next-btn").click((event) => {
        event.preventDefault();
        var yPosNextSection = $(".summary-stat-title.two")[0].getBoundingClientRect().y;
        window.scrollBy(0,yPosNextSection);
    });
    $(".summary-stat-next-btn.back").click((event) => {
        event.preventDefault();
        var yPosNextSection = $(".summary-stat-title.one")[0].getBoundingClientRect().y;
        window.scrollBy(0,yPosNextSection);
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