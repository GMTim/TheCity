import { Sections } from "./sections.js"
import * as Parts from "./parts/allParts.js"
const content = $("#content")

function load(url) {
    return new Promise((resolve, reject) => {
        $.get(url).done((data) => {
            resolve(data)
        }).fail((error) => {
            reject(error)
        })
    })
}
async function loadJSON(url, sort) {
    const json = await load(url)
    if (sort) {
        let sortedJSON = json.sort(sort)
        return sortedJSON
    }
    return json
}

class PartConstructor {
    constructor(part, partClass) {
        this.private_part = $(part)
        this.private_class = partClass
    }
    create(data) {
        return new this.private_class(this.private_part.clone(), data)
    }
}

async function forEach(section) {
    for (const key of Object.keys(Sections)) {
        await section(key, Sections[key])
    }
}

async function createSection(id, name) {
    let section = new Parts.Section(id, name)
    await section.load()
    content.append(section.element)
}

function loadKey(key, loader) {
    const container = $("#"+key)
    const item = loader[key]
    if (item.data !== undefined) {
        for (const data of item.data) {
            const element = item.template.create(data)
            container.append(element.element)
        }
    } else if (item.template !== undefined) {
        container.append(item.template.create())
    }
}

export class Loader {
    async download() {
        await forEach(async (key, section) => {
            this[key] = {}
            if (section.dataFile !== undefined) {
                this[key].data = await loadJSON(section.dataFile, section.sort) }
            if (section.template !== undefined) {
                const template = await load(section.template)
                this[key].template = new PartConstructor(template, Parts[section.part])
            }
        })
    }
    async load() {
        await forEach((key, section) => {
            loadKey(key, this)
        })
    }
    async loadSection(key) {
        this.clear()
        const section = Sections[key]
        await createSection(key, section.part)
        loadKey(key, this)
    }
    clear() {
        content.children().remove()
    }
}