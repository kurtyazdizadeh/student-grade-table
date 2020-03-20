var tableEl = document.querySelector('table');
var headerEl = document.querySelector('header');

var gradeTable = new GradeTable(tableEl);
var pageHeader = new PageHeader(headerEl);
var app = new App(gradeTable, pageHeader);

app.start();
