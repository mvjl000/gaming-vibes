exports.handler = async () => {
  console.log('Function runs');

  const data = { name: 'Mario', age: 28, job: 'plumber' };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
