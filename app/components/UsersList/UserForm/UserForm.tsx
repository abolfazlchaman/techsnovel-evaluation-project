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
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [avatarError, setAvatarError] = useState('');

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

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateURL = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        if (!firstName.trim()) {
            setFirstNameError('First name is required');
            isValid = false;
        } else {
            setFirstNameError('');
        }
        if (!lastName.trim()) {
            setLastNameError('Last name is required');
            isValid = false;
        } else {
            setLastNameError('');
        }
        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }
        if (avatar.trim() && !validateURL(avatar)) {
            setAvatarError('Invalid URL format');
            isValid = false;
        } else {
            setAvatarError('');
        }
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const user: Omit<User, 'id'> = { first_name: firstName, last_name: lastName, email, avatar };
            onSubmit(user, editUser?.id);
            resetForm(); // Reset the form after successful submission
        }
    };

    const resetForm = () => {
        setFirstName('');
        setLastName('');
        setEmail('');
        setAvatar('');
        setFirstNameError('');
        setLastNameError('');
        setEmailError('');
        setAvatarError('');
    };

    const handleCancel = () => {
        handleClose();
        resetForm(); // Reset the form when canceled
    };

    return (
        <Dialog open={open} onClose={handleCancel}>
            <DialogTitle>{editUser ? 'Edit User' : 'Add User'}</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        error={!!firstNameError}
                        helperText={firstNameError}
                        sx={{mt:2}}
                    />
                    <TextField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        error={!!lastNameError}
                        helperText={lastNameError}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        error={!!emailError}
                        helperText={emailError}
                    />
                    <TextField
                        label="Avatar URL"
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        fullWidth
                        error={!!avatarError}
                        helperText={avatarError}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
                    {editUser ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserForm;
