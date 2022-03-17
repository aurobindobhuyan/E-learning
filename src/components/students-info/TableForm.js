import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import LoadingProgress from '../LoadingProgress';

const TableForm = (props) => {
     const { handleSearchField } = props
     const [inputField, setInputField] = useState('');

     const store = useSelector((store) => {
          return store
     })

     useEffect(() => {
          handleSearchField(inputField)
     }, [inputField])

     const handleInputField = (e) => {
          setInputField(e.target.value)
     }

     return (
          <>
               {
                    store.request && (
                         <LoadingProgress>
                              <h1>Loading...</h1>
                         </LoadingProgress>
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