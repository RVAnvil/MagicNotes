console.log('welcome to magic notes app');
showNotes();
let addBtn = document.getElementById('addBtn');

addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';

    showNotes();
});

// function to show nodes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function(element,index) {
        html += `
        <div  id="card${index}" class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">Note ${index+1}</h5>
                    <p class="card-text">${element}</p>
                    <div class='cardBtn'>
                        <button id="${index}" onclick="deleteNode(this.id)"  class="btn btn-primary">Delete</button>
                        <button id="${"btn"+index}" type='button' onclick="makeFav(this.id)"  class='btn btn-outline-danger' value="true">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="mx-2 bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </button>
                    </div>
                </div>
        </div>`;
        
    });
    let notesEle = document.getElementById('notes');

    if(notesObj.length != 0){
        notesEle.innerHTML = html;
    }
    else{
        notesEle.innerHTML = `Nothing to show please add notes`;
    }
}

// function to deleteing a node

function deleteNode(index){
    console.log('I am Deleting node number :',index +1);
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// function for searching nodes

let search = document.getElementById('searchTxt');
search.addEventListener('input',function(element){
    let inputVal = search.value
    console.log(inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        console.log(cardTxt);
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        }
        else{
            element.style.display = 'none';
        }
    })

})

// making importent note

function makeFav(idx){
    let x = document.getElementById(idx);
    if(x.value == "true"){
        x.parentNode.parentNode.parentNode.style.backgroundColor = "#91ff00a1";
        x.value ="false";
    }
    else{
        x.parentNode.parentNode.parentNode.style.backgroundColor = "white";
        x.value ="true";
    }
    
    
}
