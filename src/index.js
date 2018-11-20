'use strict';
const querystring = require('querystring');

const Koa     = require('koa');
const request = require('request-promise-native');

const PORT    = 4001;
const API_URL = 'http://api.nobelprize.org/v1/';

const app = new Koa();

async function logMethod(ctx, next) {
  const start = Date.now();

  await next();

  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
}

async function checkForCountry(ctx) {
  const parsedQuery = querystring.parse(ctx.querystring);

  if (parsedQuery.country !== undefined) {
    const country = parsedQuery.country;
    ctx.querystring = '?';
    ctx.body = await countryFilter(country, await apiRequest(ctx));
  }
  else {
    ctx.body = await apiRequest(ctx);
  }
}

app.use(checkForCountry);
app.use(logMethod);

async function countryFilter(country, result) {
  const countryFilter = result.laureates
    .filter(x => x.prizes
      .some(z => z.affiliations
        .some(z => [country].includes(z.country))));
  return countryFilter;
}

async function apiRequest(ctx) {
  const path = `${ctx.path.slice(1)}.json`;
  const url = `${API_URL}${path}?${ctx.querystring}`;
  const result = await request(url);
  const parsed = JSON.parse(result);

  return parsed;
}

app.listen(PORT);

console.log(`Listening on http://localhost:${PORT}`);
