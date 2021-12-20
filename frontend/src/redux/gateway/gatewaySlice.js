import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gateways: []
};
const gatewaysStr = 'gateways';
export const gatewaySlice = createSlice({
  name: 'gateway',
  initialState,
  reducers: {
    setGateways: (state, action) => {
      const updatedState = { ...state };
      updatedState[gatewaysStr] = action.payload;
      return updatedState;
    },
    removeGateway: (state, action) => {
      state.gateways.filter((gateway) => gateway.id !== action.payload);
    },
    appendGateway: (state, action) => {
      state.gateways.push(action.payload);
    },
    removeDevice: (state, action) => {
      state.gateways.filter((gateway) => {
        return gateway.devices.map((device, index) => {
          if (device._id === action.payload) {
            gateway.devices.splice(index, 1);
          }
          return gateway.devices;
        });
      });
    },
    appendDevice: (state, action) => {
      state.gateways.filter((gateway) => {
        if (gateway._id === action.payload.gatewayId) {
          gateway.devices.push(action.payload.device);
        }
        return gateway.devices;
      });
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setGateways, removeGateway, appendGateway, removeDevice, appendDevice
} = gatewaySlice.actions;

export default gatewaySlice.reducer;
