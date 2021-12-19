class mQuery {

    constructor(selector, context) {
        if (selector instanceof HTMLElement) {
            this.nodes = [selector]
            this.length = 1
        } else if (selector.nodes) {
            // it is already list of nodes
            this.nodes = selector.nodes
            this.nodes.length = selector.nodes.length
        } else {
            let nodes
            if (context && context.querySelectorAll) {
                nodes = context.querySelectorAll(selector)
            } else {
                nodes = document.querySelectorAll(selector)
            }
            this.nodes = nodes
            this.length = nodes.length
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

    each(func) {
        this.nodes.forEach((node, ind) => {
            func(node, ind)
        })
        return this
    }

    append(nodes) {
        if (this.length != 1) {
            throw new Error('Should have one (and only one) element to append to')
        }
        let doc = this.nodes[0].ownerDocument
        let template = doc.createElement('template')
        template.innerHTML = nodes;
        this.nodes[0].appendChild(template.content)
        return this
    }

    css(key, value) {
        let css = key
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

    offset() {
        if (this.length != 1) {
            return null
        }
        return {
            top: this.nodes[0].offsetTop,
            left: this.nodes[0].offsetLeft,
            width: this.nodes[0].offsetWidth,
            height: this.nodes[0].offsetHeight
        }
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

    on(event, callback) {
        return this
    }

    off(event) {
        return this
    }

}
let query = (selector, context) => { return new mQuery(selector, context) }
let $ = query
let q = query

export default query
export { $, q, query, mQuery }