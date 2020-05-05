import { HTMLParts } from "./modules/htmlParts.js"
import { DataLoader, DataFiles } from "./modules/dataLoader.js"

const parts = new HTMLParts()

$(async () => {
    await parts.download()
    let cyberwareData = new DataLoader()
    await cyberwareData.load(DataFiles.cyberware)
    let container = $("#cyberware")
    for (const data of cyberwareData.data) {
        const cyberware = parts.cyberware.create(data)
        container.append(cyberware.element)
    }
}) 