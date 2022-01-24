import React from 'react';
import Sidebar from './containers/Sidebar';
import CourseList from './containers/CourseList';

const App = () => {
  return (
    <div className="app">
      <Sidebar />
      <CourseList />
    </div>
  );
};

export default App;
