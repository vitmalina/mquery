## Modern Query (mQuery)

MQuery uses `querySelctorAll` to construct a set of DOM elements, and then gives you ability to change their arrtibutes and properties, insert other DOM elements before or after or do other manupulations with the set.

### $()

Main method that returns a collection of elements filtered by the selector.

```js
$(selector) // => collection
$(selector, context) // => collection
$(mQuery) // => collection
$(HTMLElement) // => collection
$([HTMLELements]) // => collection
$(function) // adds onload event listener => undefined
```

You can generate document fragment based on some html and then append it in dom.
```js
let frag = $.html('<span>A span</span> and <span> some other span </span>')
$('body').append(frag)
```

### Methods

| Collection | Attribute/Property | Change DOM | Events | Short-hand |
| ---------- | ------------------ | ---------- | ------ | --------- |
| [find()](#find)       | [attr()](#attr)               | [after()](#after)     | [on()](#on)           | [val()](#val)       |
| [closest()](#closest) | [removeAttr()](#removeattr)   | [before()](#before)   | [off()](#off)         | [toggle()](#toggle) |
| [get()](#get)         | [prop()](#prop)               | [append()](#append)   | [trigger()](#trigger) | [empty()](#empty)   |
| [eq()](#eq)           | [removeProp()](#removeprop)   | [prepend()](#prepend) |                       | [html()](#html)     |
| [each()](#each)       | [addClass()](#addclass)       | [replace()](#replace) |                       | [text()](#text)     |
| [shadow()](#shadow)   | [removeClass()](#removeclass) | [remove()](#remove)   |                       | [click()](#click)   |
| [host()](#host)       | [hasClass()](#hasclass)       |                       |                       | [change()](#change) |
| [filter()](#filter)   | [toggleClass()](#toggleclass) |
| [then()](#then)       | [css()](#css)                 |
| [parent()](#parent)   | [data()](#data)               |
| [parents()](#parents) | [show()](#show)               |
| [next()](#next)       | [hide()](#hide)               |
| [prev()](#prev)       |


## Collection

#### find()

Returns selector matched descendants of each node. Returns a new collection.

```js
$(element).find(selector) // => collection
```

#### closest()

Returns the selector matched parent up the DOM tree. Returns a new collection.

```js
$(element).closest(selector) // => collection
```

#### get()

Returns the element at the index, or returns all elements.

```js
$(element).get(index) // => HTMLElement
$(element).get(-1) // => HTMLElement (last element)
$(element).get() // => array of HTMLElements
```

#### eq()

Returns a collection with the element at the index. Returns a new collection.

```js
$(element).eq(index) // => collection
$(element).eq(-1) // => collection (last element)
```

#### each()

Iterates over a collection with `callback(element, index, mQuery)`.

```js
$(element).each(callback) // => collection
```

#### shadow()

Returns selector matched discendents piersing shadowRoot of each node. Similar to find, but in shadowRoot. Returns a new collection.

```js
$(element).shadow(selector) // => collection
```

#### host()

Returns host element for each element. Host element is a custom web component or a document. Returns a new collection.

If `true` is provided, it returns a collection of all hosts up to the document top.

```js
$(element).host() // => collection
$(element).host(true) // => collection (all hosts)
```

#### filter()

Returns collection filtered by a selector, an element or a function. Returns a new collection.

```js
$(element).filter(selector) // => collection
$(element).filter(element) // => collection
$(element).filter(func) // => collection
```

#### then()

Executes a function passing collection into it as the argument. If functionr returns != null, it will become this
object for the rest of the chain.

```js
$(element).then(func) // => return != null ? retutn : collection
```

#### parent()

Returns unique collection of elements who are parent of elements. Optionally filtering by selector.

```js
$(element).parent() // => collection
$(element).parent(selector) // => collection
```

#### parents()

Returns unique collection of elements who are parents of elements. Optionally filtering by selector.

```js
$(element).parents() // => collection
$(element).parents(selector) // => collection
```

#### next()

Returns collection of next DOM elements for each element of current collection.

```js
$(element).next() // => collection
```

#### prev()

Returns collection of previous DOM elements for each element of current collection.

```js
$(element).prev() // => collection
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

Without arguments, returns an object that maps all the `data-*` attributes.

With a `key`, return the value of the corresponding `data-*` attribute. If key is an object, it will set data for
each object entity.

With both a `key` and `value`, sets the `data-[key]` attribute

The `value` can be an object. And if <... data-...="{obj}"> is a valid JSON, it will be parsed as JSON

```js
$(element).data() // => object
$(element).data(key) // => value
$(element).data(key, value) // => collection
$(element).data(object) // => collection
```

#### show()

Sets css display property to previous value if used after .hide() or ''

```js
$(element).show() // => object
```

#### hide()

Sets css display property to 'none', but remembers previous value to be used when .show() is called

```js
$(element).hide() // => object
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

Adds event listener to each element in the collection. Allows to add multiple events separated by the space or the comma.

Allows to add custom scoping for the event so multiple events can be removed easily. If event name has a dot (for
example `event.scope`), anything after the dot is considered a scope.

You can optionally pass options that include { caption: t/f, once: t/f, passive: t/f, signal },
[MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

Event delegation is also supported, if you pass option.delegate, it will be used to trigger only when delegate matches event's
target.

```js
$(element).on(events, handler) // => collection
$(element).on(events, options, handler) // => collection
$(element).on(events, { delegate: 'a' }, handler) // event delegation (only a elements) => collection
```

#### off()

Removes event listener from each element in the collection. Allows to remove multiple events separated by the space or the comma.

Allows to remove events with custom scoping. If event name has a dot (for example `event.scope`), anythign after the dot is considered a scope.

Removes all event listeners if called without arguments.

```js
$(element).off(events, handler) // => collection
$(element).off(events, options, handler) // => collection
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