import React, { useState } from "react";
import { Carousel } from 'antd';
import { Form, Input, InputNumber, Button } from 'antd';

export default function App() {

    const [tracks, setTracks] = useState(null);

    const carouselStyles = {
        "width": "640px",
        "border": "solid 1px #000",
        "margin": "auto"
    };

    function trackToJSX(track) {
        return (
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
        )
    }


    async function fetchData(searchTerm, limit) {
        const dataType = "track";
        const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
        const url = `${baseURL}?q=${searchTerm}&type=${dataType}&limit=${limit}`;
        console.log(url);
        const request = await fetch(url);
        const data = await request.json();
        console.log(data);
        setTracks(data);

    }

    const onFinish = (values) => {
        console.log('Success:', values);
        fetchData(values.searchTerm, values.songLimit)
    };
    return (
        // Much of this is placeholder for now
        <><Form
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

            {tracks && <div style={carouselStyles}>
                <Carousel dotPosition="top">
                    {tracks.map(trackToJSX)}
                </Carousel>
            </div>}</>
    );
}