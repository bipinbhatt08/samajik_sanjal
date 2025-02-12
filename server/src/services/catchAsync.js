exports.catchAsync = (fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch((err)=>{
            return res.status(500).json({
                message: "Something went wrong!",
                error: err.message
            })
        })
    }
}