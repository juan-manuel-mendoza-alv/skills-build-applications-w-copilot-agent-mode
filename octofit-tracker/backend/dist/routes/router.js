"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const resourceRoutes = [
    '/api/users',
    '/api/teams',
    '/api/activities',
    '/api/leaderboard',
    '/api/workouts',
];
resourceRoutes.forEach((route) => {
    const routeVariants = [route, `${route}/`];
    routeVariants.forEach((variant) => {
        router.get(variant, (_req, res) => {
            res.json({
                route: variant,
                message: `${variant} endpoint is ready`,
            });
        });
        router.post(variant, (_req, res) => {
            res.status(201).json({
                route: variant,
                message: `${variant} endpoint is ready`,
            });
        });
    });
});
exports.default = router;
