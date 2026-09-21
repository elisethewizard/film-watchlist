# 🎞️ Film Watchlist

Film discovery and cataloging site built with React Router and using API of the [Open Movie Database](https://www.omdbapi.com/). Lets users search for films and maintain a watchlist via Web Storage API.

## Tech stack

* **React 19** - UI library
* **React Router** - client-side routes
* **Nitro** - server-side routes
* **TypeScript** - type safety
* **TanStack Query** - state and fetching management
* **Vite** - bundling

## Project structure

```
├── src/
│   ├── pages/
│   │   ├── Layout.tsx                 # Layout - nav & outlet
│   │   ├── Search.tsx                 # Home page
│   │   └── MyWatchlist.tsx            # User's personal watchlist page
│   ├── components/
│   │   ├── Loading.tsx
│   │   ├── Error.tsx
│   │   ├── Nav.tsx
│   │   ├── WatchlistPlaceholder.tsx   # Display if user's watchlist is empty
│   │   ├── SearchPlaceholder.tsx      # Display before user starts search
│   │   ├── Searchbar.tsx              # Searchbar with controlled input
│   │   ├── List.tsx                   # List element, receives ids & fetches films data
│   │   ├── Card.tsx                   # Film's card
│   │   ├── Description.tsx            # Description & toggling readmore
│   │   └── WatchlistButton.tsx        # Add/remove this film from watchlist
│   ├── index.css                      # Styling
│   ├── types.ts                       # TypeScript types definitions
│   ├── main.tsx
│   ├── App.tsx                        # Main app component with routes
│   ├── ContextProviders.tsx           # Providing current watchlist state & reducer 
│   │                                    for managing it
│   └── api.ts                         # Fetch management functions
├── server/api/                        # Server endpoints
│   ├── search/[query].ts              # Fetching a list of film ids by user's search query
│   └── id/[id].ts                     # Fetching a film by id
└── public/                            # Image assets
```

## Screenshots

![Screenshot of home page. It shows header with navigation and a searchbar at the top of the page.](/public/screenshots/screenshot-1.png)

![Screenshot of home page with a list of films.](/public/screenshots/screenshot-2.png)

![Screenshot of watchlist page with a list of user's watched films.](/public/screenshots/screenshot-3.png)