'use client'

import {useState, useEffect} from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import type {LookbookItem, Quiz} from '@/types/home'
import StyleViewer360 from './StyleViewer360'

interface StyleQuizProps {
  styles: LookbookItem[]
  quiz: Quiz | null
}

export default function StyleQuiz({styles, quiz}: Readonly<StyleQuizProps>) {
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null)
  const [filters, setFilters] = useState<string[]>([])
  const [result, setResult] = useState<LookbookItem | null>(null)
  const [isFinished, setIsFinished] = useState(false)

  const safeStyles = Array.isArray(styles) ? styles : []
  const questions = quiz?.questions ?? []

  useEffect(() => {
    if (quiz?.startingQuestionId && !currentQuestionId && !isFinished) {
      setCurrentQuestionId(quiz.startingQuestionId)
    }
  }, [quiz, currentQuestionId, isFinished])

  const handleOption = (value: string, nextQuestionId?: string | null, styleMatchId?: string | null) => {
    const newFilters = [...filters, value]
    setFilters(newFilters)

    if (nextQuestionId) {
      setCurrentQuestionId(nextQuestionId)
    } else {
      // Quiz finished
      let match: LookbookItem | null = null

      if (styleMatchId) {
        // Direct link to style by ID
        match = safeStyles.find((s) => s._id === styleMatchId) ?? null
      }

      if (!match) {
        // Fallback to finding the first style for the selected gender if applicable
        // Or just leave it as null to show 'no styles found'
        match = null
      }
      
      setResult(match)
      setIsFinished(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionId(quiz?.startingQuestionId ?? null)
    setFilters([])
    setResult(null)
    setIsFinished(false)
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="mx-auto flex min-h-[400px] w-full max-w-4xl flex-col items-center justify-center px-4 py-12 text-center text-[color:var(--color-muted)]">
        Quiz coming soon.
      </div>
    )
  }

  const currentQuestion = questions.find((q) => q.id === currentQuestionId)

  const questionContent = currentQuestion && !isFinished ? (
    <motion.div
      key={currentQuestion.id}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -20}}
      className="w-full px-2 text-center"
    >
      <span className="mb-3 block text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] sm:mb-4">
        Style Quiz
      </span>
      <h2 className="font-display mb-8 px-2 text-2xl uppercase tracking-tight sm:mb-10 sm:text-3xl md:mb-12 md:text-4xl lg:text-6xl">
        {currentQuestion.questionText}
      </h2>
      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3 sm:gap-4">
        {currentQuestion.options?.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleOption(opt.value, opt.nextQuestionId, opt.styleMatchId)}
            className="min-h-[60px] flex-1 min-w-[200px] rounded-xl border border-[color:var(--color-border)] px-6 py-4 text-base font-bold uppercase tracking-tight transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 sm:min-h-[80px] sm:px-8 sm:py-6 sm:text-lg md:text-xl"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </motion.div>
  ) : null

  const hasImages = result && Array.isArray(result.images) && result.images.length > 0

  const resultContent = isFinished && hasImages ? (
    <motion.div
      key="result"
      initial={{opacity: 0, scale: 0.9}}
      animate={{opacity: 1, scale: 1}}
      className="grid w-full grid-cols-1 items-center gap-8 px-2 sm:gap-12 md:grid-cols-2"
    >
      <div className="order-2 md:order-1">
        <span className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
          Your Match
        </span>
        <h2 className="font-display mb-4 text-3xl uppercase tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
          {result?.styleName ?? 'Your Style'}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-[color:var(--color-muted)] sm:mb-8 sm:text-base md:text-lg">
          {result?.description ?? ''}
        </p>
        <button
          onClick={resetQuiz}
          className="border-b border-[color:var(--color-border)] pb-1 text-xs uppercase tracking-widest transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          Restart Quiz
        </button>
      </div>
      <div className="order-1 w-full md:order-2">
        <StyleViewer360 images={result?.images ?? []} name={result?.styleName ?? 'Style'} />
      </div>
    </motion.div>
  ) : null

  const noResultContent = isFinished && !hasImages ? (
    <motion.div
      key="no-result"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      className="px-4 text-center"
    >
      <p className="mb-6 text-xl sm:text-2xl font-display uppercase tracking-tight text-[color:var(--color-text)]">
        Styles coming soon
      </p>
      <p className="mb-8 text-sm text-[color:var(--color-muted)] sm:text-base max-w-md mx-auto">
        We are currently updating our 360 lookbook for this style. Please check back later or ask your barber during your visit.
      </p>
      <button
        onClick={resetQuiz}
        className="border-b border-[color:var(--color-border)] pb-1 text-xs uppercase tracking-widest transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
      >
        Restart Quiz
      </button>
    </motion.div>
  ) : null

  const stepContent = !isFinished ? questionContent : (resultContent ?? noResultContent)

  return (
    <div className="mx-auto flex min-h-[500px] w-full max-w-4xl flex-col items-center justify-center px-4 py-12 sm:min-h-[600px] sm: md:py-20">
      <AnimatePresence mode="wait">{stepContent}</AnimatePresence>
    </div>
  )
}
