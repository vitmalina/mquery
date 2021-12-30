# mQuery

Modern Query (mQuery) is super, super tiny, modern, ES6 compatible library for DOM manipulation. Ever-green browsers only.

Download for [Production](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.min.js) or
[Development](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.js)
```js
import $ from 'mquery.min.js'
```

See more in [Documentation](#usage)

## Why bother?

Because I am tired of typing `document.querySelectorAll`, `element.addEventListener`, loop through the nodes when I do not have to, have hard time removing `event handlers` and working with `data` attached to dom elements, etc.... and because people frown upon jQuery.

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
    .addEventListener('click', handler, { preview: true })
// ...
document.querySelector('#id')
    .removeEventListener('click', handler, { preview: true })

// ----------------

// jQuery / mQuery
$('#id').on('click.custom', { preview: true }, (event) => {
    // do something
})
// ...
$('#id').off('.custom')
```

## The story

Due to reasons outside of my control, I needed to remove jQuery dependency in my projects. I tried to look for a small and elegant library that would allow me to do it painlessly, but could not find one (looked at zepto, cash (!! could have used it), umbrella). I also realized that I only need a fraction of jQuery methods and would prefer to use ES6 when available. Though, jQuery has been a loyal friend for many years, it has grown old, got riddled with methods alternatively implemented in ES6 and not always elegant anymore. So, it is a "good bye".

The goal of this project is to create tiny library that can replace jQuery in projects that historically depended on it. At the same time, I have no desire to implement features already available in ES6, which will make this new library not fully compatible with jQuery.

## Alternatives

- [Cash](https://github.com/fabiospampinato/cash) - 6 kb gzipped, clean syntax, more jQuery compatible
- [Zepto](https://zeptojs.com/) - 9.8 kb gzipped, old API, no active suppport
- [UmbrellaJS](https://umbrellajs.com/) - 2.5 kb gzipped, API not always to my liking
- [mQuery](https://github.com/vitmalina/mquery) ~ 1.8 kb gzipped, minimalistic, easy to integrated into your library

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

## Usage

Since it is a ES6 modules compatible library, it can only be used as ES6 module.

```js
import $ from 'mquery.js'

$('.span').css('border', '1px solid red')
...
```

## Documentation

MQuery uses DOM's `querySelctorAll` to build a set of nodes, after that you can add/remove nodes in the set or change nodes in the set

### $()

This is the main selector method and it returns a collection of nodes.

```js
$(selector) // => collection
$(collection) // => collection
$(nodes) // => collection
$(HTMLElement) // => collection
```

### Methods

| Collection | Attribute/Property | Change DOM | Events | Short-hand |
| ---------- | ------------------ | ---------- | ------ | --------- |
| [find()](#find)       | [attr()](#attr)               | [after()](#after)     | [on()](#on)           | [val()](#val)       |
| [closest()](#closest) | [removeAttr()](#removeattr)   | [before()](#before)   | [off()](#off)         | [data()](#data)     |
| [shadow()](#shadow)   | [prop()](#prop)               | [append()](#append)   | [trigger()](#trigger) | [show()](#show)     |
| [eq()](#eq)           | [removeProp()](#removeprop)   | [prepend()](#prepend) |                       | [hide()](#hide)     |
| [get()](#get)         | [css()](#css)                 | [replace()](#replace) |                       | [toggle()](#toggle) |
| [each()](#each)       | [addClass()](#addclass)       | [remove()](#remove)   |
|                       | [removeClass()](#removeclass) | [empty()](#empty)     |
|                       | [hasClass()](#hasclass)       | [html()](#html)       |
|                       | [toggleClass()](#toggleclass) | [text()](#text)       |


#### find()

Returns selector matched descendants.

```js
$(element).find(selector) // => collection
```

#### closest()

Returns the selector matched parents up the DOM tree.

```js
$(element).closest(selector) // => collection
```

#### shadow()

Returns selector match discendents piersing shadowRoot of the element.

```js
$(element).shad0w(selector) // => collection
```

#### eq()

Returns a collection with the element at index.

```js
$(element).eq(index) // => collection
```

#### get()

Returns the element at the index, or returns all elements.

```js
$(element).get(index) // => HTMLElement
$(element).get() // => array of HTMLElements
```

#### each()

Iterates over a collection with `callback(element, index, mQuery)`.

```js
$(element).each(callback) // => collection
```