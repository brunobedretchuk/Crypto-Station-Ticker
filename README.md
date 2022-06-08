```
- Firebase deploy: https://dev-inventory-cdbd9.web.app/
```
## Vue 3 + Vite
### Recommended IDE Setup
- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
# Front-end-test-dacxi

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

## Further Description

### Packages installed for the project
```
├── @vitejs/plugin-vue@2.3.3
├── autoprefixer@10.4.7
├── vite@2.9.9
```
```
├── axios@0.27.2
- Promise based HTTP client for the browser and node.js
```
```
├── cypress@10.0.3
- Fast, easy and reliable testing for anything that runs in a browser / e2e testing
```
```
├── gsap@3.10.4
- JavaScript toolset for making animations
```
```
├── postcss@8.4.14
├── tailwindcss@3.0.24
- A utility-first CSS framework for rapidly building custom user interfaces.
```
```
├── vee-validate@4.5.11
- Form validation library for Vue.js that allows you to validate inputs and build better form UIs in a familiar declarative style or using composition functions
```

```
├── vue-router@4.0.15
- Used to enable the creation of a SPA. Adding Vue Router maps our components to the routes so it knows where to render them. 
```
```
├── vue@3.2.36
```
```
└── vuex@4.0.2
- state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.
```

### Description

This application provides, through the [Coingecko API](https://www.coingecko.com/en/api/documentation), provides a friendly interface to keep track of cryptocurrencies' current price. It also allows the user to get the historical price from any specified date.
The application, by default, has a little group of tabs, which give fast access to a specific array of cryptocurrencies: [Bitcoin , Ethereum , Dacxi , Luna , Atom ]
Though, it would be easy to dynamically change these to any other cryptos available in the API
The application also allows the user, via form submission, to search for coins by ID, loading a new page with all uses previously mentioned.

### How it works

First, it is important to say that the code is thoroughly commented, so anyone interested should be able to understand how the code works.

Basically, when we load a page inside the dashboard, for example:
'/dashboard/bitcoin'
the app will use the parameters from the url, in this case 'bitcoin'. These parameters should always refer to a cryptocurrency's ID in the coingecko API.
Then, these params are dynamically inserted inside each http request:
```Javascript

async fetchData() {
        const res = await this.$http.get(`https://api.coingecko.com/api/v3/coins/${this.param}
        localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
        );
```
In this way, it is possible to access any cryptocurrency inside the Coingecko API.
Also, the code performs a new request to the API everytime the parameters in the URL change.



