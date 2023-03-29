const onValidSessionId = (onValid, sessions, sessionId) => {
  let session = sessions[sessionId];
  if (session) {
    return onValid(session);
  } else {
    return "invalid session id";
  }
};

export { onValidSessionId };
