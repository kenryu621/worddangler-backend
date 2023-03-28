/*Create initial game state
 * @return {Object} gameState
 * @return {Array} gameState.payers players array with default admin player
 * @return {Number} gameState.time current time for vote
 * @return {Number} gameState.hangmanState state of hangman
 * @return {String} gameState.wordState state of guessed word
 */
const createGameState = () => ({
  players: [{ isAdmin: true, username: "" }],
  time: 0,
  hangmanState: 0,
  wordState: "",
});

export { createGameState };
