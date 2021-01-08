// const GhostAdminAPI = require('@tryghost/admin-api');

// const api = new GhostAdminAPI({
//   url: 'http://ghost.moonmeister.net',
//   version: "v3",
//   key: '5fed00d4230d4400012c4f92:a0c4409618a0c7a56dfb3d58dc9c0a2f62aae765002282d1e0579f08019c8642'
// });
// debugger;
// console.log(api)

(
  async function () {
    const { default: SignJWT } = require('jose/jwt/sign')
    const secretKey = Buffer.from('a0c4409618a0c7a56dfb3d58dc9c0a2f62aae765002282d1e0579f08019c8642', 'hex')
    try {

      const jwt = await new SignJWT({})
        .setProtectedHeader({ alg: 'HS256', kid: "5fed00d4230d4400012c4f92", typ: "JWT" })
        .setIssuedAt()
        .setAudience("/v3/admin/")
        .setExpirationTime('5m')
        .sign(secretKey)

      console.log(jwt);
    } catch (e) {
      console.log(e)
    }
  }

)();

/*
  Ghost has an undocumented "/actions" api that can be filtered by date.
  this is all that's needed to create a incremental data fetching in Gatsby source plugin.

  filtering all works.
*/