import Coordinator from "./modules/coordinator.js"
import * as Utlities from "./modules/utlities.js"
import Navigation from "./modules/navigation.js"

const coordinator = new Coordinator()
const navigation = new Navigation()
const parameters = new Utlities.Parameters()

$(async () => {
	navigation.bind()
	navigation.onClick = (element) => {
		coordinator.load(element)
		parameters.push(element)
	}
	navigation.choose(parameters.target)
	parameters.onRefresh = (target) => {
		navigation.choose(target)
	}
}) 