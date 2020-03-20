class PageHeader {
  constructor(headerElement) {
    this.headerElement = headerElement;
  }
  updateAverage(newAverage) {
    var averageGrade = this.headerElement.querySelector("#averageGrade");
    averageGrade.textContent = newAverage;
  }

}
