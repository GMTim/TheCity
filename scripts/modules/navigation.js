class Item {
    constructor(link) {
        this.private = {}
        this.private.item = link.parent()
        this.private.link = link
    }
    get item() { return this.private.item }
    get link() { return this.private.link }
    get target() { return this.private.link.attr("target") }
    isActive() {
        this.item.addClass("active")
    }
}

function alterState(item, onClick) {
    $(".nav-item").removeClass("active")
    item.isActive()
    if (onClick !== undefined) {
        onClick(item.target)
    }
}

export default class Navigation {
    constructor() {
    }
    get active() {
        let element = $(".nav-item.active .nav-link")
        let item = new Item(element)
        return item.target
    }
    bind() {
        $(".nav-link.internal").click((event) => {
            event.preventDefault()
            const item = new Item($(event.currentTarget))
            alterState(item, this.onClick)
        })
        $(".navbar-brand").click((event) => {
            event.preventDefault()
            this.choose("map")
        })
    }
    choose(target) {
        target = target || this.active
        let element = $(`.nav-link[target='${target}']`)
        if (element.length > 0) {
            let item = new Item(element)
            alterState(item, this.onClick)
        }
    }
}