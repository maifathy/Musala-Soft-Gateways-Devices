import ctrl from '../ctrls/ctrlDevice.js';

export default (router) => {
  /** save a Device */
  router
    .route('/Devices')
    .post(ctrl.addDevice);

  /** delete a Device */
  router
    .route('/Devices/:id')
    .delete(ctrl.deleteDevice);
};
