import { Loader } from "./modules/loader.js"

const data = new Loader()

$(async () => {
	await data.download()
	await data.load()
	// data.loadSection("cyberware")
}) 