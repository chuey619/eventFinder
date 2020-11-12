import React, {useState} from 'react'
const Register = (props) => {
    const [user, setUser] = useState({
        username: '',
        name: '',
        password: '',
        email: ''
    })
    const handleChange = (e) => {
        const {name, value} = e.target
        setUser((oldUser) => {
            return{
                ...oldUser,
            [name]: value
            } 
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('auth/register', {
            method: 'POST',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: user.username,
                    name: user.name,
                    password: user.password,
                    email: user.email
                }
            })
        })
        setUser({
            username: '',
            password: '',
            email: '',
            name: ''
        })
        const json = await response.json()
        if (json?.data?.user) {
            dispatchEvent({
                type: 'login',
                user: json?.data?.user
            })
            history.push('/home')
        } 
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type='text' name='name' placeholder='Name' value={user.name}/>
                <input onChange={handleChange} type='text' name='username' placeholder='Username' value={user.username} />
                <input onChange={handleChange} type='email' name='email' placeholder='email@email.com' value={user.email} />
                <input onChange={handleChange} type='password' name='password' placeholder='Password' value={user.password} />
            </form>
        </div>
    )
}

export default Register