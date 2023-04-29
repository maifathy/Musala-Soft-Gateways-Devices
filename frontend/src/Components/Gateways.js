import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGateways } from '../redux/gateway/gatewaySlice.js';
import { Link } from 'react-router-dom';
import { getGateways } from '../utils/api.js';
import Devices from './Devices.js';
import NewGateway from './NewGateway.js';
import styled from 'styled-components';

const Gateways = () => {
  const [ids, setIds] = useState([0]);
  const dispatch = useDispatch();
  const gateways = useSelector((state) => state.gateway.gateways);
  const message = useRef(null);

  useEffect(() => {
    async function getAsyncGateways() {
      const val = await getGateways();
      return val;
    }
    const gatewaysObj = getAsyncGateways();
    gatewaysObj.then((data) => {
      if (data.gateways.length > 0) {
        dispatch(setGateways(data.gateways));
        message.current.innerHTML = '';
      } else {
        message.current.innerHTML = 'No Gateways to show!!';
      }
    });
  }, []);

  const showDevices = (id) => {
    if(ids.indexOf(id) > 0){
      const newIds = ids.filter(currentId => { return currentId !== id; });
      console.log("ids: ", newIds);
      setIds(newIds);
    }
    else setIds([...ids, id]);
  };

  return (
    <div className='App'>
      <NewGateway />
      <div style={{ width: '100%' }}>
        <p ref={ message }></p>
        <ol style={{ width: '80%'}}>
          {
            gateways !== undefined && gateways.map(
              (gateway) => <ListItem key={ gateway._id }>
                <Link style={{ float: 'left' }} to={`/gateways/${ gateway._id }`}>{ gateway.name }</Link>
                <span> </span>
                <a onClick={() => showDevices(gateway._id)} style={{ cursor: 'pointer', color: 'green' }}>Devices &gt;&gt;</a>
                {
                  ids !== [] && ids.indexOf(gateway._id) > 0
                  && <Devices gatewayId={ gateway._id } />
                }
              </ListItem>
            )
          }
        </ol>
      </div>
    </div>

  );
};

export default Gateways;

const ListItem = styled.li`
  background-color: #fff;
  margin-bottom: 6px;
  padding: 5px;
`;