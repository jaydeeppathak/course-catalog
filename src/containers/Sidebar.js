import React, { useState } from 'react';
import SearchIcon from '../assets/images/search.svg';
import { categories } from './constants';

const Sidebar = (props) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  // const
  return (
    <div className="app__sidebar">
      <div className="app__sidebar__searchdiv">
        <span className="app__sidebar__searchdiv__title">Search for keywords</span>
        <div className="app__sidebar__searchdiv__search">
          <img src={SearchIcon} className="app__sidebar__searchdiv__search__icon" />
          <input
            className="app__sidebar__searchdiv__search__input"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Filter courses"
          />
        </div>
      </div>
      <div className="app__sidebar__categorydiv">
        <span className="app__sidebar__categorydiv__title">Category</span>

        <div className="app__sidebar__categorydiv__list">
          {categories.map((obj, i) => (
            <div key={i}>
              <input type="radio" name="category" value={category} />
              {obj.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;