/* eslint-disable no-undef */
import React from 'react';
import Enzyme,{ mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render as renderLibrary, fireEvent, cleanup, act } from '@testing-library/react';
import { waitFor } from "@testing-library/dom";
import { store } from '../app/store.js';
import { initialState } from '../redux/gateway/gatewaySlice.js';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import history from '../utils/history.js';
import NewGateway from '../Components/NewGateway.js';
import { clearCollections } from '../utils/api.js';

Enzyme.configure({ adapter: new Adapter() })

it('New Category Snapshot - renders correctly enzyme', () => {
  const wrapper = mount(<Provider store={store}>  <BrowserRouter history={history} location={history.location} navigator={history}> <NewGateway /> </BrowserRouter> </Provider>);

  expect(toJson(wrapper)).toMatchSnapshot();
});

describe('Testing state, first load', () => {
  it('should return the initial state', () => {
    expect(initialState)
    .toEqual({ gateways: [] })
  })
});

afterEach(() => { 
  cleanup(); 
  clearCollections().then(() => {
    mongoose.connection.close();
  });
});

// Invalid IP address!!
it('Invalid IP address!!', async () => {
  const { getByText, getByTestId } = renderLibrary(<Provider store={store}>  <BrowserRouter history={history} location={history.location} navigator={history}> <NewGateway /> </BrowserRouter> </Provider>);

  expect(getByText('Submit')).toBeDisabled();

  fireEvent.change(getByTestId('name_input'), { target: { value: 'any name'}});
  fireEvent.change(getByTestId('ip_input'), { target: { value: 'abc'}});

  expect(getByText('Submit')).not.toBeDisabled();

  fireEvent.submit(getByTestId("form")); 
  //fireEvent.click(getByText('Submit')); // alternative Submit

  await waitFor(() =>
    expect(getByTestId('message')).toHaveTextContent('You entered an invalid IP address!!')
  );
});

// Valid Gateway details!!
it('Valid Gateway details!!', async () => {
  const { getByText, getByTestId } = renderLibrary(<Provider store={store}>  <BrowserRouter history={history} location={history.location} navigator={history}> <NewGateway /> </BrowserRouter> </Provider>);

  expect(getByText('Submit')).toBeDisabled();

  fireEvent.change(getByTestId('name_input'), { target: { value: 'Gateway1'}});
  fireEvent.change(getByTestId('ip_input'), { target: { value: '127.0.0.1'}});

  expect(getByText('Submit')).not.toBeDisabled();

  act(() => {
    fireEvent.submit(getByTestId("form")); 
    //fireEvent.click(getByText('Submit')); // alternative Submit

    waitFor(() =>
      expect(getByTestId('message')).toHaveTextContent('Gateway is successfully added'),
      expect(getByTestId('name_input')).toBeEmptyDOMElement(),
      expect(getByTestId('ip_input')).toBeEmptyDOMElement()
    ); 
  })
});

