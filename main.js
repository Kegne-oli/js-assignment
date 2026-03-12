// =================================
// Part 1: Variables & Data Types
// =================================

console.log("=== Student Information ===");

// Student information
const studentName = "Kegne Flobert";
const studentID = "STU12345";
const course = "JavaScript Programming";

// Scores
let mathScore = 85;
let englishScore = 78;
let scienceScore = 92;
let programmingScore = 88;

// Boolean
const isEnrolled = true;

// Undefined variable
let graduationYear;


// Display variables and types
console.log("Student Name:", studentName);
console.log("Type:", typeof studentName);

console.log("Student ID:", studentID);
console.log("Type:", typeof studentID);

console.log("Course:", course);
console.log("Type:", typeof course);

console.log("Math Score:", mathScore);
console.log("Type:", typeof mathScore);

console.log("Enrollment:", isEnrolled);
console.log("Type:", typeof isEnrolled);

console.log("Graduation Year:", graduationYear);
console.log("Type:", typeof graduationYear);


// =================================
// Part 2: String Manipulation
// =================================

console.log("=== String Operations ===");

// Traditional concatenation
const welcomeMsg = "Welcome, " + studentName + "! Your ID is: " + studentID;

console.log(welcomeMsg);

// Template literal
const detailMsg = `Student: ${studentName}
Course: ${course}
Status: ${isEnrolled ? "Enrolled" : "Not Enrolled"}`;

console.log(detailMsg);


// String methods
console.log("Name Length:", studentName.length);

console.log("Uppercase Name:", studentName.toUpperCase());

console.log("Lowercase Course:", course.toLowerCase());

console.log("Substring:", studentName.substring(0,5));

const nameArray = studentName.split(" ");
console.log("Name Array:", nameArray);


// =================================
// Part 3: Grade Calculation
// =================================

console.log("=== Grade Calculation ===");

const totalScore =
mathScore +
englishScore +
scienceScore +
programmingScore;

const averageScore = totalScore / 4;

console.log("Total Score:", totalScore);
console.log("Average Score:", averageScore);


// Determine grade
let gradeLetter;

if (averageScore >= 90) {
gradeLetter = "A";
}
else if (averageScore >= 80) {
gradeLetter = "B";
}
else if (averageScore >= 70) {
gradeLetter = "C";
}
else if (averageScore >= 60) {
gradeLetter = "D";
}
else {
gradeLetter = "F";
}


// Pass / Fail
const hasPassed = averageScore >= 60;


// Console messages
if (averageScore < 60) {
console.error("Student has FAILED");
}
else if (averageScore < 70) {
console.warn("Student performance is LOW");
}
else {
console.log("Student passed successfully");
}


// =================================
// Bonus: Data Type Validation
// =================================

if (
typeof mathScore !== "number" ||
typeof englishScore !== "number" ||
typeof scienceScore !== "number" ||
typeof programmingScore !== "number"
) {
console.error("Invalid data type for scores!");
}


// =================================
// Bonus: Name Formatter Function
// =================================

function formatName(name) {

return name
.split(" ")
.map(word =>
word.charAt(0).toUpperCase() +
word.slice(1).toLowerCase()
)
.join(" ");

}

const formattedName = formatName(studentName);


// =================================
// Part 4: Dynamic HTML Output
// =================================

const outputDiv = document.getElementById("output");

outputDiv.innerHTML = `

<h2>Student Report Card</h2>

<p><strong>Name:</strong> ${formattedName}</p>
<p><strong>ID:</strong> ${studentID}</p>
<p><strong>Course:</strong> ${course}</p>

<hr>

<h3>Scores</h3>

<p>Math: ${mathScore}</p>
<p>English: ${englishScore}</p>
<p>Science: ${scienceScore}</p>
<p>Programming: ${programmingScore}</p>

<hr>

<h3>Results</h3>

<p><strong>Total Score:</strong> ${totalScore}</p>

<p><strong>Average:</strong> ${averageScore.toFixed(2)}</p>

<p><strong>Grade:</strong> ${gradeLetter}</p>

<p><strong>Status:</strong> ${hasPassed ? "PASSED" : "FAILED"}</p>

`;