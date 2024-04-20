import { ZodError, ZodIssue } from 'zod';
import { TErrorSources, TGenericErrorResponse } from './err.interface';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSources: TErrorSources = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        };
    });

    const statusCode = 400;

    const errorMessage = errorSources.map(error => error.message).join(" ");
    return {
        statusCode,
        message: errorMessage,
        errorSources,
    };
};

export default handleZodError;
