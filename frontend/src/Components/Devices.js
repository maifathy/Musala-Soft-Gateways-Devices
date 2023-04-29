import React, { useState, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { appendDevice, removeDevice } from '../redux/gateway/gatewaySlice.js';
import { addDevice, deleteDevice } from '../utils/api.js';
import styled from 'styled-components';

const Devices = (props) => {
  const [vendor, setVendor] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const devices = useSelector((state) => {
    var gateway = state.gateway.gateways.filter((item) => {
      return item._id === props.gatewayId;
    });
    return gateway[0] ? gateway[0].devices : [];
  });
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
    let timerId = setTimeout(() => setMessage(''), 7000);
    // cleanup the timer when component unmout
    return () => clearTimeout(timerId);
  }, [message]);

  const delDevice = (e, id) => {
    //setMessage('');
    e.preventDefault();
    deleteDevice(id)
      .then((data) => {
        if (data.status === 200) {
          dispatch(removeDevice(id));
        }
        if(!isUnmountedRef.current) setMessage(data.message);
      })
      .catch((err) => { if(!isUnmountedRef.current) setMessage(err.message); });
  };

  const newDevice = useCallback((e) => {
    //setMessage('');
    e.preventDefault();
    addDevice(vendor, status, props.gatewayId)
      .then((device) => {
        if (device.status === 200) {
          dispatch(appendDevice({ device: device.device, gatewayId: props.gatewayId }));
          if(!isUnmountedRef.current) {
            setMessage(device.message);
            setVendor('');
            setStatus('');
          }
        }
      })
      .catch((err) => { if(!isUnmountedRef.current) setMessage(err.message); });
  }, [vendor, status, props.gatewayId]);

  return (
    <>
      {message && <p data-testid="message">{message}</p>}
      <ul>
        {devices.map(
          (device) => <ListItem key={device._id}>
            <div>
              <label>{device.vendor}</label> |
              <label>{device.status}</label> |
              <Button data-testid={`button_del_${device._id}`} type='button' style={{ width: '100px', marginLeft: '10px' }} onClick={(e) => delDevice(e, device._id)}>Remove</Button>
            </div>
          </ListItem>
        )
      }
      </ul>
      {devices.length < 10
        && <form onSubmit={newDevice} className='form' data-testid="form">
          <Input data-testid="vendor_input" type='text' value={vendor} placeholder='Vendor' onChange={(e) => setVendor(e.target.value)}/>
          <Select data-testid="status_select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value=''>Status</option>
            <option value='Online'>Online</option>
            <option value='Offline'>Offline</option>
          </Select>
          <div>
            <Button data-testid="submit" type='submit' disabled={vendor === '' || status === ''}>Submit</Button>
          </div>
        </form>
      }
      </>
  );
};
Devices.propTypes = {
  gatewayId: PropTypes.number
};

export default Devices;

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

const Select = styled.select`
  border: 1px solid #a6a6ca;
  border-radius: 2px;
  font-size: 14px;
  height: 34px;
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

const ListItem = styled.li`
  background-color: aliceblue;
  margin: 3px;
  padding: 5px;
  list-style-type: square;
`;