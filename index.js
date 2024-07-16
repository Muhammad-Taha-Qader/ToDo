let itemsAvliableSoFar=1;
function addNewTodoItem(){
    //Creat new TodoItem div
    let newTodoItem = document.createElement('div');
    newTodoItem.className ="todoItem";

    //Creat new div's iteam chcek box
    let newItemCheckbox = document.createElement('input');
    newItemCheckbox.id=`i${++itemsAvliableSoFar}`;
    // newCheckbox.setAttribute('type', 'checkbox');  Or can use following
    newItemCheckbox.type = 'checkbox';
    newItemCheckbox.setAttribute('onchange' , 'handleCheckboxChange(this)');

    //Creat new textarea for iteam
    let newItemTextarea = document.createElement('textarea');
    newItemTextarea.setAttribute('data-for', `${newItemCheckbox.id}`);
    // newItemLable.textContent=`your ${itemsAvliableSoFar} task`;
    newItemTextarea.setAttribute('placeholder','Enter description...');
    newItemTextarea.setAttribute('oninput','autoResize(this)');

    //Creat new del btn for iteam
    let newIteamdel=document.createElement('button');
    newIteamdel.setAttribute('onclick','removeCurrentTodoItem(this)');
    newIteamdel.innerHTML="<i class='fas fa-trash'></i>";
    newIteamdel.className="delBtn";

    //Putting chcek box and labes inside the div that we created
    newTodoItem.appendChild(newItemCheckbox);
    newTodoItem.appendChild(newItemTextarea);
    newTodoItem.appendChild(newIteamdel);

    //putting the div(new to do item) in our main todoIteams list/card
    // document.getElementsByClassName("todoCard")[0].appendChild(newTodoItem);
   // Instead this use following document.getElementsByClassName("todoItemUnchecked")[0].appendChild(newTodoItem);
    document.querySelector("todoItemUnchecked").appendChild(newTodoItem);

    //NO need now as previously new items were in todoCard so we have to reposition the add butoon but now every newiteam in in UNCKED div
    // //But add button should go down the newly created iteam so:
    // // Get the parent element
    // let parent = newTodoItem.parentNode;  //Or let parent=document.getElementsByClassName("todoItemUnchecked")[0];
    // //Insert the new item before button
    // let btn=document.getElementById("addNewItemBtn");
    // parent.insertBefore(newTodoItem,btn);
}


function removeCurrentTodoItem(myThis)
{
    console.log(myThis);
    console.log(myThis.getAttribute('data-for'));
    let currentTodoIteam=myThis.parentNode;
    let parent=currentTodoIteam.parentNode;
    parent.removeChild(currentTodoIteam);
}

function handleCheckboxChange(myThis){
    // alert("Got togal");
    console.log(myThis);
    console.log(myThis.checked);
    let currentTodoIteam=myThis.parentNode;
    console.log("---------- printing Curennt Item: ")
    console.log(currentTodoIteam);
    console.log("------------------------------- ")

    let parent=currentTodoIteam.parentNode; //parent==Check/Uncheck div
    if (myThis.checked) {
        parent.removeChild(currentTodoIteam);
        console.log(currentTodoIteam);
        //document.getElementsByClassName("todoItemChecked")[0].appendChild(currentTodoIteam); // Will apend at bottom but we don't want that
        var todoItemCheckedDiv = document.getElementsByClassName("todoItemChecked")[0];
        todoItemCheckedDiv.insertBefore(currentTodoIteam, todoItemCheckedDiv.firstChild);        
    }else{
        parent.removeChild(currentTodoIteam);
        document.getElementsByClassName("todoItemUnchecked")[0].appendChild(currentTodoIteam); 
    }
}


//-----> For repostioning when checked and uncked:
/////// way 1:
//html:  <input type="checkbox" id="i1">
//js:
// const checkbox = document.getElementById(id);
// if (checkbox) {
//     if (checkbox.checked) {
//         console.log("Checkbox is checked");
//         // Do something if the checkbox is checked, e.g., mark the task as completed
//     } else {
//         console.log("Checkbox is not checked");
//         // Do something if the checkbox is not checked, e.g., prompt the user to check it before deleting
//     }

////////way2:
{/* <input type="checkbox" id="i1" onchange="handleCheckboxChange(this)"></input>

function handleCheckboxChange(checkbox) {
    if (checkbox.checked) {
        console.log("Checkbox is checked");
        // Do something when the checkbox is checked
    } else {
        console.log("Checkbox is not checked");
        // Do something when the checkbox is not checked
    }
} */}




function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}


function togalTheme(){
    let todoItemUnchecked=document.getElementsByClassName('todoItemUnchecked')[0];
    let todoItemChecked=document.getElementsByClassName('todoItemChecked')[0];
    todoItemUnchecked.classList.remove('bg-slate-500');
    todoItemUnchecked.classList.add('bg-purple-900');

    todoItemChecked.classList.remove('bg-green-400');
    todoItemChecked.classList.add('bg-fuchsia-900');

    // let myHtml= document.getElementsByTagName('html')[0];
    // myHtml.classList.remove('bg-gradient-to-r from-purple-950 to-fuchsia-900');
    // console.log(myHtml.classList);
    // myHtml.classList.add('bg-gradient-to-r', 'from-slate-800', 'to-slate-900');

    let myHtml = document.getElementsByTagName('html')[0];
    let classesToRemove = ['bg-gradient-to-r', 'from-purple-950', 'to-fuchsia-900'];
    classesToRemove.forEach(className => myHtml.classList.remove(className));
    console.log(myHtml.classList);
    myHtml.classList.add('bg-gradient-to-r', 'from-slate-800', 'to-slate-900');


}