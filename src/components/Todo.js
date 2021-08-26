import React, { useState ,useEffect} from 'react';
import logo from './to-do-list.png';

//to get data from localStorage

const getLocalItems = () =>{
    let list = localStorage.getItem('TodoList');
    

    if(list){
        return JSON.parse(localStorage.getItem('TodoList'));
    }else{
        return [];
    }
};

const Todo = () =>{
    const [inputData,setInputdata] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleButton, setToggleButton] = useState(true);
    const [isEditItem,setIsEditItem] = useState(null);

    const inputChangeHandler = (event) =>{
          setInputdata(event.target.value);
    };
//add item onClick method
    const addItem = () =>{
        if(!inputData){
          alert('please fill data');

        }
        else if(inputData && !toggleButton){
             setItems(
                 items.map((element) =>{
                     if(element.id === isEditItem){
                         return{...element, name:inputData}
                     }
                     return element;
                 })
                 
                 )
                 setToggleButton(true);
                 setInputdata('');
                 setIsEditItem(null);
        }
        else{
            const allInputData = {id: new Date().getTime().toString(), name:inputData}
            setItems([...items, allInputData]);
            setInputdata('');
        
        } 
    };
//delete item
    const deleteItem = (index) =>{
       const updateditems = items.filter((element) =>{
           return index !== element.id;
       });

       setItems(updateditems);
    };

//add item on Enter press

    const inputSubmitHandler = (event) =>{
        if(event.key === 'Enter'){
            addItem();
        }
    };

//--------------------------------------------- Edit item --------------------------------------//

const editItem = (id) =>{
    let newEditItem = items.find((element) =>{
        return element.id === id;
       
    });
   
    setToggleButton(false);
    setInputdata(newEditItem.name);
    setIsEditItem(id);
};


//add data on local storage
    useEffect(() =>{
     localStorage.setItem('TodoList',JSON.stringify(items))
    },[items]);


   return(
     <>
       <div className="main-div">
         <div className="child-div">
            <figure>
              <img src={logo} alt="todo logo" />
                 <figcaption>Add your list here</figcaption>
            </figure>
            <div className="addItems">
                <input 
                 type="text"
                 placeholder="Add Items" 
                 name="listItem" 
                 value={inputData}
                 onChange={inputChangeHandler}
                 onKeyPress={inputSubmitHandler}
               />
               {
                toggleButton ? <i className="fa fa-plus add-btn" title="Add-item" onClick={addItem}></i> :
                <i className="fas fa-edit delete-btn" title="Update Item" onClick={addItem}></i>
               } 
            </div>

    <div className="showItems">
      {
        items.map((element) => {
           return(
          <div className="eachItem" key={element.id}>
          <h3>{element.name}</h3>
          <div className="todo-btn">
             <i className="fas fa-edit delete-btn" title="Edit Item" onClick={() => editItem(element.id)}></i>
             <i className="fas fa-trash-alt delete-btn" title="Delet Item" onClick={() => deleteItem(element.id)}></i>
         </div>
                                
        </div>
        )
       })
        }
                
                </div>

             </div>
         </div>
     </>
   );
};

export default Todo;