import Container from '../components/Container'
import SectionHead from '../components/SectionHead'
import Reveal from '../components/Reveal'
import Button from '../components/Button'

// Text comes from the CV facts in CLAUDE.md. Do not add facts that are not there.
// The PDF lives in /public, so it is served from the site root.
const CV_URL = '/Volodymyr_Dzimina_CV_EN.pdf'

export default function About() {
  return (
    <section id="about" className="about">
      <Container>
        <SectionHead ghost="ABOUT" title="/ABOUT" />

        <Reveal className="about__content">
          <p className="about__text">
            I'm Volodymyr, a junior fullstack developer from Vinnytsia, Ukraine, studying Automation,
            Computer-Integrated Technologies &amp; Robotics at VNTU INTITA. I build web apps with
            React, Node.js, Express and MongoDB, and I led the team behind SkyLink, an FPV racing
            platform with 84 pilots. I took part in two Ukrainian hackathons: I earned a diploma at
            the III and built the GrantHUB UA funding parser at the IV. Outside of code, I chair the
            student council and teach drone engineering to schoolchildren.
          </p>

          <Button href={CV_URL} download icon="download-simple" className="about__cv">
            Download CV
          </Button>
        </Reveal>
      </Container>
    </section>
  )
}
