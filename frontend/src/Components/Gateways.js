import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGateways } from '../redux/gateway/gatewaySlice.js';
import { Link } from 'react-router-dom';
import { getGateways } from '../utils/api.js';
import Devices from './Devices.js';
import NewGateway from './NewGateway.js';

const Gateways = () => {
  const [ids, setIds] = useState([0]);
  const dispatch = useDispatch();
  const gateways = useSelector((state) => state.gateway.gateways);
  const message = useRef(null);

  useEffect(() => {
    async function getAsyncGateways(){
      return await getGateways();
    }
    const gatewaysObj = getAsyncGateways();
    gatewaysObj.then((data) => {
      if(data.gateways.length > 0){
        dispatch(setGateways(data.gateways));
        message.current.innerHTML = '';
      }
      else{
        message.current.innerHTML = 'No Gateways to show!!';
      }
    });
  }, []);

  const showDevices = useCallback((id) => {
    setIds([...ids, id]);
    console.log([...ids, id]);
  },[gateways]);

  return(
    <div className="App">
      <p ref={message}></p>
      <ol>
        {gateways !== undefined && gateways.map((gateway) =>
          <li key={gateway._id}>
            <Link to={`${gateway._id}`}>{gateway.name}</Link>
            <span> </span>
            <a onClick={() => showDevices(gateway._id)} style={{cursor: 'pointer', color: 'green'}}>Devices &gt;&gt;</a>
            { ids !== [] && ids.indexOf(gateway._id) > 0 && <Devices gatewayId={gateway._id} /> }
          </li>
        )}
      </ol>
      <NewGateway />
    </div>
  )
}

export default Gateways;
