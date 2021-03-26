
module.exports.sendResponse = (res, returnData) => {
  try {
    res.send({
      data: returnData.data,
      meta: {
        status: returnData.status,
        msg: returnData.msg
      }
    }).status(returnData.status);
  } catch (e) {
    console.log('Error happend while connecting to the server: ', e);
  }
};
