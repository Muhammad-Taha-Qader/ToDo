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

    //Creat new lable text for iteam
    let newItemLable = document.createElement('label');
    newItemLable.setAttribute('for', `${newItemCheckbox.id}`);
    newItemLable.textContent=`your ${itemsAvliableSoFar} task`;

    let newIteamdel=document.createElement('button');
    newIteamdel.setAttribute('onclick','removeCurrentTodoItem(this)');
    newIteamdel.innerText="del";

    //Putting chcek box and labes inside the div that we created
    newTodoItem.appendChild(newItemCheckbox);
    newTodoItem.appendChild(newItemLable);
    newTodoItem.appendChild(newIteamdel);

    //putting the div(new to do item) in our main todoIteams list/card
    document.getElementsByClassName("todoCard")[0].appendChild(newTodoItem);

    //But add button should go down the newly created iteam so:
    // Get the parent element
    let parent = newTodoItem.parentNode;  //Or let parent=document.getElementsByClassName("todoCard")[0];
    //Insert the new item before button
    let btn=document.getElementById("addNewItemBtn");
    parent.insertBefore(newTodoItem,btn);
}


function removeCurrentTodoItem(myThis)
{
    console.log(myThis);
    console.log(myThis.getAttribute('data-for'));
    let currentTodoIteam=myThis.parentNode;
    let parent=currentTodoIteam.parentNode;
    parent.removeChild(currentTodoIteam);
}