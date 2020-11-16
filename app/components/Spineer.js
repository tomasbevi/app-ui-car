import React, { useState, useEffect } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import { useSelector } from 'react-redux'

const SpinnerC = (props) => {

    var spinnerEstado = useSelector(state => state.spinner)

    return(

          <Spinner
            visible={spinnerEstado}
            />
      )

  }
  

  export default SpinnerC