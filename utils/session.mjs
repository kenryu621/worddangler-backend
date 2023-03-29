const onValidSessionId = (onValid, sessions, sessionId) => {
  let session = sessions[sessionId];
  if (session) {
    return onValid(session);
  } else {
    return { error: "invalid session id" };
  }
};

export { onValidSessionId };
