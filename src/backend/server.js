const app = require("./app");

const port =
  parseInt(process.env.PORT, 10) || parseInt(process.env.API_PORT, 10);

app.listen(port, () => {
  console.log(`Backend api available at ${process.env.API_PATH}`);
  console.log(`Server running  at ${port}`);
});
