const standardSort = (a, b) => {
    const compare = (a, b) => {
        if (a < b) { return -1 }
        if (a > b) { return 1 }
        return 0
    }
    return compare(a.corp, b.corp) || compare(a.brand, b.brand) || compare(a.type, b.type)
}

export const Sections = {
    cyberware: {
        template: "html/cyberware.html",
        dataFile: "data/cyberware.json",
        sort: standardSort,
        part: "Cyberware"
    },
    gear: {
        template: "html/gear.html",
        dataFile: "data/gear.json",
        sort: standardSort,
        part: "Gear"
    }
}