
const taskContainer = document.querySelector(".task__container");
var globalStore = [];//array of object
console.log(taskContainer);



const generateNewCard = (taskData) => `
   
    <div class="col-sm-12 col-md-6 col-lg-4  ">
    
      
      <div class="card"  style="width: 18rem;">
        <div class="card-header d-flex gap-2 justify-content-end"  >
          <button   type="button" class="btn btn-danger fa-pull-right" id= ${taskData.id} onclick="deleteCard.apply(this,arguments)" ><i class="fas fa-trash-alt" id =${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button> 

          <button   type="button" class="btn btn-success fa-pull-right"   ><i  class="far fa-edit" ></i></button>
          </div>
       
          <img src=${taskData.imageUrl} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${taskData.taskTitle}</h5>
          <p class="card-text">${taskData.taskDescription}</p>
          <a href="#" class="btn btn-primary">${taskData.taskType}</a>
        </div>
      </div>
    </div>
    
    
    `;


const loadInitialCardData = () => {
     //localstorage to get tasky card data
    

        const getCardData = localStorage.getItem("tasky");

      
  
    

    //convert to normal object
   
    const {cards} = JSON.parse(getCardData);
    //loop over those array of task object to create HTML card , inject it to DOM
    //in map function there is no semicolon after arrow function
    cards.map((cardObject) => {

      taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));
    // update our global store 

    globalStore.push(cardObject);
    }
    )
    
  
     
   
    //update our global store
  

  };


//delete function 
 
const deleteCard = (event) => {
  event = window.event;  //all the event we are triggered by us
  const targetId = event.target.id ;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetId)
      localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
  


  if (tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

};





const saveChanges = () => {

    const taskData = {
        id:`${Date.now()}`, //$ then curly braces means it is dynamic it changes in future and it changes
        //date function changes every time  
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value, //in value v is small letter 
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value

    }
   //  Don't use curley barces with ` symbol  (always put  semicolon at end  in arrowfunction and ` type symbol function)
    

    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));


    globalStore.push(taskData);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};


//List of Issues

//page refreshes causes the data to get deleted       because of no local storage
//application programming interface (API)
//local storage act as interface (due to no database we have )
//interface means middle man 