function showFailAlert(message) {
  const alertHTML = `
      <div id="failAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
      </div>
    `;

  const alertContainer = document.getElementById("alertContainer");
  alertContainer.innerHTML = "";
  alertContainer.insertAdjacentHTML("beforeend", alertHTML);

  setTimeout(function () {
    const failAlert = document.getElementById("failAlert");
    if (failAlert) {
      failAlert.classList.remove("show");
      failAlert.classList.add("fade");
    }
  }, 3000);
}

function showSuccessAlert(message) {
  const alertHTML = `
      <div id="successAlert" class="alert alert-primary alert-dismissible fade show" role="alert">
        ${message}
      </div>
    `;

  const alertContainer = document.getElementById("alertContainer");
  alertContainer.innerHTML = "";
  alertContainer.insertAdjacentHTML("beforeend", alertHTML);

  setTimeout(function () {
    const successAlert = document.getElementById("successAlert");
    if (successAlert) {
      successAlert.classList.remove("show");
      successAlert.classList.add("fade");
    }
  }, 3000);
}

// function openAnnotationDetails(batchId) {
//   // TODO: Navigate to the annotation details page using the batch ID
//   console.log("Open details for:", batchId);
//   window.location.href = "annotation_details.html?batchId=" + batchId; // Sample redirect
// }

