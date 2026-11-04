import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Container from '../components/Container'
import SplitText from '../components/SplitText'
import Button from '../components/Button'
import Pill from '../components/Pill'
import { SOCIALS } from '../data/socials'
import { revealVariants, staggerParent } from '../lib/motion'

// The PDF lives in /public. This is the version without a phone number:
// do not link the one that has it.
const CV_URL = '/Volodymyr_Dzimina_CV_EN_NoPhone.pdf'
const CV_FILENAME = 'Volodymyr_Dzimina_CV.pdf'

// Pill is a plain component; motion.create lets it take variants.
const MotionPill = motion.create(Pill)

// Intro order: nav -> VOLODYMYR -> DZIMINA -> role/desc/CV -> socials.
// The name is a parent with `staggerParent`: its two SplitTexts (`controlled`)
// start one after the other, and each one staggers its own letters.
export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  // The name drifts up and fades a little while the hero scrolls away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2])

  return (
      <section ref={ref} id="home" className="hero">
        <Container className="hero__inner">
          <motion.h1
            className="text-display hero__title"
            aria-label="Volodymyr Dzimina"
            variants={staggerParent(0.3, 0.2)}
            initial="hidden"
            animate="visible"
            style={reduce ? undefined : { y: titleY, opacity: titleOpacity }}
          >
            <SplitText controlled className="text-outline" text="VOLODYMYR" />
            <br />
            <SplitText controlled text="DZIMINA" />
          </motion.h1>

          <motion.div
            className="hero__body"
            variants={staggerParent(0.09, 0.85)}
            initial="hidden"
            animate="visible"
          >
            <div className="hero__info">
              <motion.p variants={revealVariants} className="text-h2 hero__role">
                Full stack developer
              </motion.p>
              <motion.p variants={revealVariants} className="text-body hero__desc">
                Building modern web apps,
                <br />
                drone systems, and digital products
              </motion.p>
              <motion.div variants={revealVariants}>
                <Button magnetic href={CV_URL} download={CV_FILENAME} icon="download-simple" className="hero__cta">
                  Download CV
                </Button>
              </motion.div>
            </div>

            <div className="hero__socials">
              {SOCIALS.map((s) => (
                  <MotionPill
                    key={s.label}
                    variants={revealVariants}
                    href={s.href}
                    icon={s.icon}
                    className="hero__social"
                  >
                    {s.label}
                  </MotionPill>
              ))}
            </div>
          </motion.div>
        </Container>
      </section>
  )
}
