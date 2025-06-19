//index js covering the search bar funtion

const search = document.getElementById("search");
search.addEventListener("input", async () => {
  const query = search.value.trim();

  const result = await fetch(`/search/${query}`);
  const users = await result.json();
  renderUsers(users);
});

//render helper
const tbody = document.getElementById("tbody");
function renderUsers(users) {
  tbody.innerHTML = ``;
  users.forEach((person) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="text-center" >
        <em style="font-size: 12px; line-height: 1px"> 
        ${new Date(person.createdAt).toLocaleString()}
        </em>
      </td>
      <td class="text-center">${person.firstName}</td>
      <td class="text-center">${person.middleName}</td>
      <td class="text-center">${person.lastName}</td>
      <td class="text-center">${person.idNumber}</td>
      <td class="text-center">${person.typeOfPriority}</td>
      <td class="text-center">${person.birth}</td>
      <td class="text-center">${person.cenomar}</td>
      <td class="text-center">${person.marriage}</td>
      <td class="text-center">${person.death}</td>
      <td class="text-center">
       <button class="btn btn-sm btn-outline-danger"
            onclick="deletePriority(${person.id})"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-trash"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
              />
              <path
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
              />
            </svg>
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}
//delete priority by id
const deletePriority = async (id) => {
  if (!confirm("Are you sure you want to delete this priority?")) return;
  try {
    await fetch(`/deletePriority/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("error deleting user", error);
  }
};
//modal
//download button
function btnDownload() {
  const downloadBtn = (document.getElementById("downloadId").style.display =
    "none");
  const spin = (document.getElementById("spin").style.display = "block");
  //set time out to load the spinner
  function loader() {
    const downloadBtn = (document.getElementById("downloadId").style.display =
      "block");
    const spin = (document.getElementById("spin").style.display = "none");
    const pdf = document.getElementById("pdfTable");
    const option = {
      margin: 1,
      filename: "report of the day",
      image: { type: "png", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "legal", orientation: "landscape" },
    };
    html2pdf(pdf, option);
  }
  setTimeout(loader, 2000);
  clearTimeout(loader);
}

function modalReport(divPrint) {
  const modalContent = document.getElementById(divPrint).innerHTML;
  document.body.innerHTML = modalContent;
  const origContent = document.body.innerHTML;
  window.print();
  document.body.innerHTML = origContent;
  window.location.reload();
}

function deletePriorities() {
  const delAllP = document.getElementById("delAlPrio");
  const confirmInput = `<input type="text"  class="form-control" name="conAction" id="conAction" placeholder="enter password for override"/>`;
  const continueToDelete = `  <a
              href="/deleteAllPriority"
              class="btn btn-outline-success btn-sm w-100"
            >
              <i class="fa fa-trash-o" aria-hidden="true"></i> continue to delete
            </a>`;
  delAllP.innerHTML = confirmInput;
  //input
  const confirmInputFinal = document.getElementById("conAction");
  confirmInputFinal.addEventListener("input", () => {
    if (confirmInputFinal.value === "admin") {
      delAllP.innerHTML = continueToDelete;
    }
  });
}