$(document).ready(function () {
  // activate multi-select for reasoning
  $("#justificationReasonYesCompletionAQ1").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionAQ1").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionAQ1").next(".btn-group").hide();
  $("#justificationReasonNoCompletionAQ1").next(".btn-group").hide();

  $("#justificationReasonYesCompletionAQ2").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionAQ2").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionAQ2").next(".btn-group").hide();
  $("#justificationReasonNoCompletionAQ2").next(".btn-group").hide();

  $("#justificationReasonYesCompletionAQ6").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionAQ6").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionAQ6").next(".btn-group").hide();
  $("#justificationReasonNoCompletionAQ6").next(".btn-group").hide();

  $("#justificationReasonYesCompletionBQ1").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionBQ1").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionBQ1").next(".btn-group").hide();
  $("#justificationReasonNoCompletionBQ1").next(".btn-group").hide();

  $("#justificationReasonYesCompletionBQ2").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionBQ2").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionBQ2").next(".btn-group").hide();
  $("#justificationReasonNoCompletionBQ2").next(".btn-group").hide();

  $("#justificationReasonYesCompletionBQ6").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionBQ6").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionBQ6").next(".btn-group").hide();
  $("#justificationReasonNoCompletionBQ6").next(".btn-group").hide();

  $("#justificationReasonYesCompletionCQ1").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionCQ1").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionCQ1").next(".btn-group").hide();
  $("#justificationReasonNoCompletionCQ1").next(".btn-group").hide();

  $("#justificationReasonYesCompletionCQ2").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionCQ2").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionCQ2").next(".btn-group").hide();
  $("#justificationReasonNoCompletionCQ2").next(".btn-group").hide();

  $("#justificationReasonYesCompletionCQ6").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonNoCompletionCQ6").multiselect({
    includeSelectAllOption: true,
  });

  $("#justificationReasonYesCompletionCQ6").next(".btn-group").hide();
  $("#justificationReasonNoCompletionCQ6").next(".btn-group").hide();

  // fill options based on radio selected
  // Select all radio buttons with the name "mcq1A"
  const mcq1A = document.querySelectorAll('input[type="radio"][name="mcq1A"]');

  // Loop through each radio button and add the event listener
  mcq1A.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionAQ1").next(".btn-group").show();
          $("#justificationReasonNoCompletionAQ1").next(".btn-group").hide();
          $("#completionAJustificationQ1").show();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionAQ1").next(".btn-group").hide();
          $("#justificationReasonNoCompletionAQ1").next(".btn-group").show();
          $("#completionAJustificationQ1").hide();
        }
      }
    });
  });

  // Select all radio buttons with the name "mcq2A"
  const mcq2A = document.querySelectorAll('input[type="radio"][name="mcq2A"]');

  // Loop through each radio button and add the event listener
  mcq2A.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionAQ2").next(".btn-group").show();
          $("#justificationReasonNoCompletionAQ2").next(".btn-group").hide();
          $("#completionAJustificationQ2").show();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionAQ2").next(".btn-group").hide();
          $("#justificationReasonNoCompletionAQ2").next(".btn-group").show();
          $("#completionAJustificationQ2").hide();
        } else {
          $("#justificationReasonYesCompletionAQ2").next(".btn-group").hide();
          $("#justificationReasonNoCompletionAQ2").next(".btn-group").hide();
          $("#completionAJustificationQ2").hide();
        }
      }
    });
  });

  // Select all radio buttons with the name "mcq6A"
  const mcq6A = document.querySelectorAll('input[type="radio"][name="mcq6A"]');

  // Loop through each radio button and add the event listener
  mcq6A.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionAQ6").next(".btn-group").show();
          $("#justificationReasonNoCompletionAQ6").next(".btn-group").hide();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionAQ6").next(".btn-group").hide();
          $("#justificationReasonNoCompletionAQ6").next(".btn-group").show();
        }
      }
    });
  });

  // Select all radio buttons with the name "mcq1B"
  const mcq1B = document.querySelectorAll('input[type="radio"][name="mcq1B"]');

  // Loop through each radio button and add the event listener
  mcq1B.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionBQ1").next(".btn-group").show();
          $("#justificationReasonNoCompletionBQ1").next(".btn-group").hide();
          $("#completionBJustificationQ1").show();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionBQ1").next(".btn-group").hide();
          $("#justificationReasonNoCompletionBQ1").next(".btn-group").show();
          $("#completionBJustificationQ1").hide();
        }
      }
    });
  });

  // Select all radio buttons with the name "mcq2B"
  const mcq2B = document.querySelectorAll('input[type="radio"][name="mcq2B"]');

  // Loop through each radio button and add the event listener
  mcq2B.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionBQ2").next(".btn-group").show();
          $("#justificationReasonNoCompletionBQ2").next(".btn-group").hide();
          $("#completionBJustificationQ2").show();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionBQ2").next(".btn-group").hide();
          $("#justificationReasonNoCompletionBQ2").next(".btn-group").show();
          $("#completionBJustificationQ2").hide();
        } else {
          $("#justificationReasonYesCompletionBQ2").next(".btn-group").hide();
          $("#justificationReasonNoCompletionBQ2").next(".btn-group").hide();
          $("#completionBJustificationQ2").hide();
        }
      }
    });
  });

  // Select all radio buttons with the name "mcq6B"
  const mcq6B = document.querySelectorAll('input[type="radio"][name="mcq6B"]');

  // Loop through each radio button and add the event listener
  mcq6B.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionBQ6").next(".btn-group").show();
          $("#justificationReasonNoCompletionAQ6").next(".btn-group").hide();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionBQ6").next(".btn-group").hide();
          $("#justificationReasonNoCompletionBQ6").next(".btn-group").show();
        }
      }
    });
  });

  // Select all radio buttons with the name "mcq1C"
  const mcq1C = document.querySelectorAll('input[type="radio"][name="mcq1C"]');

  // Loop through each radio button and add the event listener
  mcq1C.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionCQ1").next(".btn-group").show();
          $("#justificationReasonNoCompletionCQ1").next(".btn-group").hide();
          $("#completionCJustificationQ1").show();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionCQ1").next(".btn-group").hide();
          $("#justificationReasonNoCompletionCQ1").next(".btn-group").show();
          $("#completionCJustificationQ1").hide();
        }
      }
    });
  });

  // Select all radio buttons with the name "mcq2C"
  const mcq2C = document.querySelectorAll('input[type="radio"][name="mcq2C"]');

  // Loop through each radio button and add the event listener
  mcq2C.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionCQ2").next(".btn-group").show();
          $("#justificationReasonNoCompletionCQ2").next(".btn-group").hide();
          $("#completionCJustificationQ2").show();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionCQ2").next(".btn-group").hide();
          $("#justificationReasonNoCompletionCQ2").next(".btn-group").show();
          $("#completionCJustificationQ2").hide();
        } else {
          $("#justificationReasonYesCompletionCQ2").next(".btn-group").hide();
          $("#justificationReasonNoCompletionCQ2").next(".btn-group").hide();
          $("#completionCJustificationQ2").hide();
        }
      }
    });
  });

  // Select all radio buttons with the name "mcq6C"
  const mcq6C = document.querySelectorAll('input[type="radio"][name="mcq6C"]');

  // Loop through each radio button and add the event listener
  mcq6C.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "1") {
          $("#justificationReasonYesCompletionCQ6").next(".btn-group").show();
          $("#justificationReasonNoCompletionCQ6").next(".btn-group").hide();
        } else if (this.value === "2") {
          $("#justificationReasonYesCompletionCQ6").next(".btn-group").hide();
          $("#justificationReasonNoCompletionCQ6").next(".btn-group").show();
        }
      }
    });
  });

  // check if already logged in

  $("#loginForm").submit(function (e) {
    e.preventDefault();

    showSuccessAlert("Checking credentials ...");

    // Collect form data
    let email = $("#email").val();
    let password = $("#pwd").val();

    // Create a new instance of XMLHttpRequest
    var xhr = new XMLHttpRequest();

    // Configure the request type, URL, and asynchronous flag
    xhr.open(
      "POST",
      "https://rmcopypastetoolbackend.onrender.com/api/employee/login",
      true
    );

    // Set the request header for content-type
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // Define the callback for when the request has completed
    xhr.onload = function () {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status >= 200 && xhr.status < 400) {
        // The request was successful! Handle the response here.
        if (response.message === "Login successful") {
          setTimeout(() => {
            window.location.href = "/dashboard.html";
          }, 3000);

          showSuccessAlert(response.message);

          localStorage.setItem("annotatorEmail", email);
          localStorage.setItem("loggedIn", true);
        }
      } else {
        // The request failed with a status code outside the range [200, 400).
        // Handle the error here.
        console.error("Request failed: " + xhr.status + " " + xhr.statusText);
        showFailAlert(response.message);
      }
    };

    // Define the callback for network errors
    xhr.onerror = function () {
      console.error("Network error occurred.");
      showFailAlert(xhr.message);
    };

    // Send the request with the JSON payload
    var data = JSON.stringify({
      email,
      password,
    });
    xhr.send(data);
  });
});

