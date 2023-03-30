// A state implies all previous states as well. For example, state 3 means
// a hangman has a head and a torso
const hangmanStates = {
  noBody: 0,
  head: 1,
  torso: 3,
  larm: 4,
  rarm: 5,
  lleg: 6,
  rleg: 7,
};
const gameStates = { gameOver: 0, gamePlaying: 1 };
const adminStates = { noAdmin: 0, hasAdmin: 1 };

/*Create initial game state
 * @return {Object} gameState
 * @return {Array} gameState.payers players array with default admin player
 * @return {Number} gameState.time current time for vote
 * @return {Number} gameState.hangmanState state of hangman
 * @return {String} gameState.wordState state of guessed word
 * @return {Number} gameState.gameState state of the game
 * @return {Number} admin.gameState state of the sessionAdmin
 */
const createGameState = () => ({
  players: [],
  time: 0,
  hangmanState: hangmanStates.noBody,
  wordState: "",
  gameState: gameStates.gameOver,
  adminState: adminStates.noAdmin,
});

export { createGameState, adminStates };
