export function calculatePointer(marks: number, totalMarks: number) {
    const percentage = (marks / totalMarks) * 100;
    let grade = "";
  
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B+";
    else if (percentage >= 60) grade = "B";
    else if (percentage >= 50) grade = "C";
    else grade = "F";
  
    return {
      marks,
      totalMarks,
      percentage: percentage.toFixed(2),
      grade,
    };
  }
  