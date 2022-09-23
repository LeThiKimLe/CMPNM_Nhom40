const { StatusCodes } = require('http-status-codes');

const messages = {
  GET: 'Get completed',
  CREATE: 'Create completed',
  UPDATE: 'Update completed',
  DELETE: 'Delete completed',
  UNAUTHENTICATE: 'Signin is required',
  UNAUTHORIZE: 'Not allowed to access',
  SERVER_ERROR: 'Server error',
  BAD_REQUEST: 'BadRequest error',
  JWT_EXPIRED: 'Expired token',
};

const Response = (res, data, httpStatus = StatusCodes.OK) =>
  res.status(httpStatus).json({
    ...data,
    httpStatus,
  });
const Get = (res, data) =>
  Response(res, { message: messages.GET, data }, StatusCodes.OK);

const Create = (res, data) => Response(res, data, StatusCodes.CREATED);
const Update = (res, data) =>
  Response(res, {
    message: messages.UPDATE,
    data,
  });

const Delete = (res) => Response(res);
const ServerError = (res, message) =>
  Response(res, { message }, StatusCodes.INTERNAL_SERVER_ERROR);
// yeu cau signin
const Unauthenticated = (res, message) =>
  Response(res, { message }, StatusCodes.UNAUTHORIZED);
// ko cho phep
const Unauthorized = (res, messageText) =>
  Response(
    res,
    { message: !messageText ? messages.UNAUTHORIZE : messageText },
    StatusCodes.FORBIDDEN
  );

const BadRequest = (res, message) =>
  Response(res, { message }, StatusCodes.BAD_REQUEST);

const NotFound = (res, input) =>
  Response(res, { message: `${input} not found` }, StatusCodes.NOT_FOUND);
const JWTExpiredError = (res) => {
  Response(
    res,
    { message: messages.JWT_EXPIRED },
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};
module.exports = {
  Response,
  Get,
  Create,
  Update,
  Delete,
  BadRequest,
  Unauthenticated,
  Unauthorized,
  NotFound,
  ServerError,
  JWTExpiredError,
};
