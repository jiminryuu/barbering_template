import {getCliClient} from 'sanity/cli'

const client = getCliClient()

async function main() {
  console.log('Injecting Deep-Branching Hairstylist Quiz...')

  const lookbooks = await client.fetch(`*[_type == "lookbook"]`)
  const fader = lookbooks.find((l: any) => l.styleName === 'Fader')
  const taper = lookbooks.find((l: any) => l.styleName === 'Taper')

  const quizDoc = {
    _type: 'quiz',
    title: 'Signature Style Finder',
    startingQuestionId: 'q_root',
    questions: [
      {
        _key: 'q_root',
        id: 'q_root',
        questionText: 'Which style direction are you interested in?',
        options: [
          { _key: 'o_masc', label: 'Structured & Masculine', value: 'Masculine', nextQuestionId: 'm_len' },
          { _key: 'o_fem', label: 'Soft & Feminine', value: 'Feminine', nextQuestionId: 'f_len' }
        ]
      },
      // --- MASCULINE BRANCH ---
      {
        _key: 'm_len',
        id: 'm_len',
        questionText: 'What is your preferred length on top?',
        options: [
          { _key: 'm_l_s', label: 'Short (Fade/Crop)', value: 'Short', nextQuestionId: 'm_fade_detail' },
          { _key: 'm_l_m', label: 'Medium (Quiff/Flow)', value: 'Medium', nextQuestionId: 'm_flow_detail' }
        ]
      },
      {
        _key: 'm_fade_detail',
        id: 'm_fade_detail',
        questionText: 'How tight do you want the fade?',
        options: [
          { _key: 'm_f_h', label: 'High Skin Fade', value: 'High Fade', styleMatch: fader ? { _type: 'reference', _ref: fader._id } : undefined },
          { _key: 'm_f_l', label: 'Low/Natural Taper', value: 'Low Fade', styleMatch: taper ? { _type: 'reference', _ref: taper._id } : undefined }
        ]
      },
      {
        _key: 'm_flow_detail',
        id: 'm_flow_detail',
        questionText: 'How do you usually style it?',
        options: [
          { _key: 'm_s_p', label: 'Classic Side Part', value: 'Polished', styleMatch: taper ? { _type: 'reference', _ref: taper._id } : undefined },
          { _key: 'm_s_m', label: 'Messy & Textured', value: 'Natural', styleMatch: taper ? { _type: 'reference', _ref: taper._id } : undefined }
        ]
      },
      // --- FEMININE BRANCH ---
      {
        _key: 'f_len',
        id: 'f_len',
        questionText: 'What length describes your dream hair?',
        options: [
          { _key: 'f_l_s', label: 'Short & Bold (Pixie/Bob)', value: 'Short', nextQuestionId: 'f_short_shape' },
          { _key: 'f_l_l', label: 'Long & Flowing', value: 'Long', nextQuestionId: 'f_long_vibe' }
        ]
      },
      {
        _key: 'f_short_shape',
        id: 'f_short_shape',
        questionText: 'What kind of shape appeals to you most?',
        options: [
          { _key: 'f_s_p', label: 'Edgy Textured Pixie', value: 'Pixie' },
          { _key: 'f_s_b', label: 'Sleek Italian Bob', value: 'Bob' }
        ]
      },
      {
        _key: 'f_long_vibe',
        id: 'f_long_vibe',
        questionText: 'What vibe are we going for?',
        options: [
          { _key: 'f_v_l', label: 'Lived-in Layers (Butterfly Cut)', value: 'Layers' },
          { _key: 'f_v_s', label: 'Sleek & One-Length', value: 'Sleek' }
        ]
      }
    ]
  }

  const existing = await client.fetch(`*[_type == "quiz"]`)
  if (existing.length > 0) {
    await client.patch(existing[0]._id).set(quizDoc).commit()
  } else {
    await client.create(quizDoc)
  }
  console.log('Success! Fully branched decision tree injected.')
}

main().catch(err => { console.error(err); process.exit(1); })
