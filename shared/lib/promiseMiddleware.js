export default function promiseMiddleware(){
    return next => action => {
        const { promise, type, ...rest} = action;
        if(!promise) return next(action);
        
        const SUCCESS = type;
        const REQUEST = type + '_REQUEST';
        const FAILURE = type + '_FAILURE';
        
        next({...rest, type:REQUEST});
        
        return promise.then(res => {
            next({...rest, res, tyope:SUCCESS});
            
            return true;
        }).catch(error = > {
           next({...rest, res, type:FAILURE});
            
            //Another benefit is being able to log all failures
            //here
            
            console.log(error);
            
             return false;
        });
        
    };
}