import React, { useState, useEffect } from 'react';
import SearchIcon from '../assets/images/search.svg';
import { apiCategories } from './constants';
// import { getCategories } from '../actions/courses';

function Sidebar() {
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('');

	useEffect(() => {
		// getCategories();
		const newCategories =
			apiCategories && apiCategories.payload ? JSON.parse(apiCategories.payload) : [];
		setCategories(['All', ...newCategories]);
		setCategory('All');
	}, []);

	const handleSearchChange = (e) => {
		const { value } = e.target;

		setSearch(value);
	};
	const handleCategoryChange = (e) => {
		const { value } = e.target;
		setCategory(value);
	};

	return (
		<div className="app__sidebar">
			<div className="app__sidebar__searchdiv">
				<span className="app__sidebar__searchdiv__title">Search for keywords</span>
				<div className="app__sidebar__searchdiv__search">
					<img src={SearchIcon} alt="search" className="app__sidebar__searchdiv__search__icon" />
					<input
						className="app__sidebar__searchdiv__search__input"
						type="text"
						onChange={handleSearchChange}
						value={search}
						placeholder="Filter courses"
					/>
				</div>
			</div>
			<div className="app__sidebar__categorydiv">
				<span className="app__sidebar__categorydiv__title">Category</span>

				<div className="app__sidebar__categorydiv__list">
					{categories.map((value, i) => (
						<div key={Math.random()} className="app__sidebar__categorydiv__list__item">
							<input
								type="radio"
								name="category"
								value={value}
								onChange={handleCategoryChange}
								checked={category === value}
								id={`cateory${i}`}
								className="app__sidebar__categorydiv__list__item__input"
							/>
							<label
								htmlFor={`cateory${i}`}
								className="app__sidebar__categorydiv__list__item__label"
							>
								{value}
							</label>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
