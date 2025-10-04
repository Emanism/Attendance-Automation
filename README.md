# Master Attendance Automation for an EdTech Company

This project is an automated Google Apps Script solution for robustly updating a master attendance register from raw attendance files (Excel/Sheets) in Google Drive. 
It is designed for online EdTech bootcamps/classes, handling common edge cases like flexible tab names, participant nickname matching, and safe merging.

---

## Features

- **Excel/Sheet to Google Sheet conversion:** Converts uploaded Excel files to Google Sheets (requires Advanced Drive API).
- **Flexible tab matching:** Handles inconsistent tab/sheet names (case/space/punctuation insensitive, with section/bootcamp fallback).
- **Name normalization & nickname matching:** Matches participants using first/last names, full names, and optional aliases.
- **Safe attendance merging:** Never overwrites a previous “present” mark (1) with “absent” (0) for a given date.
- **Automatic processing:** Moves processed files to an archive folder and cleans up temp converted files.
- **Duration threshold:** Marks “present” only if participant duration meets a configurable minimum (default 45 minutes).
- **Verbose logging:** Optional debug logs for maintainers.

---

## Workflow & How It Works

1. **Raw Attendance Files:** Attendance exports (from Zoom, Google Meet, etc.) are uploaded to a "Raw Attendance" folder in Google Drive.
2. **Script Processing:**
    - Converts Excel to Google Sheet if needed.
    - Extracts session metadata (bootcamp, section, date) from filename.
    - Parses participant names and attendance durations.
    - Matches participants to canonical names in the master sheet using a robust matching algorithm.
    - Updates the master attendance sheet, safely merging new data.
    - Moves processed files to an archive ("Processed") folder.
3. **Attendance Marking:**
    - Only participants meeting the minimum session duration are marked present (default 45 mins).
    - Nicknames/aliases are mapped to canonical names (can be customized).
    - Fuzzy matching is used for edge cases.
    - If a participant is already marked present for a date, their status is not overwritten.

---

## Setup

### Prerequisites

- Google Workspace account with access to Google Drive and Google Sheets.
- [Enable Advanced Drive Service](https://developers.google.com/apps-script/advanced/drive) in your Apps Script project.

### Configuration

Set the following global variables at the top of the script:

```js
var RAW_FOLDER_ID       = '<YOUR_RAW_FOLDER_ID>';
var PROCESSED_FOLDER_ID = '<YOUR_PROCESSED_FOLDER_ID>';
var MASTER_SHEET_ID     = '<YOUR_MASTER_SHEET_ID>';
var MIN_DURATION_MIN    = 45; // Minimum duration (minutes) to be marked present
var DEBUG               = false; // Set to true for verbose logs
```

You can also customize the `nicknameMap` object to handle common aliases for participant names.

---

## Usage

1. **Upload raw attendance files** (Excel or Google Sheets) into your designated Raw Attendance folder in Google Drive.
2. **Run the main script function:**
    - `processRawAttendanceSheets()`  
      This will process, update, and archive the attendance files.
3. (Optional) Use `moveApprovedAttendanceSheetsToRawFolder()` to automatically move valid attendance Sheets into the Raw folder based on allowed codes.

---

## Customization

- **Nickname/Alias Mapping:**  
  Edit the `nicknameMap` object to map common alternate names to canonical names.
- **Duration Threshold:**  
  Change `MIN_DURATION_MIN` if your “present” criteria differs.

---

## Advanced Features

- **Tab Name Flexibility:**  
  The script matches master sheet tabs using various heuristics (case-insensitive, ignoring spaces/punctuation, with section fallback).
- **Date Parsing:**  
  Extracts date from filename, or falls back to file created time.
- **Attendance Safety:**  
  Never overwrites an existing "present" mark (1) with "absent" (0) for the same date.
- **Robust Name Matching:**  
  Uses first+last, full, token, and fuzzy matching. Handles honorifics/titles and typo resilience.

---

## Extending

- **Additional Attendance Codes:**  
  Add codes to `allowedAttendanceCodes` in `moveApprovedAttendanceSheetsToRawFolder()` as needed.
- **Section/Bootcamp Parsing:**  
  Tweak `computeSheetMetaFromFilename()` if your file naming convention changes.

---

## Limitations

- Script assumes a specific master attendance sheet format (roster in column A, dates in row 1).
- Requires Google Apps Script execution quotas (may need admin privileges for large data sets).

---

## Troubleshooting

- **No files processed:**  
  - Ensure your folder IDs are correct.
  - Check file naming conventions and allowed codes.
- **Attendance not updated:**  
  - Check that participant names in raw files can be matched (update `nicknameMap` if needed).
- **Script errors:**  
  - Enable DEBUG mode for verbose logs.
  - Make sure Advanced Drive API is enabled in your Apps Script project.

---

## License

MIT License (or specify your organization’s policy)

---

## Author

-  Shahzadi Eman
-  atomcamp
-  shahzadieman1122@gmail.com
