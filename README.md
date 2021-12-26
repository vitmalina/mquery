# mQuery

Modern Query (mQuery) is a small, modern, ES6 modules compatible library for DOM manipulation. It will only work with ever-green browsers.

## The story

Due to reasons outside of my control, I needed to remove jQuery dependency in my projects. I tried to look for a small and elegant library that would allow me to do it painlessly, but could not find one (looked at zepto, seemed too big and not very clean API). I also realized that I only use a fraction of jQuery methods and would prefer to use ES6 when available Though, jQuery has been a loyal friend for many years, it has grown old, riddled with methods inmplemented in ES6 and not always elegant as it used to be. So, it is a "good bye" for now.

The goal of this project is to create tiny library that can replace jQuery in projects that historically depended on it. At the same time, I have no desire to implement features already available in ES6, which will make this new library not fully compatible with jQuery.

## The core principals

- Use querySelectorAll instead of sizzle
- Do not implement features already available in ES6, (ajax, extend, dom traversal, etc)
- No need to be fully compatibile with jQuery
- Chaining is powerfull and cool

```js
$('#id').parent().find('div.other').remove()
```

- jQuery style event handling with `on()` and `off()` methods is elegant
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

## Build

Build process only uglifies JS and puts it into `/dist` folder. To run it do

```
npm i
gulp build
```