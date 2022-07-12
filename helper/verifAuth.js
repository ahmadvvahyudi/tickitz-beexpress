<<<<<<< HEAD
const jwt = require("jsonwebtoken")
const verifAuth = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({
			success: false,
			message: "No token provided"
		})
	} else {
		jwt.verify(
			req.headers.authorization,
			process.env.JWT_SECRET_KEY,
			function (err, decoded) {
				if (err) {
					return res.status(403).send({
						success: false,
						message: "Access Forbidden"
					})
				}
				if (decoded.role === process.env.ROLE_ADMIN) {
					next()
				} else if (decoded.role === process.env.ROLE_USER) {
					return res.status(403).send({
						success: false,
						message: "Access Forbidden"
					})
				}
			}
		)
	}
}

module.exports = {verifAuth}
=======
const jwt = require('jsonwebtoken');
const verifAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }else{
        jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decoded) {
            if (err) {
                return res.status(403).send({
                    success: false,
                    message:'Access Forbidden'})
    } if (decoded.role=== process.env.ROLE_ADMIN) {
        next();
    } else if (decoded.role=== process.env.ROLE_USER) {
     return res.status(403).send({
        success: false,
        message:'Access Forbidden'})
    }
})
    }
}

module.exports = verifAuth;
>>>>>>> b6008648da60fea951efadf710f5c8d4828c4c96
