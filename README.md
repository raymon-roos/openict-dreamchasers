## 🧑‍🌾 Boeren camping de Groene Weide / Farmer's campsite The Green Meadow

This repository contains the source for the online reservations system we developed for
the "boeren camping"[^boeren_camping] of Farmer Bert.

## Context

As first year's students at Hogeschool Utrecht's OpenICT bachelor programme, we were
tasked with solving various ICT related challenges arising with starting a business such
as a campsite for a fictional customer. Some teams endeavoured to plan and design network
infrastructure, automating camp ground and facility access through badges, or developing
employee management software. We chose to build a website for reservations, and optionally
a dashboard for managing the site's details and visualizing business data.

## Features

A Javascript website with a interactive map where the guest can pick from possible spots
for which they can then book a reservation. The reservation flow features robust
validation and addresses are prefilled automatically based on post code.

On the server side, a Go web API provides the information used on the website and receives
reservations (though this is not quite finished).

[^boeren_camping]:
    Dutch noun: A camping built on a (sometimes) retired farmer's grounds,
    typically themed around farm life.

### Frontend development

Start a web server with the `frontend/pages` as docroot.

### Go development

`go1.23.3` Was used for development. You'll likely also want the official Golang LSP
[GoPLS](https://github.com/golang/tools/tree/master/gopls).

Enter the `api/` directory and run `go run . -serve` to start the API. To automatically
recompile and restart the API you might want to use a tool such as
[air](https://github.com/air-verse/air) (specific to Go) or the general purpose
[entr](https://github.com/eradman/entr).

### Contributors

- [@cedricheijlman](https://github.com/cedricheijlman) (Frontend)
- [@Arminat1998](https://github.com/Arminat1998) (UI, Frontend)
- [@Edwinvelt](https://github.com/Edwinvelt) (API)
- [@isasabic](https://github.com/isasabic) (API)
- [@H2o6s](https://github.com/H2o6s) (API, dashboard prototype)
- [@raymon-roos](https://github.com/raymon-roos) (API, database design)
