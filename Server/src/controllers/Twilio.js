require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const AccessToken = require("twilio").jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// create the twilioClient
const twilioClient = require("twilio")(
  process.env.TWILIO_API_KEY_SID,
  process.env.TWILIO_API_KEY_SECRET,
  { accountSid: process.env.TWILIO_ACCOUNT_SID }
);

console.log("Twilio rooms : ", twilioClient.video.rooms);

const findOrCreateRoom = async (roomName) => {
  let room;
  try {
    // see if the room exists already. If it doesn't, this will throw
    // error 20404.
    room = await twilioClient.video.rooms(roomName).fetch();
    console.log(room);
  } catch (error) {
    // the room was not found, so create it
    if (error.code == 20404) {
      await twilioClient.video.rooms.create({
        uniqueName: roomName,
        type: "group",
      });
    } else {
      // let other errors bubble up
      throw error;
    }
  }
};

const getAccessToken = (roomName) => {
  // create an access token
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY_SID,
    process.env.TWILIO_API_KEY_SECRET,
    // generate a random unique identity for this participant
    {
      ttl: 14400,
      identity: uuidv4()
    }
  );
  // create a video grant for this specific room
  const videoGrant = new VideoGrant({
    room: roomName,
  });

  // add the video grant
  token.addGrant(videoGrant);
  // serialize the token and return it
  return token.toJwt();
};

exports.postTwilio = async (req, res) => {
  try {
    const data = req.body;
    findOrCreateRoom(data);
    const token = getAccessToken(data);
    res.send({
      token: token,
      roomName: data.roomName,
    })
  } catch (error) {
    console.log(error);
  }
}
