const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
const sgMail = require("@sendgrid/mail");
module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.email.create(data, { files });
    } else {
      sgMail.setApiKey(
        "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"
      );
      sgMail.send(ctx.request.body).then(
        () => {
          console.log(ctx.request.body);
        },
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );
      entity = await strapi.services.email.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.email });
  },
};
