import constants from "../helpers/constants";

const { INTERNAL_SERVER_ERROR } = constants.statusCode;

const errorHandler = (controller) => async (req, res, next) => {
  try {
    return await controller(req, res, next);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({
      message:
        "Sorry, this is not working properly. We now know about this mistake and are working to fix it",
    });
  }
};

export default errorHandler;
