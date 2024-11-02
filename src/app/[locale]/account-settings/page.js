

import { getTranslations } from 'next-intl/server';
import AcountCard from '../../_components/acountCard'

export default async function page() {
  const t = await getTranslations("personal");

  return (
    <>
        <h1 className="container mx-auto px-20 mb-20 mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >{t("account")}</h1>
        <div className="container mx-auto grid gap-6 grid-cols-2 content-center mb-20">
        <AcountCard linkRef='account-settings/personal-info' para1Content={t("personal-info")} para2Content={t("personal-info-proovide")}  />
          <AcountCard linkRef='account-settings/preferences' para1Content={t('global')} para2Content={t('global-details')}  />
          <AcountCard linkRef='account-settings/airbnb-for-work' para1Content={t('travel')} para2Content={t('travel-details')}  />
          <AcountCard linkRef='account-settings/invite' para1Content={t('coupon')} para2Content={t('coupon-details')}  />
        </div>
        <p className='text-center'>{t("question")}</p>
        <p className='text-center mb-5 pb-5'>{t("secondq")}</p>
    </>
  )
}
