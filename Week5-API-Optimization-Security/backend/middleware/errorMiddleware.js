const logger=require("../logger");

const errorMiddleware=(err,req,res,next)=>{

    logger.error({
        message: err.message,
        method: req.method,
        url: req.originalUrl,
        stack: err.stack
    });

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Server Error"
    });
};

module.exports=errorMiddleware;