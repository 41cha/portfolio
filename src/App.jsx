import Nav from './sections/Nav'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Service from './sections/Service'
import Experience from './sections/Experience'
import Footer from './sections/Footer'

export default function App() {
    return (
        <>
            <Nav />
            <main>
                <Hero />
                <About />
                <Work />
                <Service />
                <Experience />
            </main>
            <Footer />
        </>
    )
}