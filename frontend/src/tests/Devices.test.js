/* eslint-disable no-undef */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render as renderLibrary, fireEvent, screen, cleanup } from '@testing-library/react';
import { waitFor } from "@testing-library/dom";
import { store } from '../app/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import history from '../utils/history.js';
import { addDevice, addGateway, getGateway, clearCollections } from '../utils/api.js';
import Devices from '../Components/Devices.js';
import { appendGateway } from '../redux/gateway/gatewaySlice.js';

Enzyme.configure({ adapter: new Adapter() })

it('Devices Snapshot - renders correctly enzyme', () => {
    const wrapper = mount(<Provider store={store}>  <BrowserRouter history={history} location={history.location} navigator={history}> <Devices gatewayId={0}/> </BrowserRouter> </Provider>);

    expect(toJson(wrapper)).toMatchSnapshot();
});

beforeEach(() => { jest.setTimeout(80000) });
afterEach(() => { 
  clearCollections().then(() => {
    mongoose.connection.close();
    cleanup(); 
  });
});

// Delete existing Device
it('Delete existing Device!', async () => {
  // insert default Gateway
  let gatewayId = 0;
  let deviceId = "";
  await addGateway("Gateway2", "127.0.0.10")
    .then((response) => {
      if(response.status === 400)
        return;
      gatewayId = response.gateway._id;
  });
  
  await addDevice("Device2", "Offline", gatewayId)
  .then((response) => {
    if(response.status === 400)
      return;
    deviceId = response.device._id;
  });

  await getGateway(gatewayId)
  .then(async(response) => {
    if(response === 404)
      return;
    store.dispatch(appendGateway(response.gateway));
  })
  .catch((error) => {
    console.log("getGateway Error: ", error);
  });
  const { getByTestId } = renderLibrary(<Provider store={store}>  <BrowserRouter history={history} location={history.location} navigator={history}> <Devices gatewayId={gatewayId}/> </BrowserRouter> </Provider>);
  
  fireEvent.click(getByTestId('button_del_' + deviceId));
  await waitFor(() =>
    expect(screen.queryAllByTestId(`button_del_${deviceId}`).length).toEqual(1),
    //expect(getByTestId('message')).toHaveTextContent('Device is successfully removed')
  );
});

// Add New Device
it('Add New Device!', async () => {
    // insert default Gateway
    let gatewayId = 0;
    await addGateway("Default Gateway", "127.0.0.1")
    .then((response) => {
      if(response.status === 400)
        return;
      gatewayId = response.gateway._id;
    })
    const { getByText, getByTestId } = renderLibrary(<Provider store={store}>  <BrowserRouter history={history} location={history.location} navigator={history}> <Devices gatewayId={gatewayId}/> </BrowserRouter> </Provider>);

    expect(getByText('Submit')).toBeDisabled();

    fireEvent.change(getByTestId('vendor_input'), { target: { value: 'Device1'}});
    fireEvent.change(getByTestId('status_select'), { target: { value: 'Online'}});

    expect(getByText('Submit')).not.toBeDisabled();

    fireEvent.click(getByText('Submit')); // alternative Submit
    await waitFor(() =>
      //expect(getByTestId('message')).toHaveTextContent('Device is successfully added'),
      expect(getByTestId('vendor_input')).toBeEmptyDOMElement(),
      expect(getByTestId('status_select')).toHaveTextContent("Status")
    );
});