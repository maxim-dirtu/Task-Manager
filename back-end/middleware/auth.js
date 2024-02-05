import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Not valid" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, 'AnaAreMere');
        req.id = payload.id;
        req.role = payload.role;
        return next();
    } catch (error) {
        res.status(401).json({ message: error });
    }  
}

export const validateRole = (requiredRole) => {
    return (req, res, next) => {
        try {
            switch (requiredRole) {
                case ("ADMIN"): {
                    if (req.role !== requiredRole) {
                        return res.status(403).json({ message: `Acces denied: You have to be ${requiredRole} to acces this resource` });
                    }
                    return next();
                }
                case ("MANAGER"): {
                    if (req.role !== requiredRole && req.role !== "ADMIN") {
                        return res.status(403).json({ message: `Acces denied: You have to be ${requiredRole} to acces this resource` });
                    }
                    return next();
                }
                default: {
                    return next();
                }
            }
        } catch (error) {
            console.log("eroare in validator de rol")
            console.log(error)
        }
        
    }
} 