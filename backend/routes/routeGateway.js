import ctrl from '../ctrls/ctrlGateway.js';

export default (router) => {
  /** save a Gateway */
  router
    .route('/Gateways')
    .post(ctrl.addGateway);

  /** get a Gateway */
  router
    .route('/Gateways/:id')
    .get(ctrl.getGateway);

  /** get all Gateways */
  router
    .route('/Gateways')
    .get(ctrl.getGateways);
};
