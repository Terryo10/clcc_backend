const router = require("express").Router();
const verify = require('../../middleware/auth');
const {v4: uuidV4} = require('uuid');
const User = require("../../models/user");
const meetingSchema = require("../../models/meetings");

router.get('/create_meeting', verify, async (req, res) => {
    let meetingId = uuidV4();
    const meeting = new meetingSchema({
        meeting_id: meetingId,
        user_id: req.user._id,
    });
    const savedMeeting = await meeting.save();
    res.send({'meeting': savedMeeting},);
});

router.get("/my_meetings", verify, async (req, res) => {
    const meetings = await meetingSchema.where({ user_id: req.user._id });
        res.send({"meetings" :  meetings});
    },
);

router.get("/:roomId", verify, async (req, res) => {
        res.send(`jahman ${req.params.roomId}`);
    },
);




module.exports = router;