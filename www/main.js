var customPlayerValues = {
    playerName: ["", ".name-td"],
    playerHand: ["", ".hand-td"],
    playerHeight: ["", ".height-td"],
    playerCountry: ["", ".country-td"],
    playerRank: ["",".rank-td"]
};
var customMatchValues = {
    matchWinner: ["", ".winner-td", ".match-winner"],
    matchLoser: ["", ".loser-td", ".match-loser"],
    matchWinSeed: ["", ".winner-seed-td", ".match-winner-seed"],
    matchLoserSeed: ["", ".loser-seed-td", ".match-loser-seed"],
    matchTourney: ["",".tourney-td", ".match-tourney-seed"],
    matchScore: ["",".score-td",".match-score"]
};
var customTourneyValues = {
    tourneyName: ["", ".tourney-name-td"],
    tourneySurface: ["", ".surface-td"],
    tourneyDate: ["", ".date-td"],
};

$(document).ready ( function() {

    updateCustomValues();
    sortPlayerColumns();
    initializeNavigationEventHandlers();

    $( ".search_button" ).click(function() {
        getCustomData();
      });
    $( ".get_all_button" ).click(function() {
        if ($(".nav-player").attr("class").indexOf("active") > -1) {
            getPlayerData();
        }
        if ($(".nav-match").attr("class").indexOf("active") > -1) {
            getMatchData();
        } 
        if ($(".nav-tourney").attr("class").indexOf("active") > -1) {
            getTourneyData();
        }
      });

})

resetCustomValues = function () {
    customPlayerValues.playerName[0] = "";
    customPlayerValues.playerHand[0] = "";
    customPlayerValues.playerHeight[0] = "";
    customPlayerValues.playerCountry[0] = "";
    customPlayerValues.playerRank[0] = "";

    customMatchValues.matchWinner[0] = "";
    customMatchValues.matchLoser[0] = "";
    customMatchValues.matchWinSeed[0] = "";
    customMatchValues.matchLoserSeed[0] = "";
    customMatchValues.matchTourney[0] = "";
    customMatchValues.matchScore[0] = "";

    customTourneyValues.tourneyDate[0] = "";
    customTourneyValues.tourneyName[0] = "";
    customTourneyValues.tourneySurface[0] = "";
}

filterTourneyTuples = function () {
    var nameTuples = $(customTourneyValues.tourneyName[1]);
    var surfaceTuples = $(customTourneyValues.tourneySurface[1]);
    var dateTuples = $(customTourneyValues.tourneyDate[1]);

    for (i = 0; i < nameTuples.length; i++) { // all the same size
        if (nameTuples[i].innerText.toUpperCase().indexOf(customTourneyValues.tourneyName[0].toUpperCase()) > -1
            && surfaceTuples[i].innerText.toUpperCase().indexOf(customTourneyValues.tourneySurface[0].toUpperCase()) > -1
            && dateTuples[i].innerText.toUpperCase().indexOf(customTourneyValues.tourneyDate[0].toUpperCase()) > -1)
            nameTuples[i].parentNode.style.display = "";
        else {
            console.log("nope")
            nameTuples[i].parentNode.style.display = "none";
        }
    }
}

filterMatchTuples = function () {
    var winnerTuples = $(customMatchValues.matchWinner[1]);
    var loserTuples = $(customMatchValues.matchLoser[1]);
    var winSeedTuples = $(customMatchValues.matchWinSeed[1]);
    var loserSeedTuples = $(customMatchValues.matchLoserSeed[1]);
    var scoreTuples = $(customMatchValues.matchScore[1]);
    var tourneyTuples = $(customMatchValues.matchTourney[1]);

    for (i = 0; i < winnerTuples.length; i++) { // all the same size
        if (winnerTuples[i].innerText.toUpperCase().indexOf(customMatchValues.matchWinner[0].toUpperCase()) > -1
            && loserTuples[i].innerText.toUpperCase().indexOf(customMatchValues.matchLoser[0].toUpperCase()) > -1
            && winSeedTuples[i].innerText.toUpperCase().indexOf(customMatchValues.matchWinSeed[0].toUpperCase()) > -1
            && loserSeedTuples[i].innerText.toUpperCase().indexOf(customMatchValues.matchLoserSeed[0].toUpperCase()) > -1
            && tourneyTuples[i].innerText.toUpperCase().indexOf(customMatchValues.matchTourney[0].toUpperCase()) > -1
            && scoreTuples[i].innerText.toUpperCase().indexOf(customMatchValues.matchScore[0].toUpperCase()) > -1)
            winnerTuples[i].parentNode.style.display = "";
        else {
            console.log("nope")
            winnerTuples[i].parentNode.style.display = "none";
        }
    }
}

