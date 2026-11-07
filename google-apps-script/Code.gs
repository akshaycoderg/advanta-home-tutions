/**
 * Advanta Home Tutions — Google Sheets webhook
 * ============================================
 *
 * Paste this file into the Apps Script editor of ONE Google Sheet, then deploy
 * it as a web app. Use the same code in a second Sheet for the other form.
 *
 * Parent sheet: set EXPECTED_TYPE = "parent_enquiry"
 * Tutor sheet:  set EXPECTED_TYPE = "tutor_application"
 *
 * Set SHARED_SECRET to the same long random value you put in the website's
 * GOOGLE_SHEETS_WEBHOOK_SECRET environment variable. Never share the secret or
 * make the spreadsheet public.
 *
 * Deployment:
 *   Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 *
 * Copy the /exec URL into GOOGLE_SHEETS_PARENT_WEBHOOK_URL or
 * GOOGLE_SHEETS_TUTOR_WEBHOOK_URL.
 */

var EXPECTED_TYPE = "parent_enquiry";
var SHARED_SECRET = "REPLACE_WITH_A_LONG_RANDOM_SECRET";
var SHEET_NAME = ""; // Leave blank to use the first sheet in the spreadsheet.

var PARENT_COLUMNS = [
  ["receivedAt", "Received at"],
  ["submittedAt", "Submitted at"],
  ["reference", "Reference"],
  ["status", "Status"],
  ["parentName", "Parent name"],
  ["parentPhone", "Parent phone"],
  ["parentEmail", "Parent email"],
  ["studentName", "Student name"],
  ["studentClass", "Class"],
  ["board", "Board"],
  ["subjects", "Subjects"],
  ["locality", "Locality"],
  ["address", "Full address"],
  ["preferredTiming", "Preferred timing"],
  ["tutorGender", "Tutor preference"],
  ["challenges", "Academic challenges"],
  ["additionalRequirements", "Additional requirements"],
  ["consent", "Consent"],
  ["source", "Source"]
];

var TUTOR_COLUMNS = [
  ["receivedAt", "Received at"],
  ["submittedAt", "Submitted at"],
  ["reference", "Reference"],
  ["status", "Status"],
  ["fullName", "Full name"],
  ["mobile", "Mobile"],
  ["whatsapp", "WhatsApp"],
  ["email", "Email"],
  ["gender", "Gender"],
  ["qualification", "Qualification"],
  ["college", "College / university"],
  ["experienceLevel", "Experience"],
  ["experienceDetails", "Experience details"],
  ["subjects", "Subjects"],
  ["classes", "Classes"],
  ["boards", "Boards"],
  ["areas", "Areas"],
  ["availableDays", "Available days"],
  ["preferredTimings", "Preferred timings"],
  ["expectedMonthlyFee", "Expected monthly fee"],
  ["documentsStored", "Private documents stored"],
  ["source", "Source"]
];

function doGet() {
  return jsonResponse({ ok: true, service: "Advanta Home Tutions lead sheet" });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "missing_body" });
    }

    if (!SHARED_SECRET || SHARED_SECRET.indexOf("REPLACE_WITH_") === 0) {
      return jsonResponse({ ok: false, error: "secret_not_set" });
    }

    var body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return jsonResponse({ ok: false, error: "invalid_json" });
    }

    if (body.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    if (body.type !== EXPECTED_TYPE) {
      return jsonResponse({ ok: false, error: "wrong_sheet" });
    }

    var lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) {
      return jsonResponse({ ok: false, error: "busy" });
    }

    try {
      var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = SHEET_NAME ? spreadsheet.getSheetByName(SHEET_NAME) : spreadsheet.getSheets()[0];
      if (!sheet) {
        sheet = spreadsheet.insertSheet(SHEET_NAME || "Leads");
      }

      var columns = EXPECTED_TYPE === "parent_enquiry" ? PARENT_COLUMNS : TUTOR_COLUMNS;

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(columns.map(function (column) { return column[1]; }));
        sheet.getRange(1, 1, 1, columns.length).setFontWeight("bold");
        sheet.setFrozenRows(1);
      }

      body.receivedAt = new Date().toISOString();
      body.status = body.status || "new";

      var row = columns.map(function (column) {
        var value = body[column[0]];
        return value === undefined || value === null ? "" : value;
      });

      sheet.appendRow(row);

      return jsonResponse({ ok: true, reference: body.reference || "" });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    // Do not return exception details to the caller.
    return jsonResponse({ ok: false, error: "server_error" });
  }
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
