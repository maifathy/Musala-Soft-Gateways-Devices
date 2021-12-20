import { getData, deleteData, postData, api } from './helpers.js';

// shop requests
export function getGateways(){
  return getData(`${api}/Gateways`)
    .then(gateways => ({ gateways }));
}

export function getGateway(id){
  return getData(`${api}/Gateways/${id}`)
    .then(gateway => ({ gateway }));
}

export function addGateway(name, ip){
  return postData(`${api}/Gateways/`,
     {
       name: name,
       ip: ip
     })
  .then(newGateway => newGateway);
}

export function addDevice(vendor, status, gatewayId){
  return postData(`${api}/Devices/`,
     {
       vendor: vendor,
       status: status,
       gatewayId: gatewayId
     })
  .then(newDevice => newDevice);
}

export function deleteDevice(deviceId){
  return deleteData(`${api}/Devices/${deviceId}`);
}
