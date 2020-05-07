import { HTMLParts } from "./modules/htmlParts.js"
import { DataLoader, DataFiles } from "./modules/dataLoader.js"

const parts = new HTMLParts()

class Manager {
	constructor(creator, elementId, dataFile) {
		this.creator = creator
		this.container = $("#" + elementId)
		this.loader = new DataLoader()
		this.file = dataFile
		this.load()
	}
	async load() {
		await this.loader.load(this.file)
		for (const data of this.loader.data) {
			const item = this.creator.create(data)
			this.container.append(item.element)
		}
	}
}

$(async () => {
    await parts.download()
    new Manager(parts.cyberware, "cyberware", DataFiles.cyberware)
    new Manager(parts.gear, "gear", DataFiles.gear)
}) 