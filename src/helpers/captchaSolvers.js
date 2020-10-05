require('dotenv').config()
const anticaptcha = require('anticaptcha')

const {
    AntiCaptcha,
    AntiCaptchaError,
    ErrorTypes,
    INoCaptchaTaskProxyless,
    INoCaptchaTaskProxylessResult,
    QueueTypes,
    TaskTypes
} = anticaptcha;

// Registering the API Client.
const AntiCaptchaAPI = new AntiCaptcha(process.env.ANTI_CAPTCH_API_KEY); // You can pass true as second argument to enable debug logs.

module.exports.recaptchaV2Solver = async (websiteKey, websiteURL) => {
    try {
        // Checking the account balance before creating a task. This is a conveniance method.
        if (!(await AntiCaptchaAPI.isBalanceGreaterThan(9))) {
            // You can dispatch a warning using mailer or do whatever.
            console.warn("Take care, you're running low on money !");
        }

        // Creating nocaptcha proxyless task
        const taskId = await AntiCaptchaAPI.createTask({
            type: TaskTypes.NOCAPTCHA_PROXYLESS,
            websiteKey,
            websiteURL
        });

        // Waiting for resolution and do something
        const response = await AntiCaptchaAPI.getTaskResult(taskId, 12, 60000);

        return response.solution.gRecaptchaResponse;
    } catch (e) {
        console.log(e)
    }
};


module.exports.imageCaptchaV2Solver = async (image_base64) => {
    try {
        // Checking the account balance before creating a task. This is a conveniance method.
        if (!(await AntiCaptchaAPI.isBalanceGreaterThan(9))) {
            // You can dispatch a warning using mailer or do whatever.
            console.warn("Take care, you're running low on money !");
        }

        // Creating nocaptcha proxyless task
        const taskId = await AntiCaptchaAPI.createTask({
            type: TaskTypes.IMAGE_TO_TEXT,
            "body": image_base64,
        });

        // Waiting for resolution and do something
        const response = await AntiCaptchaAPI.getTaskResult(taskId);
        return response.solution.text;
    } catch (e) {
        console.log(e)
    }
};