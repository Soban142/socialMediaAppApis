const userProfile = (req, res) => {
    console.log(req.params)
    res.status(200).send({
        status: 'success',
        userData: 'userData',
        message: 'got the userData'
    })
}

const updateProfile = (req, res) => {
    console.log(req.params)
    res.status(200).send({
        status: 'success',
        userData: 'updated user data',
        message: 'user data updated successfully'
    })
}

export { userProfile, updateProfile } 