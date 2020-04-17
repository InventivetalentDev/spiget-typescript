# spiget-typescript
Typescript/Javascript Spiget API client

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
    })
});
```