function logout() {
  localStorage.clear();
  window.location.href = "/index.html";
}

function checkEmpty() {
  let emptyFields = [];
  if ($("#batchNumber").val() === "") {
    emptyFields.push("Batch Number");
  }

  if ($("#prompt").val() === "") {
    emptyFields.push("Prompt");
  }

  if ($('input[name="taskType"]:checked').length <= 0) {
    emptyFields.push("Task Type");
  }

  if ($('input[name="language"]:checked').length <= 0) {
    emptyFields.push("Language");
  }

  for (let i = 1; i <= 6; i++) {
    if ($(`input[name="mcq${i}A"]:checked`).length <= 0) {
      emptyFields.push(`MCQ ${i} of Completion A`);
    }
  }

  if ($("#rankingCompletionA").val() === "") {
    emptyFields.push("Rating of Completion A");
  }

  for (let i = 1; i <= 6; i++) {
    if ($(`input[name="mcq${i}B"]:checked`).length <= 0) {
      emptyFields.push(`MCQ ${i} of Completion B`);
    }
  }

  if ($("#rankingCompletionB").val() === "") {
    emptyFields.push("Rating of Completion B");
  }

  for (let i = 1; i <= 6; i++) {
    if ($(`input[name="mcq${i}C"]:checked`).length <= 0) {
      emptyFields.push(`MCQ ${i} of Completion C`);
    }
  }

  if ($("#rankingCompletionC").val() === "") {
    emptyFields.push("Rating of Completion C");
  }

  if ($("#ranking").val() === "") {
    emptyFields.push("Ranking");
  }

  if ($("#reason").val() === "") {
    emptyFields.push("Reason for Ranking");
  }

  if ($(`input[name="rejected"]:checked`).length <= 0) {
    emptyFields.push("Rejection");
  }

  if (document.querySelector('input[name="mcq1A"]:checked')?.value === "1") {
    if ($("#completionAJustificationQ1").val() === "") {
      emptyFields.push("Completion A Q1 Justification URL");
    }

    if ($("#justificationReasonYesCompletionAQ1").val().join(", ") === "") {
      emptyFields.push("Completion A Q1 Justification Reasons");
    }
  }

  if (document.querySelector('input[name="mcq1B"]:checked')?.value === "1") {
    if ($("#completionBJustificationQ1").val() === "") {
      emptyFields.push("Completion B Q1 Justification URL");
    }

    if ($("#justificationReasonYesCompletionBQ1").val().join(", ") === "") {
      emptyFields.push("Completion B Q1 Justification Reasons");
    }
  }

  if (document.querySelector('input[name="mcq1C"]:checked')?.value === "1") {
    if ($("#completionCJustificationQ1").val() === "") {
      emptyFields.push("Completion C Q1 Justification URL");
    }

    if ($("#justificationReasonYesCompletionCQ1").val().join(", ") === "") {
      emptyFields.push("Completion C Q1 Justification Reasons");
    }
  }

  if (emptyFields.length === 0) {
    return true;
  } else {
    alert("Please fill the following empty fields: " + emptyFields.join(", "));
    return false;
  }
}

