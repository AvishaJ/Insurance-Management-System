function logout(req,resp)
{
    resp.cookie("mytoken",'none',{
        expires: new Date(Date.now()+ 0*1000),
    })
    resp.status(200).send("You Logged out Successfully");
}

module.exports = {logout};