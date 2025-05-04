// src/app/(DashboardLayout)/sample-page/page.tsx
"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function SamplePage() {
  const [customers, setCustomers] = useState<any[]>([]);

  const fetchCustomers = async () => {
    const querySnapshot = await getDocs(collection(db, "customers"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Customer Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">NIC</th>
              <th className="py-2 px-4 border">Points</th>
              <th className="py-2 px-4 border">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="py-2 px-4 border">{customer.fullName}</td>
                <td className="py-2 px-4 border">{customer.nic}</td>
                <td className="py-2 px-4 border">{customer.points}</td>
                <td className="py-2 px-4 border">{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}