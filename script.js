// const APIURL = "https://rmcopypastetoolbackend.onrender.com";
const APIURL = "http://localhost:3000";

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

function showFailAlertDashboard(message) {
  const alertHTML = `
      <div id="failAlertDashboard" class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
      </div>
    `;

  const alertContainer = document.getElementById("alertContainerDashboard");
  alertContainer.innerHTML = "";
  alertContainer.insertAdjacentHTML("beforeend", alertHTML);

  setTimeout(function () {
    const failAlert = document.getElementById("failAlertDashboard");
    if (failAlert) {
      failAlert.classList.remove("show");
      failAlert.classList.add("fade");
    }
  }, 3000);
}

function showSuccessAlertDashboard(message) {
  const alertHTML = `
      <div id="successAlertDashboard" class="alert alert-primary alert-dismissible fade show" role="alert">
        ${message}
      </div>
    `;

  const alertContainer = document.getElementById("alertContainerDashboard");
  alertContainer.innerHTML = "";
  alertContainer.insertAdjacentHTML("beforeend", alertHTML);

  setTimeout(function () {
    const successAlert = document.getElementById("successAlertDashboard");
    if (successAlert) {
      successAlert.classList.remove("show");
      successAlert.classList.add("fade");
    }
  }, 3000);
}

function showFailAlertCreateAnnotation(message) {
  const alertHTML = `
      <div id="failAlertCreateAnnotation" class="alert alert-danger alert-dismissible fade show" role="alert">
        ${message}
      </div>
    `;

  const alertContainer = document.getElementById(
    "alertContainerCreateAnnotation"
  );
  alertContainer.innerHTML = "";
  alertContainer.insertAdjacentHTML("beforeend", alertHTML);

  setTimeout(function () {
    const failAlert = document.getElementById("failAlertCreateAnnotation");
    if (failAlert) {
      failAlert.classList.remove("show");
      failAlert.classList.add("fade");
    }
  }, 3000);
}

function showSuccessAlertCreateAnnotation(message) {
  const alertHTML = `
      <div id="successAlertCreateAnnotation" class="alert alert-primary alert-dismissible fade show" role="alert">
        ${message}
      </div>
    `;

  const alertContainer = document.getElementById(
    "alertContainerCreateAnnotation"
  );
  alertContainer.innerHTML = "";
  alertContainer.insertAdjacentHTML("beforeend", alertHTML);

  setTimeout(function () {
    const successAlert = document.getElementById(
      "successAlertCreateAnnotation"
    );
    if (successAlert) {
      successAlert.classList.remove("show");
      successAlert.classList.add("fade");
    }
  }, 3000);
}

// Function to open the Bootstrap modal
function openModalWithData(data) {
  // Populate modal content with data
  const modalContent = document.getElementById("checkStatusPromptModalContent");

  let s = ``;

  if (typeof data === "string") {
    s = `No matching prompt found !`;
  } else {
    if (localStorage.getItem("annotatorRole") === "primary") {
      data.forEach((record) => {
        s += `<span class="mr-2">Task Type: <strong>${
          record.taskType
        }</strong></span><br /><span class="mr-2">${
          record.rejected === true
            ? "<strong class='text-danger'>Rejected</strong>"
            : "<strong class='text-success'>Not Rejected</strong>"
        }</span><pre style="border: 1px solid gray">${
          record.prompt
        }</pre><hr />`;
      });
    } else {
      data.forEach((record) => {
        s += `<span class="mr-2">Annotation ID: <strong>${
          record.annotationId
        }</strong></span><br /><span class="mr-2">Annotator Email: <strong>${
          record.annotatorEmail
        }</strong></span><br /><span class="mr-2">Task Type: <strong>${
          record.taskType
        }</strong></span><br /><span class="mr-2">${
          record.rejected === true
            ? "<strong class='text-danger'>Rejected</strong>"
            : "<strong class='text-success'>Not Rejected</strong>"
        }</span><pre style="border: 1px solid gray">${
          record.prompt
        }</pre><hr />`;
      });
    }
  }

  modalContent.innerHTML = s;

  // Open the modal
  $("#checkStatusPromptModal").modal("show");
}

function removeExtraSpacesFromEmptyLines(str) {
  return str
    .split("\n")
    .map((line) => {
      return line.trim() === "" ? "" : line;
    })
    .join("\n");
}

function checkPromptStatus() {
  // console.log({ prompt: document.getElementById("prompt")?.value?.trim() });
  fetch(APIURL + `/api/annotations/filter/?page=1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify({
      field: "prompt",
      value: removeExtraSpacesFromEmptyLines(
        document.getElementById("prompt")?.value?.trim()
      ),
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      openModalWithData(data.message);
    })
    .catch((error) => {
      console.log(error);
    });
}

function editAnnotation(annotationId) {
  // TODO: Navigate to the annotation details page using the batch ID
  window.location.href = "create_annotation.html?id=" + annotationId; // Sample redirect
}

function openAnnotationDetails(annotationId) {
  // TODO: Navigate to the annotation details page using the batch ID
  window.location.href =
    "create_annotation.html?id=" + annotationId + "&view=true"; // Sample redirect
}

function deleteAnnotation(annotationId) {
  fetch(APIURL + `/api/annotations/${annotationId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      showSuccessAlertDashboard("Annotation deleted successfully !");
      setTimeout(() => {
        window.location.href = "/dashboard.html?pageNumber=1";
      }, 3000);
    })
    .catch((error) => {
      showFailAlertDashboard(
        "There was a problem with the fetch operation:",
        error.message
      );
    });
}

const nonRejectedItems = document.querySelectorAll(".nonRejectedItems");
const rejectedItems = document.querySelectorAll(".rejectedItems");

