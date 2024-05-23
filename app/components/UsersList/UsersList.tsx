'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    selectAllUsers,
    getUserStatus,
    getUserError,
    setPage,
    getPage,
    getTotalPages
} from '@/lib/features/users/userSlice';
import { AppDispatch, RootState } from '@/lib/store';
import {
    CircularProgress,
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
    Skeleton
} from '@mui/material';

const UserList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => selectAllUsers(state));
    const status = useSelector((state: RootState) => getUserStatus(state));
    const error = useSelector((state: RootState) => getUserError(state));
    const page = useSelector((state: RootState) => getPage(state));
    const totalPages = useSelector((state: RootState) => getTotalPages(state));

    useEffect(() => {
        dispatch(fetchUsers(page));
    }, [dispatch, page]);

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                User List
            </Typography>
            {status === 'loading' ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Avatar</TableCell>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
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
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Avatar src={user.avatar} alt={`${user.first_name} ${user.last_name}`} />
                                        </TableCell>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.first_name}</TableCell>
                                        <TableCell>{user.last_name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
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
