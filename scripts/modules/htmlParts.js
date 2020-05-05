import * as Parts from "./parts/allParts.js"

const PartFiles = {
    cyberware: "html/cyberware.html"
}
function downloadPart(part) {
    return new Promise((resolve, reject) => {
        $.get(part, (data) => {
            resolve(data)
        }).fail((error) => {
            reject(error)
        })
    })
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

export class HTMLParts {
    constructor() { }
    async download() {
        this.cyberware = new PartConstructor(await downloadPart(PartFiles.cyberware), Parts.Cyberware)
    }
}