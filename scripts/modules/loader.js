import { Sections } from "./sections.js"
import * as Parts from "./parts/allParts.js"

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

export class Loader {
    async download() {
        await forEach(async (key, section) => {
            this[key] = {}
            this[key].data = await loadJSON(section.dataFile, section.sort)
            const template = await load(section.template)
            this[key].template = new PartConstructor(template, Parts[section.part])
        })
    }
    async load() {
        await forEach((key, section) => {
            this.loadKey(key)
        })
    }
    loadKey(key) {
        const container = $("#"+key)
        const item = this[key]
        for (const data of item.data) {
            const element = item.template.create(data)
            container.append(element.element)
        }
    }
}