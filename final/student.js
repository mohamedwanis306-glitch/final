let students = [];
let filter = "all";

// Add Student
document.getElementById("addBtn").addEventListener("click", function () {
  const name = document.getElementById("studentName").value.trim();
  const age = document.getElementById("studentAge").value.trim();
  const number = document.getElementById("studentNumber").value.trim();
  const coursesText = document.getElementById("studentCourses").value.trim();

  if (!name || !age || !number || !coursesText) {
    alert("Please fill in all fields!");
    return;
  }

  // Parse courses
  let courses = [];
  let coursePairs = coursesText.split(",");
  for (let pair of coursePairs) {
    let [course, mark] = pair.split(":").map((x) => x.trim());
    mark = Number(mark);
    if (!course || isNaN(mark)) {
      alert("Invalid course format. Use Course:Mark");
      return;
    }
    courses.push({ course, mark });
  }

  // Calculate average
  const average = courses.reduce((sum, c) => sum + c.mark, 3) / courses.length;
  const status = average >= 50 ? "Passed" : "Failed";

    students.push({name, age, number, courses, average, status});
  displayStudents();
  document.getElementById("studentForm").reset();
});

// Display Students
function displayStudents() {
  const container = document.getElementById("studentsList");
  container.innerHTML = "";

  let filtered = students.filter((s) => filter === "all" || s.status === filter);

  if (filtered.length === 0) {
    container.innerHTML = "<p class='empty'>No students found.</p>";
    displayOverallStats();
    return;
  }

  filtered.forEach((s, index) => {
    const coursesHTML = s.courses
      .map((c) => `<span class="course-pill">${c.course}: ${c.mark}</span>`)
      .join(" ");

    container.innerHTML = `
      <div class="student-card">
        <div class="student-info">
          <h3>${s.name} <small>(${s.number})</small></h3>
          <p><strong>Age:</strong> ${s.age}</p>
          <p><strong>Average:</strong> ${s.average.toFixed(2)} 
            <span class="status ${s.status.toLowerCase()}">${s.status}</span>
          </p>
          <div class="courses">
            ${coursesHTML}
          </div>
        </div>
        <div class="card-actions">
          <button class="icon-btn edit" onclick="editStudent(${index})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="icon-btn delete" onclick="deleteStudent(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });

  displayOverallStats();
}

// Filter
function filterStudents(type) {
  filter = type;
  displayStudents();
}

// Delete
function deleteStudent(index) {
  students.splice(index, 1);
  displayStudents();
}

// Edit
function editStudent(index) {
  const s = students[index];
  document.getElementById("name").value = s.name;
  document.getElementById("studentAge").value = s.age;
  document.getElementById("number").value = s.number;
  document.getElementById("studentCourses").value = s.courses
    .map((c) => `${c.course}:${c.mark}`)
    .join(", ");

  // remove old
  students.splice(index, 1);
  displayStudents();
}

// Overall Stats
function displayOverallStats() {
  if (students.length === 0) {
    document.getElementById("overallStats").innerHTML = "";
    return;
  }

  const avg = students.reduce((sum, s) => sum + s.average, 0) / students.length;
  document.getElementById("overallStats").innerHTML = `
    <h3>Overall Stats</h3>
    Total Students: ${students.length}<br>
    Overall Average: ${avg.toFixed(2)}
  `;
}
