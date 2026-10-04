// src/App.jsx
export default function App() {
    return (
        <main className="container section">
            <h1 className="text-display">
                <span className="text-outline">VOLODYMYR</span>
                <br />
                DZIMINA
            </h1>

            <p className="text-body" style={{ marginTop: 'var(--space-24)' }}>
                Building modern web apps, drone systems, and digital products.
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-16)', marginTop: 'var(--space-32)' }}>
                <button className="btn btn-primary">Let's collaborate ↗</button>
                <button className="btn btn-secondary">Let's Talk ↗</button>
                <button className="btn" disabled>Disabled</button>
            </div>
        </main>
    )
}