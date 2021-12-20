import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { appendDevice, removeDevice } from '../redux/gateway/gatewaySlice.js';
import { addDevice, deleteDevice } from '../utils/api.js';

const Devices = (props) => {
  const [vendor, setVendor] = useState('');
  const [status, setStatus] = useState('');
  const dispatch = useDispatch();
  const message = useRef(null);
  const devices = useSelector((state) => {
    var gateway = state.gateway.gateways.filter(function (item) {
      return item._id === props.gatewayId;
    });

    return gateway[0].devices;
  });

  const delDevice = (id) => {
    deleteDevice(id)
    .then((data) => {
      if(data.status === 200)
        dispatch(removeDevice(id));
      message.current.innerHTML = data.message;
    })
    .catch((err) => message.current.innerHTML = err.message);
  }

  const newDevice = useCallback((e) => {
    e.preventDefault();
    addDevice(vendor, status, props.gatewayId)
    .then((device) => {
      if(device.status === 200)
        dispatch(appendDevice({ device: device.device, gatewayId: props.gatewayId }));
      message.current.innerHTML = device.message;
    })
    .catch((err) => message.current.innerHTML = err.message);
    setVendor('');
    setStatus('');
  },[vendor, status, props.gatewayId]);

  return(
    <>
      <p ref={message}></p>
      <ul>
        {devices.map((device) =>
          <li key={device._id}>
            <div>
              <label>{device.vendor}</label> |
              <label>{device.status}</label> |
              <input type='button' onClick={() => delDevice(device._id)} value='Remove'/>
            </div>
          </li>
        )}
      </ul>
      {devices.length < 10 &&
        <form onSubmit={newDevice} className='form'>
          <label>
            <input type='text' value={vendor} placeholder='Vendor' onChange={(e) => setVendor(e.target.value)}/>
          </label>
          |
          <label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value=''>Status</option>
              <option value='Online'>Online</option>
              <option value='Offline'>Offline</option>
            </select>
          </label>
          <div>
            <button type='submit' disabled={vendor === '' || status === ''}>Submit</button>
          </div>
        </form>
      }
      </>
  )
}
Devices.propTypes = {
  gatewayId: PropTypes.number
}

export default Devices;
