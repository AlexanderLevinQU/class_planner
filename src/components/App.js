import React, {useState} from 'react';
import Header from "./Header";
import formStyle from "./components-styles/courseform.css"

function App(){
  const [courses, setCourses] = useState([]);
  const [preReqList, setPreReqList] = useState([]);

  function handleCourses(event){
    event.preventDefault();
    // Check if array for prereqs
    let prereq;
    if(event.target.elements.prereqs?.length){
      prereq = []
      event.target.elements.prereqs.forEach(element => {
        prereq.push(element.value);
      })
    }else if(event.target.elements.prereqs?.value) {
      prereq = event.target.elements.prereqs.value;
    } else { 
      prereq=''
    }
    console.log(prereq);
    const course = event.target.elements.courses.value;
    setCourses(courses.concat({course: course ,prereq: prereq}));
    document.getElementById("Course Scheduler").reset();
  }

  function addInput(event){
    event.preventDefault();
    setPreReqList([...preReqList, " "]);
  }

  function removeInput(event){
    event.preventDefault();
    const list = [...preReqList];
    list.splice(preReqList.length-1, 1);
    setPreReqList(list);
  }

  return (
    <div className="App">
      <Header />
      <div>
        {courses.map((course,index) => {
          return <div 
            key={index}>
              Course: {course['course']}
              {'            '}
              PreReqs: {course['prereq']}
          </div>;
        })}
      </div>
      <form 
        style={formStyle}
        className="container"
        id="Course Scheduler" 
        onSubmit={handleCourses}>
        <div 
        style={formStyle}
        className="buttonContainer">  
          <input type="button" name="addprereqs" value='Add Prereq' onClick={addInput}/>
          <input type="button" name="removeprereq" value='Remove Prereq' onClick={removeInput}/>
          <input type="submit" value="Submit"  />
        </div>
        <label
        style={formStyle}
        className="courseContainer">
          Enter Course:{' '}
          <input type="text" name="courses" />
        </label>
        {preReqList.map((prereqs,index) => {
          return <label key={index}
          style={formStyle}
          className="preReqContainer">
            Prereq:{' '}
            <input type="text" name="prereqs" />
        </label>
        })}
      </form>      
    </div>
 );
}

export default App;