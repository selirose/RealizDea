const axios = require('axios'); // Import axios
const https = require('https'); // Import https

// async function httpGet() {
//   try {
//     // Make a agent to skip the SSL certificate
//     const agent = new https.Agent({
//       rejectUnauthorized: false
//     });
//
//     // Get supplier info from another service
//     let getHTTPAPI = {
//       method: 'get',
//       url: `http://localhost:3000`,
//       httpsAgent: agent
//     };
//
//     // Get response from getSupplierAPI
//     let responseHTTP = await axios(getHTTPAPI);
//
//     // Get supplier data from the response
//     let getHTTP = responseHTTP.data;
//
//     console.log(getHTTP);
//   } catch (err) {
//     console.log(err);
//   }
// }

async function httpsGet() {
  try {
    // Make a agent to skip the SSL certificate
    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJmdWxsbmFtZSI6IlRvbW15IEFzbmkiLCJpZF9yb2xlIjoyfSwiaWF0IjoxNjEwMzcxODc1fQ.72WJi4DJnWBBmapnqE1Jo--GkP_eMj8aE9IfHOr7nu0"

    // Get supplier info from another service
    let getHTTPSAPI = {
      method: 'get',
      url: `https://localhost:3001/user/profile`,
      headers: { Authorization: `Bearer ${token}`},
      httpsAgent: agent
    };

    // Get response from getSupplierAPI
    let responseHTTPS = await axios(getHTTPSAPI);

    // Get supplier data from the response
    let getHTTPS = responseHTTPS.data;

    console.log(getHTTPS);
  } catch (e) {
    console.log(e.message);
  }
}

httpsGet();
