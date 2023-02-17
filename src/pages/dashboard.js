import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { formSchema } from '../schemas'

const baseUrl = 'jzipbscz0.g.tau.link'
const postUrl = async (baseUrl, url) => {
    const res = await axios.post(`https://${baseUrl}/shorten`, {
        url,
        base_url: baseUrl
    })
    return res.data
}

const Dashboard = () => {

    const [shortenUrl, setShortenUrl] = useState('')

    const initialValues = {
        url: ""
    }

    const {
        values,
        errors,
        handleChange,
        handleBlur,
        resetForm,
        handleSubmit
    } = useFormik({
        initialValues: initialValues,
        validationSchema: formSchema,
        onSubmit: async (values) => {
            const data = await postUrl(baseUrl, values.url);
            if (data) setShortenUrl(data.url)
            resetForm();
        }
    });

    return (
        <div className='container'>
            <h2>Paste the URL to be shortened!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder={"Enter URL here"}
                        name="url"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.url} 
                        style={{width: '300px', height: '30px'}}
                        /><br />
                    {errors && errors.url && (<span style={{ color: "red" }}>{errors.url}</span>)}
                </div>
                <button type="submit">Make it short!</button>
            </form>
            {
                shortenUrl && <h3>Shorten URL: <a href={shortenUrl}>{shortenUrl}</a></h3>
            }

        </div>
    )
}

export default Dashboard
