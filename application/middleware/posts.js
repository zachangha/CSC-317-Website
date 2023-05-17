const { error } = require("console");
var pathToFFMPEG = require("ffmpeg-static");
var exec = require("child_process").exec;
var ffmpeg = require("fluent-ffmpeg");

module.exports = {
  makeThumbnail: function (req, res, next) {
    if (!req.file) {
      next(new Error("File upload failed"));
    } else {
      var destinationOfThumbnail = `public/images/uploads/thumbnail-${
        req.file.filename.split(".")[0]}.png`;
        ffmpeg(req.file.path)
        .thumbnail({
          count:1,
          timemarks:['1'],
          folder: 'public/images/uploads',
          filename: `thumbnail-${req.file.filename.split(".")[0]}.png`,
          size: '200x200'
        })
        .on ('end', () => {
          req.file.thumbnail = destinationOfThumbnail;
          next();
        })
        .on ('error', (err) => {
          next(error);
        })
      // try {
      //   var destinationOfThumbnail = `public/images/uploads/thumbnail-${
      //     req.file.filename.split(".")[0]
      //   }.png`;
      //   var thumbnailCommand = `${pathToFFMPEG} -ss 00:00:01 -i ${req.file.path} -y -s 200x200 -vframes 1 -f image2 ${destinationOfThumbnail}`;
      //   exec(thumbnailCommand);
      //   req.file.thumbnail = destinationOfThumbnail;
      //   next();
      // } catch (error) {
      //   next(error);
      // }
    }
  },
  getPostsForUserById: function (req, res, next) {},
  getPostById: function (req, res, next) {},
  GetCommentsForPostById: function (req, res, next) {},
  GetRecentPosts: function (req, res, next) {},
};
