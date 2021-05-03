'Use strict';
const addBtn = document.querySelector('#add-btn');

const updateLocalStorage = () => {
    const textArea = document.querySelectorAll('textarea');
    let localNotes = [];

    textArea.forEach((currElem) => {
        localNotes.push(currElem.value);
    });

    localStorage.setItem('notes', JSON.stringify(localNotes));
}

const addNewNode = (text = '') => {
    const notes = document.createElement('div');
    notes.setAttribute('class', 'notes');
    const htmlData = `
    <!-- edit & delete btn -->
        <div id="crud-btn">
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="del-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
        <!-- Main note area -->
        <div class="main-note ${text ? '' : 'hide-element'}"></div>
        <textarea class = "${text ? 'hide-element' : ''}"></textarea>
    `;
    notes.insertAdjacentHTML('afterbegin', htmlData);

    //Getting refernces for edit-delete and toggle purpose
    const editBtn = notes.querySelector('.edit-btn');
    const deleteBtn = notes.querySelector('.del-btn');
    const mainNote = notes.querySelector('.main-note');
    const textArea = notes.querySelector('textarea');

    //To delete a note
    deleteBtn.addEventListener('click', () => {
        notes.remove();
        updateLocalStorage();
    });


    textArea.value = text;
    mainNote.innerHTML = text;

    //Toggling using editBtn
    editBtn.addEventListener('click', () => {
        mainNote.classList.toggle('hide-element');
        textArea.classList.toggle('hide-element');
    });

    textArea.addEventListener('change', (ev) => {
        mainNote.innerHTML = ev.target.value;
        updateLocalStorage();
    });
    document.body.appendChild(notes);
}

//Driver code
document.addEventListener('DOMContentLoaded', () => {
    const text = JSON.parse(localStorage.getItem('notes'));

    if (text) {
        text.forEach((currElem) => {
            addNewNode(currElem);
        });
    }
});

addBtn.addEventListener('click', () => {
    addNewNode();
});