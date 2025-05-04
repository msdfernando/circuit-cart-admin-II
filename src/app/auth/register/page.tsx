import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    nic: "",
    phone: "",
    gender: "male",
    points: 0
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Add to Firestore
      const docRef = await addDoc(collection(db, "customers"), {
        ...form,
        createdAt: serverTimestamp(),
        qrCode: `CUSTOMER:${form.nic}` // Simple QR data
      });

      // Add point history
      await addDoc(collection(db, "pointHistory"), {
        customerId: docRef.id,
        points: form.points,
        type: "initial",
        createdAt: serverTimestamp()
      });

      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="p-4">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({...form, fullName: e.target.value})}
          required
        />
        {/* Add NIC, Phone, Gender, Points fields similarly */}
        <button type="submit">Register</button>
      </form>
    </div>
  );
}