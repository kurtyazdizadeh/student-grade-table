class GradeForm {
  constructor(formElement) {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.rowToUpdate = this.rowToUpdate.bind(this);

    this.formElement = formElement;

    this.formElement.addEventListener('submit', this.handleSubmit);
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
    var submitBtn = this.formElement.querySelector("#formSubmit");
    var formTitle = this.formElement.querySelector("#formTitle");

    name.setAttribute("value", data.name);
    course.setAttribute("value", data.course);
    grade.setAttribute("value", data.grade);
    submitBtn.textContent = "Update";
    formTitle.textContent = "Update Grade";

    console.log(name);
    console.log(data);

  }
}
