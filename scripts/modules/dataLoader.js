export const DataFiles = {
    cyberware: { file: "/data/cyberware.json", sort: (a, b) => {
        const compare = (a, b) => {
            if (a < b) { return -1 }
            if (a > b) { return 1 }
            return 0
        }
        return compare(a.corp, b.corp) || compare(a.brand, b.brand) || compare(a.type, b.type)
    }}
}

export class DataLoader {
    async load(dataFile) {
        this.data = await new Promise((resolve, reject) => {
            $.getJSON(dataFile.file).done((data) => {
                const sortedData = data.sort(dataFile.sort)
                resolve(sortedData)
            }).fail((error) => {
                reject(error)
            })
        })
    }
}