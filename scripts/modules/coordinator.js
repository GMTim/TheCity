import * as Parts from "./parts.js"
import * as Utlities from "./utlities.js"
import Store from "./dataStore.js"
const content = $("#content")
const standardSort = (a, b) => {
    const compare = (a, b) => {
        if (a < b) { return -1 }
        if (a > b) { return 1 }
        return 0
    }
    return compare(a.corp, b.corp) || compare(a.brand, b.brand) || compare(a.type, b.type)
}

class Section {
    constructor(key, title, part, store) {
        this.key = key
        this.title = title
        this.url = `data/${key}.json`
        this.part = part
        this.store = store
    }
    async load() {
        content.children().remove()
        const section = new Parts.Section()
        await section.load(this.key, this.title)
        content.append(section.element)
        if (await this.loadData(section.element) === false) {
            await this.loadElement(section.element)
        }
    }
    async loadData(section) {
        if (this.store === undefined) { return false }
        let items = await this.store.load(this.key, this.url)
        items = items.sort(standardSort)
        for (const item of items) {
            const part = new this.part()
            await part.load(item)
            section.append(part.element)
        }
        return true
    }
    async loadElement(section) {
        const part = new this.part()
        await part.load()
        section.append(part.element)
    }
}

export default class Coordinator {
    constructor() {
        this.private = { data: new Store() }
        this.sections = {}
        const keys = Utlities.Keys
        this.sections[keys.map.key] = new Section(keys.map.key, null, Parts.Map)
        this.sections[keys.cyberware.key] = new Section(keys.cyberware.key, keys.cyberware.title, Parts.Cyberware, this.private.data)
    }
    async load(key) {
        let unwrappedKey
        if (typeof(key) === "string") {
            unwrappedKey = key
        } else {
            unwrappedKey = key.key
        }
        this.sections[unwrappedKey].load()
    }
}