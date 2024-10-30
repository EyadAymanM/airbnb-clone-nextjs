'use client'
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Notification() {
  const [visible, setVisible] = useState(true);

  return (
    <>
    <div className="container mt-8 m-auto">
    <div className="flex flex-col  items-center z-50">

    <h1 className="text-2xl text-left font-bold mb-4">Notification</h1>
      {visible && (

        <Alert className="border-none sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] max-h-[500px]">
          <div className="flex justify-between gap-3">
          <Avatar className="w-16 h-16">
  <AvatarImage src="https://a0.muscache.com/airbnb/static/logos/belo_babu-f2e24a0d05d5e86c94a14dbd7dc6cf4c.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
            
            <div>
              <AlertDescription>
              Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can request a new confirmation email or change your email address.
              </AlertDescription>
            </div>
            <Button  className="border-none" variant="ghost" size="icon" onClick={() => setVisible(false)}>
              &#x2715;
            </Button>
          </div>
        </Alert>

      )}
                       </div>

      </div>
    </>
  );
}

export default Notification;