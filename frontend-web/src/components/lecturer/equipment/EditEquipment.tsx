import React, { useState, useEffect } from 'react';
import { updateEquipment, getEquipmentById, UpdateEquipmentRequest, EquipmentItem } from '@/src/services/equipmentServices';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import { toast } from 'react-toastify';

interface EditEquipmentProps {
    equipmentId: string | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const statusOptions = [
    { value: "Available", label: "Available" },
    { value: "In-Use", label: "In Use" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Delete", label: "Delete" },
];

const EditEquipment: React.FC<EditEquipmentProps> = ({ equipmentId, isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<UpdateEquipmentRequest>({
        equipmentName: '',
        equipmentCode: '',
        equipmentNumberSerial: '',
        equipmentDescription: '',
        equipmentTypeUrlImg: '',
        equipmentQr: '',
        equipmentStatus: 'Available'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [errors, setErrors] = useState<Partial<UpdateEquipmentRequest>>({});

    // Load equipment data when modal opens
    useEffect(() => {
        if (isOpen && equipmentId) {
            loadEquipmentData();
        }
    }, [isOpen, equipmentId]);

    const loadEquipmentData = async () => {
        if (!equipmentId) return;

        try {
            setIsLoadingData(true);
            console.log('Loading equipment data for edit:', equipmentId);

            const response = await getEquipmentById(equipmentId);
            if (response && response.data) {
                const equipment = response.data;
                setFormData({
                    equipmentName: equipment.equipmentName,
                    equipmentCode: equipment.equipmentCode,
                    equipmentNumberSerial: equipment.equipmentNumberSerial,
                    equipmentDescription: equipment.equipmentDescription,
                    equipmentTypeUrlImg: equipment.equipmentTypeUrlImg === "null" ? "" : equipment.equipmentTypeUrlImg,
                    equipmentQr: equipment.equipmentQr === "null" ? "" : equipment.equipmentQr,
                    equipmentStatus: equipment.equipmentStatus
                });
                console.log('Loaded equipment data:', equipment);
            }
        } catch (error: any) {
            console.error('Error loading equipment data:', error);
            toast.error('Failed to load equipment data');
        } finally {
            setIsLoadingData(false);
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<UpdateEquipmentRequest> = {};

        if (!formData.equipmentName.trim()) {
            newErrors.equipmentName = 'Equipment name is required';
        }

        if (!formData.equipmentCode.trim()) {
            newErrors.equipmentCode = 'Equipment code is required';
        }

        if (!formData.equipmentNumberSerial.trim()) {
            newErrors.equipmentNumberSerial = 'Serial number is required';
        }

        if (!formData.equipmentDescription.trim()) {
            newErrors.equipmentDescription = 'Description is required';
        }

        if (!formData.equipmentStatus) {
            newErrors.equipmentStatus = 'Status is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof UpdateEquipmentRequest, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm() || !equipmentId) {
            return;
        }

        try {
            setIsLoading(true);

            console.log('Updating equipment with data:', formData);
            const response = await updateEquipment(equipmentId, formData);

            if (response) {
                toast.success('Equipment updated successfully!');
                onSuccess();
                onClose();
            }
        } catch (error: any) {
            console.error('Error updating equipment:', error);
            toast.error(error.message || 'Failed to update equipment');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            equipmentName: '',
            equipmentCode: '',
            equipmentNumberSerial: '',
            equipmentDescription: '',
            equipmentTypeUrlImg: '',
            equipmentQr: '',
            equipmentStatus: 'Available'
        });
        setErrors({});
    };

    const handleClose = () => {
        if (!isLoading && !isLoadingData) {
            resetForm();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Equipment</DialogTitle>
                    <DialogDescription>
                        Update the equipment information.
                    </DialogDescription>
                </DialogHeader>

                {isLoadingData ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Loading equipment data...</p>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Equipment Name */}
                            <div className="space-y-2">
                                <Label htmlFor="equipmentName">Equipment Name *</Label>
                                <Input
                                    id="equipmentName"
                                    value={formData.equipmentName}
                                    onChange={(e) => handleInputChange('equipmentName', e.target.value)}
                                    placeholder="e.g., Digital Multimeter"
                                    className={errors.equipmentName ? 'border-red-500' : ''}
                                />
                                {errors.equipmentName && (
                                    <p className="text-sm text-red-500">{errors.equipmentName}</p>
                                )}
                            </div>

                            {/* Equipment Code */}
                            <div className="space-y-2">
                                <Label htmlFor="equipmentCode">Equipment Code *</Label>
                                <Input
                                    id="equipmentCode"
                                    value={formData.equipmentCode}
                                    onChange={(e) => handleInputChange('equipmentCode', e.target.value)}
                                    placeholder="e.g., EQ-DM-001"
                                    className={errors.equipmentCode ? 'border-red-500' : ''}
                                />
                                {errors.equipmentCode && (
                                    <p className="text-sm text-red-500">{errors.equipmentCode}</p>
                                )}
                            </div>

                            {/* Serial Number */}
                            <div className="space-y-2">
                                <Label htmlFor="equipmentNumberSerial">Serial Number *</Label>
                                <Input
                                    id="equipmentNumberSerial"
                                    value={formData.equipmentNumberSerial}
                                    onChange={(e) => handleInputChange('equipmentNumberSerial', e.target.value)}
                                    placeholder="e.g., SN20250710001"
                                    className={errors.equipmentNumberSerial ? 'border-red-500' : ''}
                                />
                                {errors.equipmentNumberSerial && (
                                    <p className="text-sm text-red-500">{errors.equipmentNumberSerial}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="space-y-2">
                                <Label htmlFor="equipmentStatus">Status *</Label>
                                <Select
                                    value={formData.equipmentStatus}
                                    onValueChange={(value) => handleInputChange('equipmentStatus', value)}
                                >
                                    <SelectTrigger className={errors.equipmentStatus ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((status) => (
                                            <SelectItem key={status.value} value={status.value}>
                                                {status.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.equipmentStatus && (
                                    <p className="text-sm text-red-500">{errors.equipmentStatus}</p>
                                )}
                            </div>

                            {/* Image URL */}
                            <div className="space-y-2">
                                <Label htmlFor="equipmentTypeUrlImg">Image URL</Label>
                                <Input
                                    id="equipmentTypeUrlImg"
                                    value={formData.equipmentTypeUrlImg}
                                    onChange={(e) => handleInputChange('equipmentTypeUrlImg', e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            {/* QR Code */}
                            <div className="space-y-2">
                                <Label htmlFor="equipmentQr">QR Code</Label>
                                <Input
                                    id="equipmentQr"
                                    value={formData.equipmentQr}
                                    onChange={(e) => handleInputChange('equipmentQr', e.target.value)}
                                    placeholder="QR code data or URL"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="equipmentDescription">Description *</Label>
                            <Textarea
                                id="equipmentDescription"
                                value={formData.equipmentDescription}
                                onChange={(e) => handleInputChange('equipmentDescription', e.target.value)}
                                placeholder="Detailed description of the equipment..."
                                rows={3}
                                className={errors.equipmentDescription ? 'border-red-500' : ''}
                            />
                            {errors.equipmentDescription && (
                                <p className="text-sm text-red-500">{errors.equipmentDescription}</p>
                            )}
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleClose}
                                disabled={isLoading || isLoadingData}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isLoading || isLoadingData}
                                className="bg-orange-500 hover:bg-orange-600"
                            >
                                {isLoading ? 'Updating...' : 'Update Equipment'}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EditEquipment; 