// Auto fill date, annotatorEmail, and language
let today = new Date().toISOString().split("T")[0];
let annotatorEmail = localStorage.getItem("annotatorEmail");

function submitAnnotation() {
  if (checkEmpty()) {
    let reasonForQ1A,
      reasonForQ2A,
      reasonForQ6A,
      reasonForQ1B,
      reasonForQ2B,
      reasonForQ6B,
      reasonForQ1C,
      reasonForQ2C,
      reasonForQ6C;

    // reasoning completion A
    if (document.querySelector('input[name="mcq1A"]:checked').value === "1") {
      reasonForQ1A = $("#justificationReasonYesCompletionAQ1").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq1A"]:checked').value === "2"
    ) {
      reasonForQ1A = $("#justificationReasonNoCompletionAQ1").val().join(", ");
    }

    if (document.querySelector('input[name="mcq2A"]:checked').value === "1") {
      reasonForQ2A = $("#justificationReasonYesCompletionAQ2").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq2A"]:checked').value === "2"
    ) {
      reasonForQ2A = $("#justificationReasonNoCompletionAQ2").val().join(", ");
    }

    if (document.querySelector('input[name="mcq6A"]:checked').value === "1") {
      reasonForQ6A = $("#justificationReasonYesCompletionAQ6").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq6A"]:checked').value === "2"
    ) {
      reasonForQ6A = $("#justificationReasonNoCompletionAQ6").val().join(", ");
    }

    // reasoning completion B
    if (document.querySelector('input[name="mcq1B"]:checked').value === "1") {
      reasonForQ1B = $("#justificationReasonYesCompletionBQ1").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq1B"]:checked').value === "2"
    ) {
      reasonForQ1B = $("#justificationReasonNoCompletionBQ1").val().join(", ");
    }

    if (document.querySelector('input[name="mcq2B"]:checked').value === "1") {
      reasonForQ2B = $("#justificationReasonYesCompletionBQ2").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq2B"]:checked').value === "2"
    ) {
      reasonForQ2B = $("#justificationReasonNoCompletionBQ2").val().join(", ");
    }

    if (document.querySelector('input[name="mcq6B"]:checked').value === "1") {
      reasonForQ6B = $("#justificationReasonYesCompletionBQ6").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq6B"]:checked').value === "2"
    ) {
      reasonForQ6B = $("#justificationReasonNoCompletionBQ6").val().join(", ");
    }

    // reasoning completion C
    if (document.querySelector('input[name="mcq1C"]:checked').value === "1") {
      reasonForQ1C = $("#justificationReasonYesCompletionCQ1").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq1C"]:checked').value === "2"
    ) {
      reasonForQ1C = $("#justificationReasonNoCompletionCQ1").val().join(", ");
    }

    if (document.querySelector('input[name="mcq2C"]:checked').value === "1") {
      reasonForQ2C = $("#justificationReasonYesCompletionCQ2").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq2C"]:checked').value === "2"
    ) {
      reasonForQ2C = $("#justificationReasonNoCompletionCQ2").val().join(", ");
    }

    if (document.querySelector('input[name="mcq6C"]:checked').value === "1") {
      reasonForQ6C = $("#justificationReasonYesCompletionCQ6").val().join(", ");
    } else if (
      document.querySelector('input[name="mcq6C"]:checked').value === "2"
    ) {
      reasonForQ6C = $("#justificationReasonNoCompletionCQ6").val().join(", ");
    }

    const completionA = {
      completionAText: document.getElementById("completionA").value,
      completionAQuestions: {
        Q1: document.querySelector('input[name="mcq1A"]:checked').value,
        Q2: document.querySelector('input[name="mcq2A"]:checked').value,
        Q3: document.querySelector('input[name="mcq3A"]:checked').value,
        Q4: document.querySelector('input[name="mcq4A"]:checked').value,
        Q5: document.querySelector('input[name="mcq5A"]:checked').value,
        Q6: document.querySelector('input[name="mcq6A"]:checked').value,
        rank: document.getElementById("rankingCompletionA").value,
      },
      completionReasoning: {
        reasonForQ1A,
        reasonForQ2A,
        reasonForQ6A,
      },
      completionReasoningURLs: {
        urlForQ1A: $("#completionAJustificationQ1").val(),
        urlForQ2A: $("#completionAJustificationQ2").val(),
      },
    };

    const completionB = {
      completionAText: document.getElementById("completionB").value,
      completionAQuestions: {
        Q1: document.querySelector('input[name="mcq1B"]:checked').value,
        Q2: document.querySelector('input[name="mcq2B"]:checked').value,
        Q3: document.querySelector('input[name="mcq3B"]:checked').value,
        Q4: document.querySelector('input[name="mcq4B"]:checked').value,
        Q5: document.querySelector('input[name="mcq5B"]:checked').value,
        Q6: document.querySelector('input[name="mcq6B"]:checked').value,
        rank: document.getElementById("rankingCompletionB").value,
      },
      completionReasoning: {
        reasonForQ1B,
        reasonForQ2B,
        reasonForQ6B,
      },
      completionReasoningURLs: {
        urlForQ1B: $("#completionBJustificationQ1").val(),
        urlForQ2B: $("#completionBJustificationQ2").val(),
      },
    };

    const completionC = {
      completionAText: document.getElementById("completionC").value,
      completionAQuestions: {
        Q1: document.querySelector('input[name="mcq1C"]:checked').value,
        Q2: document.querySelector('input[name="mcq2C"]:checked').value,
        Q3: document.querySelector('input[name="mcq3C"]:checked').value,
        Q4: document.querySelector('input[name="mcq4C"]:checked').value,
        Q5: document.querySelector('input[name="mcq5C"]:checked').value,
        Q6: document.querySelector('input[name="mcq6C"]:checked').value,
        rank: document.getElementById("rankingCompletionC").value,
      },
      completionReasoning: {
        reasonForQ1C,
        reasonForQ2C,
        reasonForQ6C,
      },
      completionReasoningURLs: {
        urlForQ1C: $("#completionCJustificationQ1").val(),
        urlForQ2C: $("#completionCJustificationQ2").val(),
      },
    };

    // Collect form data
    let formData = {
      date: today,
      annotatorEmail: annotatorEmail,
      language: document.querySelector('input[name="language"]:checked').value,
      batchNumber: document.getElementById("batchNumber").value,
      prompt: document.getElementById("prompt").value,
      taskType: document.querySelector('input[name="taskType"]:checked').value,
      completions: [completionA, completionB, completionC],
      ranking: document.getElementById("ranking").value,
      reasoning: document.getElementById("reason").value,
      rejected:
        document.querySelector('input[name="rejected"]:checked').value ===
        "true",
    };

    // Send POST request
    fetch("https://rmcopypastetoolbackend.onrender.com/api/annotations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("New annotation created successfully !");
        setTimeout(() => {
          window.location.href = "/dashboard.html";
        }, 3000);
      })
      .catch((error) => console.error("Error:", error));
  }
}

