import React, { useState } from 'react';
import Sidebar from './containers/Sidebar';
import CourseList from './containers/CourseList';

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filterProps = { search, category, setSearch, setCategory };
  return (
    <div className="app">
      <Sidebar {...filterProps} />
      <CourseList {...filterProps} />
    </div>
  );
}

export default App;
