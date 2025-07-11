import React, { useState, useEffect } from 'react';
import { getEquipmentById, EquipmentItem } from '@/src/services/equipmentServices';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/src/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';
import { Separator } from '@/src/components/ui/separator';
import { Eye, Package, Wrench, QrCode, Image as ImageIcon, FileText, Hash, Edit, Trash2 } from 'lucide-react';

interface EquipmentDetailProps {
    equipmentId: string | null;
    isOpen: boolean;
    onClose: () => void;
    onEdit?: (equipmentId: string) => void;
    onDelete?: (equipmentId: string) => void;
}

const EquipmentDetail: React.FC<EquipmentDetailProps> = ({ equipmentId, isOpen, onClose, onEdit, onDelete }) => {
    const [equipment, setEquipment] = useState<EquipmentItem | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && equipmentId) {
            fetchEquipmentDetail();
        }
    }, [isOpen, equipmentId]);

    const fetchEquipmentDetail = async () => {
        if (!equipmentId) return;

        try {
            setIsLoading(true);
            setError(null);

            console.log('Fetching equipment detail for ID:', equipmentId);
            const response = await getEquipmentById(equipmentId);

            if (response && response.data) {
                setEquipment(response.data);
                console.log('Equipment detail:', response.data);
            }
        } catch (error: any) {
            console.error('Error fetching equipment detail:', error);
            setError(error.message || 'Failed to fetch equipment details');
        } finally {
            setIsLoading(false);
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

    const handleClose = () => {
        setEquipment(null);
        setError(null);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Equipment Details
                    </DialogTitle>
                    <DialogDescription>
                        View detailed information about the selected equipment.
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
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
                            <Button variant="outline" onClick={fetchEquipmentDetail}>
                                Try Again
                            </Button>
                        </CardContent>
                    </Card>
                ) : equipment ? (
                    <div className="space-y-6">
                        {/* Header Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-xl">{equipment.equipmentName}</CardTitle>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge variant={getStatusVariant(equipment.equipmentStatus)}>
                                                {equipment.equipmentStatus}
                                            </Badge>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">ID: {equipment.equipmentId}</span>
                                        </div>
                                    </div>
                                    {equipment.equipmentTypeUrlImg && equipment.equipmentTypeUrlImg !== "null" && (
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <img
                                                src={equipment.equipmentTypeUrlImg}
                                                alt={equipment.equipmentName}
                                                className="w-full h-full object-cover rounded-lg"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                    (e.target as HTMLImageElement).nextSibling!.textContent = 'No Image';
                                                }}
                                            />
                                            <ImageIcon className="h-6 w-6 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Wrench className="h-4 w-4" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Hash className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                            <span className="font-medium text-gray-900 dark:text-gray-100">Equipment Code:</span>
                                        </div>
                                        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded font-mono text-gray-900 dark:text-gray-100 border dark:border-gray-700">
                                            {equipment.equipmentCode}
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                            <span className="font-medium text-gray-900 dark:text-gray-100">Serial Number:</span>
                                        </div>
                                        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded font-mono text-gray-900 dark:text-gray-100 border dark:border-gray-700">
                                            {equipment.equipmentNumberSerial}
                                        </p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                        <span className="font-medium text-gray-900 dark:text-gray-100">Description:</span>
                                    </div>
                                    <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded leading-relaxed text-gray-900 dark:text-gray-100 border dark:border-gray-700">
                                        {equipment.equipmentDescription ||
                                            <span className="text-gray-500 dark:text-gray-400 italic">No description available</span>
                                        }
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Additional Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <QrCode className="h-4 w-4" />
                                    Additional Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <span className="font-medium text-gray-900 dark:text-gray-100">QR Code:</span>
                                        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded font-mono text-gray-900 dark:text-gray-100 border dark:border-gray-700">
                                            {equipment.equipmentQr && equipment.equipmentQr !== "null" && equipment.equipmentQr !== ""
                                                ? equipment.equipmentQr
                                                : <span className="text-gray-500 dark:text-gray-400 italic">No QR code assigned</span>
                                            }
                                        </p>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="font-medium text-gray-900 dark:text-gray-100">Image URL:</span>
                                        <p className="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded break-all text-gray-900 dark:text-gray-100 border dark:border-gray-700">
                                            {equipment.equipmentTypeUrlImg && equipment.equipmentTypeUrlImg !== "null"
                                                ? equipment.equipmentTypeUrlImg
                                                : <span className="text-gray-500 dark:text-gray-400 italic">No image URL</span>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>


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
                    <Button variant="outline" onClick={handleClose}>
                        Close
                    </Button>
                    <div className="flex gap-2">
                        {equipment && onEdit && (
                            <Button
                                onClick={() => {
                                    onEdit(equipment.equipmentId);
                                    handleClose();
                                }}
                                className="bg-orange-500 hover:bg-orange-600"
                            >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </Button>
                        )}
                        {equipment && onDelete && (
                            <Button
                                variant="destructive"
                                onClick={() => {
                                    onDelete(equipment.equipmentId);
                                    handleClose();
                                }}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </Button>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EquipmentDetail; 