function hasNonAsciiCharacters(text) {
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    if (charCode > 127) {
      return true;
    }
  }
  return false;
}

function checkAbbreviations(reasonForRanking) {
  const regex = /\b[A-Z]{2,}\b/g; // Regex pattern for finding all caps words with at least two letters

  const matches = reasonForRanking.match(regex);

  return matches ? matches : [];
}

function checkLinesOfCode(completions) {
  const languageChoice = document.querySelector(
    'input[name="language"]:checked'
  ).value;
  const max = 100;

  var loc = [];

  var loComm = [];

  var pattern = /\`\`\`[\w\s]*\n([\s\S]*?)\`\`\`/gm;

  completions.map((comp, index) => {
    let codeBlocks = comp.answer.match(pattern);

    let lines = [];

    let commentLines = [];

    const commRegexObj = {
      Java: {
        multi: /\/\*([\s\S]*?)\*\//g,

        single: /(?<!:|\/)\/\//g,
      },

      Python: {
        multi: /('''|""")([\s\S]*?)\1/g,

        single: /#/g,
      },

      JavaScript: {
        multi: /\/\*([\s\S]*?)\*\//g,

        single: /(?<!:|\/)\/\//g,
      },
    };

    codeBlocks?.map((cB, idx) => {
      const commCheck = (string, pattern) => {
        let result = string.match(pattern);

        return result === null ? [] : result;
      };

      let multiLineComm = commCheck(cB, commRegexObj[languageChoice].multi);

      let singleLineComm = commCheck(
        cB,

        commRegexObj[languageChoice].single
      );

      let multiLineCommHTML = commCheck(cB, /<!--([\s\S]*?)-->/g);

      let emptyLines = commCheck(cB, /^ *\n/gm);

      let outputLines = commCheck(cB, />>>/g);

      let totalCommLines = 0;

      multiLineComm.map((comm) => {
        totalCommLines += comm.split("\n").length;
      });

      multiLineCommHTML.map((comm) => {
        totalCommLines += comm.split("\n").length;
      });

      totalCommLines += singleLineComm.length;

      lines.push(
        cB.split("\n").length - 2 - emptyLines.length - outputLines.length
      );

      commentLines.push(totalCommLines);
    });

    loc.push(lines);

    loComm.push(commentLines);
  });

  var message = [];

  var commMessage = [];

  loc.map((codes, i) => {
    codes.map((cLines, j) => {
      if (cLines > 3) {
        let perc = (loComm[i][j] / cLines) * 100;

        let commMessStr =
          "Code snippet " +
          (j + 1) +
          " (" +
          cLines +
          " lines) of completion " +
          String.fromCharCode(i + 65);

        if (perc > 40 && completions[i].questions[2].answer !== "3") {
          commMessage.push(
            commMessStr +
              " is heavily commented (" +
              Math.round(perc * 100) / 100 +
              " %), but you have marked the wrong option"
          );
        } else if (
          perc >= 20 &&
          perc <= 40 &&
          completions[i].questions[2].answer !== "4"
        ) {
          commMessage.push(
            commMessStr +
              " is well commented (" +
              Math.round(perc * 100) / 100 +
              " %), but you have marked the wrong option"
          );
        } else if (
          perc > 1 &&
          perc < 20 &&
          completions[i].questions[2].answer !== "2"
        ) {
          commMessage.push(
            commMessStr +
              " is not enough commented (" +
              Math.round(perc * 100) / 100 +
              " %), but you have marked the wrong option"
          );
        } else if (perc < 1 && completions[i].questions[2].answer !== "1") {
          commMessage.push(
            commMessStr +
              " is not at all commented (" +
              Math.round(perc * 100) / 100 +
              " %), but you have marked the wrong option"
          );
        }
      } else {
        if (loComm[i][j] >= 1 && completions[i].questions[2].answer !== "4") {
          commMessage.push(
            "Code snippet " +
              (j + 1) +
              " (" +
              cLines +
              " lines) of completion " +
              String.fromCharCode(i + 65) +
              " has more than 1 lines of comment and should be marked well commented."
          );
        } else if (
          loComm[i][j] < 1 &&
          completions[i].questions[2].answer !== "5"
        ) {
          commMessage.push(
            "Code snippet " +
              (j + 1) +
              " (" +
              cLines +
              " lines) of completion " +
              String.fromCharCode(i + 65) +
              " has 0 lines of comment and should be marked NA"
          );
        }
      }

      if (cLines > max && completions[i].questions[1].answer === "1") {
        message.push(
          "Code snippet " +
            (j + 1) +
            " of completion " +
            String.fromCharCode(i + 65) +
            " has more than " +
            max +
            " lines of code, and should be marked not executable."
        );
      }
    });
  });

  return { loc, message, loComm, commMessage };
}

function checkRating(completions) {
  /* changes */
  var errorList = [];

  completions.map((comp, index) => {
    let ques = comp.questions;

    if (ques[0].answer != "1") {
      if (ques[6].answer > 1) {
        errorList.push(
          "Completion " +
            String.fromCharCode(index + 65) +
            ": Rating cannot be higher than 1 for submitted choices."
        );
      }
    } else {
      if (!["1", "3"].includes(ques[1].answer)) {
        if (ques[5].answer != "1") {
          if (ques[6].answer > 1) {
            errorList.push(
              "Completion " +
                String.fromCharCode(index + 65) +
                ": Rating cannot be higher than 1 for submitted choices."
            );
          }
        } else {
          if (ques[6].answer > 4) {
            errorList.push(
              "Completion " +
                String.fromCharCode(index + 65) +
                ": Rating cannot be higher than 4 for submitted choices."
            );
          }
        }
      } else {
        if (ques[5].answer != "1") {
          if (ques[6].answer > 4) {
            errorList.push(
              "Completion " +
                String.fromCharCode(index + 65) +
                ": Rating cannot be higher than 4 for submitted choices."
            );
          }
        } else {
          if (ques[6].answer <= 4) {
            errorList.push(
              "Completion " +
                String.fromCharCode(index + 65) +
                ": Rating has to be more than 4 for submitted choices." /* changed the message text */
            );
          }
        }
      }
    }
  });

  return { errorList };
}

function checkSameRatingVsRanking() {
  const ratingA = document.getElementById("rankingCompletionA").value;
  const ratingB = document.getElementById("rankingCompletionB").value;
  const ratingC = document.getElementById("rankingCompletionC").value;
  const ranking = document.getElementById("ranking").value;

  if (
    ratingA === ratingB &&
    ratingB === ratingC &&
    !ranking.includes(">") &&
    !ranking.includes("<")
  ) {
    return true;
  }

  return false;
}

function checkRankingString() {
  const rankingErrors = [];
  const ranking = document.getElementById("ranking").value;
  if (ranking.includes(">") && !ranking.includes(" > ")) {
    rankingErrors.push("> sign should contain a space before and after");
  }

  if (ranking.includes("<") && !ranking.includes(" < ")) {
    rankingErrors.push("< sign should contain a space before and after");
  }

  if (!/^[ABC>< ]*$/.test(ranking)) {
    rankingErrors.push(
      "Ranking string contains other characters than A, B and C"
    );
  }

  return rankingErrors;
}

function runChecks() {
  if (checkEmpty()) {
    const errorListContainer = document.getElementById("errorList");
    errorListContainer.innerHTML = "";

    // array of objects required for ratings check and number of lines of code vs comments check
    const completionArrayForLinesOfCode = [
      {
        answer: document.getElementById("completionA").value,
        questions: [
          {
            question: "Does the code/text follows the instructions given?",
            answer: document.querySelector('input[name="mcq1A"]:checked').value,
            options: {
              1: "yes",
              2: "no",
            },
          },
          {
            question: "Is the code executable?",
            answer: document.querySelector('input[name="mcq2A"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question: "Is the code well commented?",
            answer: document.querySelector('input[name="mcq3A"]:checked').value,
            options: {
              1: "means code is not documented at all",
              2: "means code contain certain comments, but not enough",
              3: "means code is excessively documented ",
              4: "means code is well-documented (well-commented , indentation , proper logger statements )",
              5: "NA (code doesn't exist or comments not required)",
            },
          },
          {
            question: "Are the variable names understandable in the code?",
            answer: document.querySelector('input[name="mcq4A"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question: "Does the code cover exceptional handling?",
            answer: document.querySelector('input[name="mcq5A"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question:
              "Is text explanation clear or aligned well with the code?",
            answer: document.querySelector('input[name="mcq6A"]:checked').value,
            options: {
              1: "yes",
              2: "no",
            },
          },
          {
            question:
              "Rate the completion from 1-7. 1 being poor and 7 being excellent:",
            answer: document.getElementById("rankingCompletionA").value,
          },
        ],
      },
      {
        answer: document.getElementById("completionB").value,
        questions: [
          {
            question: "Does the code/text follows the instructions given?",
            answer: document.querySelector('input[name="mcq1B"]:checked').value,
            options: {
              1: "yes",
              2: "no",
            },
          },
          {
            question: "Is the code executable?",
            answer: document.querySelector('input[name="mcq2B"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question: "Is the code well commented?",
            answer: document.querySelector('input[name="mcq3B"]:checked').value,
            options: {
              1: "means code is not documented at all",
              2: "means code contain certain comments, but not enough",
              3: "means code is excessively documented ",
              4: "means code is well-documented (well-commented , indentation , proper logger statements )",
              5: "NA (code doesn't exist or comments not required)",
            },
          },
          {
            question: "Are the variable names understandable in the code?",
            answer: document.querySelector('input[name="mcq4B"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question: "Does the code cover exceptional handling?",
            answer: document.querySelector('input[name="mcq5B"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question:
              "Is text explanation clear or aligned well with the code?",
            answer: document.querySelector('input[name="mcq6B"]:checked').value,
            options: {
              1: "yes",
              2: "no",
            },
          },
          {
            question:
              "Rate the completion from 1-7. 1 being poor and 7 being excellent:",
            answer: document.getElementById("rankingCompletionB").value,
          },
        ],
      },
      {
        answer: document.getElementById("completionC").value,
        questions: [
          {
            question: "Does the code/text follows the instructions given?",
            answer: document.querySelector('input[name="mcq1C"]:checked').value,
            options: {
              1: "yes",
              2: "no",
            },
          },
          {
            question: "Is the code executable?",
            answer: document.querySelector('input[name="mcq2C"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question: "Is the code well commented?",
            answer: document.querySelector('input[name="mcq3C"]:checked').value,
            options: {
              1: "means code is not documented at all",
              2: "means code contain certain comments, but not enough",
              3: "means code is excessively documented ",
              4: "means code is well-documented (well-commented , indentation , proper logger statements )",
              5: "NA (code doesn't exist or comments not required)",
            },
          },
          {
            question: "Are the variable names understandable in the code?",
            answer: document.querySelector('input[name="mcq4C"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question: "Does the code cover exceptional handling?",
            answer: document.querySelector('input[name="mcq5C"]:checked').value,
            options: {
              1: "yes",
              2: "no",
              3: "NA (code doesn't exist)",
            },
          },
          {
            question:
              "Is text explanation clear or aligned well with the code?",
            answer: document.querySelector('input[name="mcq6C"]:checked').value,
            options: {
              1: "yes",
              2: "no",
            },
          },
          {
            question:
              "Rate the completion from 1-7. 1 being poor and 7 being excellent:",
            answer: document.getElementById("rankingCompletionC").value,
          },
        ],
      },
    ];

    // check for non ascii characters
    if (hasNonAsciiCharacters(document.getElementById("reason").value)) {
      const errorItem = document.createElement("li");
      errorItem.innerText = "Reason for ranking contains non ascii characters";
      errorItem.style.color = "red";
      errorListContainer.appendChild(errorItem);
    }

    // check abbreviations
    const abbreviationsCaught = checkAbbreviations(
      document.getElementById("reason").value
    );
    if (abbreviationsCaught.length !== 0) {
      const errorItem = document.createElement("li");
      errorItem.style.color = "red";
      errorItem.innerText = `Reason for ranking contains the following abbreviations: ${abbreviationsCaught.join(
        ", "
      )}`;
      errorListContainer.appendChild(errorItem);
    }

    // check ratings
    checkRating(completionArrayForLinesOfCode)?.errorList.map((err) => {
      const errorItem = document.createElement("li");
      errorItem.innerText = err;
      errorItem.style.color = "red";
      errorListContainer.appendChild(errorItem);
    });

    // correct ranking string check
    if (checkRankingString().length !== 0) {
      const rankingErrors = checkRankingString();
      rankingErrors.map((err) => {
        const errorItem = document.createElement("li");
        errorItem.innerText = err;
        errorItem.style.color = "red";
        errorListContainer.appendChild(errorItem);
      });
    }

    // warnings
    // check for lines of code vs comments
    const { commMessage } = checkLinesOfCode(completionArrayForLinesOfCode);

    if (commMessage?.length !== 0) {
      const warningHeading = document.createElement("h5");
      warningHeading.setAttribute("class", "mt-4");
      warningHeading.style.color = "orange";
      warningHeading.innerText = "Warnings !";

      document.getElementById("errorList").appendChild(warningHeading);
    }
    commMessage.forEach((check) => {
      const listItem = document.createElement("li");
      listItem.style.color = "orange";
      listItem.innerText = check;

      document.getElementById("errorList").appendChild(listItem);
    });

    // check same ratings vs same ranking
    if (checkSameRatingVsRanking()) {
      const listItem = document.createElement("li");
      listItem.style.color = "orange";
      listItem.innerText =
        "You have marked same rating for all the completions and also ranked them same. Provide justification before submitting.";

      document.getElementById("errorList").appendChild(listItem);
    }
  }
}
