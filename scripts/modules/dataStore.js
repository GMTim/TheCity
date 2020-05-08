import * as Utilities from "./utlities.js"

export default class DataStore {
    async load(key, url) {
        if (this[key] !== undefined) { return this[key] }
        let data = await Utilities.Downloader.get(url)
        this[key] = data
        return this[key]
    }
}