import React, {useState} from 'react';
import Header from "./Header";


function App(){
  const [courses, setCourses] = useState([]);

  function handleCourses(event){
    event.preventDefault();
    console.log(event.target.elements.courses.value);
    console.log(event.target.elements.prereqs.value);
    const course = event.target.elements.courses.value;
    const prereq = event.target.elements.prereqs.value;
    setCourses(courses.concat(course,prereq));
    document.getElementById("Course Scheduler").reset();
  }
  return (
    <div className="App">
      <Header />
      <div>
        {courses.map((course) => {
          return <div key={course}>{course}</div>;
        })}
      </div>
      <form id="Course Scheduler" onSubmit={handleCourses}>
        <label>
          Enter Course: 
          <input type="text" name="courses" />
        </label>
        <label>
          Enter PreReqCourses:
          <input type="text" name="prereqs" />
          <input type="button" name="add prereq" onClick={()=>console.log('Add Another Input')}/>
        </label>
        <input type="submit" value="Submit"  />
      </form>      
    </div>
 );
}

export default App;