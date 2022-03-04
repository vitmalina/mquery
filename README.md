# mQuery

Modern Query (mQuery) is super, super tiny, modern, ES modules compatible library for DOM manipulation, and it is
friendly for web-components too. Ever-green browsers only.

Download for [Production](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.min.js) or
[Development](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.js)

```js
import $ from 'mquery.min.js'
```

See [Documentation](https://vitmalina.github.io/mquery)

## Why bother?

Because I am tired of typing `document.querySelectorAll`, `element.addEventListener`, loop through the elements when I
do not have to, have hard time removing `event handlers` and working with `data` attached to dom elements, etc.... and
because people frown upon jQuery.

Consider following samples:
```js
// vanilla JS
document.querySelectorAll('a').forEach((a) => {
    a.classList.add('custom')
})

// ----------------

// jQuery / mQuery
$('a').addClass('custom')
```

Attributes
```js
// vanilla JS
document.querySelectorAll('a').forEach((a) => {
    a.setAttribute('id', 'some_id')
    a.setAttribute('name', 'some_name')
})

// ----------------

// jQuery / mQuery
$('a').attr({ id: 'some_id', name: 'some_name' })
```

Event handling
```js
// vanilla JS
let handler = (event) => {
    // do something
}
document.querySelector('#id')
    .addEventListener('click', handler, { once: true })
// ...
document.querySelector('#id')
    .removeEventListener('click', handler, { once: true })

// ----------------

// mQuery
$('#id').on('click.custom', { once: true }, (event) => {
    // do something
})
// ...
$('#id').off('.custom')
```

Shadow DOM
```js
// vanilla JS
document.querySelector('web-component')
    .shadowRoot.querySelectorAll('span').forEach(node => {
        node.style.color = 'red'
    })
this.shadowRoot.querySelectorAll('span').host.style.color = '1px solid green'

// ----------------

// mQuery
$('web-component').shadow('span').css('color', 'red')
$('span').host().css('border', '1px solid green')
```

## The story

Due to reasons outside of my control, I needed to remove jQuery dependency in my projects. I tried to look for a small and elegant library that would allow me to do it painlessly, but could not find one (looked at zepto, cash (!! could have used it), umbrella). I also realized that I only need a fraction of jQuery methods and would prefer to use ES6 when available. Though, jQuery has been a loyal friend for many years, it has grown old, got riddled with methods alternatively implemented in ES6 and not always elegant anymore. So, it is a "good bye".

The goal of this project is to create tiny library that can replace jQuery in projects that historically depended on it. At the same time, I have no desire to implement features already available in ES6, which will make this new library not fully compatible with jQuery.

## Alternatives

- [Cash](https://github.com/fabiospampinato/cash) - 6 kb gzipped, clean syntax, quite jQuery compatible
- [Zepto](https://zeptojs.com/) - 9.8 kb gzipped, old API, seems a discontinued project
- [UmbrellaJS](https://umbrellajs.com/) - 2.5 kb gzipped, API not to my liking
- [mQuery](https://github.com/vitmalina/mquery) ~ 1.8 kb gzipped, minimalistic, easy to embed into your library

I liked Cash, and if I need something closer to jQuery, I would probably use it.

## The core principals

- Use querySelectorAll instead of sizzle
- Don't implement jQuery utility functions (ajax, animation, extend, etc.)
- Don't implement what's easy in ES6
- Make it as small as possible to "inline" into your project
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

I build after change, see for [Production](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.min.js) or
[Development](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.js)


## Usage

Since it is a ES6 modules compatible library, it can only be used as ES6 module.

```js
import $ from 'mquery.js'

$('.span').css('border', '1px solid red')
...
```