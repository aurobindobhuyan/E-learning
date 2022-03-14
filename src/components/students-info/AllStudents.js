import React from 'react';
import { useSelector } from 'react-redux'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddStudents from './AddStudents';
import DisplayTable from './DisplayTable';
import CustomizedDialogs from '../NavBar_Components/DisplayDialogue';
import PieChart from './PieChart';
import PieChartTable from './PieChartTable';
import LoadingProgress from '../LoadingProgress';

const AllStudents = () => {
     const store = useSelector((store) => {
          return store
     })

     // Pie Chart Data
     function updatedData() {
          const allPieChartCourses = { HTML: 0, CSS: 0, javascript: 0, reactjs: 0, nodejs: 0, expressjs: 0, mongodb: 0 }
          store.allCourses.forEach(ele => allPieChartCourses[ele.category] = ele.students.length)
          return allPieChartCourses
     }

     return (
          <div className='container'>
               {
                    store.allStudents.length === 0 && store.request ? (
                         <>
                              <div className='loading'>
                                   <h1>Loading....</h1>
                                   <LoadingProgress />
                              </div>
                         </>
                    ) : (
                         <>
                              <div style={{ display: 'flex' }}>
                                   <CustomizedDialogs>
                                        <PersonAddIcon fontSize='large' />
                                        <AddStudents />
                                   </CustomizedDialogs>
                                   <h3>Add a New Student</h3>
                              </div>
                              {
                                   store.allStudents.length > 0 ? (
                                        <>
                                             <DisplayTable />
                                             <h1 style={{ textAlignLast: 'center'}}>
                                                  Courses & Students Distribution
                                             </h1>
                                             <div style={{ display: 'flex', justifyContent: 'space-between'  }}>
                                                  <PieChart data={updatedData()} />
                                                  <PieChartTable data={updatedData()} />
                                             </div>
                                        </>
                                   ) : (
                                        <>
                                             <h1>No students found</h1>
                                             <h2>Add Your first student</h2>
                                        </>
                                   )
                              }
                         </>
                    )
               }
          </div>
     );
}

export default AllStudents;