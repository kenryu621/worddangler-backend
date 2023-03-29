/* Perform action if session id is valid, therwise return erro obj
 * @param {function} onValid action
 * @param {Object} session obj to check in
 * @param {String} sessionId to validate
 */
const onValidSessionId = (onValid, sessions, sessionId) => {
  let session = sessions[sessionId];
  if (session) {
    return onValid(session);
  } else {
    return { error: "invalid session id" };
  }
};

export { onValidSessionId };
