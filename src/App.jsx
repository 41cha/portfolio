import { useState } from 'react'
import Button from './components/Button'
import Pill from './components/Pill'
import Tag from './components/Tag'
import Icon from './components/Icon'
import Section from './components/Section'

const FILTERS = ['All', 'Real Project', 'Exploration']

export default function App() {
    const [filter, setFilter] = useState('All')

    return (
        <>
            <Section>
                <h1 className="text-display">
                    <span className="text-outline">VOLODYMYR</span>
                    <br />
                    DZIMINA
                </h1>
                <p className="text-body" style={{ marginBlock: 'var(--space-24)' }}>
                    Building modern web apps, drone systems, and digital products.
                </p>

                <div className="demo-row">
                    <Button icon="arrow-up-right">Let's collaborate</Button>
                    <Button variant="secondary" icon="arrow-up-right">Let's Talk</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="secondary" href="https://github.com/41cha">GitHub link</Button>
                </div>

                <div className="demo-row" style={{ marginTop: 'var(--space-32)' }}>
                    {FILTERS.map((f) => (
                        <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>
                            {f}
                        </Pill>
                    ))}
                    <Pill icon="github-logo">GitHub</Pill>
                    <Pill icon="telegram-logo">Telegram</Pill>
                </div>

                <div className="demo-row" style={{ marginTop: 'var(--space-32)' }}>
                    <Tag>React</Tag>
                    <Tag>Node.js</Tag>
                    <Tag>MongoDB</Tag>
                </div>

                <div className="demo-row" style={{ marginTop: 'var(--space-32)' }}>
                    {['arrow-up-right', 'arrow-left', 'list', 'x', 'github-logo', 'linkedin-logo',
                        'telegram-logo', 'instagram-logo', 'envelope-simple', 'check-circle',
                        'warning', 'download-simple', 'arrow-square-out'].map((n) => (
                        <Icon key={n} name={n} />
                    ))}
                </div>
            </Section>

            <Section dark>
                <h2 className="text-h2">Dark section</h2>
                <p className="text-small">Black 2 background, light text.</p>
            </Section>
        </>
    )
}