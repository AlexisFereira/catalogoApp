const uuidv4 = require("uuid").v4;
const path = require('path');

const loadFile = (
  file,
  validExtensions = ["png", "jpg", "jpeg", "gif"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const fileNameExtension = file.name.split(".");
    const fileExtension = fileNameExtension[fileNameExtension.length - 1];

    //validate file extension
    if (!validExtensions.includes(fileExtension)) {
      reject({ ok: false, error: "Invalid file extension." });
      return;
    }

    const tempName = uuidv4() + "." + fileExtension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    try {
      file.mv(uploadPath, function (err) {
        if (err) {
          return reject({ ok: false, error: err });
        }
        resolve({ ok: true, image: tempName });
      });
    } catch (e) {
      return reject({ ok: false, error: e });
    }
  });
};

module.exports = loadFile;
