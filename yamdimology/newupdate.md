1. New Main Dashboard Widgets (app/dashboard/page.tsx)

Add the following new Tremor widgets to the main dashboard grid:

Total Revenue (Corrected):

Component: A Tremor <Card> with <Title> and <Metric>.

Data Source: The payments collection.

Logic: It must sum the amount field only from documents where the status is 'completed' (or 'success').

Display: The <Metric> must be formatted as Indonesian Rupiah (IDR), e.g., "Rp 15.000.000".

Total Generated Answers:

Component: A Tremor <Card> with <Title>Total Answers Generated</Title> and a <Metric>.

Data Source: The test_results collection (or the relevant collection for answers).

Logic: Get the total count of documents in this collection.

Resume Upload Percentage:

Component: A Tremor <Card> with a <Title>Resume Adoption</Title> and a <DonutChart> or <ProgressBar>.

Data Source: users collection (for total user count) and resumes collection (for resume count).

Logic: Calculate the percentage: (Total documents in resumes) / (Total documents in users) * 100.

Display: Show the percentage of users who have uploaded a resume.

Recent Logins Table:

Component: A Tremor <Card> with a <Title>Recent Logins</Title> and a <Table>.

Data Source: The users collection, sorted by lastLogin timestamp descending, limited to 5.

Display Columns: The table must show User ID (not email) and Last Login Time.

2. Payment Page Update (app/dashboard/payments/page.tsx)

Update the existing payments page to include a dedicated tab for expired payments.

Component: Ensure the Tremor <TabGroup> now includes a <Tab>Expired</Tab>.

Tab Panel (Expired):

Data Source: The payments collection.

Logic: Filter for documents where status == 'expired'.

Display Table: The table for this tab must include columns: User ID, Payment Method, Purchase Date, and Expiry Date.


All generated code must include the actual, functional data-fetching logic from Firebase (using getDocs, onSnapshot, query, where, orderBy, etc.).

The queries must be based on the field names and logic specified in each requirement (e.g., status == 'completed', balance > 5, lastLogin timestamp, amount). You must generate the complete data-fetching functions needed to populate the components.