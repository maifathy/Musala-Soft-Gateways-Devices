import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { appendGateway } from '../redux/gateway/gatewaySlice.js';
import { addGateway } from '../utils/api.js';
import styled from 'styled-components';

const NewGateway = () => {
  const [name, setName] = useState('');
  const [ip, setIP] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const inputIP = useRef(null);
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    return () => {
      // cleanup function will occur when component unmounted.
      isUnmountedRef.current = true;
    } 
  },[]);

  useEffect(() => {
    if(message === '')
      return;
    setTimeout(() => setMessage(''), 7000);
  }, [message]);

  const validateIPaddress = () => {
    const format = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (inputIP.current.value.match(format)) {
      setMessage('');
      return true;
    }
    inputIP.current.focus();
    setMessage('You entered an invalid IP address!!');
    return false;
  };

  const newGateway = useCallback((e) => {
    setMessage('');
    e.preventDefault();
    if (validateIPaddress()) {
      addGateway(name, ip)
        .then((obj) => {
          if (obj.status === 200) {
            dispatch(appendGateway(obj.gateway));
          }
          if(!isUnmountedRef.current) setMessage(obj.message);
        })
        .catch((err) => { setMessage(err.message); });
      if(!isUnmountedRef.current) {
        setName('');
        setIP('');
      }
    }
  }, [name, ip]);

  return (
    <Wrapper>
      <h3>New Gateway</h3>
      <form onSubmit={ newGateway } data-testid="form">
          <Input type='text'  data-testid="name_input" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)}/>
        |
          <Input type='text' data-testid="ip_input" value={ip} placeholder='IP address' ref={inputIP} onChange={(e) => setIP(e.target.value)}/>
        <div>
          <Button type='submit' disabled={name === '' || ip === ''}>Submit</Button>
        </div>
      </form>
      { message && <p data-testid="message">{message}</p> }
    </Wrapper>
  );
};

export default NewGateway;

const Wrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
  box-shadow: 0 0 11px rgb(43 52 58 / 50%)  ; 
  -webkit-box-shadow: 0 0 11px rgb(43 52 58 / 50%)  ; 
  -moz-box-shadow: 0 0 11px rgb(43 52 58 / 50%)  ; 
`;
const Input = styled.input`
  border: 1px solid #a6a6ca;
  border-radius: 2px;
  font-size: 14px;
  color: navy;
  height: 30px;
  :focus {
    outline: none;
    background-color: rgb(215 215 229);
  }
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 5px;
  width: 200px;
  border: 1px solid "#7620ff";
  background-color: "#7620ff";
  outline: none;
  color: "#fff";
  :hover {
    background-color: "#352878";
  }
`;