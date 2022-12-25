
import { validationResult } from 'express-validator';

export default (req, res, next) => {
    
    console.log("Validations OK");

    const errors = validationResult(req);
    if (!errors.isEmpty()){
       return res.status(400).json(errors.array());
    }

    next();
}