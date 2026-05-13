import { useEffect, useState } from "react";
import "../../styles/addUser.css";
import { customersService } from "../../api/customersService";

type User = {
  id: number;
  name: string;
  phone: string;
};

export default function AddUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  /////////////////////////////////////////////////////////
  //        GET CURRENT BARBER FROM LOCALSTORAGE         //
  /////////////////////////////////////////////////////////
  const getBarber = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  };

  /////////////////////////////////////////////////////////
  //              GET CUSTOMERS BY BARBER ID            //
  /////////////////////////////////////////////////////////
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const barber = getBarber();

        if (!barber?.id) return;

        const data = await customersService.get(barber.id);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  /////////////////////////////////////////////////////////
  //                 ADD NEW CUSTOMER                   //
  /////////////////////////////////////////////////////////
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone) return;
    const barber = getBarber();

    try {
      const newUser = await customersService.create({
        name,
        phone,
        barber_id: barber.id,
      });

      setUsers((prev) => [...prev, newUser]);

      setName("");
      setPhone("");
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  /////////////////////////////////////////////////////////
  //                 DELETE CUSTOMER                    //
  /////////////////////////////////////////////////////////
  const handleDelete = async (id: number) => {
    try {
      await customersService.delete(id);

      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting customer217809:", error);
    }
  };

  return (
    <div className="add-user-page">
      {/* الفورم */}
      <form className="user-form" onSubmit={handleAddUser}>
        <h2>Add Customer</h2>

        <input
          type="text"
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {/* الجدول */}
      <div className="table-container">
        <h2>Customers List</h2>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4}>No customers yet</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(user.id)}
                      style={{ color: "red" }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
