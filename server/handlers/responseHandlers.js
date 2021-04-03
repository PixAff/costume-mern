/// THIS IS NOT WORKING!

export const normalize = (fn) => {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

// export const fehler = (fn) => {
//   res.status(422).json({ message: fn });
//   // const err = new Error('Not Found');
//   // err.status = 404;
//   // next(err);
// };

export const developmentErrors = (err, req, res, next) => {
  console.log("Fehler", next);
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
  };
  res.status(err.status || 500).json(errorDetails);
};
