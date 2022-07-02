/**
 * This function format data json
 * @param message
 * @param data
 * @param statusCode
 */
const dataSuccess = function (message, data, statusCode = 200) {
    return {
        statusCode,
        success: true,
        message,
        data,
    };
};

/**
 * This function format data json
 * @param message
 * @param statusCode
 * @param errorCode
 * @param data
 * @return {{status: number, success: boolean, error_code: string, message: string, data: *}}
 */
const dataError = function (message, errorCode = '', statusCode = 400, data = null) {
    return {
        statusCode: statusCode || 400,
        success: false,
        data: {
            errorCode: errorCode || 'BAD_REQUEST',
            messageCode: message || 'Something goes wrong, please try again or contact the administrator.',
            data
        },
    };
};

const jsonFormat = {
    dataSuccess,
    dataError,
};

module.exports = jsonFormat;