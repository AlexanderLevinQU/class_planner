import React, {useState} from 'react';
import Header from "./Header";
import formStyle from "./components-styles/courseform.css"
import listStyle from "./components-styles/liststyle.css"
import appStyles from "./components-styles/appStyles.css"
import {TopologicalSort, CreateCourseGraph, CheckIfGraphCyclical, GetDistinctCourses} from "./ClassSchedulingUtils"

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
      prereq = [event.target.elements.prereqs.value];
    } else { 
      prereq=''
    }
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

  function createClassSchedule(event){
    event.preventDefault();
    const courseGraph = CreateCourseGraph(courses);
    const distinctCourses = GetDistinctCourses(courseGraph);
    const visited = {};
    const path = {};
    distinctCourses.forEach(value=>{
      visited[value] = false;
      path[value] = false;
      if (!(value in courseGraph)){
        courseGraph[value] = new Set();
      }
    });
    let check = false;
    for(const course in courseGraph){
      if(CheckIfGraphCyclical(course,courseGraph,visited,path)){
        check = true;
        break;
      }
    }
    if(check){
      console.log('Class Schedule is impossible to take');
    }else{
      distinctCourses.forEach(value=>{
        visited[value] = false;
      });
      const stack = []
      for(const course of distinctCourses){
        if(visited[course] === false){
          TopologicalSort(course,visited,courseGraph,stack);
        }
      }
      console.log(stack);
    }
  }

  return (
    <div className="App">
      <Header />
      <div style={appStyles}
      className="appContainer">
        <div 
            style={listStyle}
            className="listContainer">
            <div>
              <button onClick={createClassSchedule}>Create Course Schedule</button>
            </div>
              {courses.map((course,index) => {
                return <div 
                  key={index}>
                    Course: {course['course']}
                    {' '}
                    PreReqs: {course['prereq']}
                </div>;
              })}
        </div>
        <div 
          style={appStyles}
          className="appFormContainer">
          <form 
            style={formStyle}
            className="container"
            id="Course Scheduler" 
            onSubmit={handleCourses}>
            <div 
            style={formStyle}
            className="buttonCourseAndPreReqContainer">  
              <input type="button" name="addprereqs" value='Add Prereq' onClick={addInput}/>
              <input type="button" name="removeprereq" value='Remove Prereq' onClick={removeInput}/>
              <input type="submit" value="Submit"  />
            </div>
            <label
            style={formStyle}
            className="buttonCourseAndPreReqContainer">
              Enter Course:{' '}
              <input type="text" name="courses" />
            </label>
            {preReqList.map((prereqs,index) => {
              return <label key={index}
              style={formStyle}
              className="buttonCourseAndPreReqContainer">
                Prereq:{' '}
                <input type="text" name="prereqs" />
            </label>
            })}
          </form>      
        </div>
      </div>
    </div>
 );
}

export default App;