

export async function register(req,res){
    res.json('register router')
}

export async function login(req,res){
    res.json('login router')
}

export async function getUser(req,res){
    res.json('getUser router')
}

export async function updateUser(req,res){
    res.json('updateUser router')
}

export async function generateOTP(req,res){
    res.json('generateOTP router')
}

export async function verifyOTP(req,res){
    res.json('verifyOTP router')
}

export async function createResetSession(req,res){
    res.json('createResetSession router')
}

export async function resetPassword(req,res){
    res.json('resetPassword router')
}