exports.handler = async (event, context) => {
  const guides = [
    { title: 'Beat all Zelda bosses like a boss', author: 'mario' },
    { title: 'Mario kart shortcuts you never knew exited!', author: 'luigi' },
    { title: 'Ultimate street fighter guide', author: 'mario & luigi' },
  ];

  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(guides),
    };
  }

  return {
    statusCode: 401,
    body: JSON.stringify({
      message: 'Ah, ah, ah, you must be logged in to see this!',
    }),
  };
};
