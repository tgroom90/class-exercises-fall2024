import React from "react";
import { Carousel } from 'antd';
import { Image } from 'antd';

export default function App() {

    const carouselStyles = {
        "width": "640px",
        "border": "solid 1px #000",
        "margin": "auto"
    };

    const albums = [
        {
            "id": "6BzxX6zkDsYKFJ04ziU5xQ",
            "name": "COWBOY CARTER",
            "image_url": "https://i.scdn.co/image/ab67616d0000b2731572698fff8a1db257a53599",
            "spotify_url": "https://open.spotify.com/album/6BzxX6zkDsYKFJ04ziU5xQ"
        },
        {
            "id": "2UJwKSBUz6rtW4QLK74kQu",
            "name": "BEYONCÉ [Platinum Edition]",
            "image_url": "https://i.scdn.co/image/ab67616d0000b2730d1d6e9325275f104f8e33f3",
            "spotify_url": "https://open.spotify.com/album/2UJwKSBUz6rtW4QLK74kQu"
        },
        {
            "id": "6PeoltoiWQWCyWA0JBHVGN",
            "name": "16 CARRIAGES",
            "image_url": "https://i.scdn.co/image/ab67616d0000b273f5220893852002a2a3078bab",
            "spotify_url": "https://open.spotify.com/album/6PeoltoiWQWCyWA0JBHVGN"
        },
        {
            "id": "6oxVabMIqCMJRYN1GqR3Vf",
            "name": "Dangerously In Love",
            "image_url": "https://i.scdn.co/image/ab67616d0000b27345680a4a57c97894490a01c1",
            "spotify_url": "https://open.spotify.com/album/6oxVabMIqCMJRYN1GqR3Vf"
        },
        {
            "id": "2m1enA3YrMLVvR3q0MqLpL",
            "name": "COWBOY CARTER",
            "image_url": "https://i.scdn.co/image/ab67616d0000b2734903a9678d5664b9cd9a3fd8",
            "spotify_url": "https://open.spotify.com/album/2m1enA3YrMLVvR3q0MqLpL"
        }
    ];

    function albumToJSX(albumJSON) {
        return (
            <div key={albumJSON.id}>
                <img src={albumJSON.image_url} />
                <h3>{albumJSON.name}</h3>
            </div>
        )
    }

    //Not sure where this goes or what it does
    const [tracks, setTracks] = useState([]);

    // Not sure how to use this or if it works
    const renderIframes = (tracks) => {
        return tracks.map((track) => (
            <iframe
                key={track.id}  // Unique key for each iframe
                src={`https://open.spotify.com/embed/track/${track.id}`}  // Spotify embed URL with track ID
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={track.name}  // Track name as the iframe title for accessibility
            ></iframe>
        ));
    };

    // Partial or complete code stub from assignment?? I'm not sure.
    async function fetchData() {
        const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
        const url = `${baseURL}?q=${searchTerm}&type=${dataType}&limit=5`;
        const request = await fetch(url);
        const data = await request.json();
        console.log(data);
        // set state variable to redraw...
        // I am not sure what to do here or what the above comment is referring to. What state variable?? How do we redraw it???
    }

    return (
        // Much of this is placeholder for now
        <><Form
            form={form}
            layout="vertical" // Layout of the form
            onFinish={onFinish} // Handle form submission
            initialValues={{ songLimit: 10 }} // Default value for the number of songs
        >
            <Form.Item
                label="Search Term"
                name="searchTerm"
                rules={[{ required: true, message: 'Please enter a search term!' }]}
            >
                <Input placeholder="e.g., Beyonce" />
            </Form.Item>

            <Form.Item
                label="Number of Songs"
                name="songLimit"
                rules={[
                    { required: true, message: 'Please enter the number of songs!' },
                    { type: 'number', min: 1, max: 20, message: 'Enter a number between 1 and 20' },
                ]}
            >
                <InputNumber min={1} max={20} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Search
                </Button>
            </Form.Item>
        </Form>

            <div style={carouselStyles}>
                <Carousel dotPosition="top">
                    {albums.map(albumToJSX)}
                </Carousel>
            </div></>
    );
}