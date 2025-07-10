"use client";

import { Button } from "../../../components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../components/ui/dialog";
import { blockUser } from "@/src/services/userServices";

interface BlockUserProps {
    userId: string | null;
    userName: string;
    isOpen: boolean;
    onClose: () => void;
    onBlock: () => void; 
}

export default function BlockUser({ userId, userName, isOpen, onClose, onBlock }: BlockUserProps) {
    const handleConfirmBlock = async () => {
        if (userId) {
            try {
                await blockUser(userId);
                onBlock();
            } catch (error) {
                console.error("Error blocking user:", error);
            }
        }
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Block User</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to block <strong>{userName}</strong>? This action will set their status to inactive.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirmBlock}>
                        Block
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}