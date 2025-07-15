import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { createEquipment } from "@/src/services/equipmentServices"
import { useState } from "react"
import { toast } from "react-toastify"

interface CreateEquipmentProps {
    open: boolean
    onClose: () => void
    onCreate: (data: {
        equipmentName: string
        equipmentCode: string
        equipmentNumberSerial: string
        equipmentDescription: string
        equipmentTypeUrlImg: string
        equipmentQr: string
    }) => void
}

export default function CreateEquipment({ open, onClose, onCreate }: CreateEquipmentProps) {
    const [equipmentData, setEquipmentData] = useState({
        equipmentName: "",
        equipmentCode: "",
        equipmentNumberSerial: "",
        equipmentDescription: "",
        equipmentTypeUrlImg: "",
        equipmentQr: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEquipmentData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async () => {
        try {
            await createEquipment(equipmentData)
            onCreate(equipmentData)
            onClose()
        } catch (error) {
            toast.error("Failed to create equipment")
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Equipment</DialogTitle>
                    <DialogDescription>Enter the details for the new equipment.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="equipmentName" className="text-right">Name</Label>
                        <Input
                            id="equipmentName"
                            name="equipmentName"
                            value={equipmentData.equipmentName}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="equipmentCode" className="text-right">Code</Label>
                        <Input
                            id="equipmentCode"
                            name="equipmentCode"
                            value={equipmentData.equipmentCode}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="equipmentNumberSerial" className="text-right">Serial Number</Label>
                        <Input
                            id="equipmentNumberSerial"
                            name="equipmentNumberSerial"
                            value={equipmentData.equipmentNumberSerial}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="equipmentDescription" className="text-right">Description</Label>
                        <Input
                            id="equipmentDescription"
                            name="equipmentDescription"
                            value={equipmentData.equipmentDescription}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="equipmentTypeUrlImg" className="text-right">Image URL</Label>
                        <Input
                            id="equipmentTypeUrlImg"
                            name="equipmentTypeUrlImg"
                            value={equipmentData.equipmentTypeUrlImg}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="equipmentQr" className="text-right">QR Code</Label>
                        <Input
                            id="equipmentQr"
                            name="equipmentQr"
                            value={equipmentData.equipmentQr}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}