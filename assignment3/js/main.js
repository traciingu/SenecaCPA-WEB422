/*********************************************************************************
*  WEB422 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Tracy Nguyen Student ID: 127270171 Date: FEB 2019
*
*  Link: https://web422-assignment1-tn.herokuapp.com/
*  Link: https://git.heroku.com/web422-assignment1-tn.git
*
********************************************************************************/

// Global variables
let viewModel = {
    teams: ko.observableArray([]),
    employees: ko.observableArray([]),
    projects: ko.observableArray([]),
};


// ---------------------- ASSIGNMENT THREE ----------------------

function initializeTeams() {
    return new Promise((resolve, reject) => {
        $.get("https://web422-assignment1-tn.herokuapp.com/teams-raw")
            .done(function (data) {
                viewModel.teams = ko.mapping.fromJS(data);
                resolve();
            })
            .fail(function () {
                reject("Error loading the team data");
            });
    });
}

function initializeEmployees() {
    return new Promise((resolve, reject) => {
        $.get("https://web422-assignment1-tn.herokuapp.com/employees")
            .done(function (data) {
                viewModel.employees = ko.mapping.fromJS(data);
                resolve();
            })
            .fail(function () {
                reject("Error loading the employee data");
            });
    });
}

function initializeProjects() {
    return new Promise((resolve, reject) => {
        $.get("https://web422-assignment1-tn.herokuapp.com/projects")
            .done(function (data) {
                viewModel.projects = ko.mapping.fromJS(data);
                resolve();
            })
            .fail(function () {
                reject("Error loading the 'project' data");
            });
    });
}

function saveTeam(){
    var currentTeam = this;

    $.ajax({
    url: "https://web422-assignment1-tn.herokuapp.com/team/" + currentTeam._id(),
    type: 'PUT',
    contentType: "application/json",
    data: JSON.stringify({
           "Projects": currentTeam.Projects(),
           "Employees": currentTeam.Employees(),
           "TeamLead": currentTeam.TeamLead()
       }) 
    })
    .done(function(){
        showGenericModal("Success", currentTeam.TeamName() + " Updated Successfully");
    })
    .fail(function(){
        showGenericModal("Error", "Error updating the team information");
    });
}

// ---------------------- ASSIGNMENT TWO ----------------------
// Displays generic modal
function showGenericModal(title, message) {
    $(".modal-title").html(title);
    $(".modal-body").html(message);
    $("#genericModal").modal({});
}

// ---------------------- ASSIGNMENT ONE ------------------------
$("#teams-menu").on("click", function (event) {
    event.preventDefault();

    $.get("https://web422-assignment1-tn.herokuapp.com/teams")
        .done(function (data) {
            $("#data").empty()
                .html("<h3>Teams</h3>")
                .html(JSON.stringify(data));
        });
});

$("#employees-menu").on("click", function (event) {
    event.preventDefault();

    $.get("https://web422-assignment1-tn.herokuapp.com/employees")
        .done(function (data) {
            $("#data").empty()
                .html("<h3>Employees</h3>")
                .html(JSON.stringify(data));
        });;
});

$("#projects-menu").on("click", function (event) {
    event.preventDefault();

    $.get("https://web422-assignment1-tn.herokuapp.com/projects")
        .done(function (data) {
            $("#data").empty()
                .html("<h3>Projects</h3>")
                .html(JSON.stringify(data));
        });
});

$("#positions-menu").on("click", function (event) {
    event.preventDefault();

    $.get("https://web422-assignment1-tn.herokuapp.com/positions")
        .done(function (data) {
            $("#data").empty()
                .html("<h3>Positions</h3>")
                .html(JSON.stringify(data));
        });
});

// document ready function
$(document).ready(function () {
    console.log("jQuery working!");

    initializeTeams()
        .then(initializeEmployees)
        .then(initializeProjects)
        .then(function () {
            ko.applyBindings(viewModel); 
            $(".multiple").multipleSelect({ filter: true }); 
            $(".single").multipleSelect({ single: true, filter: true });
        })
        .catch(function(err){
            showGenericModal("Error", err);
        });

});