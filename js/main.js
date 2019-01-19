/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Tracy Nguyen Student ID: 127270171 Date: JAN 2019
*
*  Link: https://web422-assignment1-tn.herokuapp.com/
*  https://git.heroku.com/web422-assignment1-tn.git
********************************************************************************/


$("document").ready(function () {
    console.log("jQuery working!");


    $("#teams-menu").on("click", function (event) {
        event.preventDefault();

        $.get("https://web422-assignment1-tn.herokuapp.com/teams", function() {
            console.log("AJAX!");
        })
            .done(function (data) {
                $(".well").empty()
                    .append("<h3>Teams</h3>")
                    .append(JSON.stringify(data));
                console.log("COMPLETED RETRIEVAL OF TEAMS DATA!");
            });
    });

    $("#employees-menu").on("click", function (event) {
        event.preventDefault();

        $.get("https://web422-assignment1-tn.herokuapp.com/employees", function (data) {
            console.log("AJAX DID SOMETHING!");
        });
    });

    $("#projects-menu").on("click", function (event) {
        event.preventDefault();

        $.get("https://web422-assignment1-tn.herokuapp.com/projects", function (data) {
            console.log("AJAX DID SOMETHING!");
        });
    });

    $("#positions-menu").on("click", function (event) {
        event.preventDefault();

        $.get("https://web422-assignment1-tn.herokuapp.com/positions", function (data) {
            console.log("AJAX DID SOMETHING!");
        });
    });

});