# mQuery

Modern Query (mQuery) is super, super tiny, modern, ES modules compatible library for DOM manipulation, and it is
friendly for web-components too. Ever-green browsers only.

Download for [Production](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.min.js) or
[Development](https://raw.githubusercontent.com/vitmalina/mquery/main/dist/mquery.js)

```js
import $ from 'mquery.min.js'
```

See [Documentation](#documentation)

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

## Documentation

MQuery uses DOM's `querySelctorAll` to build a set of elements, after that you can add/remove elements in the set or
change elements properties and attributes.

### $()

This is the main selector method and it returns a collection of elements.

```js
$(selector) // => collection
$(selector, context) // => collection
$(mQuery) // => collection
$(HTMLElement) // => collection
$([HTMLELements]) // => collection
```

You can also generate document fragment based on some html and then append it in dom.
```js
let frag = $.html('<span>A span</span> and <span> some other span </span>')
$('body').append(frag)
```

### Methods

| Collection | Attribute/Property | Change DOM | Events | Short-hand |
| ---------- | ------------------ | ---------- | ------ | --------- |
| [find()](#find)       | [attr()](#attr)               | [after()](#after)     | [on()](#on)           | [val()](#val)       |
| [shadow()](#shadow)   | [removeAttr()](#removeattr)   | [before()](#before)   | [off()](#off)         | [show()](#show)     |
| [closest()](#closest) | [prop()](#prop)               | [append()](#append)   | [trigger()](#trigger) | [hide()](#hide)     |
| [host()](#host)       | [removeProp()](#removeprop)   | [prepend()](#prepend) |                       | [toggle()](#toggle) |
| [get()](#get)         | [addClass()](#addclass)       | [replace()](#replace) |                       | [empty()](#empty)   |
| [eq()](#eq)           | [removeClass()](#removeclass) | [remove()](#remove)   |                       | [html()](#html)     |
| [each()](#each)       | [hasClass()](#hasclass)       |                       |                       | [text()](#text)     |
|                       | [toggleClass()](#toggleclass) |                       |                       | [click()](#click)   |
|                       | [css()](#css)                 |                       |                       | [change()](#change) |
|                       | [data()](#data)               |

## Collection

#### find()

Returns selector matched descendants of each node.

```js
$(element).find(selector) // => collection
```

#### shadow()

Returns selector matched discendents piersing shadowRoot of each node. Similar to find, but in shadowRoot.

```js
$(element).shadow(selector) // => collection
```

#### closest()

Returns the selector matched parent up the DOM tree.

```js
$(element).closest(selector) // => collection
```

#### host()

Returns host element for each element. Host element is a custom web component or a document.

If `true` is provided, it returns a collection of all hosts up to the document top.

```js
$(element).host() // => collection
$(element).host(true) // => collection
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

## Attribute/Property

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

#### css()

Returns all CSS property values of the first element (not inherited ones) when no arguments are supplied.

Returns a CSS property value of the first element (not inherited ones) when just property is supplied.

Sets a CSS property when the property and the value are supplied.

Sets multiple properties when an object is supplied.

```js
$(element).css() // => object
$(element).css(property) // => value
$(element).css(property, value) // => collection
$(element).css(object) // => collection
```

#### data()

Without arguments, returns an object with user data and also maps all the `data-*` attributes.

With a `key`, return the value of the user data or a corresponding `data-*` attribute.

With both a `key` and `value`, sets the value of the user data.

The `value` can be an object. And if <... data-...="{obj}"> is a valid JSON, it will be parsed as JSON

```js
$(element).data() // => object
$(element).data(key) // => value
$(element).data(key, value) // => collection
$(element).data(object) // => collection
```

## Change DOM

#### after()

Inserts content or element after each element in the collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(element).after(html) // => collection
$(element).after(element) // => collection
```

#### before()

Inserts content or element before each element in the collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(element).before(html) // => collection
$(element).before(element) // => collection
```

#### append()

Appens content or element inside each element in the collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(element).append(html) // => collection
$(element).append(element) // => collection
```

#### prepend()

Prepends content or element inside each element in the collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(element).prepend(html) // => collection
$(element).prepend(element) // => collection
```

#### replace()

Replaces each element of the collection with provided content or element and returns the new collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(element).replace(html) // => collection
$(element).replace(element) // => collection
```

#### remove()

Removes each element of the collection from the DOM. Elements are not removed from the colleciton and can be acted uppon.

```js
$(element).remove() // => collection
```

## Events

#### on()

Adds event listener to each element in the collection.

Allows to add custom scoping for the event so multiple can be easily removed. If event name has a dot (for example `event.scope`),
anythign after the dot is considered a scope.

You can optionally pass options that include { caption: t/f, once: t/f, passive: t/f, signal },
[MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

```js
$(element).on(event) // => collection
$(element).on(event, handler) // => collection
$(element).on(event, options, handler) // => collection
```

#### off()

Removes event listener from each element in the collection.

Allows to remove events with custom scoping . If event name has a dot (for example `event.scope`),
anythign after the dot is considered a scope.

Removes all event listeners if called without arguments.

```js
$(element).off(event, handler) // => collection
$(element).off('.my-scope') // removes all events with custom scope => collection
$(element).off('.*') // removes all events => collection
```

#### trigger()

Triggers supplied event on each element in the collection. Options can be passed along as the second parameter, which
will be used to create an event. This way you can send `clientX` and `clientY` or `keyCode` for example

You can trigger events by a name, for example `click`, `mousedown` or you can create an event with `new Event(...)` or
`new CustomEvent(...)` and trigger it on all elements of the collection.

```js
$(element).trigger(event) // => collection
$(element).trigger(eventName) // => collection
$(element).trigger(eventName, options) // => collection
```

To pass mouse coordinates do this
```js
$(element).trigger('click', { clientX: 10, clientY: 15 })
```

To pass keyboard key code
```js
$(element).trigger('keydown', { keyCode: 65 })
// don't expect that letter will appear, but event data will have right key code
```

Send an event object
```js
$(element).trigger(new CustomEvent('MyEvent'))
// don't expect that letter will appear, but event data will have right key code
```

## Short-hand

All these methods are short hand for some other call.

#### val()
```js
$(element).val(value)
// same as
$(element).attr('value', value)
```

#### show()
```js
$(element).show()
// same as
$(element).css('display', 'inherit')
```

#### hide()
```js
$(element).hide()
// same as
$(element).css('display', 'none')
```

#### toggle()
```js
$(element).toggle()
// same as
$(element).css('display', isVisible ? 'none' : 'inherit')
```

#### empty()
```js
$(element).empty()
// same as
$(element).prop('innerHTML', '')
```

#### html()
```js
$(element).html(str)
// same as
$(element).prop('innerHTML', str)
```

#### text()
```js
$(element).text(str)
// same as
$(element).prop('textContent', str)
```

#### change()
```js
$(element).change()
// same as
$(element).trigger('change')
```

#### click()
```js
$(element).click()
// same as
$(element).trigger('click')
```