import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [candidate, setCandidate] = useState({
        name: "",
        photo: "",
        symbol: "",
        department: "",
        rollNo: ""
    });

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/admin/login", {
                username,
                password
            });
            if (res.status === 200) {
                setIsLoggedIn(true);
                alert("Admin login successful");
            }
        } catch (error) {
            alert("Invalid admin credentials");
        }
    };

    const addCandidate = async () => {
        try {
            await axios.post("http://localhost:5000/admin/addCandidate", candidate);
            alert("Candidate added successfully");
        } catch (error) {
            alert("Error adding candidate");
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    <h2>Admin Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            ) : (
                <div>
                    <h2>Add Candidate</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={candidate.name}
                        onChange={(e) =>
                            setCandidate({ ...candidate, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Photo URL"
                        value={candidate.photo}
                        onChange={(e) =>
                            setCandidate({ ...candidate, photo: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Symbol"
                        value={candidate.symbol}
                        onChange={(e) =>
                            setCandidate({ ...candidate, symbol: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Department"
                        value={candidate.department}
                        onChange={(e) =>
                            setCandidate({ ...candidate, department: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Roll No"
                        value={candidate.rollNo}
                        onChange={(e) =>
                            setCandidate({ ...candidate, rollNo: e.target.value })
                        }
                    />
                    <button onClick={addCandidate}>Add Candidate</button>
                </div>
            )}
        </div>
    );
};

export default AdminLogin;
