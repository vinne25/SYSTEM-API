const User = require('../models/user');

exports.listUsers = async (req, res) =>{
    try{
        const users = await User.findAll(
            {
                attributes: ['id','username','loginuser','active'],
            });
            if (users.length ===0){
                return res.status(404).json({message:'Users not found'})
            }
            res.json(users);
    }catch(error) {
        res.status(500).send(error.message);
    }
};

exports.activeUsers = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: {id: id}});
        
        if (user){
            user.active = true;
            await user.save();
            res.status(200).json({message: 'User activated successfuly'});
        } else{
            res.status(400).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deactiveUsers = async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: {id: id}});
        
        if (user){
            user.active = false;
            await user.save();
            res.status(200).json({message: 'User deactivated successfuly'});
        } else{
            res.status(400).send('User not found')
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};