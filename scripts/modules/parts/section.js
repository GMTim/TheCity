import * as Base from "./basePart.js"

export default class GearPart extends Base.BasePart {
    constructor() {
        super("section")
    }
    async load(key, title) {
        await super.load()
        this.private = {}
        this.private.header = this.metadata.element.find(".header")
        this.id = key
        this.title = title
    }
    get id() { return this.metadata.element.attr("id") }
    set id(value) { this.metadata.element.attr("id", value) }
    get title() { return this.private.header.text() }
    set title(value) {
        if (value !== null) {
            this.private.header.text(value)
        } else {
            this.private.header.parent().remove()
        }
    }
    clearTitle() {
        this.title = null
    }
}