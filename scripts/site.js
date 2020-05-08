import Coordinator from "./modules/coordinator.js"
import * as Utlities from "./modules/utlities.js"

const coordinator = new Coordinator()

$(async () => {
	coordinator.load(Utlities.Keys.cyberware)
}) 