filterPlayerTuples = function () {
    var nameTuples = $(customPlayerValues.playerName[1]);
    var handTuples = $(customPlayerValues.playerHand[1]);
    var heightTuples = $(customPlayerValues.playerHeight[1]);
    var countryTuples = $(customPlayerValues.playerCountry[1]);
    var rankTuples = $(customPlayerValues.playerRank[1]);

    for (i = 0; i < nameTuples.length; i++) { // all the same size
        if (nameTuples[i].innerText.toUpperCase().indexOf(customPlayerValues.playerName[0].toUpperCase()) > -1
            && handTuples[i].innerText.toUpperCase().indexOf(customPlayerValues.playerHand[0].toUpperCase()) > -1
            && heightTuples[i].innerText.toUpperCase().indexOf(customPlayerValues.playerHeight[0].toUpperCase()) > -1
            && countryTuples[i].innerText.toUpperCase().indexOf(customPlayerValues.playerCountry[0].toUpperCase()) > -1
            && rankTuples[i].innerText.toUpperCase().indexOf(customPlayerValues.playerRank[0].toUpperCase()) > -1)
            nameTuples[i].parentNode.style.display = "";
        else {
            nameTuples[i].parentNode.style.display = "none";
        }
    }
}

updateCustomValues = function () {

    $(".tourney-name").keyup(function () {
        customTourneyValues.tourneyName[0] = $(this).val();
        filterTourneyTuples();
    })
    $(".tourney-surface").keyup(function () {
        customTourneyValues.tourneySurface[0] = $(this).val();
        filterTourneyTuples();
    })
    $(".tourney-date").keyup(function () {
        customTourneyValues.tourneyDate[0] = $(this).val();
        filterTourneyTuples();
    })
    
    $(".match-winner-seed").keyup(function () {
        customMatchValues.matchWinSeed[0] = $(this).val();
        filterMatchTuples();
    })
    $(".match-loser-seed").keyup(function () {
        customMatchValues.matchLoserSeed[0] = $(this).val();
        filterMatchTuples();
    })
    $(".match-winner").keyup(function () {
        customMatchValues.matchWinner[0] = $(this).val();
        filterMatchTuples();
    })
    $(".match-loser").keyup(function () {
        customMatchValues.matchLoser[0] = $(this).val();
        filterMatchTuples();
    })
    $(".match-score").keyup(function () {
        customMatchValues.matchScore[0] = $(this).val();
        filterMatchTuples();
    })
    $(".match-tourney").keyup(function () {
        customMatchValues.matchTourney[0] = $(this).val();
        filterMatchTuples();
    })

    $(".player-name").keyup(function () {
        customPlayerValues.playerName[0] = $(this).val();
        filterPlayerTuples();
    })
    $(".player-hand").keyup(function () {
        customPlayerValues.playerHand[0] = $(this).val();
        filterPlayerTuples();
    })
    $(".player-height").keyup(function () {
        customPlayerValues.playerHeight[0] = $(this).val();
        console.log(customPlayerValues.playerHeight[0]);
        filterPlayerTuples();
    })
    $(".player-country").keyup(function () {
        customPlayerValues.playerCountry[0] = $(this).val();
        console.log(customPlayerValues.playerCountry[0]);
        filterPlayerTuples(customPlayerValues.playerCountry[0], "country-td");
    })
    $(".player-rank").keyup(function () {
        customPlayerValues.playerRank[0] = $(this).val();
        console.log(customPlayerValues.playerRank[0]);
        filterPlayerTuples(customPlayerValues.playerRank[0], "rank-td");
    })
}

getCustomData = function () {
    console.log(customPlayerValues.playerName[0]);
    var search_url = "player_table.php/?custom_search=true" +
                        "&playerName=" + customPlayerValues.playerName[0] +
                        "&playerHand=" + customPlayerValues.playerHand[0] +
                        "&playerHeight=" + customPlayerValues.playerHeight[0] +
                        "&playerCountry=" + customPlayerValues.playerCountry[0] + 
                        "&playerRank=" + customPlayerValues.playerRank[0]

    $.ajax({
        url: search_url,
        context: document.body
      }).done(function(data) {
        console.log(data);

        $("#data-table").html(data); // remember to call event hanlders again after reloading html
        resetCustomValues();
        updateCustomValues();
        sortPlayerColumns();
      });
}

