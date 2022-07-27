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
| [parents()](#parents) | [removeData()](#removeData)   |
| [next()](#next)       | [show()](#show)               |
| [prev()](#prev)       | [hide()](#hide)               |
| [add()](#add)         |


## Collection

#### find()

Returns selector matched descendants of each node. Returns a new collection.

```js
$(selector).find(selector) // => collection
```

#### closest()

Returns the selector matched parent up the DOM tree. Returns a new collection.

```js
$(selector).closest(selector) // => collection
```

#### get()

Returns the element at the index, or returns all elements.

```js
$(selector).get(index) // => HTMLElement
$(selector).get(-1) // => HTMLElement (last element)
$(selector).get() // => array of HTMLElements
```

#### eq()

Returns a collection with the element at the index. Returns a new collection.

```js
$(selector).eq(index) // => collection
$(selector).eq(-1) // => collection (last element)
```

#### each()

Iterates over a collection with `callback(element, index, mQuery)`.

```js
$(selector).each(callback) // => collection
```

#### shadow()

Returns selector matched discendents piersing shadowRoot of each node. Similar to find, but in shadowRoot. Returns a new collection.

```js
$(selector).shadow(selector) // => collection
```

#### host()

Returns host element for each element. Host element is a custom web component or a document. Returns a new collection.

If `true` is provided, it returns a collection of all hosts up to the document top.

```js
$(selector).host() // => collection
$(selector).host(true) // => collection (all hosts)
```

#### filter()

Returns collection filtered by a selector, an element or a function. Returns a new collection.

```js
$(selector).filter(selector) // => collection
$(selector).filter(element) // => collection
$(selector).filter(func) // => collection
```

#### then()

Executes a function passing collection into it as the argument. If functionr returns != null, it will become this
object for the rest of the chain.

```js
$(selector).then(func) // => return != null ? return : collection
```

#### parent()

Returns unique collection of elements who are parent of elements. Optionally filtering by selector.

```js
$(selector).parent() // => collection
$(selector).parent(selector) // => collection
```

#### parents()

Returns unique collection of elements who are parents of elements. Optionally filtering by selector.

```js
$(selector).parents() // => collection
$(selector).parents(selector) // => collection
```

#### next()

Returns collection of next DOM elements for each element of current collection.

```js
$(selector).next() // => collection
```

#### prev()

Returns collection of previous DOM elements for each element of current collection.

```js
$(selector).prev() // => collection
```

#### add()

Adds an element or a collection to the current collection. Returns new collection.

```js
$(selector).add(mQuery) // => collection
$(selector).add(HTMLElement) // => collection
$(selector).add([HTMLELements]) // => collection
```

## Attribute/Property

#### attr()

Without `value`, returns the attribute value of the first element in the collection.

With `value`, sets the attribute value of each element of the collection.

With `object({ attr, value })`, sets each attribue with corresponding value

```js
$(selector).attr(attr) // => value
$(selector).attr(attr, value) // => collection
$(selector).attr(object) // => collection
```

#### removeAttr()

Removes attribute from each elements.

Accepts multiple `attr` for removing multiple attributes.

```js
$(selector).removeAttr(attr) // => collection
$(selector).removeAttr(attr1, attr2, ...) // => collection
```

#### prop()

Without `value`, returns the property value of the first element in the collection.

With `value`, sets the property value of each element of the collection.

With `object({ attr, value })`, sets each attribue with corresponding value

```js
$(selector).prop(prop) // => value
$(selector).prop(prop, value) // => collection
$(selector).prop(object) // => collection
```

#### removeProp()

Removes property from each elements.

Accepts multiple `attr` for removing multiple attributes.

```js
$(selector).removeProp(prop) // => collection
$(selector).removeProp(prop1, prop2, ...) // => collection
```

#### addClass()

Adds the `className` class to each element in the collection.

Accepts multiple `className` (space or comma separated).

```js
$(selector).addClass(className) // => collection
```

#### removeClass()

Removes `className` from all elements in the collection.

Accepts multiple `className` (space or comma separated).

Providing no arguments will remove all classes from all elements in the collection.

```js
$(selector).removeClass() // => collection
$(selector).removeClass(className) // => collection
```

#### toggleClass()

Adds or removes className from collection elements based on if the element already has the class.

Accepts space-separated classNames for toggling multiple classes, and an optional `force` boolean to ensure classes are added (`true`) or removed (`false`).

```js
$(selector).toggleClass(className) // => collection
$(selector).toggleClass(className, force) // => collection
```

#### hasClass()

Returns true if all elements in the collection have all specieid classes.

Providing no arguments will return an array of classes the first element has

```js
$(selector).hasClass(className) // => boolean
$(selector).hasClass() // => [classes]
```

#### css()

Returns all CSS property values of the first element (not inherited ones) when no arguments are supplied.

Returns a CSS property value of the first element (not inherited ones) when just property is supplied.

Sets a CSS property when the property and the value are supplied.

Sets multiple properties when an object is supplied.

```js
$(selector).css() // => object
$(selector).css(property) // => value
$(selector).css(property, value) // => collection
$(selector).css(object) // => collection
```

#### data()

Without arguments, returns an object that maps all the `data-*` attributes.

With a `key`, return the value of the corresponding `data-*` attribute. If key is an object, it will set data for
each object entity.

With both a `key` and `value`, sets the `data-[key]` attribute

The `value` can be an object. And if <... data-...="{obj}"> is a valid JSON, it will be parsed as JSON

```js
$(selector).data() // => object
$(selector).data(key) // => value
$(selector).data(key, value) // => collection
$(selector).data(object) // => collection
```

#### removeData()

Removes the corresponding `data-*` attribute for all elemenrs in the collection.

Accepts multiple `keys` (space or comma separated).

```js
$(selector).removeData(key) // => object
```

#### show()

Sets css display property to previous value if used after .hide() or ''

```js
$(selector).show() // => object
```

#### hide()

Sets css display property to 'none', but remembers previous value to be used when .show() is called

```js
$(selector).hide() // => object
```

## Change DOM

#### after()

Inserts content or element after each element in the collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(selector).after(html) // => collection
$(selector).after(element) // => collection
```

#### before()

Inserts content or element before each element in the collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(selector).before(html) // => collection
$(selector).before(element) // => collection
```

#### append()

Appens content or element inside each element in the collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(selector).append(html) // => collection
$(selector).append(element) // => collection
```

#### prepend()

Prepends content or element inside each element in the collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(selector).prepend(html) // => collection
$(selector).prepend(element) // => collection
```

#### replace()

Replaces each element of the collection with provided content or element and returns the new collection.

If existing element is provided and
- if current collection has only one element, the inserting element will be moved to the right place in the DOM.
- if current collection has more then one element, the inserting element will be cloned and moved to the right place in DOM.

```js
$(selector).replace(html) // => collection
$(selector).replace(element) // => collection
```

#### remove()

Removes each element of the collection from the DOM. Elements are not removed from the colleciton and can be acted uppon.

```js
$(selector).remove() // => collection
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
$(selector).on(events, handler) // => collection
$(selector).on(events, options, handler) // => collection
$(selector).on(events, { delegate: 'a' }, handler) // event delegation (only a elements) => collection
```

#### off()

Removes event listener from each element in the collection. Allows to remove multiple events separated by the space or the comma.

Allows to remove events with custom scoping. If event name has a dot (for example `event.scope`), anythign after the dot is considered a scope.

Removes all event listeners if called without arguments.

```js
$(selector).off(events, handler) // => collection
$(selector).off(events, options, handler) // => collection
$(selector).off('.my-scope') // removes all events with custom scope => collection
$(selector).off('.*') // removes all events => collection
```

#### trigger()

Triggers supplied event on each element in the collection. Options can be passed along as the second parameter, which
will be used to create an event. This way you can send `clientX` and `clientY` or `keyCode` for example

You can trigger events by a name, for example `click`, `mousedown` or you can create an event with `new Event(...)` or
`new CustomEvent(...)` and trigger it on all elements of the collection.

```js
$(selector).trigger(event) // => collection
$(selector).trigger(eventName) // => collection
$(selector).trigger(eventName, options) // => collection
```

To pass mouse coordinates do this
```js
$(selector).trigger('click', { clientX: 10, clientY: 15 })
```

To pass keyboard key code
```js
$(selector).trigger('keydown', { keyCode: 65 })
// don't expect that letter will appear, but event data will have right key code
```

Send an event object
```js
$(selector).trigger(new CustomEvent('MyEvent'))
// don't expect that letter will appear, but event data will have right key code
```

## Short-hand

All these methods are short hand for some other call.

#### val()
```js
$(selector).val(value)
// same as
$(selector).attr('value', value)
```

#### toggle()
```js
$(selector).toggle()
// same as
$(selector).css('display', isVisible ? 'none' : 'inherit')
```

#### empty()
```js
$(selector).empty()
// same as
$(selector).prop('innerHTML', '')
```

#### html()
```js
$(selector).html(str)
// same as
$(selector).prop('innerHTML', str)
```

#### text()
```js
$(selector).text(str)
// same as
$(selector).prop('textContent', str)
```

#### change()
```js
$(selector).change()
// same as
$(selector).trigger('change')
```

#### click()
```js
$(selector).click()
// same as
$(selector).trigger('click')
```