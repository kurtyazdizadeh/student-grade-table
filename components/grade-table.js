class GradeTable {
  constructor (tableElement, noGradesElement) {
    this.tableElement = tableElement;
    this.tbody = this.tableElement.querySelector('tbody');
    this.noGradesElement = noGradesElement;
  }
  updateGrades(grades){
    this.tbody.innerHTML = "";

    (!grades.length) ?
      this.noGradesElement.classList.remove('d-none') :
      this.noGradesElement.classList.add('d-none');

    for (var i = 0; i < grades.length; i++) {
      this.renderGradeRow(grades[i], this.deleteGrade);
    }
  }
  onDeleteClick(deleteGrade){
    this.deleteGrade = deleteGrade;
  }
  renderGradeRow(data, deleteGrade){
    var row = document.createElement("tr");
    var name = document.createElement("td");
    var course = document.createElement("td");
    var grade = document.createElement("td");
    var operations = document.createElement("td");

    var operationsButton = document.createElement("button");
    operationsButton.textContent = "Delete";
    operationsButton.className = "btn btn-danger";

    operations.appendChild(operationsButton);

    name.textContent = data.name;
    course.textContent = data.course;
    grade.textContent = data.grade;

    var rowElements = [name, course, grade, operations];

    for (var rowIndex = 0; rowIndex < rowElements.length; rowIndex++) {
      row.appendChild(rowElements[rowIndex])
    }
    this.tbody.appendChild(row);
  }
}
