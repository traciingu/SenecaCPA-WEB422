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

// Global array containing all employees
let employeesModel = [];


// ---------------------- ASSIGNMENT TWO ----------------------
// Inits global array, employeesModel, then displays it 
// Will display generic modal if failed
function initializeEmployeesModel() {
    $.get("https://web422-assignment1-tn.herokuapp.com/employees")
        .done(function (data) {
            employeesModel = data;
            refreshEmployeeRows(employeesModel);
        })
        .fail(function (err) {
            showGenericModal('Error', 'Unable to get Employees');
        });
}


// Displays generic modal
function showGenericModal(title, message) {
    $(".modal-title").html(title);
    $(".modal-body").html(message);
    $("#genericModal").modal({});
}

// Displays given array of employees
function refreshEmployeeRows(employees) {
    let empRowTemplate = _.template('<% _.forEach(employees, function(employee) { %>' +
        '<div class="row body-row" data-id="<%- employee._id %>">'
        + '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>'
        + '<div class="col-xs-4 body-column"><%- employee.LastName %></div>'
        + '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>'
        + '</div>' + '<% }); %>');

    let empRow = empRowTemplate({ "employees": employees });
    $("#employees-table").empty();
    $("#employees-table").html(empRow);

}

// Returns array of employees (fname, lname, positionname) matching parameter
function getFilteredEmployeesModel(filterString) {
    let filterStringCompare = ".*" + filterString.toLowerCase() + ".*";
    let filteredEmpTemplate = _.filter(employeesModel, function (emp) {
        return (emp.FirstName.toLowerCase().match(filterStringCompare)) || (emp.LastName.toLowerCase().match(filterStringCompare)) || (emp.Position.PositionName.toLowerCase().match(filterStringCompare));
    });

    return filteredEmpTemplate;
}

// Returns employee with id matching parameter
function getEmployeeModelById(id) {
    let empIdTemplate = _.find(employeesModel, function (emp) {
        return emp._id == id;
    });

    return empIdTemplate == null ? null : _.cloneDeep(empIdTemplate);
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

    initializeEmployeesModel();
    
    $("#employee-search").keyup(function () {
        let filteredEmpModel = getFilteredEmployeesModel(this.value);
        refreshEmployeeRows(filteredEmpModel);
    });

    $(document).on("click", ".body-row", function () {
        let emp = getEmployeeModelById($(this).attr("data-id"));
        let empHireDate = moment(emp.HireDate).format('LL');

        console.log(empHireDate);
        // Address: 123 Sesame Street Hogwarts, ON M9M 2T3
        // Phone Number" 1-(416) 555-1234 ext: 1
        // Hire Date: January 27, 2019
        let clickedEmpTemplate = _.template('<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressState %>, <%- employee.AddressCity %> <%- employee.AddressZip %><br>'
        + '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %><br>'
        + '<strong>Hire Date:</strong> <%-  hireDate %>');

        let clickedEmp = clickedEmpTemplate({'employee': emp,'hireDate': empHireDate});
        let empFullName = emp.FirstName + ' ' + emp.LastName;
        showGenericModal(empFullName, clickedEmp);
    });



});