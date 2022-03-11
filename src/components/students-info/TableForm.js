import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import LoadingProgress from '../LoadingProgress';

const TableForm = (props) => {
     const { handleSearchField } = props
     const [inputField, setInputField] = useState('');

     useEffect(() => {
          handleSearchField(inputField)
     }, [inputField])

     const store = useSelector((store) => {
          return store
     })

     const handleInputField = (e) => {
          setInputField(e.target.value)
     }

     return (
          <>
               {
                    store.request && (
                         <div style={{ textAlignLast: 'center', color: 'red' }}>
                              <h1>Loading....</h1>
                              <LoadingProgress />
                         </div>
                    )
               }
               <div id='tableFormDiv'>
                    <h1 id='tableFormHeading'>Total students - {props.students}</h1>
                    <div id='tableFormChildDiv'>
                         <TextField
                              sx={{ width: '100%' }}
                              id="outlined-required"
                              label="search by name or email"
                              value={inputField}
                              onChange={handleInputField}
                              placeholder='search by name or email'
                         />
                    </div>
               </div>
          </>
     )
}

export default TableForm;