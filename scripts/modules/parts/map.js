import * as Base from "./basePart.js"

export default class MapPart extends Base.BasePart {
    constructor() {
        super("map")
    }
    async load(key, title) {
        await super.load()
    }
}