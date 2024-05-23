// components/UserForm.tsx
import React, { useState, useEffect } from 'react';
import { User } from '@/lib/features/users/userSlice';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface UserFormProps {
    open: boolean;
    handleClose: () => void;
    editUser?: { id: number; first_name: string; last_name: string; email: string; avatar: string };
    onSubmit: (user: Omit<User, 'id'>, id?: number) => void;
}

const UserForm: React.FC<UserFormProps> = ({ open, handleClose, editUser, onSubmit }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        if (editUser) {
            setFirstName(editUser.first_name);
            setLastName(editUser.last_name);
            setEmail(editUser.email);
            setAvatar(editUser.avatar);
        } else {
            setFirstName('');
            setLastName('');
            setEmail('');
            setAvatar('');
        }
    }, [editUser]);

    const handleSubmit = () => {
        const user: Omit<User, 'id'> = { first_name: firstName, last_name: lastName, email, avatar };
        onSubmit(user, editUser?.id);
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Avatar URL"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
                    {editUser ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
