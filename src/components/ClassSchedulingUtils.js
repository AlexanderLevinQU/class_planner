
export function CreateCourseGraph(courseList){
  const courseGraph = {}
  for(let i=0; i < courseList.length; i++){
    if(!(courseList[i]['course'] in courseGraph)){
      const newPreReqSet = new Set();
      for(const index in courseList[i]['prereq']){
        newPreReqSet.add(courseList[i]['prereq'][index]);
      }
      courseGraph[courseList[i]['course']] = newPreReqSet;
    }
  }
  return courseGraph;
}

export function TopologicalSort(v,visited,graph, stack) {
  visited[v] = true;
  for(const i of graph[v]){
    console.log(i);
    if(visited[i] === false){  
      TopologicalSort(i,visited,graph, stack);
    }
  }
  stack.push(v);
}

export function CheckIfGraphCyclical(course,courseGraph,visited,path){
  if (path[course]){
    return false;
  }
  if (visited[course]){
    return true;
  }
  visited[course] = true;
  let ret = false;
  for (const nextCourse of courseGraph[course]){
    ret = CheckIfGraphCyclical(nextCourse, courseGraph, visited, path);
    if (ret) break;
  }
  visited[course] = false;
  path[course] = true;
  return ret;
}

export function GetDistinctCourses(courseGraph){
  const distinctCourses = new Set();
  for(const course in courseGraph){
    distinctCourses.add(course);
    courseGraph[course].forEach(course => {
      distinctCourses.add(course);
    });
  }
  return distinctCourses;
}