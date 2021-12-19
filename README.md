# mQuery

Inspired by jQuery, I want to create a small library that resembels the simplicity and ease of use of jQuery, but uses modern API of ever-green browsers. The goal is to create tiny library that can replace jQuery in projects that historically depended on it, but want to updgrate to modern JavaScript syntax and modules.

## The core principals

- Use querySelectorAll instead of sizzle
- Do not implement features already available in ES6
- Chaninig is powerfull
```js
$('#id').parent().find('div.other').remove()
```

- Elegant & expressive syntax
```js
$('#my-button')
    .off('.my-events')
    .on('click.my-events', event => {
        console.log('button clicked')
    })
    .on('mouseenter.my-events', event => {
        console.log('mouse enter event')
    })
    .on('mouseleave.my-events', event => {
        console.log('mouse leave event')
    })
```