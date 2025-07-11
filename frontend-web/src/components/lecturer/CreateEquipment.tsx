import React, { useState } from 'react';
import { createEquipment, CreateEquipmentRequest } from '@/src/services/equipmentServices';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { Textarea } from '@/src/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import { toast } from 'react-toastify';

interface CreateEquipmentProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateEquipment: React.FC<CreateEquipmentProps> = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState<CreateEquipmentRequest>({
        equipmentName: '',
        equipmentCode: '',
        equipmentNumberSerial: '',
        equipmentDescription: '',
        equipmentTypeUrlImg: '',
        equipmentQr: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Partial<CreateEquipmentRequest>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<CreateEquipmentRequest> = {};

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof CreateEquipmentRequest, value: string) => {
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

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            console.log('Creating equipment with data:', formData);
            const response = await createEquipment(formData);

            if (response) {
                toast.success('Equipment created successfully!');
                onSuccess();
                onClose();
                resetForm();
            }
        } catch (error: any) {
            console.error('Error creating equipment:', error);
            toast.error(error.message || 'Failed to create equipment');
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
            equipmentQr: ''
        });
        setErrors({});
    };

    const handleClose = () => {
        if (!isLoading) {
            resetForm();
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create New Equipment</DialogTitle>
                    <DialogDescription>
                        Add a new equipment item to the laboratory inventory.
                    </DialogDescription>
                </DialogHeader>

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
                        <div className="space-y-2 md:col-span-2">
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
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="bg-orange-500 hover:bg-orange-600"
                        >
                            {isLoading ? 'Creating...' : 'Create Equipment'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateEquipment; 