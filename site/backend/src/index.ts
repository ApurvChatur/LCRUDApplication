import http from 'http';

import environmentConnection from './aConnection/aEnvironmentConnection';
import databaseConnection from './aConnection/bDatabaseConnection';
import appConnection from './aConnection/cAppConnection';


// Connect Environment
environmentConnection();

// Connect Database
databaseConnection();

// Connect App
const server = http.createServer(appConnection);

// Connect Server
server.listen(process.env.PORT, () => {
  console.log(`Server is listening on http://localhost:${process.env.PORT} on worker service ${process.pid}`)
})
