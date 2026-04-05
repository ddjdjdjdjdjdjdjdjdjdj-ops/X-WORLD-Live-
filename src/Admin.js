import React, { useState } from 'react';
import { db, storage } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function Admin() {
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);

    const uploadFile = () => {
        if (!video || !title) return alert("Title and Video are required!");
        
        setLoading(true);
        const storageRef = ref(storage, `videos/${Date.now()}_${video.name}`);
        const uploadTask = uploadBytesResumable(storageRef, video);

        uploadTask.on("state_changed", 
            null, 
            (error) => { alert(error.message); setLoading(false); }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    addDoc(collection(db, "userVideos"), {
                        title: title,
                        url: downloadURL,
                        createdAt: serverTimestamp()
                    });
                    setLoading(false);
                    alert("ভিডিও আপলোড সফল হয়েছে!");
                });
            }
        );
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Admin: Upload Video</h2>
            <input type="text" placeholder="Video Title" onChange={(e) => setTitle(e.target.value)} style={{ width: '100%', marginBottom: '10px' }} />
            <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} style={{ marginBottom: '10px' }} />
            <button onClick={uploadFile} disabled={loading}>
                {loading ? "Uploading..." : "Upload Now"}
            </button>
        </div>
    );
}

export default Admin;
                      
