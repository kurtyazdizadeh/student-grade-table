class GradeForm {
  constructor(formElement) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rowToUpdate = this.rowToUpdate.bind(this);

    this.formElement = formElement;

    this.submitBtn = this.formElement.querySelector("#formSubmit");
    this.updateBtn = this.formElement.querySelector("#formUpdate");

    this.submitBtn.addEventListener('submit', this.handleSubmit);
    this.updateBtn.addEventListener('submit', this.handleUpdate);
  }
  onSubmit(createGrade) {
    this.createGrade = createGrade;
  }
  handleSubmit(event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    var name = formData.get("name");
    var course = formData.get("course");
    var grade = formData.get("grade");

    grade = parseInt(grade)
    this.createGrade(name, course, grade);
    event.target.reset();
  }
  onUpdate(updateGrade) {
    this.updateGrade = updateGrade;
  }
  rowToUpdate (data) {
    var name = this.formElement.querySelector("#name");
    var course = this.formElement.querySelector("#course");
    var grade = this.formElement.querySelector("#grade");
    var updateBtn = this.formElement.querySelector("#formUpdate");
    var formTitle = this.formElement.querySelector("#formTitle");

    name.setAttribute("value", data.name);
    course.setAttribute("value", data.course);
    grade.setAttribute("value", data.grade);

    formTitle.textContent = "Update Grade";
    this.submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
  }

  handleUpdate(event){
    event.preventDefault();

    var formData = new FormData(event.target);
    var name = formData.get("name");
    var course = formData.get("course");
    var grade = formData.get("grade");

    grade = parseInt(grade);

    this.updateGrade({
      "name": name,
      "course": course,
      "grade": grade
    });
    event.target.reset();

    this.updateBtn.classList.add("d-none");
    this.submitBtn.classList.remove("d-none");
  }
}
