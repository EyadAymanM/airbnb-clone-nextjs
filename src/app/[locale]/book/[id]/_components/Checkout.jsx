"use client"

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useSession } from "next-auth/react"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { format, differenceInDays } from "date-fns";
import { addReservation } from "@/app/_actions/booking/fetchtrips"

function Checkout({ amount , listing }) {
  const { data: session } = useSession()
  const locale = useLocale()
  const t = useTranslations("book")

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState()
  const [clientSecret, setClientSecret] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    const { error: submitError } = await elements.submit()

    if (submitError) {
      setError(submitError.message)
      setLoading(false)
      return
    }

    const reservation = await addReservation(session.user.token.access_token, {
      listingId: listing._id,
      startDate: listing.startDate,
      endDate: listing.endDate,
      guestsCount: listing.guests,
      totalPrice: listing.price * differenceInDays(listing.endDate, listing.startDate)
    })

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3001/${locale}/successful-book`
      }
    })

    setLoading(false)
  }

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 })
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
  }, [amount])
  return ( 
    <form onSubmit={handleSubmit}>

      {clientSecret && <PaymentElement className="my-6" />}

      {error && <div>{error}</div>}

      <button
        disabled={!stripe || loading}
        type="submit"
        className="w-fit px-12 py-3 rounded-lg disabled:cursor-not-allowed disabled:opacity-50 bg-[#E51D53] hover:bg-[#D11146] text-white mb-8"
      >
        {t("book")}
      </button>
      
    </form>
  )
}
export default Checkout