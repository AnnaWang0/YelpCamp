export default catchAsync => {
    return (req, res, next) => {
        catchAsync(req, res, next).catch(next);
    }
}