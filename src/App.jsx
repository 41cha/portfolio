import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Service from './sections/Service'
import Experience from './sections/Experience'
import Footer from './sections/Footer'
import ScrollProgress from './components/ScrollProgress'
import MiniNav from './components/MiniNav'

export default function App() {
    return (
        <>
            <ScrollProgress />
            <MiniNav />
            <Nav />
            <main>
                <Hero />
                <Work />
                <Service />
                <Experience />
            </main>
            <Footer />
        </>
    )
}
