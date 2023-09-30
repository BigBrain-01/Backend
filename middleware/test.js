import Test from "../models/Test.js";

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

async function getUniqueId(length) {
    let uniqueId;
    do {
        uniqueId = generateRandomId(length);
    } while (await Test.findOne({ testId: uniqueId }) != null);
    return uniqueId;
};

export const getTestID = async(req,res,next)=>{
    try{
        const id = await getUniqueId(5)
        req.test = {id:id}
        next()
    }catch(err){
        return res.status(500).json(err)
    }
}