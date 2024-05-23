'use client'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    selectAllUsers,
    getUserStatus,
    getUserError,
    setPage,
    getPage,
    getTotalPages,
    deleteUserState,
    updateUserState,
    addUser,
    User
} from '@/lib/features/users/userSlice';
import { AppDispatch, RootState } from '@/lib/store';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Avatar,
    Container,
    Typography,
    Skeleton,
    IconButton,
    Button,
    Stack
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import CreateIcon from '@mui/icons-material/Create';
import UserForm from './UserForm/UserForm';
import { useRouter } from 'next/navigation';

const UserList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const router = useRouter();
    const users = useSelector(selectAllUsers);
    const status = useSelector(getUserStatus);
    const error = useSelector(getUserError);
    const page = useSelector(getPage);
    const totalPages = useSelector(getTotalPages);
    const [loading, setLoading] = useState(true);

    const [openForm, setOpenForm] = useState(false);
    const [editUser, setEditUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchUsers(page));
    }, [dispatch, page]);

    useEffect(() => {
        if (status === "succeeded" || status === "failed") {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 1000); // 1-second skeleton delay
            return () => clearTimeout(timer);
        }
    }, [status]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };

    const handleViewUser = (userId: number) => {
        router.push(`/user/${userId}`);
    };

    const handleDeleteUser = (userId: number) => {
        dispatch(deleteUserState(userId));
    };

    const handleEditUser = (user: User) => {
        setEditUser(user);
        setOpenForm(true);
    };

    const handleCreateUser = () => {
        setEditUser(undefined);
        setOpenForm(true);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };

    const handleReload = () => {
        setLoading(true);
        dispatch(setPage(1));
        dispatch(deleteUserState());
        dispatch(fetchUsers(1));
    };

    const handleSubmit = (user: Omit<User, 'id'>, id?: number) => {
        if (id) {
            dispatch(updateUserState({ ...user, id }));
        } else {
            const newUser = { id: users.length + 1, ...user };
            dispatch(addUser(newUser));
        }
        handleCloseForm();
    };

    const displayedUsers = users.slice((page - 1) * 8, page * 8);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Techsnovel User List
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleCreateUser} startIcon={<CreateIcon />}>
                    Add User
                </Button>
                <Button variant="outlined" color="primary" onClick={handleReload} startIcon={<RefreshIcon />}>
                    Reload
                </Button>
            </Stack>
            <UserForm open={openForm} handleClose={handleCloseForm} editUser={editUser} onSubmit={handleSubmit} />
            {loading ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Avatar</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from(new Array(5)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton variant="circular" width={40} height={40} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={60} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={100} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={150} />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton variant="text" width={50} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : status === 'succeeded' ? (
                <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Avatar</TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>First Name</TableCell>
                                    <TableCell>Last Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {displayedUsers.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                                        </TableCell>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.first_name}</TableCell>
                                        <TableCell>{user.last_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleViewUser(user.id)}>
                                                <VisibilityIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleEditUser(user)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDeleteUser(user.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                </>
            ) : status === 'failed' ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h6" color="error">
                        {error}
                    </Typography>
                </Box>
            ) : null}
        </Container>
    );
};

export default UserList;
