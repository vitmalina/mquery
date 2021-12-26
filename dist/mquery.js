/* mQuery 1.0.x (nightly) (12/26/2021, 2:58:08 PM), vitmalina@gmail.com */
/**
 * Small library to replace basic functionality of jQuery
 * methods that start with "_" are internal
 */
class Query {
    constructor(selector, context) {
        // TODO: selector within context
        if (selector instanceof HTMLElement) {
            this.nodes = [selector]
            this.length = 1
        } else if (selector instanceof Text) {
            this.nodes = [selector]
            this.length = 1
        } else if (selector instanceof Query) {
            this.nodes = selector.nodes
            this.length = selector.nodes.length
        } else if (typeof selector == 'string') {
            let nodes = document.querySelectorAll(selector)
            this.nodes = nodes
            this.length = nodes.length
        } else {
            throw new Error('Unknown selector')
        }
        this._updateRefs()
    }
    _updateRefs() {
        // map nodes to object propoerties
        this.nodes.forEach((node, ind) => {
            this[ind] = node
        })
        let ind = this.nodes.length
        while (this[ind]) {
            delete this[ind]
            ind++
        }
    }
    _insert(method, html) {
        let newNodes = []
        if (typeof html == 'string') {
            let doc = this.nodes[0].ownerDocument
            let template = doc.createElement('template')
            this.nodes.forEach(node => {
                template.innerHTML = html
                if (method == 'replaceWith') {
                    newNodes.push(...template.content.childNodes)
                }
                node[method](template.content) // inserts nodes or text
            })
            if (method == 'replaceWith') {
                this.nodes = newNodes
                this.length = newNodes.length
                this._updateRefs()
            }
        } else {
            throw new Error(`Incorrect argument for "${method}(html)". It expects one string argument.`)
        }
        return this
    }
    find(selector) {
        let newNodes = []
        this.nodes.forEach((node, ind) => {
            let nodes = node.querySelectorAll(selector)
            if (nodes.length > 0) {
                newNodes.push(...nodes)
            }
        })
        this.nodes = newNodes
        this.length = newNodes.length
        this._updateRefs()
        return this
    }
    closest(selector) {
        let newNodes = []
        this.nodes.forEach((node, ind) => {
            let newNode = node.closest(selector)
            if (newNode) {
                newNodes.push(newNode)
            }
        })
        this.nodes = newNodes
        this.length = newNodes.length
        this._updateRefs()
        return this
    }
    parent() {
        let newNodes = []
        this.nodes.forEach((node, ind) => {
            let newNode = node.parentNode
            if (newNode) {
                newNodes.push(newNode)
            }
        })
        this.nodes = newNodes
        this.length = newNodes.length
        this._updateRefs()
        return this
    }
    each(func) {
        this.nodes.forEach((node, ind) => { func(node, ind) })
        return this
    }
    append(html) {
        return this._insert('append', html)
    }
    prepend(html) {
        return this._insert('prepend', html)
    }
    after(html) {
        return this._insert('after', html)
    }
    before(html) {
        // updates this.nodes with replaced items
        return this._insert('before', html)
    }
    remove() {
        // remove from dom, but keep in current object
        this.each(node => { node.remove() })
        return this
    }
    empty() {
        // remove all children
        this.each(node => {
            for (let i = node.childNodes.length - 1; i >= 0; i--) {
                let child = node.childNodes[i]
                node.removeChild(child)
            }
        })
        return this
    }
    replace(html) {
        return this._insert('replaceWith', html)
    }
    html(html) {
        if (arguments.length == 0) {
            return this.nodes[0] ? this.nodes[0].innerHTML : undefined
        } else {
            this.each(node => {
                node.innerHTML = html
            })
            return this
        }
    }
    text(text) {
        if (arguments.length == 0) {
            return this.nodes[0] ? this.nodes[0].textContent : undefined
        } else {
            this.each(node => {
                node.textContent = text
            })
            return this
        }
    }
    val(value) {
        if (arguments.length == 0) {
            return this.nodes[0] ? this.nodes[0].value : undefined
        } else {
            this.each(node => {
                node.setAttribute('value', value)
            })
            return this
        }
    }
    css(key, value) {
        let css = key
        if (arguments.length == 1 && typeof key == 'string') {
            return this.nodes[0] ? this.nodes[0].style[key] : undefined
        } else {
            if (typeof key != 'object') {
                css = {}
                css[key] = value
            }
            this.each((el, ind) => {
                Object.keys(css).forEach(key => {
                    el.style[key] = css[key]
                })
            })
            return this
        }
    }
    offset() {
        if (this.length != 1) {
            return null
        }
        return this.nodes[0] ? {
            top: this.nodes[0].offsetTop,
            left: this.nodes[0].offsetLeft,
            width: this.nodes[0].offsetWidth,
            height: this.nodes[0].offsetHeight
        } : undefined
    }
    addClass(classes) {
        if (typeof classes == 'string') {
            classes = classes.split(' ')
        }
        this.each(node => {
            classes.forEach(className => {
                if (className !== '') node.classList.add(className)
            })
        })
        return this
    }
    removeClass(classes) {
        if (typeof classes == 'string') {
            classes = classes.split(' ')
        }
        this.each(node => {
            classes.forEach(className => {
                if (className !== '') node.classList.remove(className)
            })
        })
        return this
    }
    toggleClass(classes) {
        if (typeof classes == 'string') {
            classes = classes.split(' ')
        }
        this.each(node => {
            classes.forEach(className => {
                if (className !== '') node.classList.toggle(className)
            })
        })
        return this
    }
    hasClass(classes) {
        if (typeof classes == 'string') {
            classes = classes.split(' ')
        }
        let ret = true
        this.each(node => {
            let current = Array.from(node.classList)
            classes.forEach(className => {
                if (!current.includes(className) && ret === true) {
                    ret = false
                }
            })
        })
        return ret
    }
    on(eventScope, options, callback) {
        let [ event, scope ] = String(eventScope).toLowerCase().split('.')
        if (typeof options == 'function') {
            callback = options
            options = undefined
        }
        this.each(node => {
            node._mQuery = node._mQuery ?? {}
            node._mQuery.events = node._mQuery.events ?? []
            node._mQuery.events.push({ event, scope, callback, options })
            node.addEventListener(event, callback, options)
        })
        return this
    }
    off(eventScope, options, callback) {
        let [ event, scope ] = String(eventScope).toLowerCase().split('.')
        if (typeof options == 'function') {
            callback = options
            options = undefined
        }
        this.each(node => {
            if (node._mQuery && Array.isArray(node._mQuery.events)) {
                for (let i = node._mQuery.events.length - 1; i >= 0; i--) {
                    let evt = node._mQuery.events[i]
                    if (scope == null || scope === '') {
                        // if no scope, has to be exact match
                        if (evt.event == event && evt.scope == scope && evt.callback == callback) {
                            node.removeEventListener(event, callback, options)
                            node._mQuery.events.splice(i, 1)
                        }
                    } else {
                        if ((evt.event == event || event === '') && (evt.scope == scope || scope === '*')) {
                            node.removeEventListener(evt.event, evt.callback, evt.options)
                            node._mQuery.events.splice(i, 1)
                        }
                    }
                }
            }
        })
        return this
    }
    attr(name, value) {
        if (arguments.length == 1) {
            return this.nodes[0] ? this.nodes[0].getAttribute() : undefined
        } else {
            this.each(node => {
                node.setAttribute(name, value)
            })
            return this
        }
    }
    removeAttr() {
        this.each(node => {
            Array.from(arguments).forEach(attr => {
                node.removeAttribute(attr)
            })
        })
        return this
    }
    prop(name, value) {
        if (arguments.length == 1) {
            return this.nodes[0] ? this.nodes[0][name] : undefined
        } else {
            this.each(node => {
                node[name] = value
            })
            return this
        }
    }
    removeProp() {
        this.each(node => {
            Array.from(arguments).forEach(prop => {
                delete node[prop]
            })
        })
        return this
    }
}
// create a new object each time
let query = function (selector, context) {
    return new Query(selector, context)
}
let $ = query
let q = query
export default query
export { $, q, query, Query }