// ToDo refactoring or delete
export function handleError(err: any, req: any, res: any) {
    console.log(err, req, res);
    const {statusCode, message} = err;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
}
