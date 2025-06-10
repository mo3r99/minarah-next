import { useContext } from "react"
import Modal from "../ui/modal"
import { LocationContext, locationData } from "@/lib/context/locationContext"
import { geolocationService } from "@/lib/services/location/geolocation"
import { storageService } from "@/lib/services/storage/storageService"

export default function GetLocation() {
    const { setLocation } = useContext(LocationContext)

    const handleLocationRequest = async () => {
        try {
            const locationData = await geolocationService.getCurrentLocation()
            
            setLocation(locationData)
            storageService.savePreferences({ location: locationData })
            return true
        } catch (error) {
            console.error("Error getting location:", error)
            return false
        }
    }

    return (
        <Modal 
            title="Enable Location" 
            action={handleLocationRequest} 
            buttonText="Continue"
        >
            Your location is required to show local Salah times. Please press continue to proceed.
        </Modal>
    )
}