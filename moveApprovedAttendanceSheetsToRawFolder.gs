function moveApprovedAttendanceSheetsToRawFolder() {
  var rawFolderId = '1MH3RUnXw5e429hnDKX7caRT-6p9iIA9l'; // Raw Attendance Folder
  var rawFolder = DriveApp.getFolderById(rawFolderId);

  var allowedAttendanceCodes = [
     "750893788821",
     "753729222722",
     "771657127904",
     "772867795545",
     "772867959465",
     "775448859719",
     "766310821302",
     "769483424711",
     "769770012182",
     "700159948347",
     "770449892966",
     "773673814591",
     "799680500535",
     "774640537837",
     "774393167867"// Add your actual codes here
  ];

  var now = new Date();
  var lookBackMinutes = 720;
  var recentTime = new Date(now.getTime() - lookBackMinutes * 60 * 1000);

  var files = DriveApp.getFiles();

  while (files.hasNext()) {
    var file = files.next();
    var name = file.getName();
    var createdTime = file.getDateCreated();

    // Only move Google Sheets created recently that contain an approved code
    var isAllowed = allowedAttendanceCodes.some(code => name.includes(code));

    if (
      name.includes("Attendance") &&
      file.getMimeType() === "application/vnd.google-apps.spreadsheet" &&
      createdTime >= recentTime &&
      isAllowed
    ) {
      // Avoid re-moving files already in the folder
      var parents = file.getParents();
      var alreadyInRaw = false;
      while (parents.hasNext()) {
        if (parents.next().getId() === rawFolderId) {
          alreadyInRaw = true;
          break;
        }
      }
      if (!alreadyInRaw) {
        file.moveTo(rawFolder);
        Logger.log("Moved approved attendance file: " + name);
      }
    }
  }
}