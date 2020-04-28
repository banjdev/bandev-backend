"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");
var crypto = require("crypto");

const secret = "l5JmP+G0/1zB%;r8B8?2?2pcqGcL^3banjdev2019#";
function encrypt(text) {
  let hash = crypto.createHmac("sha256", secret).update(text).digest("hex");
  return hash;
}

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    let entity;

    ctx.request.body.password = encrypt(ctx.request.body.password + "");

    console.log(ctx.request.body);

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.contractants.create(data, { files });
    } else {
      entity = await strapi.services.contractants.create(ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.contractants });
  },

  async find(ctx) {
    let entities;
    if (ctx.query.password_eq) {
      ctx.query.password_eq = encrypt(ctx.query.password_eq + "");
      //console.log(ctx.query);
    }

    if (ctx.query._q) {
      entities = await strapi.services.contractants.search(ctx.query);
    } else {
      entities = await strapi.services.contractants.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.contractants })
    );
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.request.body.password) {
      ctx.request.body.password = encrypt(ctx.request.body.password + "");
      //console.log(ctx.query);
    }
    console.log(ctx.request.body);

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.contractants.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.contractants.update(
        { id },
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.contractants });
  },
};
