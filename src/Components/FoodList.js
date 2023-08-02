import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './FoodList.css'

function FoodList() {
    
  const foodTitleRef = useRef();
  const [food, setFood] = useState([]);
  const [list, setList] = useState('');

  const fetchFood = async () => {
    const foodName = await axios.get('https://api.itematch.com/api/admin/dummy_data/');
    let foodData = foodName.data.items;
    setFood(foodData);
  };

  const addToItem = (e) => {
    if (list.trim() !== '') {
        setFood([...food, { id: 4, title: list }]);
        setList('');
      }
      
  };

  const handleDelete = (itemId) => {
    setFood(food.filter((item) => item.id !== itemId));
  };

  useEffect(() => {
    foodTitleRef.current.focus();
    fetchFood();
  }, []);

  return (
    <>
     <h1 className='title'>Add Foods</h1>
      <div className='foodListDisplay'>
        
        <input  onChange={(item) => setList(item.target.value)} type="text" placeholder='Enter the food' ref={foodTitleRef} />

        <button  onClick={addToItem}>Add</button>
      </div>

      <div className='foodList'>
        {food.map((item) => (
          <div key={item.id}>
            <li>{item.title}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            </li>
            <br />
          </div>
        ))}
      </div>
    </>
  );
}

export default FoodList;
