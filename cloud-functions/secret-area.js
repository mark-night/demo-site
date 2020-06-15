exports.handler = function (event, context, callback) {
  const responseHTML = `
  <h3>Welcome to the Secret Area.</h3>
    <p>For registered customer only.</p>
  `;

  let body;

  // event.body is the raw data json string sent along via POST/GET
  if (event.body) {
    body = JSON.parse(event.body);
  } else {
    body = {};
  }
  // assuming predefined key is "password", and expecting value of "theCorrectPassword"
  if (body.password == "theCorrectPassword") {
    callback(null, {
      // the response
      statusCode: 200,
      body: responseHTML
    });
  } else {
    callback(null, {
      // forbiden
      statusCode: 401
    });
  }
};
