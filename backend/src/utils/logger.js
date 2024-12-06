const prettyListRoutes = (endpoints) => {
  // const endpoints = listEndpoints(app);

  const routesTable = endpoints.map((route) => ({
    Path: route.path,
    Methods: route.methods.join(', '),
  }));

  console.table(routesTable);
};

module.exports = {
  prettyListRoutes
}