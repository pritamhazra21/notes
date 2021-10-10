showStarNode();
showNotes();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  let dateItem = localStorage.getItem("dateItem");
  let starItem = localStorage.getItem("starItem");
  if (notes == null) {
    notesObj = [];
    dateObj = [];
    starObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
    dateObj = JSON.parse(dateItem);
    starObj = JSON.parse(starItem);
  }
  var currentdate = new Date();
  var today = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " @ "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();  //date for the title

  notesObj.push(addTxt.value);
  dateObj.push(today);
  starObj.push(0);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("dateItem", JSON.stringify(dateObj));
  localStorage.setItem("starItem", JSON.stringify(starObj));
  addTxt.value = "";
  showNotes();
  showStarNode();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  let dateItem = localStorage.getItem("dateItem");
  let starItem = localStorage.getItem("starItem");
  if (notes == null) {
    notesObj = [];
    dateObj = [];
    starObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
    dateObj = JSON.parse(dateItem);
    starObj = JSON.parse(starItem);
  }

  notesObj = notesObj.reverse();
  dateObj = dateObj.reverse();
  starObj = starObj.reverse();

  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <div class="noteCard my-2 mx-2 card" style="width: 21rem;">
                    <div class="card-body">
                        <h5 class="card-title">${dateObj[index]}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="${index}"onclick="starNode(this.id)" class="btn btn-primary">Star Note</button>
                    </div>
                </div>`;
  });


  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `You dont creat any note yet`;
  }
}



function showStarNode() {
  let notes = localStorage.getItem("notes");
  let dateItem = localStorage.getItem("dateItem");
  let starItem = localStorage.getItem("starItem");
  if (notes == null) {
    notesObj = [];
    dateObj = [];
    starObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
    dateObj = JSON.parse(dateItem);
    starObj = JSON.parse(starItem);
  }

  notesObj = notesObj.reverse();
  dateObj = dateObj.reverse();
  starObj = starObj.reverse();

  let html = "";
  count = 0;
  notesObj.forEach(function (element, index) {
    if (starObj[index]) {
      html += `
            <div class="noteCard my-2 mx-2 card" style="width: 21rem;">
                    <div class="card-body">
                        <h5 class="card-title">${dateObj[index]}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="${index}"onclick="starNode(this.id)" class="btn btn-primary">Star Note</button>
                    </div>
                </div>`;

      count++;
    }
  });


  let notesElm = document.getElementById("star-notes");
  if (count != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `Click "Star Note" any note to star the note`;
  }
}





// Function to delete a note
function deleteNote(index) {

  let notes = localStorage.getItem("notes");
  let dateItem = localStorage.getItem("dateItem");
  let starItem = localStorage.getItem("starItem");
  if (notes == null) {
    notesObj = [];
    dateObj = [];
    starObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
    dateObj = JSON.parse(dateItem);
    starObj = JSON.parse(starItem);
  }
  notesObj = notesObj.reverse();
  dateObj = dateObj.reverse();
  starObj = starObj.reverse();

  notesObj.splice(index, 1);
  dateObj.splice(index, 1);
  starObj.splice(index, 1);

  notesObj = notesObj.reverse();
  dateObj = dateObj.reverse();
  starObj = starObj.reverse();
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("dateItem", JSON.stringify(dateObj));
  localStorage.setItem("starItem", JSON.stringify(starObj));

  showNotes();
  showStarNode();
}



// Function to delete a note
function starNode(index) {

  let notes = localStorage.getItem("notes");
  let dateItem = localStorage.getItem("dateItem");
  let starItem = localStorage.getItem("starItem");
  if (notes == null) {
    notesObj = [];
    dateObj = [];
    starObj = [];
  }
  else {
    notesObj = JSON.parse(notes);
    dateObj = JSON.parse(dateItem);
    starObj = JSON.parse(starItem);
  }

  starObj = starObj.reverse();
  if (starObj[index]) {
    starObj[index] = 0;
  }
  else {
    starObj[index] = 1;
  }
  starObj = starObj.reverse();
  localStorage.setItem("starItem", JSON.stringify(starObj));

  showNotes();
  showStarNode();
}







let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

  let inputVal = search.value.toLowerCase();
  let noteCards = document.getElementsByClassName('noteCard');
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    cardTxt = cardTxt.toLowerCase();
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })
})

