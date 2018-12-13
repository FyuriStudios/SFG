/**
 * This file should be used as an easy intermediary to get card assets by their ID numbers.
 * Since ID number is the way that card IDs are communicated by the server, we'll use these functions to get assets.
 * These assets should just be returned by the path to the image; I don't think it makes sense to turn them into a bitmap first.
 * 
 * @author Hughes
 */

/**
 * Input an ID, get the full card format image.
 * @param id the id number of the card, probably passed in from the server
 * @returns the path to the requested image
 */
export function getCardAsset(id) {
    let path = 'assets/cards/';

    //the test card case
    if(id == -1)
	return path + 'Potato.png'; //TODO: this asset doesn't actually exist yet, lol
    if(id == 1)
	return 'we probably should add more assets';
}

/**
 * Input an ID, get the monster on board format image.
 * @param id the id number of the card, probably passed in from the server
 * @returns the path to the requested image
 */
export function getMonsterAsset(id) {

    let path = 'static/monster_pieces';

    if(id == -1)
	return path + 'Potato.png';
}

export function getQuestAsset(id) {
    let path = 'static/quests' //TODO: this folder doesn't exist yet
}

//TODO: actually export this file so we can use it elsewhere