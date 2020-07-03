# spiget-typescript
Typescript/Javascript Spiget API client

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/InventivetalentDev/spiget-typescript) ![npm](https://img.shields.io/npm/v/spiget)  

```
npm install spiget
```

## Quick Start
```js
const {Spiget} = require("spiget");
const spiget = new Spiget("MyExampleSpigetApp");

spiget.getAuthor(6643).then(author => {
    console.log(author);

    author.getResources().then(resources => {
        console.log(resources);
    });
});
```

## Async / Await
```js
const {Spiget} = require("spiget");
const spiget = new Spiget("MyExampleSpigetApp");

async function start() {
    const author = await spiget.getAuthor(6643);
    console.log(author);

    const resources = await author.getResources();
    console.log(resources);
}

start();
```
