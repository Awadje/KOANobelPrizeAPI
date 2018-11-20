## Assignment

This is a small [Koa](http://koajs.com/)-based REST API that proxies requests
from `localhost:4001/[route]` to `api.nobelprize.org/v1/[route].json` of
[Nobel Prize API](https://nobelprize.readme.io/docs/getting-started). Where
route is one of:

* `country`
* `laureate`
* `prize`

That is where queries can be written like `localhost:4001/laureate?gender=female` and
it will be proxied to `api.nobelprize.org/v1/laureate.json?gender=female`.

Assignment was to write support for a new `country` query string argument to the `laureate` route.

*Note:* this argument is _NOT_ passed through to Nobel Prize API but should be
used to filter laureates with a prize affiliated with a specific country.
