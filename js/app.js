console.log("Welcome");
let addBtn = document.getElementById('addBtn');
let card = document.getElementById('card');
let search = document.getElementById('search');
let card_title = document.querySelector('.card-title');
// local array to fetch data from local storage in form of array 
let notesObj = [];
let titleObj = [];

// function call initially so that previous all data store in local storage pops up;
showNotes();
// if user click to add note store it in local storage
addBtn.addEventListener('click', () => {
    let addText = document.getElementById('addTxt'); // notes are store in text
    let titles = localStorage.getItem('titles');
    let notes = localStorage.getItem('notes');
    if (notes) {
        notesObj = notes.split(','); // converting string to array}
        titleObj = titles.split(',');
    }
    if (addText.value.length === 0) return;
    notesObj.push(addText.value);
    titleObj.push(card_title.innerHTML);
    localStorage.setItem('notes', notesObj.toString());//store in form of string because local storage wont store array
    localStorage.setItem('titles', titleObj.toString());
    // console.log(notesObj);
    addText.value = "";
    showNotes();
});

// Function to show all notes
function showNotes(tex = '') {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    if (notes && titles) {
        notesObj = notes.split(',');
        titleObj = titles.split(',');
    }
    let html = ``;
    notesObj.forEach(function run(text, ind) {
        if ((tex === '' || text.toLowerCase().includes(tex))) {
            html += ` 
                <div class="notecard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${titleObj[ind]}</h5>
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
    card_title.innerHTML = `Notes ${titleObj.length + 1}`;
}

// Delete All Notes
document.getElementById('deleBtn').addEventListener('click', () => {
    if (!window.confirm("Are You Sure to Delete All Notes?"))
        return;
    localStorage.clear();
    notesObj = [];
    titleObj = [];
    card.innerHTML = '<h3>Nothing to Show Yet</h3>'
    showNotes();
});

// Delete Single Notes
function DeleteNote(ind) {
    let notes = localStorage.getItem('notes');
    let titles = localStorage.getItem('titles');
    notesObj = notes.split(',');
    titleObj = titles.split(',');
    notesObj.splice(ind, 1);
    titleObj.splice(ind, 1);
    localStorage.setItem('notes', notesObj);
    localStorage.setItem('titles', titleObj);
    showNotes();
}

// Query
search.addEventListener('input', (e) => {
    let text = search.value;
    e.preventDefault();
    if (!text) text = '';
    text = text.toLowerCase();
    console.log(text);
    showNotes(text);
});

// click listner on card_title
card_title.addEventListener('click', () => {
    let createInput = document.createElement('input');
    // console.log(createInput);
    card_title.replaceWith(createInput);
    createInput.value = card_title.innerHTML;
    createInput.focus();
    createInput.select();
    createInput.addEventListener('blur', () => {
        card_title.innerHTML = createInput.value;
        createInput.replaceWith(card_title);
    });
    createInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            createInput.blur();
            document.getElementById('addTxt').focus();
        }
    })
});
