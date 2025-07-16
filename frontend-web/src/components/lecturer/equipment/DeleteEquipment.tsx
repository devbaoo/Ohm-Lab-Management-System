import React, { useState, useEffect } from 'react';
import { deleteEquipment, getEquipmentById, EquipmentItem } from '@/src/services/equipmentServices';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import { Card, CardContent } from '@/src/components/ui/card';
import { AlertTriangle, Trash2, Package } from 'lucide-react';
import { toast } from 'react-toastify';

interface DeleteEquipmentProps {
    equipmentId: string | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const DeleteEquipment: React.FC<DeleteEquipmentProps> = ({ equipmentId, isOpen, onClose, onSuccess }) => {
    const [equipment, setEquipment] = useState<EquipmentItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            setError(null);

            console.log('Loading equipment data for delete:', equipmentId);
            const response = await getEquipmentById(equipmentId);

            if (response && response.data) {
                setEquipment(response.data);
                console.log('Loaded equipment data:', response.data);
            }
        } catch (error: any) {
            console.error('Error loading equipment data:', error);
            setError(error.message || 'Failed to load equipment details');
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleDelete = async () => {
        if (!equipmentId || !equipment) return;

        try {
            setIsLoading(true);

            console.log('Deleting equipment:', equipmentId);
            const response = await deleteEquipment(equipmentId);

            if (response) {
                toast.success(`Equipment "${equipment.equipmentName}" deleted successfully!`);
                onSuccess();
                onClose();
            }
        } catch (error: any) {
            console.error('Error deleting equipment:', error);
            toast.error(error.message || 'Failed to delete equipment');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        if (!isLoading && !isLoadingData) {
            setEquipment(null);
            setError(null);
            onClose();
        }
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Available":
                return "default"
            case "In-Use":
                return "secondary"
            case "Maintenance":
                return "outline"
            case "Delete":
                return "destructive"
            default:
                return "outline"
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        Delete Equipment
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Are you sure you want to delete this equipment?
                    </DialogDescription>
                </DialogHeader>

                {isLoadingData ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Loading equipment details...</p>
                        </div>
                    </div>
                ) : error ? (
                    <Card className="border-red-200">
                        <CardContent className="p-6 text-center">
                            <div className="text-red-600 mb-2">
                                <Package className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <strong>Error:</strong> {error}
                            </div>
                            <Button variant="outline" onClick={loadEquipmentData}>
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                ) : equipment ? (
                    <div className="space-y-4">
                        {/* Equipment Information Card */}
                        <Card className="border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                            {equipment.equipmentName}
                                        </h3>
                                        <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex justify-between">
                                                <span>Equipment Code:</span>
                                                <span className="font-mono text-gray-900 dark:text-gray-100">
                                                    {equipment.equipmentCode}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Serial Number:</span>
                                                <span className="font-mono text-gray-900 dark:text-gray-100">
                                                    {equipment.equipmentNumberSerial}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Status:</span>
                                                <Badge variant={getStatusVariant(equipment.equipmentStatus)}>
                                                    {equipment.equipmentStatus}
                                                </Badge>
                                            </div>
                                        </div>
                                        {equipment.equipmentDescription && (
                                            <div className="mt-3">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Description:</p>
                                                <p className="text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 p-2 rounded border mt-1">
                                                    {equipment.equipmentDescription}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Warning Message */}
                        <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                                        Warning
                                    </p>
                                    <p className="text-yellow-700 dark:text-yellow-300">
                                        Deleting this equipment will permanently remove it from the system.
                                        This action cannot be undone and may affect related records.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-6 text-center">
                            <Package className="h-12 w-12 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                            <p className="text-gray-600 dark:text-gray-400">No equipment data available</p>
                        </CardContent>
                    </Card>
                )}

                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading || isLoadingData}
                    >
                        Cancel
                    </Button>
                    {equipment && (
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isLoading || isLoadingData}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Equipment
                                </>
                            )}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteEquipment; 