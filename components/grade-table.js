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
      this.renderGradeRow(grades[i], this.deleteGrade, this.updateGrade);
    }
  }
  onDeleteClick(deleteGrade){
    this.deleteGrade = deleteGrade;
  }
  onUpdateClick(updateGrade){
    this.updateGrade = updateGrade;
  }
  renderGradeRow(data, deleteGrade){
    var row = document.createElement("tr");
    var name = document.createElement("td");
    var course = document.createElement("td");
    var grade = document.createElement("td");
    var operations = document.createElement("td");

    operations.className = "d-flex justify-content-around";

    var operationsEdit = document.createElement("i");
    operationsEdit.className = "fas fa-edit text-primary cursor-pointer";
    operationsEdit.addEventListener('click', function() {
      updateGrade();
    });

    var operationsDelete = document.createElement("i");
    operationsDelete.className = "fas fa-trash text-danger cursor-pointer";
    operationsDelete.addEventListener('click', function() {
      deleteGrade(data.id);
    });

    operations.appendChild(operationsEdit);
    operations.appendChild(operationsDelete);

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
