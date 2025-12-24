
---

# **SwiftParcel – Parcel Delivery Frontend**

**Live Demo:** [https://swiftparcel.vercel.app](https://swiftparcel.vercel.app)

**Frontend Repository:** [GitHub Client](https://github.com/habibur5313/SwiftParcel)

**Backend Repository:** [GitHub Backend](https://github.com/habibur5313/parcel-delivery-system-backend)

**Backend API URL:** [https://parcel-delevery-system-backend.vercel.app/](https://parcel-delevery-system-backend.vercel.app/)

---

## **Project Overview**

*SwiftParcel* is a secure, role-based, and user-friendly frontend application for a Parcel Delivery System, built with **React.js**, **Redux Toolkit**, and **RTK Query**.

The app interacts with a REST API backend to enable **Senders**, **Receivers**, and **Admins** to perform parcel operations, manage records, and track shipments efficiently. The UI is fully responsive, clean, and modern using **Tailwind CSS**.

---

## **Tech Stack**

**Frontend:**

* React.js + TypeScript
* Redux Toolkit & RTK Query (state management & API calls)
* Tailwind CSS (styling)
* React Hook Form + Zod (form handling & validation)
* Radix UI components (Dialog, Dropdown, Tooltip, etc.)
* Sonner / SweetAlert2 (notifications)

**Backend (API):**

* Node.js + Express
* MongoDB + Mongoose
* JWT + bcrypt (authentication & authorization)

---

## **Key Features**

### **1. Public Landing Pages**

* **Home:** Service introduction and overview.
* **About:** Mission, vision, and team info.
* **Contact:** Inquiry form (simulated submission).

### **2. Authentication**

* JWT-based login & registration.
* Role-based redirection (Sender, Receiver, Admin).
* Persisted authentication state (remains logged in after refresh).
* Logout functionality.

### **3. Sender Dashboard**

* Create parcel delivery requests.
* Cancel parcel (if not dispatched).
* View all created parcels with detailed status logs.

### **4. Receiver Dashboard**

* View incoming parcels.
* Confirm parcel delivery.
* View delivery history.

### **5. Admin Dashboard**

* Manage all users (block/unblock).
* Manage all parcels (block/unblock, update delivery status).
* Optional: Assign delivery personnel.

### **6. Parcel Tracking**

* Unique tracking ID for each parcel.
* Search parcels by tracking ID (public or authenticated).
* Detailed parcel status timeline (status, timestamp, updatedBy, notes).

### **7. General Features**

* Role-based navigation menus.
* Loading indicators and global error handling.
* Form validations: required fields, numeric checks, positive amounts.
* Pagination and advanced filtering for tables.
* Toast notifications for success/error messages.

### **8. Dashboard & Data Visualization**

* **Overview Cards:** Total parcels, Delivered, In Transit, Pending/Cancelled.
* **Charts:** Bar/pie charts showing parcel trends and delivery status.
* **Parcel Table:** Paginated, searchable, filterable with actions (View, Cancel, Confirm).
* **Status Timeline:** Visual parcel update history.
* Responsive and mobile-friendly design.

---

## **UI/UX Considerations**

* Fully responsive design across devices.
* Consistent margins, spacing, and typography.
* Accessible color contrast for readability.
* Performance optimized via lazy-loading and skeleton loaders.
* Realistic data used instead of placeholders.

---

## **Setup Instructions**

1. **Clone Repository**

```bash
git clone https://github.com/habibur5313/Delivery-Express-Frontend.git
cd Delivery-Express-Frontend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Run Development Server**

```bash
npm run dev
```

4. **Build for Production**

```bash
npm run build
npm run preview
```

---

## **Credentials for Demo**

* **Admin:** `admin@example.com / Password123#`
* **Sender:** `sender@example.com / Password123#`
* **Receiver:** `receiver@example.com / Password123#`

*(Note: Replace with actual credentials if different)*

---

## **Code Quality & Guidelines**

* Modular and reusable components.
* Well-documented code.
* Clean commit history (minimum 10 meaningful commits for frontend and backend).
* Uses TypeScript for type safety.

---

## **Package.json (Frontend Summary)**

* React 19.x, React Router 7.x
* Redux Toolkit 2.8.x, RTK Query
* Tailwind CSS 4.x, Tailwind Merge
* Zod + React Hook Form for validation
* Axios for API requests
* Radix UI components for accessibility

---