$(document).ready(function () {
  // TODO: Fetch the annotation details using batchId (or another identifier)
  // For demonstration purposes, I'm just hardcoding a sample data object below

  let batchId = getBatchIdFromURL(); // Sample function to extract batchId from URL

  let annotationDetails = {
    date: "01/01/2022",
    annotatorEmail: "john.doe@example.com",
    batchNumber: "001",
    annotationId: "12345",
    prompt: "Sample prompt text...",
    completions: [
      {
        text: "Sample completion text 1...",
        questions: [
          "Sample MCQ question 1",
          "Sample MCQ question 2",
          "Sample MCQ question 3",
          "Sample MCQ question 4",
          "Sample MCQ question 5",
        ],
      },
      // Add two more completions here...
    ],
  };

  // TODO: Update the HTML elements with the fetched details
  $("#date").text(annotationDetails.date);
  $("#annotatorEmail").text(annotationDetails.annotatorEmail);
  //... Continue for the rest

  function getBatchIdFromURL() {
    // Sample function to get the batchId from the query parameters
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("batchId");
  }
});
