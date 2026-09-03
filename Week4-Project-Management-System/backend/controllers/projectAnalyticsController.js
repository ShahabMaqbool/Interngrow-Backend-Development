const {
    getProjectAnalytics
} = require("../models/projectAnalyticsModel");

// Get Project Analytics
const getAnalytics = async (req, res) => {
    try {
        const { project_id } = req.params;

        if (!project_id) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }

        const analytics = await getProjectAnalytics(project_id);

        if (!analytics) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Project Analytics Retrieved Successfully",
            data: analytics
        });

    } catch (error) {
        console.error("Project Analytics Error:", error.message);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports = {
    getAnalytics
};