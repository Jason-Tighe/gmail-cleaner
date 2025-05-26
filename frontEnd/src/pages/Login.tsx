
export default function Login() {
    return (
        <div className="login">
            <h1>Login</h1>
            <p>This is the login page.</p>
            {/* Add more content or components as needed */}
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}