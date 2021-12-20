import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { appendGateway } from '../redux/gateway/gatewaySlice.js';
import { addGateway } from '../utils/api.js';

const NewGateway = () => {
  const [name, setName] = useState('');
  const [ip, setIP] = useState('');
  const dispatch = useDispatch();
  const message = useRef(null);
  const inputIP = useRef(null);

  const validateIPaddress = () => {
    const format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if(inputIP.current.value.match(format)){
      message.current.innerHTML = '';
      return true;
    }
    inputIP.current.focus();
    message.current.innerHTML = 'You entered an invalid IP address!!';
    return false;
  }

  const newGateway = useCallback((e) => {
    e.preventDefault();
    if(validateIPaddress()){
      addGateway(name, ip)
      .then((obj) => {
        if(obj.status === 200)
          dispatch(appendGateway(obj.gateway));
        message.current.innerHTML = obj.message;
      })
      .catch((err) => message.current.innerHTML = err.message);
      setName('');
      setIP('');
    }
  },[name, ip]);

  return(
    <>
      <h1>New Gateway</h1>
      <p ref={message}></p>
      <form onSubmit={newGateway} className='form'>
        <label>
          <input type='text' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        </label>
        |
        <label>
          <input type='text' value={ip} placeholder='IP address' ref={inputIP} onChange={(e) => setIP(e.target.value)}/>
        </label>
        <div>
          <button type='submit' disabled={name === '' || ip === ''}>Submit</button>
        </div>
      </form>
    </>
  )
}

export default NewGateway;
