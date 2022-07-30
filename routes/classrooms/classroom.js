const router = require("express").Router();
const verify = require('../../middleware/auth');
const {v4: uuidV4} = require('uuid');
const User = require("../../models/user");
const meetingSchema = require("../../models/meetings");
const io = require('socket.io');

router.get('/create_meeting', verify, async (req, res) => {
    let meetingId = uuidV4();
    const meeting = new meetingSchema({
        meeting_id: meetingId,
        user_id: req.user._id,
    });
    var user = await User.findById(req.user._id);
    if (user.type != "teacher") {
        return res.status(400).send({message: 'you are not authorised to perform this action'});
    } else {
        const savedMeeting = await meeting.save();
        res.send({'meeting': savedMeeting},);
    }

});

router.get("/my_meetings", verify, async (req, res) => {
        const meetings = await meetingSchema.where({user_id: req.user._id});
        res.send({
            "success": true,
            "meetings": meetings
        });
    },
);

router.get("/student_meetings", verify, async (req, res) => {
        var user = await User.findById(req.user._id);
        var meeting = await meetingSchema.findById(req.meeting_id);
        console.log(meeting)

    },
);

router.post("/add_user_to_meeting", verify, async (req, res) => {
        var user = await User.findById(req.user._id);
        let meeting = await meetingSchema.findById(req.body.meeting_id);
        console.log(req.body)
        if (meeting) {
            if (user.type != "teacher") {
                return res.status(400).send({message: 'you are not authorised to perform this action'});
            } else {
                if (meeting.user_id == user.id) {
                    if (meeting.permitted_users.includes(req.body.student_id)) {
                        return res.status(400).send({message: 'user was already added '});
                    }else{
                        meeting.permitted_users.push(req.body.student_id);
                        const savedMeeting = await meeting.save();
                        res.send({'meeting': savedMeeting},);
                    }
                }
            }
        } else {
            return res.status(400).send({message: 'sorry could not find meeting '});
        }

    },
);

router.post("/remove_user_from_meeting", verify, async (req, res) => {
        var user = await User.findById(req.user._id);
        let meeting = await meetingSchema.findById(req.body.meeting_id);
        console.log(req.body)
        if (meeting) {
            if (user.type != "teacher") {
                return res.status(400).send({message: 'you are not authorised to perform this action'});
            } else {
                if (meeting.user_id == user.id) {
                    if (meeting.permitted_users.includes(req.body.student_id)) {
                        const index  = meeting.permitted_users.indexOf(req.body.student_id);
                        if (index > -1) { // only splice array when item is found
                            meeting.permitted_users.splice(index, 1); // 2nd parameter means remove one item only
                        }
                        meeting.save();
                        return res.send({"message": "user was removed"});
                    }else{
                        return res.status(400).send({message: 'Oops something went wrong'});
                    }
                }
            }
        } else {
            return res.status(400).send({"success": false ,message: 'sorry could not find meeting '});
        }
    },
);

router.get("/:roomId", verify, async (req, res) => {
        res.send(`jahman ${req.params.roomId}`);
    },
);


module.exports = router;