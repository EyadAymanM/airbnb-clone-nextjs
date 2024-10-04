

import AcountCard from '../_components/acountCard'

export default function page() {

  return (
    <>
        <h1 className="container mx-auto px-20 mb-20 mt-10 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" >Account</h1>
        <div className="container mx-auto px-20 grid gap-6 grid-cols-3  mb-20">
          <AcountCard linkRef='account-settings/personal-info' para1Content='Personal Info' para2Content='Provide personal details and how we can reach you'  />
          <AcountCard linkRef='account-settings/login-and-security' para1Content='Login & Security' para2Content='Update your password and secure your account'  />
          <AcountCard linkRef='account-settings/payment-methods' para1Content='Payments & payouts' para2Content='Review payments, payouts, coupons, and gift cards'  />
          <AcountCard linkRef='account-settings/taxpayers' para1Content='Taxes' para2Content='Manage taxpayer information and tax documents'  />
          <AcountCard linkRef='account-settings/notifications' para1Content='Notifications' para2Content='Choose notification preferences and how you want to be contacted'  />
          <AcountCard linkRef='account-settings/privacy-and-sharing' para1Content='Privacy & sharing' para2Content='Manage your personal data, connected services, and data sharing settings'  />
          <AcountCard linkRef='account-settings/preferences' para1Content='Global preferences' para2Content='Set your default language, currency, and timezone'  />
          <AcountCard linkRef='account-settings/airbnb-for-work' para1Content='Travel for work' para2Content='Add a work email for business trip benefits for business trip benefits'  />
          <AcountCard linkRef='account-settings/professional-hosting' para1Content='Professional hosting tools' para2Content='Get professional tools if you manage several properties on Airbnb'  />
          <AcountCard linkRef='account-settings/invite' para1Content='Referral credit & coupon' para2Content='You have ج.م0 referral credits and coupon. Learn more.'  />
        </div>
        <p className='text-center'>Need to deactivate your account?</p>
        <p className='text-center mb-5 pb-5'>Take care of that now</p>
    </>
  )
}
