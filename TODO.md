## TO DO

- ad try catch / error handling !!
- remove if statements
- update README
- convert sequelize models and migrations to ES6
- implement resolver types and uncomment interfaces for Ads and PaymentInfo
- add advanced resolvers to backwards fetch category -> site / ad info
- add category text -> enum mapping

## THOUGHTS

- when an ad is requested it is taken from the ad search table and moved to the ad history table.
  This will keep the number of ads in the client facing table low (quick search).
- Ad frequency calculations - when a campaign is created, times are chosen to show ads and a complete timeframe with total
  available time to show. That number is divided by the amount of ads the customer has paid for (also divided evenly by number of
  categories chosen) and each ad iteration is given a deliveryWindow attribute. When an ad is requested, the server will
  gather all available ads by category, geo, time-of-day, and deliveryWindow. Then an ad will be randomly chosen to show
  and moved to the AdHistory table.
- Client side data gathering - After and ad is requested the client will open a web-socket with the AI engine server.
  All the user's actions will be streamed to the server. When the socket is closed (on window close or timeout set by us),
  the server will compile all of the data into a JSON object and add it to the ad in the AdHistory table.
- Advertiser and Publisher live monitoring - in either dashboard, the customer will be able to view a live feed of ads being
  shown right now. Client will subscribe to the AdHistory table and as ads are added, they will show within the dashboard.
  The view should be an auto-updating grid of 10 or so ads. (Should also have historical views and corresponding data?)
- Live monitoring continued - another screen within the dashboard can view live user actions (design would be look like an
  embedded phone with the current page the user is on and all of their actions will be streamed). Client will open a web-socket
  with the AI engine. As the user actions are streamed to the engine, they will also be routed to the corresponding customer dash.
