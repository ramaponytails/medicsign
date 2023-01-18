async function success(res, data) {
  await res.send({
    success: true,
    data,
  });
}

async function error(res, error) {
  await res.send({
    success: false,
    error
  });
}

async function sendStatus(res, status, msg) {
  await res.status(status).send(msg);
}

module.exports = {success, error, sendStatus};