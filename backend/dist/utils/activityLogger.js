"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logActivity = logActivity;
const Activity_1 = require("../models/Activity");
async function logActivity(type, description, email) {
    try {
        const activityData = {
            type,
            description,
        };
        if (email) {
            activityData.email = email;
        }
        await Activity_1.Activity.create(activityData);
    }
    catch (err) {
        // On ne bloque pas le flux métier si le log échoue
        console.error("Échec de journalisation d'activité", err);
    }
}
//# sourceMappingURL=activityLogger.js.map