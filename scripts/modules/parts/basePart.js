import * as Utilities from "../utlities.js"

let htmlStore = {
    load: async (key) => {
        const url = `html/${key}.html`
        if (htmlStore[key] !== undefined) { return htmlStore[key] }
        htmlStore[key] = await Utilities.Downloader.get(url)
        return htmlStore[key]
    }
}

export class BasePart {
    constructor(key) {
        this.metadata = { key: key }
    }
    async load() {
        const element = await htmlStore.load(this.metadata.key)
        this.metadata.element = $(element)
    }
    get element() { return this.metadata.element }
}

export class BaseItem extends BasePart {
    constructor(key) {
        super(key)
    }
    async load(data) {
        await super.load()
        const element = this.metadata.element
        const title = element.find(".title")
        this.private = {}
        this.private.corp = title.find(".corp")
        this.private.brand = title.find(".brand")
        this.private.type = element.find(".type")
        this.private.tag_container = element.find(".tags")
        const tagElementCreator = () => {
            let tag = $("<div></div>")
            tag.addClass("col-2")
            tag.addClass("tag")
            return tag
        }
        this.private.tag_element = tagElementCreator()
        this.private.description = this.element.find(".description")
        this.metadata.data = data
        this.corp = data.corp
        this.brand = data.brand
        this.type = data.type
        this.tags = data.tags
        this.corp = data.corp
        this.description = data.description
    }
    get corp() {
        return this.private.corp.text()
    }
    set corp(value) {
        this.private.corp.text(value)
    }
    get brand() {
        return this.private.brand.text()
    }
    set brand(value) {
        this.private.brand.text(value)
    }
    get type() {
        return this.private.type.text()
    }
    set type(value) {
        this.private.type.text(value)
    }
    get tags() {
        return this.private.tag_container.map(x => x.text())
    }
    set tags(values) {
        this.private.tag_container.children().remove()
        for (const value of values) {
            const tagElement = this.private.tag_element.clone()
            tagElement.text("+" + value)
            this.private.tag_container.append(tagElement)
        }
    }
    get description() {
        return this.private.description.text()
    }
    set description(value) {
        this.private.description.text(value)
    }
}