import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { getGateway } from '../utils/api.js';
import styled from 'styled-components';

const Gateway = () => {
  const [gateway, setGateway] = useState({});
  const [message, setMessage] = useState('');
  const { id } = useParams();

  useEffect(() => {
    if(message === '')
      return;
    setTimeout(() => setMessage(''), 7000);
  }, [message]);

  useEffect(() => {
    async function getAsyncGateway() {
      const val = await getGateway(id);
      return val;
    }
    const gatewayObj = getAsyncGateway();
    gatewayObj.then((data) => {
      if (data.gateway !== null) {
        setMessage('');
        setGateway(data.gateway);
      } else {
        setMessage('Gateway details cannot be found!!');
      }
    });
  }, []);

  return (
    <Wrapper>
      <h3>Gateway <i>{ gateway.name }</i> details:</h3>
      {message && <p>{message}</p>}
      <label>Id: { gateway._id }</label>
      <br />
      <label>IP Address: { gateway._ip_buf !== undefined ? gateway._ip_buf.data.join('.') : '' }</label>
    </Wrapper>
  );
};

Gateway.propTypes = {
  id: PropTypes.number
};

export default Gateway;

const Wrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
  padding: 20px;
  box-shadow: 0 0 11px rgb(43 52 58 / 50%)  ; 
  -webkit-box-shadow: 0 0 11px rgb(43 52 58 / 50%)  ; 
  -moz-box-shadow: 0 0 11px rgb(43 52 58 / 50%)  ; 
`;