$(document).ready(function () {
  // activate multi-select for reasoning
  $("#justificationReasonYesCompletionAQ1").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionAQ1").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionAQ1").next(".btn-group").hide();
  $("#justificationReasonNoCompletionAQ1").next(".btn-group").hide();

  $("#justificationReasonYesCompletionAQ2").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionAQ2").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionAQ2").next(".btn-group").hide();
  $("#justificationReasonNoCompletionAQ2").next(".btn-group").hide();

  $("#justificationReasonYesCompletionAQ6").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionAQ6").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionAQ6").next(".btn-group").hide();
  $("#justificationReasonNoCompletionAQ6").next(".btn-group").hide();

  $("#justificationReasonYesCompletionBQ1").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionBQ1").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionBQ1").next(".btn-group").hide();
  $("#justificationReasonNoCompletionBQ1").next(".btn-group").hide();

  $("#justificationReasonYesCompletionBQ2").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionBQ2").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionBQ2").next(".btn-group").hide();
  $("#justificationReasonNoCompletionBQ2").next(".btn-group").hide();

  $("#justificationReasonYesCompletionBQ6").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionBQ6").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionBQ6").next(".btn-group").hide();
  $("#justificationReasonNoCompletionBQ6").next(".btn-group").hide();

  $("#justificationReasonYesCompletionCQ1").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionCQ1").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionCQ1").next(".btn-group").hide();
  $("#justificationReasonNoCompletionCQ1").next(".btn-group").hide();

  $("#justificationReasonYesCompletionCQ2").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionCQ2").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionCQ2").next(".btn-group").hide();
  $("#justificationReasonNoCompletionCQ2").next(".btn-group").hide();

  $("#justificationReasonYesCompletionCQ6").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonNoCompletionCQ6").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  $("#justificationReasonYesCompletionCQ6").next(".btn-group").hide();
  $("#justificationReasonNoCompletionCQ6").next(".btn-group").hide();

  $("#rejectionReasonDropdown").multiselect({
    includeSelectAllOption: true,
    buttonText: function (options, select) {
      if (options.length === 0) {
        return "None selected";
      } else if (options.length > 0) {
        return options.length + " selected";
      }
    },
  });

  // listen for rejection button
  // Select all radio buttons with the name "rejected"
  const rejectedMcq = document.querySelectorAll(
    'input[type="radio"][name="rejected"]'
  );

  rejectedItems.forEach((element) => {
    element.style.display = "none";
  });

  // Loop through each radio button and add the event listener
  rejectedMcq.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (this.checked) {
        // Perform action based on the selected value
        if (this.value === "true") {
          console.log("Rejected");
          document.getElementById("submitBtn").style.display = "inline-block";
          document.getElementById("runChecksBtn").style.display = "none";
          rejectedItems.forEach((element) => {
            element.style.display = "block";
          });
          nonRejectedItems.forEach((element) => {
            element.style.display = "none";
          });

          // if role is primary, don't show confirm rejection button
          if (localStorage.getItem("annotatorRole") === "primary") {
            document.getElementById("confirmRejectionContainer").style.display =
              "none";
          } else {
            document.getElementById("confirmRejectionContainer").style.display =
              "block";
          }

          // if role is secondary, show the confirm rejection button
        } else if (this.value === "false") {
          document.getElementById("runChecksBtn").style.display =
            "inline-block";
          console.log("Not Rejected");
          rejectedItems.forEach((element) => {
            element.style.display = "none";
          });
          nonRejectedItems.forEach((element) => {
            element.style.display = "block";
          });
        }
      }
    });
  });

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
    xhr.open("POST", APIURL + "/api/employee/login", true);

    // Set the request header for content-type
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // Define the callback for when the request has completed
    xhr.onload = function () {
      const response = JSON.parse(xhr.responseText);
      if (xhr.status >= 200 && xhr.status < 400) {
        // The request was successful! Handle the response here.
        if (response.message === "Login successful") {
          setTimeout(() => {
            window.location.href = "./dashboard.html?pageNumber=1";
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
  window.location.href = "./index.html";
}

function checkEmpty() {
  let emptyFields = [];
  if ($("#batchDropdownButton").text().trim() === "Select a batch") {
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

  if ($(`input[name="rejected"]:checked`).length <= 0) {
    emptyFields.push("Rejection");
  }

  if (document.getElementById("completionA").value === "") {
    emptyFields.push("Completion A text");
  }

  if (document.getElementById("completionB").value === "") {
    emptyFields.push("Completion B text");
  }

  if (document.getElementById("completionC").value === "") {
    emptyFields.push("Completion C text");
  }

  if (
    document.querySelector('input[name="rejected"]:checked')?.value === "false"
  ) {
    if ($(`input[name="confidence"]:checked`).length <= 0) {
      emptyFields.push("Confidence Level");
    }

    for (let i = 1; i <= 7; i++) {
      if ($(`input[name="mcq${i}A"]:checked`).length <= 0) {
        emptyFields.push(`MCQ ${i} of Completion A`);
      }
    }

    for (let i = 1; i <= 7; i++) {
      if ($(`input[name="mcq${i}B"]:checked`).length <= 0) {
        emptyFields.push(`MCQ ${i} of Completion B`);
      }
    }

    for (let i = 1; i <= 7; i++) {
      if ($(`input[name="mcq${i}C"]:checked`).length <= 0) {
        emptyFields.push(`MCQ ${i} of Completion C`);
      }
    }

    if ($("#ranking").val() === "") {
      emptyFields.push("Ranking");
    }

    if ($("#reason").val() === "") {
      emptyFields.push("Reason for Ranking");
    }

    // selected yes for Q1 A
    if (document.querySelector('input[name="mcq1A"]:checked')?.value === "1") {
      if ($("#completionAJustificationQ1").val().trim() === "") {
        emptyFields.push("Completion A Q1 Justification URL");
      }

      if (
        $("#completionAJustificationQ1").val().toLowerCase() === "na" ||
        $("#completionAJustificationQ1").val().toLowerCase() ===
          "not applicable" ||
        $("#completionAJustificationQ1").val().toLowerCase() === "null" ||
        $("#completionAJustificationQ1").val().toLowerCase() === "none" ||
        $("#completionAJustificationQ1").val().toLowerCase() ===
          "no comments" ||
        $("#completionAJustificationQ1").val().toLowerCase() === "blank"
      ) {
        emptyFields.push(
          "Keyword not allowed in the URL section of Completion A"
        );
      }

      if ($("#justificationReasonYesCompletionAQ1").val().join(", ") === "") {
        emptyFields.push("Completion A Q1 Justification Reasons");
      }
    }

    // selected no for Q1 A
    if (document.querySelector('input[name="mcq1A"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionAQ1").val().join(", ") === "") {
        emptyFields.push("Completion A Q1 Justification Reasons");
      }
    }

    // selected yes for Q2 A
    if (document.querySelector('input[name="mcq2A"]:checked')?.value === "1") {
      if ($("#completionAJustificationQ2").val() === "") {
        emptyFields.push(
          "Completion A Q2 Justification OUTPUT/ERROR not provided"
        );
      }

      if ($("#justificationReasonYesCompletionAQ2").val().join(", ") === "") {
        emptyFields.push("Completion A Q2 Justification Reasons");
      }
    }

    // selected no for Q2 A
    if (document.querySelector('input[name="mcq2A"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionAQ2").val().join(", ") === "") {
        emptyFields.push("Completion A Q2 Justification Reasons");
      }
    }

    // selected yes for Q6 A
    if (document.querySelector('input[name="mcq6A"]:checked')?.value === "1") {
      if ($("#justificationReasonYesCompletionAQ6").val().join(", ") === "") {
        emptyFields.push("Completion A Q6 Justification Reasons");
      }
    }

    // selected no for Q6 A
    if (document.querySelector('input[name="mcq6A"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionAQ6").val().join(", ") === "") {
        emptyFields.push("Completion A Q6 Justification Reasons");
      }
    }

    // selected yes for Q1 B
    if (document.querySelector('input[name="mcq1B"]:checked')?.value === "1") {
      if ($("#completionBJustificationQ1").val() === "") {
        emptyFields.push("Completion B Q1 Justification URL");
      }

      if (
        $("#completionBJustificationQ1").val().toLowerCase() === "na" ||
        $("#completionBJustificationQ1").val().toLowerCase() ===
          "not applicable" ||
        $("#completionBJustificationQ1").val().toLowerCase() === "null" ||
        $("#completionBJustificationQ1").val().toLowerCase() === "none" ||
        $("#completionBJustificationQ1").val().toLowerCase() ===
          "no comments" ||
        $("#completionBJustificationQ1").val().toLowerCase() === "blank"
      ) {
        emptyFields.push(
          "Keyword not allowed in the URL section of Completion B"
        );
      }

      if ($("#justificationReasonYesCompletionBQ1").val().join(", ") === "") {
        emptyFields.push("Completion B Q1 Justification Reasons");
      }
    }

    // selected no for Q1 B
    if (document.querySelector('input[name="mcq1B"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionBQ1").val().join(", ") === "") {
        emptyFields.push("Completion B Q1 Justification Reasons");
      }
    }

    // selected yes for Q2 B
    if (document.querySelector('input[name="mcq2B"]:checked')?.value === "1") {
      if ($("#completionBJustificationQ2").val() === "") {
        emptyFields.push(
          "Completion B Q2 Justification OUTPUT/ERROR not provided"
        );
      }

      if ($("#justificationReasonYesCompletionBQ2").val().join(", ") === "") {
        emptyFields.push("Completion B Q2 Justification Reasons");
      }
    }

    // selected no for Q2 B
    if (document.querySelector('input[name="mcq2B"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionBQ2").val().join(", ") === "") {
        emptyFields.push("Completion B Q2 Justification Reasons");
      }
    }

    // selected yes for Q6 B
    if (document.querySelector('input[name="mcq6B"]:checked')?.value === "1") {
      if ($("#justificationReasonYesCompletionBQ6").val().join(", ") === "") {
        emptyFields.push("Completion B Q6 Justification Reasons");
      }
    }

    // selected no for Q6 B
    if (document.querySelector('input[name="mcq6B"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionBQ6").val().join(", ") === "") {
        emptyFields.push("Completion B Q6 Justification Reasons");
      }
    }

    // selected yes for Q1 C
    if (document.querySelector('input[name="mcq1C"]:checked')?.value === "1") {
      if ($("#completionCJustificationQ1").val() === "") {
        emptyFields.push("Completion C Q1 Justification URL");
      }

      if (
        $("#completionCJustificationQ1").val().toLowerCase() === "na" ||
        $("#completionCJustificationQ1").val().toLowerCase() ===
          "not applicable" ||
        $("#completionCJustificationQ1").val().toLowerCase() === "null" ||
        $("#completionCJustificationQ1").val().toLowerCase() === "none" ||
        $("#completionCJustificationQ1").val().toLowerCase() ===
          "no comments" ||
        $("#completionCJustificationQ1").val().toLowerCase() === "blank"
      ) {
        emptyFields.push(
          "Keyword not allowed in the URL section of Completion C"
        );
      }

      if ($("#justificationReasonYesCompletionCQ1").val().join(", ") === "") {
        emptyFields.push("Completion C Q1 Justification Reasons");
      }
    }

    // selected no for Q1 C
    if (document.querySelector('input[name="mcq1C"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionCQ1").val().join(", ") === "") {
        emptyFields.push("Completion C Q1 Justification Reasons");
      }
    }

    // selected yes for Q2 C
    if (document.querySelector('input[name="mcq2C"]:checked')?.value === "1") {
      if ($("#completionCJustificationQ2").val() === "") {
        emptyFields.push(
          "Completion C Q2 Justification OUTPUT/ERROR not provided"
        );
      }

      if ($("#justificationReasonYesCompletionCQ2").val().join(", ") === "") {
        emptyFields.push("Completion C Q2 Justification Reasons");
      }
    }

    // selected no for Q2 C
    if (document.querySelector('input[name="mcq2C"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionCQ2").val().join(", ") === "") {
        emptyFields.push("Completion C Q2 Justification Reasons");
      }
    }

    // selected yes for Q6 C
    if (document.querySelector('input[name="mcq6C"]:checked')?.value === "1") {
      if ($("#justificationReasonYesCompletionCQ6").val().join(", ") === "") {
        emptyFields.push("Completion C Q6 Justification Reasons");
      }
    }

    // selected no for Q6 C
    if (document.querySelector('input[name="mcq6C"]:checked')?.value === "2") {
      if ($("#justificationReasonNoCompletionCQ6").val().join(", ") === "") {
        emptyFields.push("Completion C Q6 Justification Reasons");
      }
    }
  } else if (
    document.querySelector('input[name="rejected"]:checked')?.value === "true"
  ) {
    if ($("#rejectionReasonDropdown").val().join(", ") === "") {
      emptyFields.push("Rejection reason");
    }

    if (localStorage.getItem("annotatorRole") !== "primary") {
      if (
        document.querySelector('input[name="confirmRejection"]:checked')
          ?.value !== "true" &&
        document.querySelector('input[name="confirmRejection"]:checked')
          ?.value !== "false"
      ) {
        emptyFields.push("Confirm the rejection");
      }
    }
  }

  if (emptyFields.length === 0) {
    return true;
  } else {
    showFailAlertCreateAnnotation(
      "Please fill the following empty fields: " + emptyFields.join(", ")
    );
    return false;
  }
}

function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const nth = (d) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day}${nth(day)} ${month} ${year}`;
}

// Auto fill date, annotatorEmail, and language
let annotatorEmail = localStorage.getItem("annotatorEmail");

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"

let _id = params["id"];
// let ann_id = params["annid"];
let view = params["view"];
let currentAnnotationId;
let currentEmailId;

if (view !== null) {
  document.getElementById("submitBtn").style.display = "none";
}

const getAnnotationsWithSameId = () => {
  // call an API to check for reviews by searching for annotations with same Annotation ID
  showSuccessAlertCreateAnnotation("Loading reviews for this annotation ...");
  var xhrReviews = new XMLHttpRequest();

  // Configure the request type, URL, and asynchronous flag
  xhrReviews.open("POST", APIURL + "/api/annotations/filter", true);

  // Set the request header for content-type
  xhrReviews.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  // Define the callback for when the request has completed
  xhrReviews.onload = function () {
    const response = JSON.parse(xhrReviews.responseText);
    if (xhrReviews.status >= 200 && xhrReviews.status < 400) {
      // The request was successful! Handle the response here.

      const annotations = response.message;
      const annotationListContainer = document.getElementById("reviewList");
      annotationListContainer.innerHTML = "";
      annotations?.map((annotation) => {
        if (annotation._id !== _id) {
          // Create the main <li> element
          const li = document.createElement("li");
          li.className = "list-group-item";

          // Create the Batch # content
          const annotationDetails = document.createElement("p");
          annotationDetails.innerHTML = `<span class="mr-4"><strong> Annotation ID: </strong> ${
            annotation.annotationId
          } </span><span class="mr-4"><strong> Date: </strong> ${formatDate(
            annotation.date
          )} </span>  <br /> <span class="mr-4"><strong>Task Type:</strong> ${
            annotation.taskType
          }</span><span class="mr-4"><strong> Annotator Email: </strong> ${
            annotation.annotatorEmail
          } </span><br />`;

          li.appendChild(annotationDetails);

          const batchStrong = document.createElement("strong");
          batchStrong.textContent = "Batch #: ";
          li.appendChild(batchStrong);
          li.appendChild(document.createTextNode(annotation.batchNumber));

          li.appendChild(document.createTextNode(" | "));

          // Create the Prompt content
          const promptStrong = document.createElement("strong");
          promptStrong.textContent = "Prompt: ";
          li.appendChild(promptStrong);
          li.appendChild(
            document.createTextNode(
              annotation.prompt.slice(0, 200) + " ......."
            )
          );

          const lineBreak = document.createElement("br");
          li.appendChild(lineBreak);

          // Create the open button
          const btn = document.createElement("button");
          btn.className = "btn btn-primary mt-2";
          btn.textContent = "Open";
          btn.onclick = function () {
            openAnnotationDetails(annotation._id);
          };
          li.appendChild(btn);

          // Create the edit button
          // const editBtn = document.createElement("button");
          // editBtn.className = "btn btn-primary ml-2 mt-2";
          // editBtn.textContent = "Edit as new";
          // editBtn.onclick = function () {
          //   editAnnotation(annotation._id);
          // };
          // li.appendChild(editBtn);

          // append li to annotation list
          annotationListContainer.appendChild(li);
        }
      });
    } else {
      // The request failed with a status code outside the range [200, 400).
      // Handle the error here.
      console.error(
        "Request failed: " + xhrReviews.status + " " + xhrReviews.statusText
      );
      showFailAlertDashboard(response.message);
    }
  };

  // Define the callback for network errors
  xhrReviews.onerror = function () {
    console.error("Network error occurred.");
    showFailAlertDashboard(xhrReviews.message);
  };

  var dataAnnotations = JSON.stringify({
    field: "annotationId",
    value: currentAnnotationId,
  });

  xhrReviews.send(dataAnnotations);
};

if (_id != null) {
  showSuccessAlertCreateAnnotation("Loading annotation...");

  // if role is primary, don't show confirm rejection button
  if (localStorage.getItem("annotatorRole") === "primary") {
    document.getElementById("confirmRejectionContainer").style.display = "none";
  } else {
    document.getElementById("confirmRejectionContainer").style.display =
      "block";
  }

  fetch(APIURL + `/api/annotations/${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())

    .then((data) => {
      if (data.success === true) {
        let ann = data.message;

        console.log(ann);

        if (
          ann.ranking === "" &&
          ann.reasoning === "" &&
          ann.rejected === false
        ) {
          document.getElementById("prompt").value = ann.prompt;
          ann.completions.map((comp, idx) => {
            const alpha = String.fromCharCode(idx + 65);

            // fill completion text
            document.getElementById(`completion${alpha}`).value =
              comp.completionText;
          });

          currentAnnotationId = ann.annotationId;
          currentEmailId = ann.annotatorEmail;

          getAnnotationsWithSameId();
        } else {
          if (
            localStorage.getItem("annotatorEmail") != ann.annotatorEmail &&
            localStorage.getItem("annotatorRole") === "primary"
          ) {
            // fill top level data
            document.querySelector(
              `[name="language"][value="${ann.language}"]`
            ).checked = true;

            document.getElementById("prompt").value = ann.prompt;
            ann.completions.map((comp, idx) => {
              const alpha = String.fromCharCode(idx + 65);

              // fill completion text
              document.getElementById(`completion${alpha}`).value =
                comp.completionText;
            });

            if (ann.rejected === false) {
              ann.completions.map((comp, idx) => {
                const alpha = String.fromCharCode(idx + 65);

                Object.keys(comp.completionQuestions)
                  .slice(0, 2)
                  .map((Key, qidx) => {
                    document.querySelector(
                      `input[name="mcq${qidx + 1}${alpha}"][value="${
                        comp.completionQuestions[Key]
                      }"]`
                    ).checked = true;
                  });
              });
            } else {
              console.log("Rejected annotation");
            }

            currentAnnotationId = ann.annotationId;
            // currentEmailId = ann.annotatorEmail;

            getAnnotationsWithSameId();
          } else {
            // fill top level data
            document.querySelector(
              `[name="language"][value="${ann.language}"]`
            ).checked = true;

            $("#batchDropdownButton").text(ann.batchNumber);

            document.getElementById("prompt").value = ann.prompt;

            document.querySelector(
              `[name="taskType"][value="${ann.taskType}"]`
            ).checked = true;

            document.getElementById("ranking").value = ann.ranking;

            document.getElementById("reason").value = ann.reasoning;

            document.querySelector(
              `[name="rejected"][value="${ann.rejected}"]`
            ).checked = true;

            if (ann.confidenceRating !== undefined)
              document.querySelector(
                `[name="confidence"][value="${ann.confidenceRating}"]`
              ).checked = true;

            currentAnnotationId = ann.annotationId;
            currentEmailId = ann.annotatorEmail;

            // fill completions
            ann.completions.map((comp, idx) => {
              const alpha = String.fromCharCode(idx + 65);

              // fill completion text
              document.getElementById(`completion${alpha}`).value =
                comp.completionText;

              if (ann.rejected === false) {
                // fill main mcq questions for Completions
                Object.keys(comp.completionQuestions).map((Key, qidx) => {
                  document.querySelector(
                    `input[name="mcq${qidx + 1}${alpha}"][value="${
                      comp.completionQuestions[Key]
                    }"]`
                  ).checked = true;
                });

                // fill Q1 justification URL
                document.getElementById(
                  `completion${alpha}JustificationQ1`
                ).value = comp.completionReasoningURLs[`urlForQ1${alpha}`];

                // fill Q2 justification output / errors
                document.getElementById(
                  `completion${alpha}JustificationQ2`
                ).value = comp.completionReasoningURLs[`urlForQ2${alpha}`];

                if (Object.keys(comp.completionReasoning).length === 3) {
                  let ques = ["1", "2", "6"];

                  Object.keys(comp.completionReasoning).map((k, jidx) => {
                    let i = ques[jidx],
                      selectElement;
                    if (comp.completionQuestions[`Q${i}`] === "1") {
                      // make the selections visible
                      $(`#justificationReasonYesCompletion${alpha}Q${i}`)
                        .next(".btn-group")
                        .show();
                      let arr = comp.completionReasoning[k].split(", ");

                      // pre select the choices
                      arr.map((reason) => {
                        $(
                          `#justificationReasonYesCompletion${alpha}Q${i}`
                        ).multiselect("select", reason);
                      });
                    } else if (comp.completionQuestions[`Q${i}`] === "2") {
                      // hide the URL boxes
                      $(`#completion${alpha}JustificationQ${i}`).hide();
                      // make the selections visible
                      $(`#justificationReasonNoCompletion${alpha}Q${i}`)
                        .next(".btn-group")
                        .show();
                      let arr = comp.completionReasoning[k].split(", ");

                      // pre select the choices
                      arr.map((reason) => {
                        $(
                          `#justificationReasonNoCompletion${alpha}Q${i}`
                        ).multiselect("select", reason);
                      });
                    } else {
                      // return;
                    }
                  });
                } else if (Object.keys(comp.completionReasoning).length === 2) {
                  let ques = ["1", "2"];

                  Object.keys(comp.completionReasoning).map((k, jidx) => {
                    let i = ques[jidx],
                      selectElement;
                    if (comp.completionQuestions[`Q${i}`] === "1") {
                      // make the selections visible
                      $(`#justificationReasonYesCompletion${alpha}Q${i}`)
                        .next(".btn-group")
                        .show();
                      let arr = comp.completionReasoning[k].split(", ");

                      // pre select the choices
                      arr.map((reason) => {
                        $(
                          `#justificationReasonYesCompletion${alpha}Q${i}`
                        ).multiselect("select", reason);
                      });
                    } else if (comp.completionQuestions[`Q${i}`] === "2") {
                      // hide the URL boxes
                      $(`#completion${alpha}JustificationQ${i}`).hide();
                      // make the selections visible
                      $(`#justificationReasonNoCompletion${alpha}Q${i}`)
                        .next(".btn-group")
                        .show();
                      let arr = comp.completionReasoning[k].split(", ");

                      // pre select the choices
                      arr.map((reason) => {
                        $(
                          `#justificationReasonNoCompletion${alpha}Q${i}`
                        ).multiselect("select", reason);
                      });
                    } else {
                      // return;
                    }
                  });
                }
              } else {
                document.getElementById("runChecksBtn").style.display = "none";
                if (
                  view !== "true" &&
                  localStorage.getItem("annotatorRole") === "primary"
                ) {
                  document.getElementById("submitBtn").style.display = "none";
                } else {
                  document.getElementById("submitBtn").style.display =
                    "inline-block";
                }
                rejectedItems.forEach((element) => {
                  element.style.display = "block";
                });
                nonRejectedItems.forEach((element) => {
                  element.style.display = "none";
                });

                // make the selections visible
                $(`#rejectionReasonDropdown`).next(".btn-group").show();
                let arr = ann?.reasonForRejection?.split(", ");

                // pre select the choices
                arr.map((reason) => {
                  $(`#rejectionReasonDropdown`).multiselect("select", reason);
                  // if rejection reason is others
                  if (
                    reason !== "Docstring is not present" &&
                    reason !==
                      "Docstring is unclear and confusing and hence intent/ask of the prompt is unclear" &&
                    reason !==
                      "Prompt is of custom project and unable to understand" &&
                    reason !==
                      "No supporting document available for the standard or custom code method/function" &&
                    reason !==
                      "Multiple docstrings are present but not able to use ANY of the docstrings to address the ask" &&
                    reason !==
                      "Though docstring is present and clear - the intent/ask of the prompt is unclear" &&
                    reason !== "Others ---followed by a textbox"
                  ) {
                    document.getElementById("otherReasonTextbox").value =
                      reason;
                  }
                });

                document.querySelector(
                  `input[name="confirmRejection"][value="${ann?.rejectionConfirmedByReviewer}"]`
                ).checked = true;
              }
            });
          }

          getAnnotationsWithSameId();
        }
      } else {
        showFailAlertCreateAnnotation("Some error occurred");
        setTimeout(() => {
          window.location.href = "dashboard.html?pageNumber=1";
        }, 3000);
      }
    })
    .catch((error) => console.error("Error:", error));
}

function submitAnnotation() {
  if (checkEmpty()) {
    // disable the submit button to avoid multiple submissions
    document.getElementById("submitBtn").disabled = true;

    let reasonForQ1A,
      reasonForQ2A,
      reasonForQ6A,
      reasonForQ1B,
      reasonForQ2B,
      reasonForQ6B,
      reasonForQ1C,
      reasonForQ2C,
      reasonForQ6C,
      formData,
      completionA,
      completionB,
      completionC;

    if (
      document.querySelector('input[name="rejected"]:checked').value === "false"
    ) {
      // file not rejected, submit annotations accordingly
      // reasoning completion A
      if (document.querySelector('input[name="mcq1A"]:checked').value === "1") {
        reasonForQ1A = $("#justificationReasonYesCompletionAQ1")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq1A"]:checked').value === "2"
      ) {
        reasonForQ1A = $("#justificationReasonNoCompletionAQ1")
          .val()
          .join(", ");
      }

      if (document.querySelector('input[name="mcq2A"]:checked').value === "1") {
        reasonForQ2A = $("#justificationReasonYesCompletionAQ2")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq2A"]:checked').value === "2"
      ) {
        reasonForQ2A = $("#justificationReasonNoCompletionAQ2")
          .val()
          .join(", ");
      }

      if (document.querySelector('input[name="mcq6A"]:checked').value === "1") {
        reasonForQ6A = $("#justificationReasonYesCompletionAQ6")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq6A"]:checked').value === "2"
      ) {
        reasonForQ6A = $("#justificationReasonNoCompletionAQ6")
          .val()
          .join(", ");
      }

      // reasoning completion B
      if (document.querySelector('input[name="mcq1B"]:checked').value === "1") {
        reasonForQ1B = $("#justificationReasonYesCompletionBQ1")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq1B"]:checked').value === "2"
      ) {
        reasonForQ1B = $("#justificationReasonNoCompletionBQ1")
          .val()
          .join(", ");
      }

      if (document.querySelector('input[name="mcq2B"]:checked').value === "1") {
        reasonForQ2B = $("#justificationReasonYesCompletionBQ2")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq2B"]:checked').value === "2"
      ) {
        reasonForQ2B = $("#justificationReasonNoCompletionBQ2")
          .val()
          .join(", ");
      }

      if (document.querySelector('input[name="mcq6B"]:checked').value === "1") {
        reasonForQ6B = $("#justificationReasonYesCompletionBQ6")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq6B"]:checked').value === "2"
      ) {
        reasonForQ6B = $("#justificationReasonNoCompletionBQ6")
          .val()
          .join(", ");
      }

      // reasoning completion C
      if (document.querySelector('input[name="mcq1C"]:checked').value === "1") {
        reasonForQ1C = $("#justificationReasonYesCompletionCQ1")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq1C"]:checked').value === "2"
      ) {
        reasonForQ1C = $("#justificationReasonNoCompletionCQ1")
          .val()
          .join(", ");
      }

      if (document.querySelector('input[name="mcq2C"]:checked').value === "1") {
        reasonForQ2C = $("#justificationReasonYesCompletionCQ2")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq2C"]:checked').value === "2"
      ) {
        reasonForQ2C = $("#justificationReasonNoCompletionCQ2")
          .val()
          .join(", ");
      }

      if (document.querySelector('input[name="mcq6C"]:checked').value === "1") {
        reasonForQ6C = $("#justificationReasonYesCompletionCQ6")
          .val()
          .join(", ");
      } else if (
        document.querySelector('input[name="mcq6C"]:checked').value === "2"
      ) {
        reasonForQ6C = $("#justificationReasonNoCompletionCQ6")
          .val()
          .join(", ");
      }

      completionA = {
        completionText: document.getElementById("completionA").value,
        completionQuestions: {
          Q1: document.querySelector('input[name="mcq1A"]:checked').value,
          Q2: document.querySelector('input[name="mcq2A"]:checked').value,
          Q3: document.querySelector('input[name="mcq3A"]:checked').value,
          Q4: "1",
          Q5: document.querySelector('input[name="mcq5A"]:checked').value,
          Q6: document.querySelector('input[name="mcq6A"]:checked').value,
          // rank: document.getElementById("rankingCompletionA").value,
          Q7: document.querySelector('input[name="mcq7A"]:checked').value,
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

      completionB = {
        completionText: document.getElementById("completionB").value,
        completionQuestions: {
          Q1: document.querySelector('input[name="mcq1B"]:checked').value,
          Q2: document.querySelector('input[name="mcq2B"]:checked').value,
          Q3: document.querySelector('input[name="mcq3B"]:checked').value,
          Q4: "1",
          Q5: document.querySelector('input[name="mcq5B"]:checked').value,
          Q6: document.querySelector('input[name="mcq6B"]:checked').value,
          // rank: document.getElementById("rankingCompletionB").value,
          Q7: document.querySelector('input[name="mcq7B"]:checked').value,
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

      completionC = {
        completionText: document.getElementById("completionC").value,
        completionQuestions: {
          Q1: document.querySelector('input[name="mcq1C"]:checked').value,
          Q2: document.querySelector('input[name="mcq2C"]:checked').value,
          Q3: document.querySelector('input[name="mcq3C"]:checked').value,
          Q4: "1",
          Q5: document.querySelector('input[name="mcq5C"]:checked').value,
          Q6: document.querySelector('input[name="mcq6C"]:checked').value,
          // rank: document.getElementById("rankingCompletionC").value,
          Q7: document.querySelector('input[name="mcq7C"]:checked').value,
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
      formData = {
        date: new Date(),
        annotatorEmail: annotatorEmail,
        language: document.querySelector('input[name="language"]:checked')
          .value,
        batchNumber: $("#batchDropdownButton").text().trim(),
        prompt: document.getElementById("prompt").value.trim(),
        taskType: document.querySelector('input[name="taskType"]:checked')
          .value,
        completions: [completionA, completionB, completionC],
        ranking: document.getElementById("ranking").value,
        reasoning: document.getElementById("reason").value,
        rejected:
          document.querySelector('input[name="rejected"]:checked').value ===
          "true",
        confidenceRating: document.querySelector(
          'input[name="confidence"]:checked'
        ).value,
      };
    } else if (
      document.querySelector('input[name="rejected"]:checked').value === "true"
    ) {
      completionA = {
        completionText: document.getElementById("completionA").value,
        completionQuestions: {
          Q1: null,
          Q2: null,
          Q3: null,
          Q4: null,
          Q5: null,
          Q6: null,
          // rank: document.getElementById("rankingCompletionA").value,
          Q7: null,
        },
        completionReasoning: {
          reasonForQ1A,
          reasonForQ2A,
          reasonForQ6A,
        },
        completionReasoningURLs: {
          urlForQ1A: "",
          urlForQ2A: "",
        },
      };

      completionB = {
        completionText: document.getElementById("completionB").value,
        completionQuestions: {
          Q1: null,
          Q2: null,
          Q3: null,
          Q4: null,
          Q5: null,
          Q6: null,
          // rank: document.getElementById("rankingCompletionB").value,
          Q7: null,
        },
        completionReasoning: {
          reasonForQ1B,
          reasonForQ2B,
          reasonForQ6B,
        },
        completionReasoningURLs: {
          urlForQ1B: "",
          urlForQ2B: "",
        },
      };

      completionC = {
        completionText: document.getElementById("completionC").value,
        completionQuestions: {
          Q1: null,
          Q2: null,
          Q3: null,
          Q4: null,
          Q5: null,
          Q6: null,
          // rank: document.getElementById("rankingCompletionC").value,
          Q7: null,
        },
        completionReasoning: {
          reasonForQ1C,
          reasonForQ2C,
          reasonForQ6C,
        },
        completionReasoningURLs: {
          urlForQ1C: "",
          urlForQ2C: "",
        },
      };

      // Collect form data
      if (localStorage.getItem("annotatorRole") === "primary") {
        formData = {
          date: new Date(),
          annotatorEmail: annotatorEmail,
          language: document.querySelector('input[name="language"]:checked')
            .value,
          batchNumber: $("#batchDropdownButton").text().trim(),
          prompt: document.getElementById("prompt").value.trim(),
          taskType: document.querySelector('input[name="taskType"]:checked')
            .value,
          completions: [completionA, completionB, completionC],
          ranking: document.getElementById("ranking").value,
          reasoning: document.getElementById("reason").value,
          rejected:
            document.querySelector('input[name="rejected"]:checked').value ===
            "true",
          reasonForRejection:
            $("#rejectionReasonDropdown").val().join(", ") +
            ", " +
            $("#otherReasonTextbox").val(),
        };
      } else {
        formData = {
          date: new Date(),
          annotatorEmail: annotatorEmail,
          language: document.querySelector('input[name="language"]:checked')
            .value,
          batchNumber: $("#batchDropdownButton").text().trim(),
          prompt: document.getElementById("prompt").value.trim(),
          taskType: document.querySelector('input[name="taskType"]:checked')
            .value,
          completions: [completionA, completionB, completionC],
          ranking: document.getElementById("ranking").value,
          reasoning: document.getElementById("reason").value,
          rejected:
            document.querySelector('input[name="rejected"]:checked').value ===
            "true",
          reasonForRejection:
            $("#rejectionReasonDropdown").val().join(", ") +
            ", " +
            $("#otherReasonTextbox").val(),
          rejectionConfirmedByReviewer: document.querySelector(
            'input[name="confirmRejection"]:checked'
          ).value,
        };
      }
    }

    let endpoint = "",
      method = "POST",
      redirect = "./dashboard.html?pageNumber=1",
      alertMessage = "New annotation created successfully !";

    if (_id != null) {
      formData["annotationId"] = currentAnnotationId;
      if (annotatorEmail === currentEmailId) {
        endpoint = _id;
        method = "PATCH";
        alertMessage = "Annotation updated successfully !";
      }
    }

    // Send POST request

    fetch(
      APIURL + `/api/annotations/${endpoint}`,

      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    )
      .then((response) => response.json())

      .then((data) => {
        showSuccessAlertCreateAnnotation(alertMessage);

        // setTimeout(() => {
        //   window.location.href = redirect;
        // }, 3000);
      })

      .catch((error) => console.error("Error:", error));

    console.log(formData);
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

    if (ques[0].answer === "2" && ques[6].answer !== "1") {
      errorList.push(
        "Completion " +
          String.fromCharCode(index + 65) +
          ": Rating cannot be higher than 1 for submitted choices."
      );
    } else if (ques[0].answer === "1" && ques[6].answer === "1") {
      errorList.push(
        "Completion " +
          String.fromCharCode(index + 65) +
          ": Rating cannot be 1 for submitted choices."
      );
    }
  });

  return { errorList };
}

function checkSameRatingVsRanking() {
  // const ratingA = document.getElementById("rankingCompletionA").value;
  // const ratingB = document.getElementById("rankingCompletionB").value;
  // const ratingC = document.getElementById("rankingCompletionC").value;
  const ratingA = document.querySelector('input[name="mcq7A"]:checked').value;
  const ratingB = document.querySelector('input[name="mcq7B"]:checked').value;
  const ratingC = document.querySelector('input[name="mcq7C"]:checked').value;
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
    showSuccessAlertCreateAnnotation("Run checks successful !");
    if (view === null) {
      document.getElementById("submitBtn").style.display = "inline-block";
    }

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
            answer: "1",
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
            // answer: document.getElementById("rankingCompletionA").value,
            answer: document.querySelector('input[name="mcq7A"]:checked').value,
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
            answer: "1",
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
            // answer: document.getElementById("rankingCompletionB").value,
            answer: document.querySelector('input[name="mcq7B"]:checked').value,
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
            answer: "1",
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
            // answer: document.getElementById("rankingCompletionC").value,
            answer: document.querySelector('input[name="mcq7C"]:checked').value,
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

const logPromptAndCompletions = () => {
  let payload = {
    prompt: document.getElementById("prompt").value.trim(),
    compA: document.getElementById("completionA").value,
    compB: document.getElementById("completionB").value,
    compC: document.getElementById("completionC").value,
    role: localStorage.getItem("annotatorRole"),
    annotatorEmail,
  };

  if (
    payload.prompt != "" &&
    payload.compA != "" &&
    payload.compB != "" &&
    payload.compC != ""
  ) {
    // console.log(payload);
    let endpoint = "logAnnotation",
      method = "POST";
    fetch(
      APIURL + `/api/annotations/${endpoint}`,

      {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.logged === false) {
          const annotationId = data.message[0].annotationId;
          const secondaryCount = data.message.filter((x) =>
              x.taskType.includes("Review")
            ).length,
            primaryCount = data.message.filter(
              (x) => !x.taskType.includes("Review")
            ).length;
          console.log({
            annotationId,
            secondaryCount,
            primaryCount,
          });
          document.getElementById(
            "loggedAnnotationShitBody"
          ).innerHTML = `<b>${secondaryCount}</b> secondary annotation(s) and <b>${primaryCount}</b> primary annotation(s) found for given prompt and completions, with the annotation Id <b>${annotationId}</b>`;
        } else {
          const annotationId = data.message.annotationId;
          console.log(data);
          // const annotationId = data.message[0].annotationId;
          document.getElementById(
            "loggedAnnotationShitBody"
          ).innerHTML = `Primary annotation logged with annotation Id <b>${annotationId}</b>`;
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    // console.log("Prompt or Completion text missing");
    document.getElementById(
      "loggedAnnotationShitBody"
    ).innerHTML = `Prompt or Completion text missing`;
  }
};
