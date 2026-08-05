import HomePage from '@/components/pages/HomePage'
import {getHomePageData} from '@/lib/data/getHomePageData'
import {getSiteSettings} from '@/lib/data/getSiteSettings'

export const revalidate = 10

export default async function Page() {
  const {settings: siteSettings, isFallback} = await getSiteSettings()
  const siteId = isFallback ? undefined : siteSettings._id
  const {services, gallery, lookbook, reviews, barber, quiz} = await getHomePageData(siteId)

  return (
    <HomePage
      siteSettings={siteSettings}
      services={services}
      gallery={gallery}
      lookbook={lookbook}
      reviews={reviews}
      barber={barber}
      quiz={quiz}
    />
  )
}
