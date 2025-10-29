Continue building the analytics dashboard using the established tech stack (Next.js 14, Firebase 12, Tailwind CSS 3, and Tremor 3). Generate the code for two new sections based on the following requirements:

1. Payment Analytics View:

Create a new page or a large dashboard section (app/dashboard/payments/page.tsx) dedicated to "Payment Details."

Tabs: Use Tremor's <TabGroup> and <TabList> to create two distinct views: "Successful Payments" and "Expired/Pending Payments".

Data Table: Under each tab, implement a Tremor <Table> to display the payment details.

The "Successful Payments" table must include columns: User (Email), Payment Method, Purchase Date, and Paid Date.

The "Expired/Pending Payments" table must include columns: User (Email), Payment Method, Purchase Date, and Expiry Date.

Data Source: Fetch data from the payments collection in Firestore.

Filter data where status == 'success' (or similar) for the first tab.

Filter data where status == 'expired' or status == 'pending' for the second tab.

2. User Engagement & Balance Analysis:

Add a new section to the main dashboard (app/dashboard/page.tsx) to analyze user registration and free-trial balance usage.

Component 1: Recent Registrations

Display: Use a Tremor <Card> with a <Title>Recent Users</Title> and a <Table>.

Data: Show the 5 most recently registered users from the users collection (query sorted by createdAt descending).

Columns: User (Email), Registration Date.

Component 2: User Balance KPIs

Display: Use a <Grid> of Tremor <Kpi> or <Card> components to show the following metrics. Assume the balance field in the users collection is stored in minutes.

KPI 1 (Premium): "Users with Balance > 5 Mins" (Count of users where balance > 5).

KPI 2 (Unused Trial): "Users with 5 Mins" (Count of users where balance == 5).

KPI 3 (Active Trial): "Users < 3 Mins" (Count of users where balance < 3 AND balance > 0).

Component 3: Trial Usage Conclusion (Summary Card)

Display: Use a Tremor <Card> with a <Title>Free Trial Adoption</Title>.

Requirement: Calculate and display the percentage of users who have used their initial 5-minute free trial.

Logic: The calculation must be: (Total users with balance < 5) / (Total registered users) * 100.

Visualization (Recommended): Use a Tremor <DonutChart> or <ProgressBar> to visualize this percentage, showing "Used Trial" vs. "Unused Trial".