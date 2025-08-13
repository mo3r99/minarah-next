import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../ui/card"
import { cn } from "@/lib/utils/utils"
import { SetStateAction } from "react"
import { Location } from "@/types"
import PlacesAutocomplete from "./PlacesAutoComplete"

export default function ManualLocationEntry({onCancel, onSubmit}:{onCancel: (value: SetStateAction<boolean>) => void, onSubmit: (location: Location) => void}) {
  console.log(onCancel,onSubmit);
    return (
        <>
        <div className="w-screen h-screen absolute top-0 left-0 bg-[rgba(0,0,0,0.4)] z-[10]" />
        <div className={cn("fixed inset-0 bg-opacity-50 flex items-center justify-center w-[80vw] max-w-xl mx-auto z-20")}>
          <Card className="max-w-3xl w-[80vw]">
            <CardHeader>
              <CardTitle>Enter your Location</CardTitle>
            </CardHeader>
            <CardContent>
              <PlacesAutocomplete />
            </CardContent>
            <CardFooter>
                
            </CardFooter>
          </Card>
        </div>
        </>
    )
}