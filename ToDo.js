
// for validation of any key but numbers
var title=document.getElementById("inp_title");
title.addEventListener("keydown",function(event){
  const key = event.key;
  const regex=/[0-9]/; 
  const isNumber = regex.test(key);
  if (isNumber) {
      event.preventDefault(); 
  }
});


// for validation of input length
function ValidateInputLength(InputElement) 
{
  InputElement.addEventListener("input", function ()
   {
    var regex = /^.{6,}$/;

    if (regex.test(InputElement.value))
       {
      InputElement.style.border = '2px solid lightgreen'; 
    }
    else 
    {
      InputElement.style.border = '2px solid red';
    }
  });
}

function ValidateDescLength(InputElement) 
{
  InputElement.addEventListener("input", function ()
   {
    var regex = /^.{20,}$/;

    if (regex.test(InputElement.value))
       {
      InputElement.style.border = '2px solid lightgreen'; 
    }
    else 
    {
      InputElement.style.border = '2px solid red';
    }
  });
}

var description=document.querySelector("textarea");
ValidateDescLength(description);
ValidateInputLength(title);



   // Function to render the task list
   function renderList(arr)
    {
      ;
    const sec = document.getElementById('list');
    sec.innerHTML = "";

      for(var i=0;i<arr.length;i++)
      {
        const div = document.createElement('div');
        div.innerHTML = `<div class="ToDo" id="${i}">
                    <div class="title">
                      <h4>${arr[i].inp}</h4>
                    <div>
                      ${arr[i].desc}
                </div>
                </div>
                <div class="icons">
                    <button onclick="check(${i})" ><i class="fa-solid fa-check" title="Done"></i></button> 
                    <button onclick="update_btn(${arr[i].id})"><i class="fa-solid fa-pencil" title="Update"></i></button> 
                    <button onclick="deleteTodo(${arr[i].id})"><i class="fa-solid fa-trash" title="Delete"></i></button> 
                </div>
             </div>
           `;
        sec.appendChild(div);
      }
}


   // Utility function to clear input fields
   function clearInputs()
    {
      document.querySelector("input").value="";
      document.querySelector("textarea").value="";
}


//function for adding a new task to the list
let TodoList = [];

var btn=document.querySelector("#add_btn");

btn.addEventListener("click",function(){
  const inp=document.getElementById('inp_title').value;
  const desc=document.querySelector("textarea").value;
  if(inp.length>=6 && desc.length >= 20)
  {
    var p=document.getElementById("li_p");
    p.classList.remove("btn-no");
        const todo =
        {
            id: Date.now(),
            inp,
            desc
        };

    TodoList.push(todo);
        
    renderList(TodoList);
    clearInputs();
  }
});



   // Function to delete a task
   function deleteTodo(id)
    {
      TodoList = TodoList.filter(task => task.id !== id);
      renderList(TodoList);
   }

   // Function to search a task
  var search=document.getElementById("search");
  
  search.addEventListener("keyup",function()
  {
    const query = search.value.toLowerCase();
    const filtered = TodoList.filter(task =>  task.inp.toLowerCase().includes(query) );
    renderList(filtered);
  });


//function to check if task is done
function check(id)
{
  var div=document.getElementById(id);
  if(div.classList.contains("checked"))
  {
    div.classList.remove("checked");
  }
  else
  {
    div.classList.add("checked");
  }
}

// Function to update a task
function update_btn(id)
 {
  const task = TodoList.find(t => t.id === id);
  if (task)
  {
      var title=document.getElementById("inp_title");
      var desc=document.querySelector("textarea");

      title.value=task.inp;
      desc.value=task.desc;

      var up_btn=document.getElementById("update_btn");
      var add_btn=document.getElementById("add_btn");

      add_btn.classList.add("btn-no");
      up_btn.classList.remove("btn-no");

      up_btn.addEventListener("click",function(){
        task.inp=title.value;
        task.desc=desc.value;
        up_btn.classList.add("btn-no");
        add_btn.classList.remove("btn-no");
        renderList(TodoList);
        clearInputs();
      });
  }
}



// Prevent the default form submission to prevent refresh
document.getElementById('myForm').addEventListener('submit', function(event)
 { 
    event.preventDefault();
  }); 



  