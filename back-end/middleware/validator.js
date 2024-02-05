import {body, validationResult} from 'express-validator';

export const validateUser = [
    body('name').isString().withMessage('Name must be a string'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('role').isIn(['ADMIN', 'MANAGER', 'WORKER']).withMessage('Invalid role specified'),
    body('managerId').optional().isInt().withMessage('Manager ID must be an integer')
                    .custom(managerIdExists),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

export const validateTaskAssignment = [
    body('id').isInt().withMessage('Task Id must be an integer')
    .custom(taskIdExists),
    body('workerId').isInt().withMessage('Worker Id must be an integer')
    .custom(workerIdExists),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
    
]

const managerIdExists = value => {
    if (value) {
        return User.findByPk(value).then(user => {
            if (!user) {
                return Promise.reject('Manager ID does not exist');
            }
            if (user.role !== 'MANAGER') {
                return Promise.reject('The provided ID is not a manager');
            }
        });
    }
    return Promise.resolve();
};

const workerIdExists = value => {
    if (value) {
        return User.findByPk(value).then(user => {
            if (!user) {
                return Promise.reject('Worker ID does not exist');
            }
            if (user.role !== 'WORKER') {
                return Promise.reject('The provided ID is not a worker');
            }
        });
    }
    return Promise.resolve();
};

const taskIdExists = value => {
    if (value) {
        return Task.findByPk(value).then(task => {
            if (!task) {
                return Promise.reject('Task does not exist');
            }
        });
    }
    return Promise.resolve();
};
