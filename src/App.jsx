import Nav from './sections/Nav'
import Hero from './sections/Hero'
import Work from './sections/Work'
import Service from './sections/Service'
import Experience from './sections/Experience'
import Footer from './sections/Footer'

export default function App() {
    console.log('App is rendering')
    return (
        <>
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