function createTagElement() {
    let tag = $("<div></div>")
    tag.addClass("col-2")
    tag.addClass("tag")
    return tag
}

export default class Cyberware {
    constructor(cyberware, data) {
        this.element = $(cyberware)
        const title = this.element.find(".title")
        this.private_corp = title.find(".corp")
        this.private_brand = title.find(".brand")
        this.private_type = this.element.find(".type")
        this.private_tag_container = this.element.find(".tags")
        this.private_tag_element = createTagElement()
        this.private_description = this.element.find(".description")
        this.load(data)
    }
    load(data) {
        this.data = data
        this.corp = data.corp
        this.brand = data.brand
        this.type = data.type
        this.tags = data.tags
        this.corp = data.corp
        this.description = data.description
    }
    get corp() {
        return this.private_corp.text()
    }
    set corp(value) {
        this.private_corp.text(value)
    }
    get brand() {
        return this.private_brand.text()
    }
    set brand(value) {
        this.private_brand.text(value)
    }
    get type() {
        return this.private_type.text()
    }
    set type(value) {
        this.private_type.text(value)
    }
    get tags() {
        return this.private_tag_container.map(x => x.text())
    }
    set tags(values) {
        this.private_tag_container.children().remove()
        for (const value of values) {
            const tagElement = this.private_tag_element.clone()
            tagElement.text("+" + value)
            this.private_tag_container.append(tagElement)
        }
    }
    get description() {
        this.private_description.text()
    }
    set description(value) {
        this.private_description.text(value)
    }
}