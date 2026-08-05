export const SERVICES_QUERY = `
  *[_type == "service"] | order(_createdAt asc) {
    _id,
    name,
    price,
    duration
  }
`

export const SCOPED_SERVICES_QUERY = `
  *[_type == "service" && (!defined(site) || site._ref in [$siteId, $draftSiteId])] | order(_createdAt asc) {
    _id,
    name,
    price,
    duration
  }
`

export const GALLERY_QUERY = `
  *[_type == "gallery"] | order(_createdAt asc) {
    _id,
    title,
    beforeImage,
    afterImage
  }
`

export const SCOPED_GALLERY_QUERY = `
  *[_type == "gallery" && (!defined(site) || site._ref in [$siteId, $draftSiteId])] | order(_createdAt asc) {
    _id,
    title,
    beforeImage,
    afterImage
  }
`

export const LOOKBOOK_QUERY = `
  *[_type == "lookbook"] | order(_createdAt asc) {
    _id,
    styleName,
    description,
    gender,
    images,
    isDefault
  }
`

export const SCOPED_LOOKBOOK_QUERY = `
  *[_type == "lookbook" && (!defined(site) || site._ref in [$siteId, $draftSiteId])] | order(_createdAt asc) {
    _id,
    styleName,
    description,
    gender,
    images,
    isDefault
  }
`

export const REVIEWS_QUERY = `
  *[_type == "review"] | order(_createdAt desc) {
    _id,
    author,
    text,
    rating
  }
`

export const SCOPED_REVIEWS_QUERY = `
  *[_type == "review" && (!defined(site) || site._ref in [$siteId, $draftSiteId])] | order(_createdAt desc) {
    _id,
    author,
    text,
    rating
  }
`

export const BARBER_QUERY = `
  *[_type == "barber"] | order(_updatedAt desc) [0] {
    _id,
    name,
    bio,
    image
  }
`

export const SCOPED_BARBER_QUERY = `
  *[_type == "barber" && (!defined(site) || site._ref in [$siteId, $draftSiteId])] | order(_updatedAt desc) [0] {
    _id,
    name,
    bio,
    image
  }
`

export const QUIZ_QUERY = `
  *[_type == "quiz"] | order(_createdAt desc) [0] {
    _id,
    title,
    startingQuestionId,
    questions[] {
      id,
      questionText,
      options[] {
        label,
        value,
        "styleMatchId": styleMatch._ref,
        nextQuestionId
      }
    }
  }
`

export const SCOPED_QUIZ_QUERY = `
  *[_type == "quiz" && (!defined(site) || site._ref in [$siteId, $draftSiteId])] | order(_createdAt desc) [0] {
    _id,
    title,
    startingQuestionId,
    questions[] {
      id,
      questionText,
      options[] {
        label,
        value,
        "styleMatchId": styleMatch._ref,
        nextQuestionId
      }
    }
  }
`
