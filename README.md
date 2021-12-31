# mQuery

Modern Query (mQuery) is super, super tiny, modern, ES modules compatible library for DOM manipulation. Ever-green browsers only.

Download for [Production](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.min.js) or
[Development](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.js)
```js
import $ from 'mquery.min.js'
```

See more in [Documentation](#documentation)

## Why bother?

Because I am tired of typing `document.querySelectorAll`, `element.addEventListener`, loop through the elements when I do not have to, have hard time removing `event handlers` and working with `data` attached to dom elements, etc.... and because people frown upon jQuery.

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

## Usage

Since it is a ES6 modules compatible library, it can only be used as ES6 module.

```js
import $ from 'mquery.js'

$('.span').css('border', '1px solid red')
...
```

## Documentation

MQuery uses DOM's `querySelctorAll` to build a set of elements, after that you can add/remove elements in the set or
change elements properties and attributes.

### $()

This is the main selector method and it returns a collection of elements.

```js
$(selector) // => collection
$(collection) // => collection
$(element) // => collection
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

### Collection

#### find()

Returns selector matched descendants of each node.

```js
$(element).find(selector) // => collection
```

#### closest()

Returns the selector matched parent up the DOM tree.

```js
$(element).closest(selector) // => collection
```

#### shadow()

Returns selector match discendents piersing shadowRoot of each node.

```js
$(element).shad0w(selector) // => collection
```

#### eq()

Returns a collection with the element at the index.

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

### Attribute/Property

#### attr()

Without `value`, returns the attribute value of the first element in the collection.

With `value`, sets the attribute value of each element of the collection.

With `object({ attr, value })`, sets each attribue with corresponding value

```js
$(element).attr(attr) // => value
$(element).attr(attr, value) // => collection
$(element).attr(object) // => collection
```

#### removeAttr()

Removes attribute from each elements.

Accepts multiple `attr` for removing multiple attributes.

```js
$(element).removeAttr(attr) // => collection
$(element).removeAttr(attr1, attr2, ...) // => collection
```

#### prop()

Without `value`, returns the property value of the first element in the collection.

With `value`, sets the property value of each element of the collection.

With `object({ attr, value })`, sets each attribue with corresponding value

```js
$(element).prop(prop) // => value
$(element).prop(prop, value) // => collection
$(element).prop(object) // => collection
```

#### removeProp()

Removes property from each elements.

Accepts multiple `attr` for removing multiple attributes.

```js
$(element).removeProp(prop) // => collection
$(element).removeProp(prop1, prop2, ...) // => collection
```

#### addClass()

Adds the `className` class to each element in the collection.

Accepts multiple `className` (space or comma separated).

```js
$(element).addClass(className) // => collection
```

#### removeClass()

Removes `className` from all elements in the collection.

Accepts multiple `className` (space or comma separated).

Providing no arguments will remove all classes from all elements in the collection.

```js
$(element).removeClass() // => collection
$(element).removeClass(className) // => collection
```

#### toggleClass()

Adds or removes className from collection elements based on if the element already has the class.

Accepts space-separated classNames for toggling multiple classes, and an optional `force` boolean to ensure classes are added (`true`) or removed (`false`).

```js
$(element).toggleClass(className) // => collection
$(element).toggleClass(className, force) // => collection
```

#### hasClass()

Returns true if all elements in the collection have all specieid classes.

Providing no arguments will return an array of classes the first element has

```js
$(element).hasClass(className) // => boolean
$(element).hasClass() // => [classes]
```
