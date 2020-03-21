var tableEl = document.querySelector('table');
var headerEl = document.querySelector('header');
var formEl = document.querySelector('form');

var gradeTable = new GradeTable(tableEl);
var pageHeader = new PageHeader(headerEl);
var gradeForm = new GradeForm(formEl);
var app = new App(gradeTable, pageHeader);

app.start();
