var tableEl = document.querySelector('table');
var headerEl = document.querySelector('header');
var formEl = document.querySelector('form');
var noGradesEl = document.querySelector("#noGrades");

var gradeTable = new GradeTable(tableEl, noGradesEl);
var pageHeader = new PageHeader(headerEl);
var gradeForm = new GradeForm(formEl);
var app = new App(gradeTable, pageHeader, gradeForm);

app.start();
