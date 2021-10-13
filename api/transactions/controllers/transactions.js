const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
var moncash = require("nodejs-moncash-sdk");
const axios = require("axios");
moncash.configure({
  mode: "sandbox", //sandbox or live
  client_id: "5ad03fba8fbd6ef1062920377bc495b8",
  client_secret:
    "-FUYsAOe9xwfwfPZz6WIgynNRAFH530HaMJRt_Dws_YO4aa6HbYZUBDb1OJ5RK-I",
});

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */
  async moncash(ctx) {
    let rep = {};
    await axios
      .post(
        "http://5ad03fba8fbd6ef1062920377bc495b8:-FUYsAOe9xwfwfPZz6WIgynNRAFH530HaMJRt_Dws_YO4aa6HbYZUBDb1OJ5RK-I@sandbox.moncashbutton.digicelgroup.com/Api/oauth/token",
        {
          scope: "read,write",
          grant_type: "client_credentials",
        },
        { Headers: { Accept: "application/json" } }
      )
      .then(async (res) => {
        console.log(res.data);
        rep = await res.data;
      })
      .catch(async (error) => {
        console.error(error);
        rep = await error;
      });

    return rep;
    // let entity;
    // if (ctx.is("multipart")) {
    //   const { data, files } = parseMultipartData(ctx);
    //   entity = await strapi.services.transactions.create(data, { files });
    // } else {
    //   entity = await strapi.services.transactions.create(ctx.request.body);
    // }
    // return sanitizeEntity(entity, { model: strapi.models.transactions });
  },
};

const send = (ctx) => {
  let data = ctx;
  var create_payment_json = {
    amount: 10,
    orderId: 321312321321,
  };
  var payment_creator = moncash.payment;
  payment_creator.create(create_payment_json, function (error, payment) {
    if (error) {
      return error;
    } else {
      data.payment = payment_creator.redirect_uri(payment);
      console.log(data.payment);

      return data;
    }
  });
};
