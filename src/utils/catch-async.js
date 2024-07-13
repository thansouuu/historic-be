const catchAsync = (fn) => (req, res, next) => {
    const handlerResult = fn(req, res, next);
    Promise.resolve(handlerResult).catch((err) => next(err));
};
export default catchAsync;
