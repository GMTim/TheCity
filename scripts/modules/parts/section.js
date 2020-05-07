let section = undefined
async function getSection() {
    if (section === undefined) {
        section = await new Promise((resolve, reject) => {
            $.get("html/section.html").done((data) => {
                resolve(data)
            }).fail((error) => { reject(error) })
        })
    }
    return $(section)
}

export default class Section {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
    async load() {
        this.element = await getSection()
        this.element.attr("id", this.id)
        this.element.find(".header").text(this.name)
    }
}