import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getGateway } from '../utils/api.js';

const Gateway = () => {
  const [gateway, setGateway] = useState({});
  const message = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    async function getAsyncGateway(){
      return await getGateway(id);
    }
    const gatewayObj = getAsyncGateway();
    gatewayObj.then((data) => {
      if(data.gateway !== null){
        message.current.innerHTML = '';
        setGateway(data.gateway);
      }
      else{
        message.current.innerHTML = 'Gateway details cannot be found!!';
      }
    });
  }, []);
  return(
    <div className="App">
      <p ref={message}></p>
      <label>{gateway._id}</label>
      <br />
      <label>{gateway.name}</label>
      <br />
      <label>{gateway._ip_buf !== undefined ? gateway._ip_buf.data.join('.') : ''}</label>
    </div>
  )
}
Gateway.propTypes = {
  id: PropTypes.number
}

export default Gateway;
