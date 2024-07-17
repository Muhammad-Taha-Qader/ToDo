let itemsAvliableSoFar=1;
const Theme = {
    LIGHT: 1,
    DARK: 2,
    DAKR_DEEP: 3
};
let currentTheme= Theme.LIGHT;

// Save to local storage
function saveTodos() {
    const todoItems = [];
    document.querySelectorAll('.todoItem').forEach((oneItem) => {
        const itemText = oneItem.querySelector('textarea');
        const checkbox = oneItem.querySelector('input[type="checkbox"]');
        if(itemText.value!='') // if don't use this, it will also store the 1st blank todoiteam that is showin to 1st user. 
            todoItems.push({
                text: itemText.value,
                checkbox: checkbox.checked,
                id: checkbox.id
            });
    });
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

// Load from local storage
function loadTodos() {
    const todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];
    todoItems.forEach(todo => {
        const newTodoItem=createNewTodoItem(todo.id, todo.checkbox, todo.text);
        const newItemParent= todo.checkbox? document.querySelector('.todoItemChecked') : document.querySelector('.todoItemUnchecked') ;
        newItemParent.appendChild(newTodoItem);
        // itemsAvliableSoFar = Math.max(itemsAvliableSoFar, parseInt(todo.id.slice(1)));
    });
}

function createNewTodoItem(id, checked, text){
    //Creat new TodoItem div
    let newTodoItem = document.createElement('div');
    newTodoItem.className ='todoItem';

    //Creat new div's iteam chcek box
    let newItemCheckbox = document.createElement('input');
    newItemCheckbox.id=id;
    // newCheckbox.setAttribute('type', 'checkbox');  Or can use following
    newItemCheckbox.type = 'checkbox';
    newItemCheckbox.checked=checked;
    newItemCheckbox.setAttribute('onchange' , 'handleCheckboxChange(this)');

    //Creat new textarea for iteam
    let newItemTextarea = document.createElement('textarea');
    newItemTextarea.setAttribute('data-for', id);
    // newItemLable.textContent=`your ${itemsAvliableSoFar} task`;
    newItemTextarea.setAttribute('placeholder','Enter description...');
    newItemTextarea.value = text;
    newItemTextarea.setAttribute('oninput','autoResize(this)');

    //Creat new del btn for iteam
    let newIteamdel=document.createElement('button');
    newIteamdel.setAttribute('onclick','removeCurrentTodoItem(this)');
    newIteamdel.innerHTML='<i class="fas fa-trash"></i>';
    newIteamdel.className='delBtn';

    //Putting chcek box and labes inside the div that we created
    newTodoItem.appendChild(newItemCheckbox);
    newTodoItem.appendChild(newItemTextarea);
    newTodoItem.appendChild(newIteamdel);

    return newTodoItem;
}

// eslint-disable-next-line no-unused-vars
function addNewTodoItem(){
    const id = `i${++itemsAvliableSoFar}`;
    const newTodoItem = createNewTodoItem(id, false, '');
    //putting the div(new to do item) in our main todoIteams list/card
    // document.getElementsByClassName("todoCard")[0].appendChild(newTodoItem);
    //document.getElementsByClassName("todoItemUnchecked")[0].appendChild(newTodoItem);
    document.querySelector('.todoItemUnchecked').appendChild(newTodoItem);

    //NO need now as previously new items were in todoCard so we have to reposition the add butoon but now every newiteam in in UNCKED div
    // //But add button should go down the newly created iteam so:
    // // Get the parent element
    // let parent = newTodoItem.parentNode;  //Or let parent=document.getElementsByClassName("todoItemUnchecked")[0];
    // //Insert the new item before button
    // let btn=document.getElementById("addNewItemBtn");
    // parent.insertBefore(newTodoItem,btn);
    saveTodos();
}

// eslint-disable-next-line no-unused-vars
function removeCurrentTodoItem(myThis)
{
    console.log(myThis);
    console.log(myThis.getAttribute('data-for'));
    const currentTodoIteam=myThis.parentNode;
    const parent=currentTodoIteam.parentNode;
    parent.removeChild(currentTodoIteam);
    saveTodos();
}

// eslint-disable-next-line no-unused-vars
function handleCheckboxChange(myThis){
    let currentTodoIteam=myThis.parentNode;

    let parent=currentTodoIteam.parentNode; //parent==Check/Uncheck div
    if (myThis.checked) {
        parent.removeChild(currentTodoIteam);
        console.log(currentTodoIteam);
        //document.getElementsByClassName("todoItemChecked")[0].appendChild(currentTodoIteam); // Will apend at bottom but we don't want that
        var todoItemCheckedDiv = document.getElementsByClassName('todoItemChecked')[0];
        todoItemCheckedDiv.insertBefore(currentTodoIteam, todoItemCheckedDiv.firstChild);        
    }else{
        parent.removeChild(currentTodoIteam);
        document.getElementsByClassName('todoItemUnchecked')[0].appendChild(currentTodoIteam); 
    }
    saveTodos();
}

