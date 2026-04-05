import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function App() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "userVideos"), orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setVideos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    return (
        <div style={{ backgroundColor: "#121212", color: "white", minHeight: "100vh", padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Misti AM Video App</h1>
            <div style={{ display: "grid", gap: "20px", justifyContent: "center" }}>
                {videos.map((video) => (
                    <div key={video.id} style={{ background: "#222", padding: "15px", borderRadius: "10px", width: "320px" }}>
                        <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>{video.title}</h3>
                        <video width="100%" controls style={{ borderRadius: "5px" }}>
                            <source src={video.url} type="video/mp4" />
                        </video>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
