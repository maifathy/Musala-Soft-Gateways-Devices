import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  gateways:  []
};

export const gateway = createSlice({
  name: 'gateway',
  initialState,
  reducers: {
    setGateways: (state, action) => {
      const updatedState = { ...state };
      updatedState['gateways'] = action.payload;
      return updatedState;
    },
    removeGateway: (state, action) => {
      state.gateways = state.gateways.filter((gateway) => gateway.id !== action.payload);
    },
    appendGateway: (state, action) => {
      state.gateways.push(action.payload);
    },
    removeDevice: (state, action) => {
      state.gateways.filter((gateway) => {
        gateway.devices.map((device, index) => {
          if(device._id === action.payload){
            gateway.devices.splice(index, 1);
          }
        });
      });
    },
    appendDevice: (state, action) => {
      state.gateways.filter((gateway) => {
        if(gateway._id === action.payload.gatewayId){
          gateway.devices.push(action.payload.device);
        }
      });
    },
  },
})

// Action creators are generated for each case reducer function
export const { setGateways, removeGateway, appendGateway, removeDevice, appendDevice } = gateway.actions;

export default gateway.reducer;
