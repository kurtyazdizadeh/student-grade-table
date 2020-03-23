class GradeForm {
  constructor(formElement) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rowToUpdate = this.rowToUpdate.bind(this);
    this.extractFormData = this.extractFormData.bind(this);

    this.formElement = formElement;
    this.currentRowID = 0;

    this.formTitle = this.formElement.querySelector("#formTitle");
    this.submitBtn = this.formElement.querySelector("#formSubmit");

    this.formElement.addEventListener('submit', this.handleSubmit);
    // this.formElement.addEventListener('submit', this.handleUpdate); <-- this also gets called

    // this.submitBtn.addEventListener('submit', this.handleSubmit); <-- these throw errors
    // this.updateBtn.addEventListener('submit', this.handleUpdate);
  }
  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  handleSubmit(event) {
    event.preventDefault();
    var data = this.extractFormData(event.target);

    if (this.submitBtn.textContent === "Update") {
      this.updateGrade({
        "id": this.currentRowID,
        "name": data.name,
        "course": data.course,
        "grade": data.grade
      });
    } else {
      this.createGrade(data.name, data.course, data.grade);
    }

    event.target.reset();

    this.formTitle.textContent = "Add Grade";
    this.submitBtn.textContent = "Add";

  }
  extractFormData (eventTarget) {
    var formData = new FormData(eventTarget);
    var name = formData.get("name");
    var course = formData.get("course");
    var grade = formData.get("grade");

    grade = parseInt(grade);
    return ({
      "id": this.currentRowID,
      "name": name,
      "course": course,
      "grade": grade
    });

  }
  onUpdate(updateGrade) {
    this.updateGrade = updateGrade;
  }
  rowToUpdate (data) {
    var name = this.formElement.querySelector("#name");
    var course = this.formElement.querySelector("#course");
    var grade = this.formElement.querySelector("#grade");

    name.value = data.name;
    course.value = data.course;
    grade.value = data.grade;

    this.currentRowID = data.id;

    this.formTitle.textContent = "Update Grade";
    this.submitBtn.textContent = "Update";
  }
}
