let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const tabBtn = document.getElementById("saveTab-btn")
const renameMessageBox = document.getElementById("message-box-rename-link")
const btnCancel = document.getElementById("btncancel")


//INPUT BUTTON
inputBtn.addEventListener("click", function(){
    console.log("Button cliked from event listener")
    if (inputEl.value===""){
        alert("Please input a url.")
        console.log("Please input a url.")
    }else{
        myLeads.push(inputEl.value)

    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)

    inputEl.value=""
    console.log(localStorage.getItem("myLeads"))
    }
    
})

//TAB BUTTON
tabBtn.addEventListener("click", function(){
    renameMessageBox.style.display = "flex"
    chrome.tabs.query({active:true, currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads)
    })
})

//DELETE BUTTON
deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})


btnCancel.addEventListener("click", function(){
     closemessage()
})

function closemessage(){
    renameMessageBox.style.display = "none"
}

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render()
}

// function render(){
//     console.log(myLeads)
//     let listItems = ""
//     for(let i = 0;i<myLeads.length;i++){
     
//      listItems += `<li>
//                         <a target='_blank' id='${myLeads[i]}' href='${myLeads[i]}'> ${myLeads[i]} </a>
//                         <img id="${myLeads[i]}" src="pencil.svg" onclick="rename(${myLeads[i]})">
//                         <img id="delete" src="trash.svg" onclick="deletefunction(${i})">
//                      </li>`
//     }
//     ulEl.innerHTML=listItems
        
// }
function render(){
  console.log(myLeads);
  let listItems = "";
  for(let i = 0; i < myLeads.length; i++){
    const lead = myLeads[i];
    listItems += `
      <li>
        <a target="_blank" href="${lead}">${lead}</a>
        <img class="rename-btn" data-lead="${lead}" src="pencil.svg" alt="rename">
        <img class="delete-btn" data-index="${i}" src="trash.svg" alt="delete">
      </li>`;
  }
  ulEl.innerHTML = listItems;

  // attach handlers
  ulEl.querySelectorAll('.rename-btn').forEach(btn => {
    btn.addEventListener('click', () => rename(btn.dataset.lead));
  });
  ulEl.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => deletefunction(Number(btn.dataset.index)));
  });
}

//const renameBtn = document.getElementById("rename")

function rename(linkNmae){
    console.log("Rename clicked "+ linkNmae)
}

function deletefunction(index){
    myLeads.splice(index,1)  
    localStorage.setItem("myLeads",JSON.stringify(myLeads))  
    console.log("Delete button")
    render()
}


