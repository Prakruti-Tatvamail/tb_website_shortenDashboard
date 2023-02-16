import axios from 'axios'
import React, { useState } from 'react'

const baseUrl = 'jzipbscz0.g.tau.link'
const postUrl = async(baseUrl, url) => {
	const res = await axios.post(`https://${baseUrl}/shorten`, {
		url,
		base_url: baseUrl
	})
	return res.data
}

const Dashboard = () => {

    const [url, setUrl] = useState('')
    const [shortenUrl, setShortenUrl] = useState('')

    const handleSubmit = async () => {
        const data = await postUrl(baseUrl, url);
		if(data) setShortenUrl(data.url)
		setUrl('')
    }

    const handleChange = (e) => {
        setUrl(e.target.value);
    }

    return (
        <div>
            <h2>Paste the URL to be shortened!</h2>
            <input type="text" placeholder={"Enter URL here"} onChange={handleChange} value={url} />
            <button onClick={handleSubmit}>Make it short!</button>
            {
                shortenUrl && <h3>Shorten URL: <a href={shortenUrl}>{shortenUrl}</a></h3>
            }
        </div>
    )
}

export default Dashboard
