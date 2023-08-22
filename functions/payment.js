export const handler = function (event, context, callback) {
  const Midtrans = require("midtrans-client");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };

  if (event.body) {
    const snap = new Midtrans.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    const { id, name, email, amount } = JSON.parse(event.body);

    const names = name.split(" ");
    let first_name, last_name;

    if (names && names.length > 1) {
      first_name = names[0];
      last_name = names[1];
    } else if (names.length === 1) {
      first_name = names[0];
      last_name = "";
    }

    const parameters = {
      transaction_details: {
        order_id: `AREONECHA-${id}-${+new Date()}`,
        gross_amount: parseInt(amount),
      },
      customer_details: {
        first_name,
        last_name,
        email,
      },
      credit_card: {
        secure: true,
      },
    };

    snap
      .createTransaction(parameters)
      .then((transaction) => {
        const { token, redirect_url } = transaction;
        console.log(`TOKEN: ${token}`);
        console.log(`REDIRECT_URL: ${redirect_url}`);

        callback(null, {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            url: redirect_url,
            params: parameters,
          }),
        });
      })
      .catch(function (error) {
        console.log(`ERROR: ${error.message}`);
        callback(null, {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: error.message,
          }),
        });
      });
  } else {
    callback(null, {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: 400,
        error: "Must send body",
      }),
    });
  }
};
