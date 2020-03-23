var APIKey = "GkNqAZE8";
var urlPath = "https://sgt.lfzprototypes.com/api/grades";

class App {
  constructor (gradeTable, pageHeader, gradeForm) {
    this.handleGetGradesError = this.handleGetGradesError.bind(this);
    this.handleGetGradesSuccess = this.handleGetGradesSuccess.bind(this);
    this.createGrade = this.createGrade.bind(this);
    this.handleCreateGradeError = this.handleCreateGradeError.bind(this);
    this.handleCreateGradeSuccess = this.handleCreateGradeSuccess.bind(this);
    this.deleteGrade = this.deleteGrade.bind(this);
    this.handleDeleteGradeError = this.handleDeleteGradeError.bind(this);
    this.handleDeleteGradeSuccess = this.handleDeleteGradeSuccess.bind(this);
    this.updateGrade = this.updateGrade.bind(this);
    this.handleUpdateGradeError = this.handleUpdateGradeError.bind(this);
    this.handleUpdateGradeSuccess = this.handleUpdateGradeSuccess.bind(this);

    this.gradeTable = gradeTable;
    this.pageHeader = pageHeader;
    this.gradeForm = gradeForm;
  }
  ajaxCall(method, url, success, error, data = {}) {
    $.ajax({
      method: method,
      url: url,
      data: data,
      headers: {
        "X-Access-Token": APIKey
      },
      success: success,
      error: error
    })
  }
  handleGetGradesError(error) {
    console.error(error);
  }
  handleGetGradesSuccess(grades) {
    this.gradeTable.updateGrades(grades);

    var avgGrades = 0;
    for (var i = 0; i < grades.length; i++) {
      avgGrades += grades[i].grade;
    }
    avgGrades /= grades.length;

    if (Number.isNaN(avgGrades)) {
      avgGrades = 0;
    }

    this.pageHeader.updateAverage(avgGrades);
  }
  getGrades() {
    this.ajaxCall(
      "GET",
      urlPath,
      this.handleGetGradesSuccess,
      this.handleGetGradesError
    )
  }
  start() {
    this.getGrades();
    this.gradeForm.onSubmit(this.createGrade);
    this.gradeForm.onUpdate(this.updateGrade);
    this.gradeTable.onDeleteClick(this.deleteGrade);
    this.gradeTable.onUpdateClick(this.gradeForm.rowToUpdate);
  }
  createGrade(name, course, grade) {
    this.ajaxCall(
      "POST",
      urlPath,
      this.handleCreateGradeSuccess,
      this.handleCreateGradeError,
      {
        "name": name,
        "course": course,
        "grade": grade
      }
    )
  }
  handleCreateGradeError(error){
    console.error(error);
  }
  handleCreateGradeSuccess(){
    this.getGrades();
  }
  deleteGrade(id){
    this.ajaxCall(
      "DELETE",
      `${urlPath}/${id}`,
      this.handleDeleteGradeSuccess,
      this.handleDeleteGradeError
    )
  }
  handleDeleteGradeError(error){
    console.error(error);
  }
  handleDeleteGradeSuccess(){
    this.getGrades();
  }
  updateGrade(data){
    console.log("update in app", data);

    this.ajaxCall(
      "PATCH",
      `${urlPath}/${data.id}`,
      this.handleUpdateGradeSuccess,
      this.handleUpdateGradeError,
      {
        "name": data.name,
        "course": data.course,
        "grade": data.grade
      }
    )
  }
  handleUpdateGradeSuccess(data) {
    console.log(data);
    this.getGrades();
  }
  handleUpdateGradeError(error) {
    console.error(error);
  }
}
