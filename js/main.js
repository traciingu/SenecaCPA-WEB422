/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Tracy Nguyen Student ID: 127270171 Date: JAN 2019
*
*  Link: https://web422-assignment1-tn.herokuapp.com/
*  Link: https://git.heroku.com/web422-assignment1-tn.git
********************************************************************************/


$("document").ready(function () {
    console.log("jQuery working!");


    $("#teams-menu").on("click", function (event) {
        event.preventDefault();

        $.get("https://web422-assignment1-tn.herokuapp.com/teams")
            .done(function (data) {
                $("#data").empty()
                    .append("<h3>Teams</h3>")
                    .append(JSON.stringify(data));
            });
    });

    $("#employees-menu").on("click", function (event) {
        event.preventDefault();

        $.get("https://web422-assignment1-tn.herokuapp.com/employees")
        .done(function (data) {
            $("#data").empty()
                .append("<h3>Employees</h3>")
                .append(JSON.stringify(data));
        });;
    });

    $("#projects-menu").on("click", function (event) {
        event.preventDefault();

        $.get("https://web422-assignment1-tn.herokuapp.com/projects")
        .done(function (data) {
            $("#data").empty()
                .append("<h3>Projects</h3>")
                .append(JSON.stringify(data)); 
        });
    });

    $("#positions-menu").on("click", function (event) {
        event.preventDefault();

        $.get("https://web422-assignment1-tn.herokuapp.com/positions")
        .done(function (data) {
            $("#data").empty()
                .append("<h3>Positions</h3>")
                .append(JSON.stringify(data));
        });;
    });

});