function removeAllKeys(object) {
    const keys = Object.keys(object)
    for (const key of keys) {
        if (key === "onRefresh" || key === "private") { continue }
        delete object[key]
    }
}

export default class Parameters {
    constructor() {
        this.refresh() 
        this.private = {}
        this.private.shouldPush = true
	    window.addEventListener('popstate', (event) => {
            this.refresh()
            console.log(this)
            if (this.onRefresh !== undefined) {
                this.private.shouldPush = false
                this.onRefresh(this.target)
            }
        })
    }
    push(target) {
        if (this.private.shouldPush === true) {
            window.history.pushState(null, `The City - ${target}`, `?target=${target}`)
        } else {
            this.private.shouldPush = true
        }
    }
    refresh() {
        removeAllKeys(this)
		const urlParams = window.location.search
        const urlParts = urlParams.split("?")
        if (urlParts.length <= 1) { return }
		const params = urlParts[1].split("&")
		for (const param of params) {
			const parts = param.split("=")
			this[parts[0]] = parts[1]
		}
    }
}