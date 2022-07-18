console.log("Welcome");
let addBtn = document.getElementById('addBtn');
let card = document.getElementById('card');
let search = document.getElementById('search');
// local array to fetch data from local storage in form of array 
let notesObj = [];
// function call initially so that previous all data store in local storage pops up;
showNotes();
// if user click to add note store it in local storage
addBtn.addEventListener('click', () => {
    let addText = document.getElementById('addTxt'); // notes are store in text
    let notes = localStorage.getItem('notes');
    if (notes)
        notesObj = notes.split(','); // converting string to array
    if (addText.value.length === 0) return;
    notesObj.push(addText.value);
    localStorage.setItem('notes', notesObj.toString());//store in form of string because local storage wont store array
    console.log(notesObj);
    addText.value = "";
    showNotes();
});

// Function to show all notes
function showNotes(tex = '') {
    let notes = localStorage.getItem('notes');
    if (notes)
        notesObj = notes.split(',');
    let html = ``;
    notesObj.forEach(function run(text, ind) {
        if ((tex === '' || text.includes(tex))) {
            html += ` 
                <div class="notecard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Notes ${ind + 1}</h5>
                        <p class="card-text">${text}</p>
                        <button onclick="DeleteNote(${ind})" class="btn btn-danger">Delete Note</button>
                    </div>
                </div>`;
        }
    });
    if (html.length === 0)
        card.innerHTML = '<h3>Nothing to Show Yet</h3>'
    else
        card.innerHTML = html;
}

// Delete All Notes
document.getElementById('deleBtn').addEventListener('click', () => {
    if (!window.confirm("Are You Sure to Delete All Notes?"))
        return;
    localStorage.clear();
    notesObj = [];
    card.innerHTML = '<h3>Nothing to Show Yet</h3>'
});

// Delete Single Notes
function DeleteNote(ind) {
    let notes = localStorage.getItem('notes');
    notesObj = notes.split(',');
    notesObj.splice(ind, 1);
    localStorage.setItem('notes', notesObj);
    showNotes();
}

// Query
search.addEventListener('input', (e) => {
    let text = search.value;
    e.preventDefault();
    if (!text) text = '';
    console.log(text);
    showNotes(text);
});