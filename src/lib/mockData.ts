// Mock data for PharmaGO Health prototype


export const patients = [
  { id: "P001", name: "Sarah Johnson", age: 34, phone: "+1 555-0123", status: "checked-in", appointmentTime: "09:30 AM" },
  { id: "P002", name: "Michael Chen", age: 45, phone: "+1 555-0124", status: "waiting", appointmentTime: "10:00 AM" },
  { id: "P003", name: "Emily Davis", age: 28, phone: "+1 555-0125", status: "with-doctor", appointmentTime: "10:30 AM" },
  { id: "P004", name: "James Wilson", age: 52, phone: "+1 555-0126", status: "completed", appointmentTime: "11:00 AM" },
  { id: "P005", name: "Lisa Anderson", age: 39, phone: "+1 555-0127", status: "pending", appointmentTime: "11:30 AM" },
];

export const appointments = [
  { id: "A001", patientName: "Sarah Johnson", doctor: "Dr. Smith", time: "09:30 AM", type: "General Checkup", status: "confirmed" },
  { id: "A002", patientName: "Michael Chen", doctor: "Dr. Patel", time: "10:00 AM", type: "Follow-up", status: "confirmed" },
  { id: "A003", patientName: "Emily Davis", doctor: "Dr. Smith", time: "10:30 AM", type: "Consultation", status: "in-progress" },
  { id: "A004", patientName: "James Wilson", doctor: "Dr. Garcia", time: "11:00 AM", type: "Lab Review", status: "completed" },
  { id: "A005", patientName: "Lisa Anderson", doctor: "Dr. Patel", time: "11:30 AM", type: "General Checkup", status: "pending" },
];

export const prescriptions = [
  { id: "RX001", patientName: "James Wilson", doctor: "Dr. Garcia", date: "Dec 5, 2025", medications: ["Amoxicillin 500mg", "Ibuprofen 400mg"], status: "ready" },
  { id: "RX002", patientName: "Sarah Johnson", doctor: "Dr. Smith", date: "Dec 4, 2025", medications: ["Metformin 850mg"], status: "pending" },
  { id: "RX003", patientName: "Emily Davis", doctor: "Dr. Smith", date: "Dec 5, 2025", medications: ["Omeprazole 20mg", "Vitamin D3"], status: "processing" },
  { id: "RX004", patientName: "Michael Chen", doctor: "Dr. Patel", date: "Dec 3, 2025", medications: ["Lisinopril 10mg", "Aspirin 81mg"], status: "dispensed" },
];

export const inventory = [
  { id: "M001", name: "Amoxicillin 500mg", stock: 245, minStock: 100, category: "Antibiotics", price: 12.99 },
  { id: "M002", name: "Ibuprofen 400mg", stock: 89, minStock: 150, category: "Pain Relief", price: 8.49 },
  { id: "M003", name: "Metformin 850mg", stock: 312, minStock: 100, category: "Diabetes", price: 15.99 },
  { id: "M004", name: "Omeprazole 20mg", stock: 178, minStock: 80, category: "Gastrointestinal", price: 22.49 },
  { id: "M005", name: "Lisinopril 10mg", stock: 56, minStock: 100, category: "Cardiovascular", price: 18.99 },
  { id: "M006", name: "Aspirin 81mg", stock: 423, minStock: 200, category: "Cardiovascular", price: 5.99 },
  { id: "M007", name: "Vitamin D3", stock: 267, minStock: 100, category: "Supplements", price: 11.99 },
];

export const analyticsData = {
  patientFlow: [
    { hour: "8AM", patients: 12 },
    { hour: "9AM", patients: 28 },
    { hour: "10AM", patients: 45 },
    { hour: "11AM", patients: 38 },
    { hour: "12PM", patients: 22 },
    { hour: "1PM", patients: 15 },
    { hour: "2PM", patients: 42 },
    { hour: "3PM", patients: 51 },
    { hour: "4PM", patients: 35 },
    { hour: "5PM", patients: 18 },
  ],
  noShowRate: 8.5,
  avgWaitTime: 12,
  resourceUtilization: 78,
  todayStats: {
    totalPatients: 156,
    checkedIn: 89,
    completed: 67,
    noShows: 12,
  },
};

export const symptoms = [
  "Headache",
  "Fever",
  "Cough",
  "Fatigue",
  "Body aches",
  "Sore throat",
  "Nausea",
  "Shortness of breath",
  "Chest pain",
  "Dizziness",
];

export const doctors = [
  { id: "D001", name: "Dr. Sarah Smith", specialty: "General Medicine", available: true, nextSlot: "2:30 PM" },
  { id: "D002", name: "Dr. Raj Patel", specialty: "Cardiology", available: true, nextSlot: "3:00 PM" },
  { id: "D003", name: "Dr. Maria Garcia", specialty: "Pediatrics", available: false, nextSlot: "Tomorrow 9:00 AM" },
  { id: "D004", name: "Dr. James Lee", specialty: "Orthopedics", available: true, nextSlot: "4:00 PM" },
];

export const notifications = [
  { id: 1, title: "Appointment Confirmed", message: "Your appointment with Dr. Smith is confirmed for tomorrow at 10:00 AM", time: "2 min ago", read: false },
  { id: 2, title: "Prescription Ready", message: "Your prescription is ready for pickup at MediCare Pharmacy", time: "1 hour ago", read: false },
  { id: 3, title: "Lab Results Available", message: "Your blood test results are now available", time: "3 hours ago", read: true },
];
