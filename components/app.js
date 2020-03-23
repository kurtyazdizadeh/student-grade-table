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

    this.grades = [];
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
    this.grades = grades;
    this.gradeTable.updateGrades(this.grades);
    this.calculateAverageGrades();
  }
  getGrades() {
    this.ajaxCall(
      "GET",
      urlPath,
      this.handleGetGradesSuccess,
      this.handleGetGradesError
    )
  }
  calculateAverageGrades(){
    var avgGrades = 0;
    for (var i = 0; i < this.grades.length; i++) {
      avgGrades += parseFloat(this.grades[i].grade);
    }
    avgGrades /= this.grades.length;

    if (Number.isNaN(avgGrades)) {
      avgGrades = 0;
    }

    this.pageHeader.updateAverage(avgGrades);
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
  handleCreateGradeSuccess(data){
    this.grades.push(data);
    this.gradeTable.updateGrades(this.grades);
    this.calculateAverageGrades();
  }
  deleteGrade(id){
    for (var i = 0; i < this.grades.length; i++) {
      if (this.grades[i].id === id) {
        this.grades.splice(i, 1);
      }
    }

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
    this.gradeTable.updateGrades(this.grades);
    this.calculateAverageGrades();
  }
  updateGrade(data){
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
    for (var i = 0; i < this.grades.length; i++){
      if (this.grades[i].id === data.id) {
        this.grades[i] = data;
      }
    }
    this.gradeTable.updateGrades(this.grades);
    this.calculateAverageGrades();
  }
  handleUpdateGradeError(error) {
    console.error(error);
  }
}
