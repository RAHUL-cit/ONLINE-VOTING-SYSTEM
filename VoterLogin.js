import React, { useState, useEffect } from "react";
import axios from "axios";

const VoterLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post("http://localhost:5000/voter/login", {
                username,
                password
            });
            if (res.status === 200) {
                setIsLoggedIn(true);
                fetchCandidates();
            }
        } catch (error) {
            alert("Invalid voter credentials or you have already voted");
        }
    };

    const fetchCandidates = async () => {
        try {
            const res = await axios.get("http://localhost:5000/admin/results");
            setCandidates(res.data);
        } catch (error) {
            console.log("Error fetching candidates");
        }
    };

    const vote = async () => {
        try {
            await axios.post("http://localhost:5000/voter/vote", {
                voterId: username,
                candidateId: selectedCandidate
            });
            alert("Vote cast successfully");
        } catch (error) {
            alert("Error casting vote");
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    <h2>Voter Login</h2>
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
                    <h2>Select a candidate to vote</h2>
                    <ul>
                        {candidates.map((candidate) => (
                            <li key={candidate._id}>
                                <input
                                    type="radio"
                                    name="candidate"
                                    value={candidate._id}
                                    onChange={(e) => setSelectedCandidate(e.target.value)}
                                />
                                {candidate.name} - {candidate.department}
                            </li>
                        ))}
                    </ul>
                    <button onClick={vote}>Vote</button>
                </div>
            )}
        </div>
    );
};

export default VoterLogin;
