ScanMaster - Paper Quiz Scanner (Setup Guide)

ScanMaster is a progressive web app (PWA) allowing teachers to conduct formative assessments by scanning printed QR cards with their phones or laptop cameras. It is built using Vue 3, HTML5, and a Google Apps Script backend.

Follow these two phases to launch your app.

Phase 1: Setup the Google Drive Backend

Since this app needs to save data (class rosters, scores), it uses a Google Sheet as a database to keep your data 100% private and owned by you.

Go to Google Sheets and create a Blank Spreadsheet.

In the top menu, click Extensions > Apps Script.

Delete any code in the editor and paste the complete code from Code.gs (provided in the files above).

Save the project (click the floppy disk icon or press Ctrl+S).

Initialize the Database:

At the top of the editor, select the setupDatabase function from the dropdown.

Click the Run button.

Google will ask for Permissions. Click "Review Permissions" -> Choose your Account -> Click "Advanced" -> Click "Go to Project (unsafe)" -> Click "Allow".

Check your Google Sheet; you should now see 4 tabs (Classes, Students, Quizzes, Results) with headers.

Deploy as a Web App:

Click the blue Deploy button at the top right, then New deployment.

Click the "Select type" gear icon and choose Web app.

Set the configuration to:

Execute as: Me

Who has access: Anyone (Crucial: Do not select "Anyone with a Google Account", it must be just "Anyone" so the frontend app can read it).

Click Deploy.

Copy the Web App URL that is generated. You will paste this into your frontend app!

Phase 2: Host on GitHub Pages (Frontend)

This will make your app accessible as a website and installable on any device.

Create a free account on GitHub.

Create a new repository named ScanMaster.

Upload index.html and sw.js into this repository.

Go to the repository Settings.

Click Pages on the left sidebar.

Under "Build and deployment", set the Source to Deploy from a branch.

Select the main (or master) branch, keep the folder as / (root), and click Save.

Wait a couple of minutes. GitHub will provide you with a live link (e.g., https://yourusername.github.io/ScanMaster/).

Phase 3: Connect and Install

Open the live GitHub Pages link on your computer or phone browser.

The app will welcome you and ask for a Database Connection URL. Paste the Web App URL you copied from Google Apps Script in Phase 1.

Click Connect Database. You are now ready to add classes and scan!

Install as an App:

Android (Chrome): Tap the 3-dot menu and select "Install app" or "Add to Home screen".

iOS (Safari): Tap the Share button (square with arrow) and select "Add to Home Screen".

Windows/Mac (Chrome/Edge): Look for the install icon (monitor with a downward arrow) on the right side of the URL bar.
