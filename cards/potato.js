var Monster = require('../base/Monster')

class Potato extends Monster() {
    
    constructor() {
	super()
    }
    
    get id() {
	return 'Test card, no ID'
    }
    
    get rarity() {
	return 'test'
    }
    
    get name() {
	return 'Potato'
    }
    
    get cost() {
	return 3
    }
    
    get power() {
	return 3
    }
    
    
}