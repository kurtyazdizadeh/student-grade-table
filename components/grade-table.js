class GradeTable {
  constructor (tableElement) {
    this.tableElement = tableElement;
  }
  updateGrades(grades){
    var tbody = this.tableElement.querySelector('tbody');
    tbody.innerHTML = "";

    for (var i = 0; i < grades.length; i++) {
      var row = document.createElement("tr");
      var name = document.createElement("td");
      var course = document.createElement("td");
      var grade = document.createElement("td");
      var operations = document.createElement("td");

      var operationsButton = document.createElement("button");
      operationsButton.textContent = "Delete";
      operationsButton.className = "btn btn-danger";

      operations.appendChild(operationsButton);

      name.textContent = grades[i].name;
      course.textContent = grades[i].course;
      grade.textContent = grades[i].grade;

      var rowElements = [name, course, grade, operations];

      for (var rowIndex = 0; rowIndex < rowElements.length; rowIndex++){
        row.appendChild(rowElements[rowIndex]);
      }
      tbody.appendChild(row);
    }
  }
}