initializeNavigationEventHandlers = function () {
    $(".get-match-data").click(function (event) {
        event.preventDefault();
        $(".nav-item").removeClass("active");
        $(".nav-match").addClass("active");
        getMatchData();
    })
    $(".get-player-data").click(function (event) {
        event.preventDefault();
        $(".nav-item").removeClass("active");
        $(".nav-player").addClass("active");
        getPlayerData();
    })
    $(".get-tourney-data").click(function (event) {
        event.preventDefault();
        $(".nav-item").removeClass("active");
        $(".nav-tourney").addClass("active");
        getTourneyData();
    })
}

getTourneyData = function () {

    // disable custom search button
    $(".search_button").prop("disabled", true);

    console.log("Getting tourney data...");
    var search_url = "tourneys_table.php"
    $.ajax({
        url: search_url,
        context: document.body
      }).done(function(data) {
          console.log(data)
        $("#data-table").html(data); // remember to call event hanlders again after reloading html
        resetCustomValues();
        updateCustomValues();
        sortPlayerColumns();
    });
}

getMatchData = function () {

    // disable custom search button
    $(".search_button").prop("disabled", true);

    console.log("Getting match data...");
    var search_url = "matches_table.php"
    $.ajax({
        url: search_url,
        context: document.body
      }).done(function(data) {
          console.log(data)
        $("#data-table").html(data); // remember to call event hanlders again after reloading html
        resetCustomValues();
        updateCustomValues();
        sortPlayerColumns();
        getPlayerDetails();
    });
}

getPlayerData = function () {

    // enable custom search button
    $(".search_button").prop("disabled", false);

    console.log("Getting player data...");
    var search_url = "player_table.php"
    $.ajax({
        url: search_url,
        context: document.body
      }).done(function(data) {
        $("#data-table").html(data); // remember to call event hanlders again after reloading html
        resetCustomValues();
        updateCustomValues();
        sortPlayerColumns();
    });
}

sortPlayerColumns = function () {
    var tuplesLength = 100;

    $(".sort-name-asc").click( function() {    
        var playerTuples = Array.from($(".player-tuple"));
        playerTuples.sort(function(a,b) {
            return a.childNodes[1].innerText.localeCompare(b.childNodes[1].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-name-desc").click( function() {   
        var playerTuples = Array.from($(".player-tuple")); 
        playerTuples.sort(function(b,a) {
            return a.childNodes[1].innerText.localeCompare(b.childNodes[1].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-hand-asc").click( function() {    
        var playerTuples = Array.from($(".player-tuple"));
        playerTuples.sort(function(a,b) {
            return a.childNodes[3].innerText.localeCompare(b.childNodes[3].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-hand-desc").click( function() {   
        var playerTuples = Array.from($(".player-tuple")); 
        playerTuples.sort(function(b,a) {
            return a.childNodes[3].innerText.localeCompare(b.childNodes[3].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-height-asc").click( function() {    
        var playerTuples = Array.from($(".player-tuple"));
        playerTuples.sort(function(a,b) {
            return a.childNodes[5].innerText.localeCompare(b.childNodes[5].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-height-desc").click( function() {   
        var playerTuples = Array.from($(".player-tuple")); 
        playerTuples.sort(function(b,a) {
            return a.childNodes[5].innerText.localeCompare(b.childNodes[5].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-country-asc").click( function() {    
        var playerTuples = Array.from($(".player-tuple"));
        playerTuples.sort(function(a,b) {
            return a.childNodes[7].innerText.localeCompare(b.childNodes[7].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-country-desc").click( function() {   
        var playerTuples = Array.from($(".player-tuple")); 
        playerTuples.sort(function(b,a) {
            return a.childNodes[7].innerText.localeCompare(b.childNodes[7].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-rank-asc").click( function() {    
        var playerTuples = Array.from($(".player-tuple"));
        playerTuples.sort(function(a,b) {
            return a.childNodes[9].innerText.localeCompare(b.childNodes[9].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
    $(".sort-rank-desc").click( function() {   
        var playerTuples = Array.from($(".player-tuple")); 
        playerTuples.sort(function(b,a) {
            return a.childNodes[9].innerText.localeCompare(b.childNodes[9].innerText);
        });
        replaceTuples(tuplesLength, playerTuples);
    });
}

replaceTuples = function(length, sorted) {
    for (i = 0; i < length; i++) {
        $(".player-table-body")[0].append(sorted[i])
    }
}

getPlayerDetails = function () {
    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var id = button.data('id') // Extract info from data-* attributes
        var search_url = "player_modal_details.php/?id=" + id;
        if (button.attr("class") == "tourney-info") {
            search_url = "tourney_modal_details.php/?id=" + id;
        }
        $.ajax({
            url: search_url,
            context: document.body
          }).done( function(data) {
            var modal = $(this)
            modal.find('.modal-body').html(data)
            resetCustomValues();
            updateCustomValues();
            sortPlayerColumns();
        });
        
      })
}