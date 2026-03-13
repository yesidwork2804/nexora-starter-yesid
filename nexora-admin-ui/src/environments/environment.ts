const baseUrl = 'https://konggateway.nexora.com/nexora/';
export const environment = {
  production: false,
  appName: 'Nexora Admin',
  version: '2.3.1',
  featureFlags: {
    enableBetaReports: true,
    enableBulkOperations: false,
    enableRealTimeSync: true,
  },
  apiProducts: `${baseUrl}/products-api`,
  apiInventory: `${baseUrl}/inventory-api`,
  apiOrders: `${baseUrl}/orders-api`,
  apiCustomers: `${baseUrl}/customers-api`,
  apiReports: `${baseUrl}/reports-api`,
};
// NOTA: Las URLs de la API están configuradas directamente en cada servicio.
