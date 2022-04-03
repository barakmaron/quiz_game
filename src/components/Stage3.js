import { React, useEffect, useState} from 'react';

import '../css/Stage3.scss'

import GetCategories from './ApiManager'
import Button from './Button';

const Stage3 = ({ category }) => {
    const color = ['2eb952', '35afe9', 'bd35e9', 'e9a135', '8bb722', 'e93535', '355ce9']
    const [categories, setCategories] = useState({ trivia_categories: []})
    useEffect(() => 
    {
       const getCategories = async () => {
            const getCat = await GetCategories();
            setCategories(getCat);
       };
       getCategories();
    }, []);
    
    const handleCategorySelection = (e) =>
    {
        e.preventDefault();
        category(e.target.id);
    }

  return (
    <div>
      <h3>Select category:</h3> 
      <div className='categories'>
        {categories.trivia_categories.map((cat, i) => {
            let position = cat.name.search('Entertainment:') === 0 ? 15 : -1;
            position = position === -1 && cat.name.search('Science:') === 0 ? 9 : position;
            cat.name = position !== -1 ? cat.name.substr(position) : cat.name;
            
            return(<Button key={i} addCostumeWidth='20%' text={cat.name} id={cat.id} color={color[i % 7]} onClick={handleCategorySelection}></Button>);
        })}
      </div>
    </div>
  )
}

export default Stage3
