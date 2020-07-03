# spiget-typescript
Typescript/Javascript Spiget API client

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/InventivetalentDev/spiget-typescript) ![npm](https://img.shields.io/npm/v/spiget)  

```
npm install spiget
```

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