// eslint-disable-next-line no-unused-vars
function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
    saveTodos();
}

// eslint-disable-next-line no-unused-vars
function resetAll(){
 localStorage.clear();
 loadTodos();
 // Refresh the page
location.reload();
}

// function togalTheme(){
//     let todoItemUnchecked=document.getElementsByClassName('todoItemUnchecked')[0];
//     let todoItemChecked=document.getElementsByClassName('todoItemChecked')[0];
//     todoItemUnchecked.classList.remove('bg-slate-500');
//     todoItemUnchecked.classList.add('bg-purple-900');

//     todoItemChecked.classList.remove('bg-green-400');
//     todoItemChecked.classList.add('bg-fuchsia-900');

//     // let myHtml= document.getElementsByTagName('html')[0];
//     // myHtml.classList.remove('bg-gradient-to-r from-purple-950 to-fuchsia-900');
//     // console.log(myHtml.classList);
//     // myHtml.classList.add('bg-gradient-to-r', 'from-slate-800', 'to-slate-900');

//     let myHtml = document.getElementsByTagName('html')[0];
//     let classesToRemove = ['bg-gradient-to-r', 'from-purple-950', 'to-fuchsia-900'];
//     classesToRemove.forEach(className => myHtml.classList.remove(className));
//     console.log(myHtml.classList);
//     myHtml.classList.add('bg-gradient-to-r', 'from-slate-800', 'to-slate-900');
// }
// eslint-disable-next-line no-unused-vars
function togalTheme(){
    const todoItemUnchecked=document.getElementsByClassName('todoItemUnchecked')[0];
    const todoItemChecked=document.getElementsByClassName('todoItemChecked')[0];
    const myHtml = document.getElementsByTagName('html')[0];
    let themeBtn= document.querySelector('#myNav button');

    if(currentTheme===Theme.LIGHT){
        // todoItemUnchecked.classList.remove('bg-slate-500');
        // todoItemUnchecked.classList.add('bg-purple-900');
    
        // todoItemChecked.classList.remove('bg-green-400');
        // todoItemChecked.classList.add('bg-fuchsia-900');

        // let myHtml= document.getElementsByTagName('html')[0];
        // myHtml.classList.remove('bg-gradient-to-r from-purple-950 to-fuchsia-900');
        // console.log(myHtml.classList);
        // myHtml.classList.add('bg-gradient-to-r', 'from-slate-800', 'to-slate-900');
        const classesToRemove = ['bg-gradient-to-r', 'from-purple-950', 'to-fuchsia-900'];
        classesToRemove.forEach(className => myHtml.classList.remove(className));
        console.log(myHtml.classList);
        myHtml.classList.add('bg-gradient-to-r', 'from-slate-800', 'to-slate-900');
        // eslint-disable-next-line no-unused-vars
        themeBtn.innerHTML='<i class="fa-regular fa-moon"></i>';
        currentTheme=Theme.DARK;
    }else if(currentTheme===Theme.DARK){
        todoItemUnchecked.classList.remove('bg-custom-transparent');
        todoItemUnchecked.classList.add('bg-purple-900');
    
        todoItemChecked.classList.remove('bg-custom-green');
        todoItemChecked.classList.add('bg-fuchsia-900');
        themeBtn.innerHTML='<i class="fa-solid fa-star"></i>';
        currentTheme=Theme.DAKR_DEEP;
    }else if(currentTheme===Theme.DAKR_DEEP){
        todoItemUnchecked.classList.add('bg-custom-transparent');
        todoItemUnchecked.classList.remove('bg-purple-900');
    
        todoItemChecked.classList.add('bg-custom-green');
        todoItemChecked.classList.remove('bg-fuchsia-900');

        const classesToRemove = ['bg-gradient-to-r', 'from-slate-800', 'to-slate-900'];
        classesToRemove.forEach(className => myHtml.classList.remove(className));
        console.log(myHtml.classList);
        myHtml.classList.add('bg-gradient-to-r', 'from-purple-950', 'to-fuchsia-900');
        // eslint-disable-next-line no-unused-vars
        themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';
        currentTheme=Theme.LIGHT;
    }
}

// Load todos when the page loads
window.onload = loadTodos;

