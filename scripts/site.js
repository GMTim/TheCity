import { HTMLParts } from "./modules/htmlParts.js"
import { DataLoader, DataFiles } from "./modules/dataLoader.js"

const parts = new HTMLParts()


class Manager {
	constructor(parts, id, dataFile) {
		this.parts = parts
		this.container = $("#" + id)
		this.loader = new DataLoader()
		this.file = dataFile
		this.load()
	}
	async load() {
		await this.loader.load(this.file)
	}
}

$(async () => {
    await parts.download()
    new Manager(parts, "cyberware", DataFiles.cyberware)
    /* let cyberwareData = new DataLoader()
    await cyberwareData.load(DataFiles.cyberware)
    let container = $("#cyberware")
    for (const data of cyberwareData.data) {
        const cyberware = parts.cyberware.create(data)
        container.append(cyberware.element)
    } */
}) 