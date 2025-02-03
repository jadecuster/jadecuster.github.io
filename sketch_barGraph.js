let broadway_gist =
  'https://gist.githubusercontent.com/jadecuster/48dbc49185e2ea70a3b023d42640df22/raw/1e8f88bf280512ebdebedccdfba1e5f98ea349cd/broadway.csv';

let attendanceByYear = {};  // To hold total attendance per year
let years = [];

function preload() {
  // Load the CSV file from your Gist URL
  table = loadTable("broadway_gist", "csv", "header");
}

function setup() {
  createCanvas(600, 500);
  
  let numberOfRows = table.getRowCount();

  // Loop through each row in the CSV and aggregate attendance per year
  for (let i = 0; i < numberOfRows; i++) {
    let year = table.getString(i, "Date.Year");  // Get the year
    let attendance = table.getString(i, "Statistics.Attendance");  // Get the attendance as string
    
    attendance = parseInt(attendance);  // Convert to integer
    
    if (!isNaN(attendance)) {
      // Add the year to the list of years if not already present
      if (!years.includes(year)) {
        years.push(year);
      }

      // Aggregate the attendance by year
      attendanceByYear[year] = (attendanceByYear[year] || 0) + attendance;
    }
  }
}

function draw() {
  background(220);
  fill(0);
  
  let barWidth = 30; // Width of each bar
  let spaceBetweenBars = 10; // Space between bars
  let startX = 60; // Starting X position for the bars
  
  // Calculate the maximum attendance across all years
  let maxAttendance = max(Object.values(attendanceByYear));

  // Loop through each year and draw the bars
  for (let i = 0; i < years.length; i++) {
    let year = years[i];
    
    // Draw the bar for total attendance in this year
    let yearAttendance = attendanceByYear[year];
    let barHeight = map(yearAttendance, 0, maxAttendance, 0, height - 60);
    fill(0, 0, 255);  // Blue for the bars
    rect(startX + (i * (barWidth + spaceBetweenBars)), height - barHeight - 30, barWidth, barHeight);
  }

  // Draw the Y-axis labels (attendance values)
  textSize(12);
  for (let i = 0; i <= maxAttendance; i += 2000) { // Draw in increments of 2000
    text(i, 30, height - map(i, 0, maxAttendance, 0, height - 60) - 30);
  }

  // Draw the X-axis labels (years)
  textSize(10);
  for (let i = 0; i < years.length; i++) {
    text(years[i], startX + (i * (barWidth + spaceBetweenBars)), height - 10);
  }
}
